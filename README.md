# AnswerBestFriends - Hick's Law HCI Experiment Site (Block-Based Design)

This repository contains a static web application and Google Apps Script backend designed for a human-computer interaction (HCI) experiment investigating the applicability of Hick's Law to AI recommendation user interfaces using a block-based design.

---

## 1. Project Overview

This project is created for the course assignment "Advanced Human Interface I" (ヒューマンインタフェース特論I).
*   **Research Title**: Impact of Choice Set Size on Decision-Making Time and Subjective Evaluation in AI Recommendation UIs: Applying Hick's Law to AI Agent Interfaces.
*   **Objective**: Measure how the number of choices ($n=2, 4, 8$) presented by an AI assistant affects user reaction time, choice satisfaction, decision difficulty, and choice confidence using a block-based experiment design to reduce participant cognitive fatigue.

---

## 2. Experiment Design (Block-Based)

To improve data validity and mitigate cognitive load, the experiment is partitioned into blocks:

1.  **Warm-up/Filler Block**:
    *   **2 trials** are presented at the very beginning to let participants adapt to the selection interface and hide the exact independent variable set sizes.
    *   Rating surveys are completely skipped during this warm-up phase.
    *   Marked with `phase = "filler"`, `is_filler = true`, `is_bonus = false`. Excluded from main analysis.
2.  **Main Experiment Blocks**:
    *   Presented in a fixed order to ensure system stability:
        1.  **2-Choices Block** (`block_2`): 5 trials.
        2.  **4-Choices Block** (`block_4`): 5 trials.
        3.  **8-Choices Block** (`block_8`): 5 trials.
    *   **Total Main Trials**: 15.
    *   **Reaction Time ($RT$)**: Measured for each individual trial (from options rendering to selection click).
    *   **Subjective Rating**: satisfaction, difficulty, and confidence are evaluated **once at the end of each block** rather than after every question.
    *   **Rating Mapping**: The subjective scores entered at the end of a block are automatically mapped to all 5 trials within that block for analysis.
3.  **Bonus Block (余興)**:
    *   Presented for friend participants (`T` prefix) or test runs (`TEST` prefix).
    *   **5 trials** of acquaintance questions. Ratings are completely skipped.
    *   Marked with `phase = "bonus"`, `is_bonus = true`, `is_filler = false`. Excluded from main analysis.

---

## 3. Participant ID Rules

The site classifies participants using prefixes to split research data:

*   **`P` prefix** (e.g., `P001`): Regular participant. They go through the **Filler + 3 Main blocks (17 trials total)**.
*   **`T` prefix** (e.g., `T001`): Acquaintance/friend participant. They go through the **Filler + 3 Main blocks + Bonus block (22 trials total)**.
*   **`TEST` prefix** (e.g., `TEST001`): Testing run. Excluded from analysis.
*   **Other inputs**: Evaluated as `OTHER`.

---

## 4. Data Columns

Every trial logs a record containing the following columns:

| Column | Type | Description |
|---|---|---|
| `participant_id` | String | User-entered identifier |
| `participant_type` | String | `P`, `T`, `TEST`, or `OTHER` |
| `language` | String | `ja` or `en` |
| `session_id` | String | Session UUID |
| `trial_id` | Integer | Trial index in current session (1 to 17 or 22) |
| `phase` | String | `filler`, `main`, or `bonus` |
| `is_bonus` | Boolean | `true` for bonus trials, `false` otherwise |
| `condition` | String | `choices_2`, `choices_4`, `choices_8`, `filler`, or `bonus` |
| `option_count` | Integer | Number of choices displayed |
| `question_id` | String | Question identifier (e.g., `food`, `filler_vibe`) |
| `question_text` | String | Question string shown to user |
| `options_json` | String | JSON list of choices rendered |
| `selected_option` | String | Selected option value |
| `trial_start_time` | String | ISO Timestamp when choices rendered |
| `selected_time` | String | ISO Timestamp when option clicked |
| `reaction_time_ms` | Integer | `selected_time - trial_start_time` (precision timed) |
| `satisfaction` | Integer / Null | 1-7 Likert rating (copied across block trials; null for filler/bonus) |
| `difficulty` | Integer / Null | 1-7 Likert rating (copied across block trials; null for filler/bonus) |
| `confidence` | Integer / Null | 1-7 Likert rating (copied across block trials; null for filler/bonus) |
| `block_id` | String | Block identifier (`block_2`, `block_4`, `block_8`, `filler`, `bonus`) |
| `block_index` | Integer / Null | 1-based block sequence index (1, 2, 3) |
| `trial_in_block` | Integer / Null | Trial index inside block (1 to 5) |
| `block_option_count`| Integer / Null | Set size condition for the block (2, 4, 8) |
| `rating_scope` | String | Scope of questionnaire (`"block"` or `"none"`) |
| `is_filler` | Boolean | `true` for warm-ups, `false` otherwise |
| `user_agent` | String | Browser User-Agent string |
| `screen_width` | Integer | Window inner width |
| `screen_height` | Integer | Window inner height |
| `created_at` | String | ISO timestamp string |
| `session_start_time`| String | ISO timestamp when start button was pressed |
| `session_end_time` | String | ISO timestamp when submission started |
| `total_time_ms` | Integer | Total session duration |

---

## 5. Local Testing

1.  Double-click `index.html` to open it in a web browser.
2.  Open Developer Tools (F12 or Cmd+Option+I) to inspect console statements.
3.  Test using `TEST001`, `P001`, or `T001` credentials.

---

## 6. Google Apps Script Setup

1.  Open your browser and navigate to [Google Sheets](https://sheets.google.com).
2.  Create a blank spreadsheet.
3.  In the top menu, select **Extensions** > **Apps Script**.
4.  Replace the default code with the contents of [gas/Code.gs](file:///Users/taiki/Documents/筑波/ヒューマンインターフェース特論/AnswerBestFriends/gas/Code.gs).
5.  Click Save, then **Deploy** > **New deployment**.
6.  Select type **Web app**. Set:
    *   **Execute as**: `Me`
    *   **Who has access**: `Anyone`
7.  Deploy and authorize permissions. Copy the **Web app URL**.
8.  Open [config.js](file:///Users/taiki/Documents/筑波/ヒューマンインターフェース特論/AnswerBestFriends/config.js) and paste the URL:
    ```javascript
    const CONFIG = {
      GAS_WEB_APP_URL: "https://script.google.com/macros/s/.../exec"
    };
    ```

---

## 7. Analysis filtration guidelines

When performing regression and statistical modeling:
*   **Target Population**: Exclude rows where `participant_type == "TEST"`.
*   **Target Trials**: Query rows that represent true main experiment trials:
    *   `phase == "main"`
    *   `is_filler == false`
    *   `is_bonus == false`
*   **Excluded blocks**: Filter out rows belonging to `phase == "filler"` (warm-ups) and `phase == "bonus"` (acquaintance questions).
*   **Independent Variable**: Use `block_option_count` (2, 4, or 8) or `option_count`.
*   **Dependent Variables**: `reaction_time_ms`, `satisfaction`, `difficulty`, `confidence`.
*   **Control Variables**: You can inspect `block_index` or `trial_in_block` to analyze learning effects or participant fatigue.
