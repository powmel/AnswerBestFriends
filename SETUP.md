# AnswerBestFriends setup

A bilingual static web app for a small HCI experiment based on Hick's Law.

## Purpose

This project collects data for a university class report on whether the number of choices in an AI recommendation-style UI affects decision time and subjective ratings.

Research theme:

> The effect of choice count in AI recommendation UI on decision time and subjective evaluation: an application of Hick's Law to AI agent interfaces.

Hick's Law:

```text
RT = a + b log2(n + 1)
```

## Experiment design

Independent variable:

- Number of choices: 2, 4, 8

Dependent variables:

- `reaction_time_ms`
- `satisfaction`
- `difficulty`
- `confidence`

Each participant completes all three main conditions. Condition order is pseudo-randomized by participant ID.

## Participant IDs

- `P001`, `P002`, ...: normal participants, main experiment only
- `T001`, `T002`, ...: friend participants, main experiment plus bonus questions
- `TEST001`, ...: testing data, exclude from final analysis
- Other IDs: accepted as `OTHER`

Main analysis should use only:

```text
phase = main
is_bonus = false
participant_type != TEST
```

Bonus data is for fun and presentation only. Do not use it in the main analysis.

## Local testing

Open `index.html` directly in a browser, or run a local server:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Test these IDs:

- `P001`: main experiment only
- `T001`: main experiment + bonus questions
- `TEST001`: test participant

With `config.js` still using the placeholder URL, submission will intentionally fail and show a JSON fallback. This is expected and useful for verifying the payload.

## GitHub Pages deployment

1. Open GitHub repository settings.
2. Go to **Pages**.
3. Select **Deploy from a branch**.
4. Branch: `main`, folder: `/ (root)`.
5. Save.

Expected URL:

```text
https://powmel.github.io/AnswerBestFriends/
```

## Google Apps Script setup

1. Create a new Google Spreadsheet.
2. Open **Extensions > Apps Script**.
3. Paste the contents of `gas/Code.gs`.
4. Save.
5. Deploy as **Web app**.
6. Execute as: **Me**.
7. Access: **Anyone**.
8. Copy the Web App URL ending with `/exec`.
9. Paste it into `config.js` as `GAS_WEB_APP_URL`.
10. Commit and push the updated `config.js`.

## Data columns

Each trial row contains:

- `participant_id`
- `participant_type`
- `language`
- `session_id`
- `trial_id`
- `phase`
- `is_bonus`
- `condition`
- `option_count`
- `question_id`
- `question_text`
- `options_json`
- `selected_option`
- `trial_start_time`
- `selected_time`
- `reaction_time_ms`
- `satisfaction`
- `difficulty`
- `confidence`
- `user_agent`
- `screen_width`
- `screen_height`
- `created_at`
- `session_start_time`
- `session_end_time`
- `total_time_ms`

## Analysis notes

Analyze only rows where:

```text
phase == "main"
is_bonus == false
participant_type != "TEST"
```

Suggested analysis:

- Compare average `reaction_time_ms` across `choices_2`, `choices_4`, and `choices_8`.
- Compare average `difficulty`, `satisfaction`, and `confidence` across conditions.
- Plot `log2(option_count + 1)` against `reaction_time_ms`.
- Because the sample size is likely small, describe the result as a small-scale or pilot experiment.

## Why the main experiment does not use images

The main experiment uses text-only choices. Images can introduce additional noise from visual attractiveness, information amount, and cultural interpretation. Since the main variable is the number of choices, text-only options keep the experiment simpler and cleaner.
