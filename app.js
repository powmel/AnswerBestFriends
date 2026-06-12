(() => {
  const L = {
    ja: {
      startLead: "ヒックの法則に基づく選択実験です。", participantId: "参加者ID", start: "開始",
      instructionsEyebrow: "説明", instructionsTitle: "実験の説明", begin: "実験を始める",
      instructions: ["正解・不正解はありません。", "表示された候補の中から、最も選びたいものを自然に選んでください。", "選択肢が表示されてから選択するまでの時間を記録します。", "評価にかかった時間は選択時間には含まれません。"],
      ratingTitle: "選択後評価", ratingLead: "各項目について1〜7で回答してください。", next: "次へ",
      ratings: { satisfaction: "選択にどの程度満足していますか？", difficulty: "選ぶときにどの程度迷いましたか？", confidence: "選択にどの程度自信がありますか？" },
      bonusTitle: "余興質問", bonusLead: "ここからはT参加者向けの余興質問です。主分析には使いません。", bonusStart: "余興を開始する",
      submitEyebrow: "送信", copyJson: "JSONをコピー", downloadJson: "JSONをダウンロード",
      startError: "参加者IDを入力してください。", ratingError: "3項目すべてに回答してください。",
      sending: "データ送信中...", successTitle: "完了しました", successMessage: "ご協力ありがとうございました。データ送信に成功しました。",
      failTitle: "送信できませんでした", failMessage: "データは失われていません。下のJSONをコピーまたはダウンロードして実験者へ渡してください。"
    },
    en: {
      startLead: "A choice experiment based on Hick's Law.", participantId: "Participant ID", start: "Start",
      instructionsEyebrow: "Instructions", instructionsTitle: "Experiment Instructions", begin: "Begin experiment",
      instructions: ["There are no right or wrong answers.", "Please naturally choose the option you would most like to select.", "We record the time from when choices appear until you click one option.", "Rating time is not included in decision time."],
      ratingTitle: "Post-choice ratings", ratingLead: "Please answer each item on a 1–7 scale.", next: "Next",
      ratings: { satisfaction: "How satisfied are you with your choice?", difficulty: "How difficult was it to choose?", confidence: "How confident are you in your choice?" },
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
  function getType(id) { const u = id.toUpperCase(); return u.startsWith("TEST") ? "TEST" : u.startsWith("T") ? "T" : u.startsWith("P") ? "P" : "OTHER"; }
  function hash(s) { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { let x = seed || 1; return () => { x ^= x << 13; x ^= x >>> 17; x ^= x << 5; return (x >>> 0) / 4294967296; }; }
  function shuffle(a, r) { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

  function mainQueue() {
    const r = rng(hash(S.id));
    const counts = shuffle([2, 4, 8], r);
    const qs = shuffle(window.QUESTIONS.main, r);
    return counts.map((n, i) => {
      const q = qs[i % qs.length];
      return { phase: "main", is_bonus: false, condition: `choices_${n}`, option_count: n, question_id: q.question_id, question_text: q.question[S.lang], options: q.options[S.lang].slice(0, n) };
    });
  }
  function bonusQueue() {
    const opts = window.QUESTIONS.bonus.members[S.lang];
    return window.QUESTIONS.bonus.questions.map((q) => ({ phase: "bonus", is_bonus: true, condition: `bonus_${opts.length}`, option_count: opts.length, question_id: q.question_id, question_text: q.text[S.lang], options: opts }));
  }

  function start() {
    S.lang = $("language-select").value; applyLang();
    S.id = $("participant-id").value.trim();
    if (!S.id) { $("start-error").textContent = txt("startError"); return; }
    S.type = getType(S.id); S.sid = `${S.id}-${Date.now()}`; S.sessionStart = performance.now(); S.rows = [];
    S.queue = mainQueue(); S.bonus = bonusQueue(); S.idx = 0; $("start-error").textContent = ""; show("instruction-screen");
  }
  function beginMain() { S.idx = 0; render(S.queue[0], 1, S.queue.length); }
  function render(trial, i, total) {
    S.current = trial; S.selected = null;
    $("progress").textContent = trial.phase === "bonus" ? `Bonus ${i} / ${total}` : `Main task ${i} / ${total}`;
    $("question-text").textContent = trial.question_text;
    $("option-list").innerHTML = "";
    trial.options.forEach((op) => { const b = document.createElement("button"); b.className = "option-button"; b.textContent = op; b.onclick = () => choose(op); $("option-list").appendChild(b); });
    show("trial-screen"); requestAnimationFrame(() => { S.startMs = performance.now(); });
  }
  function choose(op) {
    const end = performance.now();
    S.selected = { selected_option: op, trial_start_time: new Date(Date.now() - (performance.now() - S.startMs)).toISOString(), selected_time: new Date().toISOString(), reaction_time_ms: Math.round(end - S.startMs) };
    if (S.current.phase === "bonus") { save(null, null, null); nextBonus(); } else renderRatings();
  }
  function renderRatings() {
    $("rating-progress").textContent = `Rating ${S.idx + 1} / ${S.queue.length}`;
    $("rating-error").textContent = ""; $("rating-form").innerHTML = "";
    ["satisfaction", "difficulty", "confidence"].forEach((name) => {
      const fs = document.createElement("fieldset"); fs.className = "rating-group";
      fs.innerHTML = `<legend>${txt("ratings")[name]}</legend><div class="rating-options">${[1,2,3,4,5,6,7].map((v) => `<label><input type="radio" name="${name}" value="${v}"><span>${v}</span></label>`).join("")}</div>`;
      $("rating-form").appendChild(fs);
    });
    show("rating-screen");
  }
  function rating(name) { const el = document.querySelector(`input[name="${name}"]:checked`); return el ? Number(el.value) : null; }
  function nextRating() {
    const a = rating("satisfaction"), b = rating("difficulty"), c = rating("confidence");
    if (!a || !b || !c) { $("rating-error").textContent = txt("ratingError"); return; }
    save(a, b, c); S.idx++;
    if (S.idx < S.queue.length) render(S.queue[S.idx], S.idx + 1, S.queue.length);
    else if (S.type === "T" || S.type === "TEST") { S.idx = 0; show("bonus-intro-screen"); }
    else submit();
  }
  function save(satisfaction, difficulty, confidence) {
    const now = new Date().toISOString(); const total = Math.round(performance.now() - S.sessionStart);
    S.rows.push({ participant_id: S.id, participant_type: S.type, language: S.lang, session_id: S.sid, trial_id: S.rows.length + 1, phase: S.current.phase, is_bonus: S.current.is_bonus, condition: S.current.condition, option_count: S.current.option_count, question_id: S.current.question_id, question_text: S.current.question_text, options_json: JSON.stringify(S.current.options), selected_option: S.selected.selected_option, trial_start_time: S.selected.trial_start_time, selected_time: S.selected.selected_time, reaction_time_ms: S.selected.reaction_time_ms, satisfaction, difficulty, confidence, user_agent: navigator.userAgent, screen_width: screen.width, screen_height: screen.height, created_at: now, session_start_time: new Date(Date.now() - total).toISOString(), session_end_time: now, total_time_ms: total });
  }
  function beginBonus() { S.idx = 0; render(S.bonus[0], 1, S.bonus.length); }
  function nextBonus() { S.idx++; if (S.idx < S.bonus.length) render(S.bonus[S.idx], S.idx + 1, S.bonus.length); else submit(); }
  async function submit() {
    show("submit-screen"); $("submit-title").textContent = txt("sending"); $("submit-message").textContent = ""; $("fallback-area").classList.add("hidden");
    const payload = JSON.stringify(S.rows, null, 2); const url = window.CONFIG?.GAS_WEB_APP_URL || "";
    if (!url || url.includes("PASTE_YOUR")) { fallback(payload); return; }
    try { await fetch(url, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: payload }); $("submit-title").textContent = txt("successTitle"); $("submit-message").textContent = txt("successMessage"); }
    catch { fallback(payload); }
  }
  function fallback(payload) { $("submit-title").textContent = txt("failTitle"); $("submit-message").textContent = txt("failMessage"); $("payload-output").value = payload; $("fallback-area").classList.remove("hidden"); }
  function copyJson() { $("payload-output").select(); document.execCommand("copy"); }
  function downloadJson() { const a = document.createElement("a"); a.href = "data:application/json;charset=utf-8," + encodeURIComponent($("payload-output").value); a.download = `${S.id || "participant"}.json`; a.click(); }

  $("language-select").onchange = (e) => { S.lang = e.target.value; applyLang(); };
  $("start-button").onclick = start; $("begin-button").onclick = beginMain; $("next-button").onclick = nextRating; $("bonus-start-button").onclick = beginBonus; $("copy-json-button").onclick = copyJson; $("download-json-button").onclick = downloadJson;
  applyLang();
})();
