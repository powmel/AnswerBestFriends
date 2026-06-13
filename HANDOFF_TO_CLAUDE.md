# Handoff to Claude: UI Bug Fixes & Layout Optimization

This document outlines the current state, recent changes, unresolved bugs, reproduction steps, and required fixes for **AnswerBestFriends** to guide Claude Code in completing the UI fixes.

---

## 1. Project Overview
* **Objective**: A bilingual (Japanese/English) static web application for a small HCI usability experiment based on Hick's Law. It studies whether the number of recommendation choices (2, 4, 8) affects a user's decision time (`reaction_time_ms`) and subjective ratings (satisfaction, difficulty, confidence).
* **Structure**:
  * **Filler Phase**: 2 warm-up trials to hide experiment intent (ratings skipped).
  * **Main Experiment Phase**: 15 trials total, divided into 3 blocks (2-choices, 4-choices, 8-choices). Each block consists of 5 trials (4 common categories + 1 block-specific special category) followed by a 1-7 Likert scale rating form evaluating the entire block.
  * **Bonus Phase**: A fun addition triggered only for certain participant types (`T` and `TEST`) consisting of 5 questions.
* **Participant Types**:
  * `P001`, `P002`... (`P`): Normal participants. Main experiment only (17 total trials).
  * `T001`, `T002`... (`T`): Acquaintance participants. Main experiment + 5 bonus trials (22 total trials).
  * `T006`: Hugo himself (triggers custom English/Japanese prompts in the bonus phase).
  * `TEST001`... (`TEST`): Test participant. Excluded from final analysis.
  * Empty Input (`ANON`): Anonymous participant. Generates `ANON-[timestamp]-[random]` (17 total trials).
  * Nicknames / Words (`PUBLIC`): Public participant. Generates `PUBLIC-[timestamp]-[random]` (17 total trials).
* **Data Submission**: Data is submitted via Google Apps Script (GAS) to a Google Spreadsheet. If the script URL is not configured or fails, it falls back to displaying a JSON copy/download box (`#fallback-area`).

---

