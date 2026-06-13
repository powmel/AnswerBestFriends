(() => {
  const L = {
    ja: {
      startLead: "ヒックの法則に基づく選択実験です。",
      participantId: "お名前・ニックネーム・合言葉があれば入力してください（任意）",
      startHelper: "匿名でも参加できます。合言葉や番号を受け取っている場合は、それを入力してください。",
      start: "開始",
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
      bonusTitle: "ここからは Special Questions です。", bonusLead: "ここからが本題です。直感で選んでください。", bonusStart: "始める",
      submitEyebrow: "送信", copyJson: "JSONをコピー", downloadJson: "JSONをダウンロード",
      startError: "参加者IDを入力してください。", ratingError: "3項目すべてに回答してください。",
      sending: "データ送信中...", successTitle: "完了しました", successMessage: "ご協力ありがとうございました。データ送信に成功しました。",
      failTitle: "送信できませんでした", failMessage: "データは失われていません。下のJSONをコピーまたはダウンロードして実験者へ渡してください。",
      choiceStyleHeading: "今日のあなたの選択スタイル",
      choiceStyles: {
        quick: { name: "即決タイプ", desc: "どの選択肢数でも比較的すばやく選べていました。直感で決めるのが得意なタイプかもしれません。" },
        careful: { name: "じっくり比較タイプ", desc: "選択肢が増えるほど、少し時間をかけて比較する傾向がありました。候補をしっかり見比べるタイプかもしれません。" },
        balanced: { name: "バランス型", desc: "選択肢数が変わっても、比較的安定したペースで選んでいました。直感と比較のバランスが取れているタイプかもしれません。" },
        explorer: { name: "選択肢多めでも楽しめるタイプ", desc: "選択肢が多くなっても、あまりペースを崩さずに選べていました。多くの候補を見ることに慣れているタイプかもしれません。" },
        thoughtful: { name: "慎重セレクタータイプ", desc: "全体的に少し時間をかけて選ぶ傾向がありました。一つひとつを丁寧に考えるタイプかもしれません。" },
        theme_sensitive: { name: "テーマで変わるタイプ", desc: "テーマによって、選ぶ速さが少し変わる傾向がありました。内容によってじっくり考えることがあるタイプかもしれません。" }
      },
      cs: {
        pointsTitle: "見ていたポイント：",
        points: [
          "2択 / 4択 / 8択で選ぶ速さ",
          "選択肢が増えたときの変化",
          "どのテーマで少し時間をかけたか"
        ],
        patternTitle: "今回の回答傾向：",
        fast2: "2択は比較的すばやく選んでいました",
        slow2: "2択でも少し時間をかけて選んでいました",
        slow8: "8択では少し時間をかけていました",
        steady8: "8択でもペースは大きく変わりませんでした",
        themeFast: "{t}の質問は比較的すぐ決めていました",
        themeSlow: "{t}の質問では少し時間をかけていました",
        themes: { food: "食べ物", weekend_place: "週末の行き先", study_place: "勉強・作業の場所", movie_genre: "映画ジャンル", beverage_choice: "飲み物", ai_tool: "AIツール", favorite_color: "好きな色" }
      }
    },
    en: {
      startLead: "A choice experiment based on Hick's Law.",
      participantId: "Name, nickname, or access code (optional)",
      startHelper: "You can participate anonymously. If you received an access code, please enter it here.",
      start: "Start",
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
      bonusTitle: "Now it’s time for Special Questions.", bonusLead: "This is where the real fun begins. Please choose intuitively.", bonusStart: "Start",
      submitEyebrow: "Submit", copyJson: "Copy JSON", downloadJson: "Download JSON",
      startError: "Please enter a participant ID.", ratingError: "Please answer all three rating items.",
      sending: "Submitting data...", successTitle: "Completed", successMessage: "Thank you. Your data was submitted successfully.",
      failTitle: "Submission failed", failMessage: "Your data has not been lost. Please copy or download the JSON below and send it to the experimenter.",
      choiceStyleHeading: "Your choice style today",
      choiceStyles: {
        quick: { name: "Quick Decider", desc: "You made choices relatively quickly across different numbers of options. You may be good at deciding intuitively." },
        careful: { name: "Careful Comparator", desc: "You tended to take a little more time as the number of options increased. You may prefer comparing options carefully." },
        balanced: { name: "Balanced Chooser", desc: "Your decision time stayed relatively stable across different numbers of options. You may balance intuition and comparison well." },
        explorer: { name: "Many-Options Explorer", desc: "Even with more options, your pace did not slow down much. You may be comfortable exploring many choices." },
        thoughtful: { name: "Thoughtful Selector", desc: "You tended to take a bit more time overall. You may be the type who thinks carefully before choosing." },
        theme_sensitive: { name: "Theme-Sensitive Chooser", desc: "Your pace shifted a little depending on the topic. You may think a bit more about certain themes than others." }
      },
      cs: {
        pointsTitle: "What this looked at:",
        points: [
          "How quickly you chose in 2 / 4 / 8-option questions",
          "How your pace changed when the number of options increased",
          "Which themes took a little more time"
        ],
        patternTitle: "Your response pattern:",
        fast2: "You chose relatively quickly in 2-option questions",
        slow2: "You took a little time even in 2-option questions",
        slow8: "You took a bit more time in 8-option questions",
        steady8: "Your pace stayed about the same even with 8 options",
        themeFast: "{t} questions were relatively quick for you",
        themeSlow: "{t} questions took a little more comparison",
        themes: { food: "Food", weekend_place: "Weekend place", study_place: "Study place", movie_genre: "Movie genre", beverage_choice: "Drink", ai_tool: "AI tool", favorite_color: "Color" }
      }
    }
  };

  const S = { lang: "ja", id: "", type: "OTHER", sid: "", sessionStart: 0, queue: [], bonus: [], idx: 0, current: null, startMs: 0, selected: null, rows: [] };
  const $ = (id) => document.getElementById(id);
  const screens = ["start-screen", "instruction-screen", "trial-screen", "rating-screen", "bonus-intro-screen", "submit-screen"];
  const show = (id) => screens.forEach((s) => $(s).classList.toggle("active", s === id));
  const txt = (k) => L[S.lang][k];
  
  // Explicit, JS-driven visibility of the free-text input. We do not rely on CSS
  // alone: the `hidden` attribute + class are both toggled so a stale stylesheet
  // can never leak the textarea into a screen that must not show it.
  function showTextInput() {
    const area = $("text-input-area");
    area.classList.remove("hidden");
    area.hidden = false;
    area.style.display = "flex";
  }

  function hideTextInput() {
    const area = $("text-input-area");
    area.classList.add("hidden");
    area.hidden = true;
    area.style.display = "none";
    $("free-text-input").value = "";
  }

  function resetTrialUI() {
    hideTextInput();
    const ol = $("option-list");
    ol.innerHTML = "";
    ol.classList.remove("hidden");
    ol.hidden = false;
    ol.classList.remove("grid-2");
    ol.classList.remove("grid-bonus");
    // Compact mode is only for the bonus photo-card grid.
    $("trial-screen").classList.remove("bonus-cards");
  }

  function applyLang() {
    document.documentElement.lang = S.lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => { const v = txt(el.dataset.i18n); if (typeof v === "string") el.textContent = v; });
    $("instruction-list").innerHTML = txt("instructions").map((x) => `<li>${x}</li>`).join("");
  }
  
  function getType(id) {
    if (!id) return "ANON";
    const u = id.trim().toUpperCase();
    if (u.startsWith("ANON-")) return "ANON";
    if (u.startsWith("PUBLIC-")) return "PUBLIC";
    if (/^TEST[-_]?\d+/i.test(u)) return "TEST";
    if (/^T[-_]?\d+/i.test(u)) return "T";
    if (/^P[-_]?\d+/i.test(u)) return "P";
    return "PUBLIC";
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

  // Generate sequence containing 2 fillers + 15 main trials.
  // Each block has 4 common questions plus 1 block-specific extra question, keeping 5 trials per block.
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
    const commonMainQs = window.QUESTIONS.main; // 4 common questions repeated across all blocks
    const specialMain = window.QUESTIONS.specialMain || {};
    const blocksConfig = [
      { count: 2, id: "block_2", index: 1 },
      { count: 4, id: "block_4", index: 2 },
      { count: 8, id: "block_8", index: 3 }
    ];

    blocksConfig.forEach((bConf) => {
      const specialQ = specialMain[bConf.count];
      const blockQs = specialQ ? [...commonMainQs, specialQ] : commonMainQs;
      const shuffledBlockQs = shuffle(blockQs, r);
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
    const isHugo = S.id.toUpperCase() === "T006";
    const opts = window.QUESTIONS.bonus.members;
    
    return window.QUESTIONS.bonus.questions.map((q) => {
      const qText = q.type === "text"
        ? (isHugo ? q.hugo_text[S.lang] : q.text[S.lang])
        : q.text[S.lang];
        
      return {
        phase: "bonus",
        is_bonus: true,
        is_filler: false,
        condition: "bonus",
        option_count: q.type === "text" ? 0 : opts.length,
        question_id: q.question_id,
        question_text: qText,
        options: q.type === "text" ? [] : opts.map(o => o.name),
        type: q.type, // 'select' or 'text'
        block_id: "bonus",
        block_index: null,
        trial_in_block: null,
        block_option_count: null,
        rating_scope: "none"
      };
    });
  }

  function start() {
    S.lang = $("language-select").value;
    applyLang();
    const rawId = $("participant-id").value.trim();
    S.type = getType(rawId);
    
    if (S.type === "T" || S.type === "P" || S.type === "TEST") {
      S.id = rawId;
    } else {
      const timestamp = Date.now();
      const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
      if (S.type === "ANON") {
        S.id = `ANON-${timestamp}-${rand}`;
      } else {
        S.id = `PUBLIC-${timestamp}-${rand}`;
      }
    }
    
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
    
    resetTrialUI();

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
    
    resetTrialUI();

    $("progress").textContent = S.lang === "ja"
      ? `Special Questions: ${S.idx + 1} / ${S.bonus.length}`
      : `Special Questions: ${S.idx + 1} / ${S.bonus.length}`;
      
    $("question-text").textContent = trial.question_text;
    
    if (trial.type === "text") {
      // Free text inputs layout (bonus trials 4 & 5 only)
      $("option-list").classList.add("hidden");
      $("option-list").hidden = true;
      showTextInput();

      const textarea = $("free-text-input");

      $("free-text-submit-button").onclick = () => {
        const textVal = textarea.value.trim();
        chooseBonus(textVal);
      };
    } else if (trial.type === "member_card") {
      // Photo cards selection layout (all bonus trials): textarea stays hidden.
      // bonus-cards triggers the compact, viewport-adaptive layout so all 8
      // cards fit on one screen without scrolling.
      hideTextInput();
      $("trial-screen").classList.add("bonus-cards");
      $("option-list").classList.add("grid-bonus");

      $("option-list").innerHTML = "";
      trial.options.forEach((opName) => {
        const memberInfo = window.QUESTIONS.bonus.members.find(m => m.name === opName) || { name: opName, image: "" };
        
        const b = document.createElement("button");
        b.className = "member-card";
        
        const img = document.createElement("img");
        img.src = memberInfo.image;
        img.alt = memberInfo.name;
        
        const placeholder = document.createElement("div");
        placeholder.className = "member-card-placeholder hidden";
        placeholder.textContent = memberInfo.name.slice(0, 2);
        
        if (!memberInfo.image) {
          placeholder.classList.remove("hidden");
        } else {
          img.onerror = () => {
            img.classList.add("hidden");
            placeholder.classList.remove("hidden");
          };
        }
        
        const nameSpan = document.createElement("div");
        nameSpan.className = "member-card-name";
        nameSpan.textContent = memberInfo.name;
        
        if (memberInfo.image) {
          b.appendChild(img);
        }
        b.appendChild(placeholder);
        b.appendChild(nameSpan);
        
        b.onclick = () => chooseBonus(opName);
        $("option-list").appendChild(b);
      });
    } else {
      // Normal options selection layout (fallback for standard choices if any)
      $("option-list").innerHTML = "";
      trial.options.forEach((op) => {
        const b = document.createElement("button");
        b.className = "option-button";
        b.textContent = op;
        b.onclick = () => chooseBonus(op);
        $("option-list").appendChild(b);
      });
    }
    
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

  // Common main themes used for the light "theme" observations. The special-block
  // questions (beverage_choice / ai_tool / favorite_color) are auxiliary and are
  // intentionally excluded from the fastest/slowest theme pick to keep it stable.
  const COMMON_THEMES = ["food", "weekend_place", "study_place", "movie_genre"];

  // Light, non-diagnostic analysis based ONLY on this session's main-phase
  // reaction times. This is NOT a personality test and is display-only; nothing
  // here is saved or sent. Filler, bonus and Special Questions are excluded.
  function analyzeChoices() {
    const mainRows = S.rows.filter((r) => r.phase === "main" && r.is_bonus === false && r.is_filler === false);
    const groups = { 2: [], 4: [], 8: [] };
    const themes = {};
    mainRows.forEach((r) => {
      if (typeof r.reaction_time_ms !== "number") return;
      if (groups[r.option_count]) groups[r.option_count].push(r.reaction_time_ms);
      if (COMMON_THEMES.includes(r.question_id)) {
        (themes[r.question_id] = themes[r.question_id] || []).push(r.reaction_time_ms);
      }
    });
    const mean = (arr) => (arr && arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null);
    const avg2 = mean(groups[2]), avg4 = mean(groups[4]), avg8 = mean(groups[8]);
    const available = [avg2, avg4, avg8].filter((v) => v !== null);
    const overall = available.length ? available.reduce((a, b) => a + b, 0) / available.length : null;

    // Per-theme averages (common themes only).
    const themeAvgs = Object.keys(themes)
      .map((id) => ({ id, avg: mean(themes[id]) }))
      .filter((t) => t.avg !== null)
      .sort((a, b) => a.avg - b.avg);
    let fastestTheme = null, slowestTheme = null, themeSpread = 1;
    if (themeAvgs.length >= 2) {
      fastestTheme = themeAvgs[0].id;
      slowestTheme = themeAvgs[themeAvgs.length - 1].id;
      themeSpread = themeAvgs[themeAvgs.length - 1].avg / themeAvgs[0].avg;
    }

    let key = "balanced";
    if (overall !== null) {
      const QUICK_MS = 700, LONG_MS = 1200, RATIO = 1.4, THEME_SPREAD = 1.6;
      if (overall < QUICK_MS) key = "quick";
      else if (avg2 !== null && avg4 !== null && avg8 !== null && avg2 < avg4 && avg4 < avg8 && avg8 >= avg2 * RATIO) key = "careful";
      else if (overall >= LONG_MS) key = "thoughtful";
      else if (themeSpread >= THEME_SPREAD) key = "theme_sensitive";
      else if (avg4 !== null && avg8 !== null && avg8 <= avg4 * 1.1) key = "explorer";
      else key = "balanced";
    }

    return { key, avg2, avg4, avg8, overall, fastestTheme, slowestTheme };
  }

  function renderChoiceStyle() {
    const a = analyzeChoices();
    const styles = txt("choiceStyles");
    const cs = txt("cs");
    const style = styles[a.key] || styles.balanced;

    $("choice-style-heading").textContent = txt("choiceStyleHeading");
    $("choice-style-name").textContent = style.name;
    $("choice-style-desc").textContent = style.desc;

    // "What this looked at" — static, reassuring note about the limited scope.
    $("choice-style-points-title").textContent = cs.pointsTitle;
    $("choice-style-points-list").innerHTML = cs.points.map((p) => `<li>${p}</li>`).join("");

    // "Your response pattern" — up to 4 light, relative observations.
    const bullets = [];
    if (a.overall !== null) {
      if (a.avg2 !== null) bullets.push(a.avg2 <= a.overall ? cs.fast2 : cs.slow2);
      if (a.avg8 !== null) bullets.push(a.avg8 >= a.overall * 1.08 ? cs.slow8 : cs.steady8);
    }
    if (a.fastestTheme && a.slowestTheme && a.fastestTheme !== a.slowestTheme) {
      bullets.push(cs.themeFast.replace("{t}", cs.themes[a.fastestTheme] || a.fastestTheme));
      bullets.push(cs.themeSlow.replace("{t}", cs.themes[a.slowestTheme] || a.slowestTheme));
    }
    const patternWrap = $("choice-style-pattern");
    if (bullets.length) {
      $("choice-style-pattern-title").textContent = cs.patternTitle;
      $("choice-style-pattern-list").innerHTML = bullets.slice(0, 4).map((b) => `<li>${b}</li>`).join("");
      patternWrap.classList.remove("hidden");
    } else {
      patternWrap.classList.add("hidden");
    }

    $("choice-style").classList.remove("hidden");
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

    // Show the light choice-style feedback (display only; not part of the payload).
    renderChoiceStyle();

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

  // Expose the real visible viewport height as a CSS variable. Mobile browsers
  // report an unreliable 100vh (it ignores the address bar), so layouts that must
  // fit on one screen (the bonus photo-card grid) size against --app-vh instead.
  function setViewportVar() {
    const h = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    document.documentElement.style.setProperty("--app-vh", `${h}px`);
  }
  setViewportVar();
  window.addEventListener("resize", setViewportVar);
  if (window.visualViewport) window.visualViewport.addEventListener("resize", setViewportVar);

  $("language-select").onchange = (e) => { S.lang = e.target.value; applyLang(); };
  $("start-button").onclick = start;
  $("begin-button").onclick = beginMain;
  $("next-button").onclick = nextRating;
  $("bonus-start-button").onclick = beginBonus;
  $("copy-json-button").onclick = copyJson;
  $("download-json-button").onclick = downloadJson;
  
  applyLang();
})();
