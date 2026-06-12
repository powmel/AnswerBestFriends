(() => {
  const L = {
    ja: {
      startLead: "ヒックの法則に基づく選択実験です。", participantId: "参加者ID", start: "開始",
      instructionsEyebrow: "説明", instructionsTitle: "実験の説明", begin: "実験を始める",
      instructions: [
        "正解・不正解はありません。",
        "表示された候補の中から、最も選びたいものを自然に選んでください。",
        "選択肢が表示されてから選択するまでの時間を記録します。",
        "まず最初に「温め課題（練習）」が2問表示されます。",
        "ブロック終了後に簡単な評価アンケートがあります。評価にかかった時間は選択時間には含まれません。"
      ],
      ratingTitle: "ブロック全体の評価", ratingLead: "このブロック（5問の選択）全体について、以下の質問に回答してください。", next: "次へ",
      ratings: {
        satisfaction: "このブロック全体について、選択にどの程度満足していますか？",
        difficulty: "このブロック全体について、選ぶときにどの程度迷いましたか？",
        confidence: "このブロック全体について、選択にどの程度自信がありましたか？"
      },
      bonusTitle: "余興質問", bonusLead: "ここからはT参加者向けの余興質問です。主分析には使いません。", bonusStart: "余興を開始する",
      submitEyebrow: "送信", copyJson: "JSONをコピー", downloadJson: "JSONをダウンロード",
      startError: "参加者IDを入力してください。", ratingError: "3項目すべてに回答してください。",
      sending: "データ送信中...", successTitle: "完了しました", successMessage: "ご協力ありがとうございました。データ送信に成功しました。",
      failTitle: "送信できませんでした", failMessage: "データは失われていません。下のJSONをコピーまたはダウンロードして実験者へ渡してください。"
    },
    en: {
      startLead: "A choice experiment based on Hick's Law.", participantId: "Participant ID", start: "Start",
      instructionsEyebrow: "Instructions", instructionsTitle: "Experiment Instructions", begin: "Begin experiment",
      instructions: [
        "There are no right or wrong answers.",
        "Please naturally choose the option you would most like to select.",
        "We record the time from when choices appear until you click one option.",
        "First, 2 warm-up (filler) questions will be presented.",
        "A brief evaluation survey will be shown after each block. Rating time is not included in decision time."
      ],
      ratingTitle: "Block Evaluation", ratingLead: "Please answer the following questions regarding this block of 5 choices as a whole.", next: "Next",
      ratings: {
        satisfaction: "Overall, how satisfied were you with your choices in this block?",
        difficulty: "Overall, how difficult was it to choose in this block?",
        confidence: "Overall, how confident were you in your choices in this block?"
      },
      bonusTitle: "Bonus questions", bonusLead: "These fun questions are only for T participants and are excluded from the main analysis.", bonusStart: "Start bonus",
      submitEyebrow: "Submit", copyJson: "Copy JSON", downloadJson: "Download JSON",
      startError: "Please enter a participant ID.", ratingError: "Please answer all three rating items.",
      sending: "Submitting data...", successTitle: "Completed", successMessage: "Thank you. Your data was submitted successfully.",
      failTitle: "Submission failed", failMessage: "Your data has not been lost. Please copy or download the JSON below and send it to the experimenter."
    }
  };

  const S = { lang: "ja", id: "", type: "OTHER", sid: "", sessionStart: 0, queue: [], bonus: [], idx: 0, current: null, startMs: 0, selected: null, rows: [] };
  const $ = (id) => document.getElementById(id);
  const screens = ["start-screen", "instruction-screen", "trial-screen", "rating-screen", "bonus-intro-screen", "submit-screen"];
  const show = (id) => screens.forEach((s) => $(s).classList.toggle("active", s === id));
  const txt = (k) => L[S.lang][k];

  function applyLang() {
    document.documentElement.lang = S.lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => { const v = txt(el.dataset.i18n); if (typeof v === "string") el.textContent = v; });
    $("instruction-list").innerHTML = txt("instructions").map((x) => `<li>${x}</li>`).join("");
  }
  
  function getType(id) {
    const u = id.toUpperCase();
    return u.startsWith("TEST") ? "TEST" : u.startsWith("T") ? "T" : u.startsWith("P") ? "P" : "OTHER";
  }
  
  function hash(s) {
    let h = 2166136261;
    for (const c of s) {
      h ^= c.charCodeAt(0);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }
  
  function rng(seed) {
    let x = seed || 1;
    return () => {
      x ^= x << 13;
      x ^= x >>> 17;
      x ^= x << 5;
      return (x >>> 0) / 4294967296;
    };
  }
  
  function shuffle(a, r) {
    const b = [...a];
    for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [b[i], b[j]] = [b[j], b[i]];
    }
    return b;
  }

  // Generate sequence containing 2 fillers + 15 block main trials (5 main categories repeated in each block)
  function createQueue() {
    const r = rng(hash(S.id));
    const q = [];

    // 1. Filler Phase (2 trials)
    const fillers = window.QUESTIONS.filler;
    fillers.forEach((fq) => {
      q.push({
        phase: "filler",
        is_bonus: false,
        is_filler: true,
        condition: "filler",
        option_count: fq.options[S.lang].length,
        question_id: fq.question_id,
        question_text: fq.question[S.lang],
        options: fq.options[S.lang],
        block_id: "filler",
        block_index: null,
        trial_in_block: null,
        block_option_count: null,
        rating_scope: "none"
      });
    });

    // 2. Main Phase (15 trials, partitioned into 3 blocks: 2, 4, 8)
    const mainQs = window.QUESTIONS.main; // exactly 5 questions
    const blocksConfig = [
      { count: 2, id: "block_2", index: 1 },
      { count: 4, id: "block_4", index: 2 },
      { count: 8, id: "block_8", index: 3 }
    ];

    blocksConfig.forEach((bConf) => {
      // Shuffle the same 5 question categories inside each block loop using the random state
      const shuffledBlockQs = shuffle(mainQs, r);
      shuffledBlockQs.forEach((qConfig, tIdx) => {
        q.push({
          phase: "main",
          is_bonus: false,
          is_filler: false,
          condition: `choices_${bConf.count}`,
          option_count: bConf.count,
          question_id: qConfig.question_id,
          question_text: qConfig.question[S.lang],
          options: qConfig.options[S.lang].slice(0, bConf.count),
          block_id: bConf.id,
          block_index: bConf.index,
          trial_in_block: tIdx + 1,
          block_option_count: bConf.count,
          rating_scope: "block"
        });
      });
    });

    return q;
  }

  function bonusQueue() {
    const opts = window.QUESTIONS.bonus.members[S.lang];
    return window.QUESTIONS.bonus.questions.map((q) => ({
      phase: "bonus",
      is_bonus: true,
      is_filler: false,
      condition: "bonus",
      option_count: opts.length,
      question_id: q.question_id,
      question_text: q.text[S.lang],
      options: opts,
      block_id: "bonus",
      block_index: null,
      trial_in_block: null,
      block_option_count: null,
      rating_scope: "none"
    }));
  }

  function start() {
    S.lang = $("language-select").value;
    applyLang();
    S.id = $("participant-id").value.trim();
    if (!S.id) { $("start-error").textContent = txt("startError"); return; }
    S.type = getType(S.id);
    S.sid = `${S.id}-${Date.now()}`;
    S.sessionStart = performance.now();
    S.rows = [];
    S.queue = createQueue();
    S.bonus = bonusQueue();
    S.idx = 0;
    $("start-error").textContent = "";
    show("instruction-screen");
  }

  function beginMain() {
    S.idx = 0;
    renderTrial();
  }

  function renderTrial() {
    const trial = S.queue[S.idx];
    S.current = trial;
    S.selected = null;
    
    // Adjust progress labels depending on trial phase
    if (trial.phase === "filler") {
      $("progress").textContent = S.lang === "ja" 
        ? `練習課題: ${S.idx + 1} / 2` 
        : `Warm-up: ${S.idx + 1} / 2`;
    } else {
      $("progress").textContent = S.lang === "ja"
        ? `ブロック ${trial.block_index} (${trial.block_option_count}択) - 課題 ${trial.trial_in_block} / 5`
        : `Block ${trial.block_index} (${trial.block_option_count} choices) - Task ${trial.trial_in_block} / 5`;
    }
    
    $("question-text").textContent = trial.question_text;
    $("option-list").innerHTML = "";
    trial.options.forEach((op) => {
      const b = document.createElement("button");
      b.className = "option-button";
      b.textContent = op;
      b.onclick = () => choose(op);
      $("option-list").appendChild(b);
    });
    
    show("trial-screen");
    requestAnimationFrame(() => { S.startMs = performance.now(); });
  }

  function choose(op) {
    const end = performance.now();
    S.selected = {
      selected_option: op,
      trial_start_time: new Date(Date.now() - (performance.now() - S.startMs)).toISOString(),
      selected_time: new Date().toISOString(),
      reaction_time_ms: Math.round(end - S.startMs)
    };
    
    // Save current trial row (rating values are initially null)
    save(null, null, null);
    
    if (S.current.phase === "main" && S.current.trial_in_block === 5) {
      // Prompt subjective questionnaire at the end of each block
      renderRatings();
    } else {
      // For fillers or non-terminal main block trials, bypass rating directly
      nextTrial();
    }
  }

  function renderRatings() {
    $("rating-progress").textContent = S.lang === "ja"
      ? `ブロック評価: ${S.current.block_index} / 3`
      : `Block evaluation: ${S.current.block_index} / 3`;
      
    $("rating-error").textContent = "";
    $("rating-form").innerHTML = "";
    
    ["satisfaction", "difficulty", "confidence"].forEach((name) => {
      const fs = document.createElement("fieldset");
      fs.className = "rating-group";
      fs.innerHTML = `<legend>${txt("ratings")[name]}</legend><div class="rating-options">${[1,2,3,4,5,6,7].map((v) => `<label><input type="radio" name="${name}" value="${v}"><span>${v}</span></label>`).join("")}</div>`;
      $("rating-form").appendChild(fs);
    });
    
    show("rating-screen");
  }

  function rating(name) {
    const el = document.querySelector(`input[name="${name}"]:checked`);
    return el ? Number(el.value) : null;
  }

  function nextRating() {
    const a = rating("satisfaction"), b = rating("difficulty"), c = rating("confidence");
    if (!a || !b || !c) { $("rating-error").textContent = txt("ratingError"); return; }
    
    // Retroactively write ratings to the 5 main trials in the current block
    const startIndex = S.rows.length - 5;
    for (let i = startIndex; i < S.rows.length; i++) {
      if (S.rows[i] && S.rows[i].phase === "main") {
        S.rows[i].satisfaction = a;
        S.rows[i].difficulty = b;
        S.rows[i].confidence = c;
      }
    }
    
    nextTrial();
  }

  function nextTrial() {
    S.idx++;
    if (S.idx < S.queue.length) {
      renderTrial();
    } else {
      // Entire main and filler queue complete, check participant type
      if (S.type === "T" || S.type === "TEST") {
        S.idx = 0;
        show("bonus-intro-screen");
      } else {
        submit();
      }
    }
  }

  function save(satisfaction, difficulty, confidence) {
    const now = new Date().toISOString();
    const total = Math.round(performance.now() - S.sessionStart);
    
    S.rows.push({
      participant_id: S.id,
      participant_type: S.type,
      language: S.lang,
      session_id: S.sid,
      trial_id: S.rows.length + 1,
      phase: S.current.phase,
      is_bonus: S.current.is_bonus,
      condition: S.current.condition,
      option_count: S.current.option_count,
      question_id: S.current.question_id,
      question_text: S.current.question_text,
      options_json: JSON.stringify(S.current.options),
      selected_option: S.selected.selected_option,
      trial_start_time: S.selected.trial_start_time,
      selected_time: S.selected.selected_time,
      reaction_time_ms: S.selected.reaction_time_ms,
      satisfaction: satisfaction,
      difficulty: difficulty,
      confidence: confidence,
      
      // New columns for block-based experiment design
      block_id: S.current.block_id,
      block_index: S.current.block_index,
      trial_in_block: S.current.trial_in_block,
      block_option_count: S.current.block_option_count,
      rating_scope: S.current.rating_scope,
      is_filler: S.current.is_filler,
      
      user_agent: navigator.userAgent,
      screen_width: window.innerWidth || screen.width,
      screen_height: window.innerHeight || screen.height,
      created_at: now,
      session_start_time: new Date(Date.now() - total).toISOString(),
      session_end_time: now,
      total_time_ms: total
    });
  }

  // Bonus Questions (Friend余興質問)
  function beginBonus() {
    S.idx = 0;
    renderBonusTrial();
  }

  function renderBonusTrial() {
    const trial = S.bonus[S.idx];
    S.current = trial;
    S.selected = null;
    
    $("progress").textContent = S.lang === "ja"
      ? `余興質問: ${S.idx + 1} / ${S.bonus.length}`
      : `Bonus Task: ${S.idx + 1} / ${S.bonus.length}`;
      
    $("question-text").textContent = trial.question_text;
    $("option-list").innerHTML = "";
    trial.options.forEach((op) => {
      const b = document.createElement("button");
      b.className = "option-button";
      b.textContent = op;
      b.onclick = () => chooseBonus(op);
      $("option-list").appendChild(b);
    });
    
    show("trial-screen");
    requestAnimationFrame(() => { S.startMs = performance.now(); });
  }

  function chooseBonus(op) {
    const end = performance.now();
    S.selected = {
      selected_option: op,
      trial_start_time: new Date(Date.now() - (performance.now() - S.startMs)).toISOString(),
      selected_time: new Date().toISOString(),
      reaction_time_ms: Math.round(end - S.startMs)
    };
    
    // Save bonus records with no subjective ratings
    save(null, null, null);
    
    S.idx++;
    if (S.idx < S.bonus.length) {
      renderBonusTrial();
    } else {
      submit();
    }
  }

  async function submit() {
    show("submit-screen");
    $("submit-title").textContent = txt("sending");
    $("submit-message").textContent = "";
    $("fallback-area").classList.add("hidden");
    
    // Finalize all rows with total session execution duration
    const finalNow = new Date().toISOString();
    const finalTotal = Math.round(performance.now() - S.sessionStart);
    S.rows.forEach((row) => {
      row.session_end_time = finalNow;
      row.total_time_ms = finalTotal;
    });

    const payload = JSON.stringify(S.rows, null, 2);
    const url = window.CONFIG?.GAS_WEB_APP_URL || "";
    
    if (!url || url.includes("PASTE_YOUR")) {
      fallback(payload);
      return;
    }
    
    try {
      await fetch(url, {
        method: "POST",
        mode: "no-cors", // Bypasses CORS preflight check safely
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: payload
      });
      $("submit-title").textContent = txt("successTitle");
      $("submit-message").textContent = txt("successMessage");
    } catch (e) {
      console.error("Submission failed:", e);
      fallback(payload);
    }
  }

  function fallback(payload) {
    $("submit-title").textContent = txt("failTitle");
    $("submit-message").textContent = txt("failMessage");
    $("payload-output").value = payload;
    $("fallback-area").classList.remove("hidden");
  }

  function copyJson() {
    $("payload-output").select();
    document.execCommand("copy");
  }

  function downloadJson() {
    const a = document.createElement("a");
    a.href = "data:application/json;charset=utf-8," + encodeURIComponent($("payload-output").value);
    a.download = `${S.id || "participant"}.json`;
    a.click();
  }

  $("language-select").onchange = (e) => { S.lang = e.target.value; applyLang(); };
  $("start-button").onclick = start;
  $("begin-button").onclick = beginMain;
  $("next-button").onclick = nextRating;
  $("bonus-start-button").onclick = beginBonus;
  $("copy-json-button").onclick = copyJson;
  $("download-json-button").onclick = downloadJson;
  
  applyLang();
})();