## 2. Current Experiment Flow
* **ANON / PUBLIC / P**: 17 rows/trials total (2 fillers + 15 main trials, no bonus phase).
* **T / TEST**: 22 rows/trials total (2 fillers + 15 main trials + 5 bonus trials).
* **Bonus Trials (5 Questions)**:
  * **Trials 1–3 (`member_card`)**: Friend acquaintance selection. Displays 8 member cards in a compact grid containing cropped square photos and names.
  * **Trials 4–5 (`text`)**: Free-text textarea (Messages and memories for Hugo, or Hugo's messages for friends if `T006`).

---

## 3. Current Real-Device Rendering Issues (Bugs)
Despite the automated tests passing, real-device and GitHub Pages testing (especially after caching issues are bypassed) reveal critical visual layout bugs:
1. **Acquaintance cards rendering in 2-columns (Not 4x2)**: The 8 member cards render in a 2-column grid layout, making them very tall and overflowing the screen height. They must fit in a single screen without scrolling on mobile.
2. **Textarea displayed on acquaintance cards**: The free-text textarea incorrectly appears during trials 1-3 of the bonus phase (the acquaintance cards selection).
3. **Textarea displayed in main experiment trials**: In some cases, the textarea incorrectly shows up during normal multiple-choice main experiment questions.
4. **Playwright/Real-device mismatch**: Automated Playwright runs report success (they click elements and submit the form), but the actual visual rendering is broken.

---

## 4. Important Data Save Schema
The GAS transmission payload and the JSON fallback schema must **NOT** be broken or altered. The fields include:
* `phase`: `"filler"`, `"main"`, or `"bonus"`
* `is_bonus`: `true` (for bonus trials), `false` (otherwise)
* `is_filler`: `true` (for fillers), `false` (otherwise)
* `selected_option`: The clicked option string, or the textarea text input.
* `options_json`: JSON string of options (e.g. `["Pizza", "Sushi", ...]`, or `[]` for free text).
* `option_count`: Number of choices (e.g. `2`, `4`, `8`, or `0`/`1` for free text).
* `reaction_time_ms`: Click duration in milliseconds.
* `satisfaction`, `difficulty`, `confidence`: Likert scores (`1-7`), or `null` for filler and bonus trials.

---

## 5. Recent Changes Made
* **Image Assets added**: Placed 8 cropped, compressed member photos (`taiki.jpg`, `adrian.jpg`, `julyet.jpg`, `neo.jpg`, `shasenem.jpg`, `hugo.jpg`, `vanessa.jpg`, `daichi.jpg`) inside [assets/members/](file:///Users/taiki/Documents/筑波/ヒューマンインターフェース特論/AnswerBestFriends/assets/members/).
* **Image Processing script**: Created [scripts/prepare_member_images.py](file:///Users/taiki/Documents/筑波/ヒューマンインターフェース特論/AnswerBestFriends/scripts/prepare_member_images.py) to central-crop images to `512x512` squares and compress them to JPEG quality 80 (~24KB–40KB per image).
* **Explicit Question Types**: Modified [questions.js](file:///Users/taiki/Documents/筑波/ヒューマンインターフェース特論/AnswerBestFriends/questions.js) to mark trials 1–3 of the bonus questions as `type: "member_card"` and trials 4–5 as `type: "text"`.
* **CSS Specificity Override Fix**: Added `!important` to `.hidden { display: none !important; }` in [styles.css](file:///Users/taiki/Documents/筑波/ヒューマンインターフェース特論/AnswerBestFriends/styles.css) to prevent other classes (like `.text-input-area` and `.member-card-placeholder`) from bypassing the hidden attribute.
* **Layout Styles**: Added `.option-list.grid-bonus` and compact `.member-card` definitions to shrink paddings/margins for mobile fitting.
* **JavaScript Resets**: Implemented `resetTrialUI()` inside [app.js](file:///Users/taiki/Documents/筑波/ヒューマンインターフェース特論/AnswerBestFriends/app.js) to reset containers (`#option-list` and `#text-input-area`) and reset `free-text-input` values before rendering any trial.

---

## 6. Unsolved Bugs (To Be Fixed by Claude Code)
* **Bonus member cards layout**: The 8 cards are showing up in 2-columns (long list) instead of a 4x2 grid, forcing vertical scrollbars.
* **Textarea visibility leaks**: Textarea wraps leak into main trials and acquaintance card choice trials.
* **Playwright test vs. Visual rendering mismatch**: The test scripts pass, but the visual elements overlap/leak in the browser.

---

## 7. Claude Code Initial Diagnostics Checklist
Claude Code should check these points first:
1. **GitHub Pages Caching**: Check if the browser is loading stale CSS/JS from GitHub CDN. Query parameters like `?v=claude_check_1` must be used.
2. **Cache Busting in HTML**: Look at [index.html](file:///Users/taiki/Documents/筑波/ヒューマンインターフェース特論/AnswerBestFriends/index.html) to see if we should append version tags to `styles.css` and `app.js` (e.g. `href="styles.css?v=2"`).
3. **Textarea Display Branching**: Verify that in [app.js](file:///Users/taiki/Documents/筑波/ヒューマンインターフェース特論/AnswerBestFriends/app.js), during `renderTrial()` (for filler/main) and `renderBonusTrial()` (for cards 1-3), the textarea container `#text-input-area` has `.hidden` class correctly applied and is not overridden.
4. **CSS Grid overrides**: Verify why `.grid-bonus` is not producing a 4-column layout on the device. Check if `#option-list` contains style overrides, or if `.option-list.grid-bonus` is being bypassed or overridden by other CSS rules (like `.option-list` or mobile media queries).
5. **Scrollbar existence**: Assert if the card screen fits inside the viewport without triggering scroll events.
6. **Image URL Check**: Directly check if `https://powmel.github.io/AnswerBestFriends/assets/members/taiki.jpg` is online and resolves correctly (which it does, returning HTTP 200).

---

## 8. Reproduction Steps
To reproduce the issues on the live GitHub Pages deployment:
1. Open the URL: **`https://powmel.github.io/AnswerBestFriends/?v=claude_check_1`**
2. Choose a language and enter participant ID `T001`.
3. Proceed to the main blocks. Check if the textarea is visible in the main experiment (it should be hidden).
4. Complete the 15 trials and block ratings.
5. On the Bonus intro screen, click **"Start bonus" / "余興を開始する"**.
6. On the first 3 trials (Acquaintance selection):
   * Verify if images render.
   * Verify if the cards are arranged in a 4-column x 2-row grid (should not be a tall 2-column layout).
   * Verify if the textarea is hidden during this phase (should not be visible).
7. On the final 2 trials (4 & 5):
   * Verify if the textarea is visible and cards are hidden.

---

## 9. Required Final UI Specifications
* **Hiding the textarea**: Textarea MUST be completely invisible during all main trials, filler trials, and bonus trials 1-3.
* **Showing the textarea**: Textarea MUST only be visible on bonus trials 4 & 5.
* **Grid Layout**: Acquaintance cards must render as **4 columns × 2 rows** (`grid-template-columns: repeat(4, 1fr);`) in both desktop and mobile modes.
* **Scroll-free Selection**: Card sizing, margins, and image paddings must be optimized so the acquaintance choice phase fits comfortably in a single screen height on mobile viewports.
* **Cache Busting**: Implement version query parameters in `index.html` script/css tags if helpful.
* **No Schema Breaks**: Do not modify GAS script structures or column variables.

---

## 10. Verification & Test Requirements
* **Trial counts check**:
  * `P001` / `ANON` / `PUBLIC`: Must record exactly 17 trials. Textarea must never appear.
  * `T001` / `TEST001` / `T006`: Must record exactly 22 trials (17 main/filler + 5 bonus). Textarea must only appear on trials 21 and 22.
* **Live Deployment Validation**: Changes must be tested directly on the live GitHub Pages URL with a new query tag (e.g. `?v=claude_fix_1`) to bypass CDN caching. Playwright verification is required but not sufficient on its own.
* **Hugo prompt branch (`T006`)**: Keep Hugo's custom question prompts functional.

---

## 11. Advice for Claude Code
* The previous automated Playwright test `test_flow.js` completed successfully because it queried DOM selectors and triggered clicks, but it did not assert visual overlays or CSS grid columns. You should focus on CSS layout debugging, DOM class mutations, and cache invalidation.
* In some PDFs or browser screenshots, the cards layout is displayed as 2-columns overflowing the page height. You must rewrite the styling to guarantee a 4x2 layout.
