# AnswerBestFriends

A bilingual (Japanese / English) static web app for a small HCI experiment based on **Hick's Law**.

## Project overview

AnswerBestFriends presents participants with a choice-selection task. The number of choices (2, 4, or 8) is varied across three trials. Decision time and subjective ratings are recorded in each trial. All data is sent to a Google Apps Script endpoint or, if that is unavailable, shown as a JSON fallback for manual collection.

## Experiment purpose

**Research theme:**

> The effect of choice count in an AI recommendation-style UI on decision time and subjective evaluation — an application of Hick's Law to AI agent interfaces.

**Hick's Law:**

```
RT = a + b · log₂(n + 1)
```

Where `n` is the number of choices and `RT` is reaction time. The hypothesis is that `reaction_time_ms` increases logarithmically as `option_count` increases.

## Participant ID rules

| ID prefix | Type | Description |
|-----------|------|-------------|
| `P001`, `P002`, … | `P` | Normal participants — main experiment only |
| `T001`, `T002`, … | `T` | Friend participants — main experiment **plus** bonus questions |
| `TEST001`, `TEST002`, … | `TEST` | Test runs — excluded from final analysis |
| Anything else | `OTHER` | Accepted but treated as undefined |

### How to confirm P / T / TEST classification

Open browser DevTools → Console before starting, or check the downloaded JSON after the run:

```json
{ "participant_type": "P" }    // P001 → P
{ "participant_type": "T" }    // T001 → T
{ "participant_type": "TEST" } // TEST001 → TEST
```

- **P**: submit screen is reached after 3 main trials; no bonus questions appear.
- **T**: bonus intro screen appears after 3 main trials; 5 bonus questions follow.
- **TEST**: same flow as T (main + bonus). Rows are excluded from analysis by filtering `participant_type != "TEST"`.

## Main vs bonus data separation

Each row contains `phase` and `is_bonus` fields.

| Row type | `phase` | `is_bonus` |
|----------|---------|------------|
| Main experiment | `"main"` | `false` |
| Bonus question | `"bonus"` | `true` |

**Main analysis filter:**

```
phase == "main"
is_bonus == false
participant_type != "TEST"
```

Bonus data is for fun and lab presentation only. Do not include it in the Hick's Law regression or subjective rating analysis.

## Timing

`reaction_time_ms` measures **from when the choices become visible to when the participant clicks one choice**. The timer starts in a `requestAnimationFrame` callback immediately after the choice screen is displayed, and stops at the moment the click event fires. Rating screen time is captured and saved after `reaction_time_ms` is already stored, so it does not contaminate the decision-time measurement.

## Independent variable

- `option_count`: 2, 4, or 8 choices

Condition order is pseudo-randomized per participant ID using a deterministic hash, so the same ID always produces the same order.

## Dependent variables

- `reaction_time_ms` — decision time in milliseconds
- `satisfaction` — post-choice satisfaction (1–7 Likert)
- `difficulty` — perceived difficulty (1–7 Likert)
- `confidence` — confidence in choice (1–7 Likert)

Bonus rows have `satisfaction`, `difficulty`, and `confidence` set to `null`.

## Local testing

Run a local server (required to avoid CORS issues with `fetch`):

```bash
cd /path/to/AnswerBestFriends
python3 -m http.server 8000
```

Then open:

```
http://localhost:8000
```

### Test cases

**Test A — P001 / 日本語**

1. Enter `P001`, select 日本語, click 開始.
2. 3 main trials appear; each is followed by satisfaction / difficulty / confidence ratings.
3. After trial 3, no bonus screen — submit screen appears directly.
4. Because `config.js` has the placeholder URL, JSON fallback appears.
5. All rows have `phase: "main"`, `is_bonus: false`, `participant_type: "P"`. Exactly 3 rows.

**Test B — T001 / English**

1. Enter `T001`, select English, click Start.
2. 3 main trials in English.
3. Bonus intro screen appears after trial 3.
4. 5 bonus questions follow.
5. JSON contains main rows (`phase: "main"`, `is_bonus: false`) and bonus rows (`phase: "bonus"`, `is_bonus: true`). Total 8 rows.

**Test C — TEST001 / 日本語**

1. Enter `TEST001`, 日本語, 開始.
2. Main + bonus flow (same as T).
3. All rows have `participant_type: "TEST"`.
4. These rows can be excluded from analysis by filtering `participant_type != "TEST"`.

## GAS URL未設定時のJSON fallback

