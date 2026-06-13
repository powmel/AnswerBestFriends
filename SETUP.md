# AnswerBestFriends setup

A bilingual static web app for a small HCI experiment based on Hick's Law, revised with a block-based design and aligned question categories.

## Purpose

This project collects data for a university class report on whether the number of choices in an AI recommendation-style UI affects decision time and subjective ratings.

Research theme:

> The effect of choice count in AI recommendation UI on decision time and subjective evaluation: an application of Hick's Law to AI agent interfaces.

Hick's Law:

```text
RT = a + b log2(n + 1)
```

## Experiment design (Aligned Block-based)

Independent variable:

- Number of choices: 2, 4, 8

Dependent variables:

- `reaction_time_ms`
- `satisfaction` (1-7 Likert rating, collected once per block and mapped to all trials in that block)
- `difficulty` (1-7 Likert rating, collected once per block and mapped to all trials in that block)
- `confidence` (1-7 Likert rating, collected once per block and mapped to all trials in that block)

### Flow:

1.  **Filler Block**: 2 warm-up trials to hide experiment intent (ratings skipped).
2.  **Main Block 1**: 2-choices $\times$ 5 trials, then block rating.
3.  **Main Block 2**: 4-choices $\times$ 5 trials, then block rating.
4.  **Main Block 3**: 8-choices $\times$ 5 trials, then block rating.

Total main experiment trials: 15.

### Aligned Question Categories:
To control for content bias, the same 5 question categories are used in all 3 blocks:
*   `food`
*   `weekend_place`
*   `ai_app`
*   `study_place`
*   `travel_style`

Within each block, these 5 categories are shuffled using the participant ID seed.

### Experimental Limitations:
*   **Learning/Repetition Effects**: Since the same 5 categories are repeated in each block, participants may become familiar with the questions, potentially reducing reaction times in later blocks.
*   **Fatigue/Order Effects**: Because conditions are presented in a fixed order ($2 \rightarrow 4 \rightarrow 8$), participant fatigue or familiarity with the UI could affect results in the later blocks.

## Participant IDs

- `P001`, `P002`, ...: normal participants, main experiment only (17 trials)
- `T001`, `T002`, ...: friend participants, main experiment plus bonus questions (22 trials total: 17 main/filler + 5 bonus)
- `T006`: Hugo himself (English, custom bonus questions about message to everyone and Tsukuba/Japan memories)
- `TEST001`, ...: testing data, exclude from final analysis (includes bonus phase)
- Other IDs: accepted as `OTHER`

### Bonus Block Questions (T / TEST only)
1.  **AI时代**: Choice from 8 acquaintance member cards (grid layout with cover images and name tags).
2.  **Leader**: Choice from 8 acquaintance member cards.
3.  **Researcher**: Choice from 8 acquaintance member cards.
4.  **Message**: Free-text textarea (Message to Hugo; or message to everyone if T006).
5.  **Memories**: Free-text textarea (Memories with Hugo; or memories of Tsukuba/Japan/friends if T006).

Main analysis should use only:

```text
phase == "main"
is_bonus == false
is_filler == false
participant_type != "TEST"
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

- `P001`: main experiment only (17 trials total)
- `T001`: main experiment + bonus questions (22 trials total)
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
- `block_id`
- `block_index`
- `trial_in_block`
- `block_option_count`
- `rating_scope`
- `is_filler`
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
is_filler == false
participant_type != "TEST"
```

Suggested analysis:

- Compare average `reaction_time_ms` across `choices_2`, `choices_4`, and `choices_8`.
- Compare average `difficulty`, `satisfaction`, and `confidence` across conditions (since ratings are evaluated per block, they are identical for the 5 trials in each block).
- Plot `log2(option_count + 1)` against `reaction_time_ms`.
- Describe the result as a pilot experiment.
