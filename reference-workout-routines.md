# Reference: Workout Routines

Not loaded automatically — read only when needed for Fitness data-model or feature discussions.

## Frequency

2–3 workout sessions per week. Average session duration: ~40 minutes.

## Rep/Series Convention

Average 8 reps per series, but varies (6, 8, or 12) depending on the exercise and weight used.

## Current Routine Templates

Three named routines in regular rotation:

### 1. Legs and Shoulders
1. Warm up the joints
2. 10 series of legs exercises
3. 5 series of shoulders exercises
4. Stretch the muscles

### 2. Back and Triceps
1. Warm up the joints
2. Core: 1 plank, 2 side planks, 1 low-back calisthenics exercise (Dr. McGill's "Big 3" — used due to a low-back issue, including a disc protrusion)
3. 10 series of back exercises
4. 2 series of triceps exercises
5. Stretch the muscles

### 3. Chest and Biceps
1. Warm up the joints
2. Core: 1 plank, 2 side planks, 1 low-back calisthenics exercise (same McGill Big 3 as above, same low-back reason)
3. 10 series of chest exercises
4. 2 series of biceps exercises
5. Stretch the muscles

## Open-Ended Routines

Not limited to the three templates above — other session types (e.g. yoga, swimming) happen occasionally and should be logged as their own distinct entries rather than forced into one of the templates.

## Weight Tracking

Body weight is the one metric Borislav wants to track for now, tracked separately from individual workout sessions (not one entry per session — a periodic log over time). No other body metrics (e.g. body fat %, measurements) are being tracked yet — deliberately kept simple for MVP.

- Current weight (2026-08-20): 77 kg
- Goal: 80 kg, via muscle building rather than general weight gain — so the trend direction being tracked is "gain," and the goal is a target number rather than a rate
- Logging cadence: weight measured ~once per month

## Data Entry Cadence

- Weight: entered ~monthly (see above)
- Workout sessions: entered on a weekly basis — Borislav logs the week's training sessions in a batch rather than immediately after each one. Implies a weekly entry/review flow (e.g. "log this week's sessions") matters at least as much as a same-day logger for Fitness.

## Observations for BSA Life Driver Design

- Borislav wants to log a session by naming the routine (e.g. "legs and shoulders") and have the app already know its typical structure/volume, rather than re-entering exercises each time — implies named, reusable routine templates rather than free-form entry per session.
- Template volume (series/reps counts) will change over time as training progresses. Editing a template must not rewrite the historical record of past sessions — implies template versioning or snapshotting the volume actually performed at log time, so progress can still be tracked accurately.
- A typed entry that doesn't match a known template (e.g. "swimming") should be recognized as a different, ad-hoc session type rather than an error — implies the routine field is open vocabulary, not a fixed enum.
- The low-back "Big 3" (plank, side planks, McGill low-back exercise) recurs identically across two of the three routines and is tied to a specific health condition (disc protrusion) — worth keeping visible as its own consistent block, not folded generically into "core work," in case future AI analysis around the low-back issue is useful.

## Status

Living reference — expected to grow as more routine types (yoga, swimming, etc.) are added.