When `config.js` still contains the placeholder URL (`PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE`), the app detects it and skips the network call. The submit screen shows:

- A failure message in the participant's language.
- A textarea with the full JSON payload.
- **JSONをコピー** / **Copy JSON** button.
- **JSONをダウンロード** / **Download JSON** button (downloads `{participantId}.json`).

This fallback also activates if the network call throws an error (e.g. CORS rejection before GAS is configured).

## Data columns

Each trial row contains these fields:

| Column | Description |
|--------|-------------|
| `participant_id` | Raw ID entered by participant |
| `participant_type` | P / T / TEST / OTHER |
| `language` | ja / en |
| `session_id` | `{id}-{timestamp}` |
| `trial_id` | Sequential number within session |
| `phase` | main / bonus |
| `is_bonus` | false / true |
| `condition` | choices_2 / choices_4 / choices_8 / bonus_8 |
| `option_count` | Number of options shown |
| `question_id` | Identifier for the question |
| `question_text` | Displayed question text |
| `options_json` | JSON array of shown options |
| `selected_option` | The option the participant chose |
| `trial_start_time` | ISO timestamp when choices became visible |
| `selected_time` | ISO timestamp of click |
| `reaction_time_ms` | Decision time in ms |
| `satisfaction` | 1–7 (null for bonus) |
| `difficulty` | 1–7 (null for bonus) |
| `confidence` | 1–7 (null for bonus) |
| `user_agent` | Browser user agent |
| `screen_width` | Screen width in px |
| `screen_height` | Screen height in px |
| `created_at` | ISO timestamp when row was saved |
| `session_start_time` | ISO timestamp of session start |
| `session_end_time` | ISO timestamp of final save |
| `total_time_ms` | Total elapsed session time in ms |

## Analysis notes

Filter rows before analysis:

```
phase == "main"
is_bonus == false
participant_type != "TEST"
```

Suggested steps:

1. Compare mean `reaction_time_ms` across `choices_2`, `choices_4`, `choices_8`.
2. Compare mean `difficulty`, `satisfaction`, `confidence` across conditions.
3. Fit or plot `reaction_time_ms` against `log₂(option_count + 1)` to visualize Hick's Law.
4. Because the sample size is small, report as a pilot experiment and describe trends descriptively.

## GitHub Pages deployment

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Branch: `main`, folder: `/ (root)`.
5. Click **Save**.

Expected URL after a few minutes:

```
https://powmel.github.io/AnswerBestFriends/
```

The `.nojekyll` file in the root ensures GitHub Pages does not process the site through Jekyll. All assets use relative paths, so the site works both locally and on GitHub Pages without changes.

## Google Apps Script setup

Do this **after** GitHub Pages is confirmed working.

1. Create a new Google Spreadsheet (any name).
2. Open **Extensions → Apps Script**.
3. Delete the default `myFunction` code.
4. Paste the entire contents of `gas/Code.gs`.
5. Save (Ctrl+S or Cmd+S).
6. Click **Deploy → New deployment**.
7. Type: **Web app**.
8. Execute as: **Me**.
9. Who has access: **Anyone**.
10. Click **Deploy**.
11. Copy the Web App URL — it ends with `/exec`.
12. Open `config.js` and replace `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with that URL.
13. Commit and push the updated `config.js`.

```js
// config.js after setup
window.CONFIG = {
  GAS_WEB_APP_URL: "https://script.google.com/macros/s/YOUR_ID/exec"
};
```

To verify the endpoint, open the `/exec` URL in a browser — you should see:
```json
{"success":true,"message":"AnswerBestFriends GAS endpoint is running."}
```

Data is appended to a sheet named `responses` in the spreadsheet. Headers are created automatically on the first submission.

## Pre-experiment checklist

Before starting data collection, confirm the following:

- [ ] GitHub Pages URL loads correctly: `https://powmel.github.io/AnswerBestFriends/`
- [ ] `config.js` has the real GAS Web App URL (not the placeholder)
- [ ] GAS `/exec` URL returns `{"success":true,...}` in browser
- [ ] Test run with `TEST001` completes and data appears in the Google Sheet
- [ ] P001 flow: 3 main trials → submit, no bonus
- [ ] T001 flow: 3 main trials → bonus intro → 5 bonus questions → submit
- [ ] JSON fallback still works if `config.js` URL is reverted to placeholder
- [ ] Bonus member names in `questions.js` match actual participants (update `メンバーA`–`メンバーH` if needed)
- [ ] Participant IDs for the study are distributed (P001–P0XX for main, T001–T0XX for friends)
