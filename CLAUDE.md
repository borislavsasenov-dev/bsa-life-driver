# BSA Life Driver

Last updated: 2026-08-25

## Project

**BSA Life Driver** — a personal system for organizing daily life, fitness, and professional growth, built for **Borislav Asenov**.

Borislav is a UX designer who is also learning marketing and wants to eventually offer clients a broader package including website design, SEO, marketing, and social media posts. This app is a separate personal project, not that client offering.

The app is initially private and personal, used only by Borislav, but may evolve into something larger later.

**Status:** Product-definition and technical-planning stage. No application files have been created yet.

## Product Idea

The app helps Borislav record activities and tasks, then eventually uses AI to analyze the collected information and suggest ways to:

- Improve health
- Move forward professionally
- Become more productive
- Gain more money

It should not just be a checklist like Todoist or Apple Reminders. Tasks and activities should become useful personal data that AI can analyze over time to identify patterns and help Borislav improve his health, skills, work, and income.

## MVP Divisions

**Three divisions for MVP:**

### 1. Fitness
Workouts, exercises, sets and repetitions, weights, workout progress, personal fitness goals. The only division with specialized fields for MVP — see Data Model Direction below.

### 2. Daily Life
Everything actionable, as a plain task (free-text title, status, notes, dates). Covers apartment cleaning, grocery shopping, errands, and other everyday responsibilities, plus — for MVP — Professional Growth and NOC work, tracked as categories rather than separate divisions. Categories:
- **Home** — apartment, groceries, repairs, general household
- **Car**
- **NOC** — Borislav's duty-officer day job at the National Operations Centre, DG Fire Safety and Civil Protection. Tasks are typically assigned by his chief officer (e.g. "prepare a wildfire presentation").
- **Work** — Professional Growth work: UX design, marketing/SEO learning, social media, client or partner projects, business development. Given by Borislav himself, a client, or a partner.

Professional Growth and NOC may become their own full divisions later, once there's enough data to know they need division-specific structure (e.g. specialized fields, separate views). Not needed for MVP.

### 3. Notebook
Personal reference material — not actionable, no status or due dates. Migrated from an existing external notebook (quotes, books, movies, websites, agency examples). Fields: **Name** (title/text), **Type** (tag — seeded with Quote, Books, Movies, Websites, Agencies, but open to new types as needed, same open-vocabulary approach as Fitness routines), **Notes** (free text). Purely for personal reference — not currently in scope for AI pattern-analysis (see Possible Future AI Insights).

## Possible Future AI Insights

Not decided yet — the MVP should first collect simple, useful, consistent data. Potential insights to explore later:

- Which tasks are frequently postponed
- Whether the workload is realistic
- Which habits correlate with better workout or work performance
- How much time is spent on client work versus learning
- Whether professional skills are becoming balanced
- Which activities contribute most to long-term goals
- Where energy and attention are being lost
- Whether weekly priorities match long-term ambitions

AI analysis can begin manually through exported data before being integrated directly into the app.

## Product Feel

A **calm personal planner with analytical depth**:

- Calm and easy enough for daily use
- Structured enough to support meaningful insights
- More personal than a business dashboard
- More intelligent than a basic checklist

The design can become more analytical as more data accumulates.

## UI Conventions

Established while implementing the MVP screens — apply these by default to any new screen or component, without re-asking. Structural patterns (spacing, button hierarchy, form layout, breakpoints) are adapted from the "Practical UI" community Figma kit Borislav shared, **recolored to this app's green accent instead of that kit's indigo** — see Decisions Log 2026-08-25.

- **Shared source of truth**: `app/(app)/ui.ts` exports `labelClass`, `inputClass`, `inputBaseClass` (same styling minus `w-full`, for controls that should size to their content — e.g. a filter `<select>` in a toolbar row; appending `w-auto` to `inputClass` does *not* work, since Tailwind resolves conflicting widths by stylesheet order, not class-string order), and a `buttonClass(variant, tone, size)` helper. Every form/button should build from these instead of hand-styled Tailwind strings, so a style change happens in one place. `app/(app)/date-field.tsx` is the shared date-picker component (see below) and `app/(app)/date-format.ts` the shared date formatter.
- **No shadows anywhere.** Flat surfaces only.
- **No borders on white card/box containers** (forms, list rows, the login card). The page background is gray (`bg-neutral-100`) and cards are white (`bg-white`) — that contrast alone is enough to separate them; an outer border is redundant. This does not apply to form inputs (which keep a visible border for affordance) or to semantically-colored states, e.g. an overdue task's red-tinted card keeps its border as a status accent.
- **Buttons are `rounded-lg`, not pill-shaped**, and match input height — `h-11` (medium, the default for a form's main submit button) or `h-9` (small). Exception: **filter/nav chips** (category filters, the division switcher) stay pill-shaped — that's a distinct "chip/segmented control" pattern, not an action button.
- **Button hierarchy** — `variant` × `tone` via `buttonClass()`: `primary` (filled, e.g. green "Log session"/"Add"/"Sign in"), `secondary` (outlined, not yet used but defined for future "Cancel"-style actions), `tertiary` (plain text, no box — used for Delete). `tone` is `brand` (green), `neutral` (dark gray), or `destructive` (red). Delete actions are always `tertiary` + `destructive`, colored red at rest (not just on hover) so the destructive intent is visible immediately.
- **Form fields**: a small label (`labelClass`) above the field, no placeholder text, height `h-11` via `inputClass`. Exception: a single always-visible quick-entry field (e.g. Daily Life's "Add a task..." bar) may keep a placeholder — that's a search-style pattern, not a detail-form field.
- **Date fields** use the shared `<DateField>` component: a custom-formatted button (`D MMM YYYY`, with a calendar icon) layered over a real `<input type="date">` that's invisible but still receives the click via `showPicker()` — this keeps the native OS calendar and today-as-default behavior while controlling the displayed text and box styling ourselves (native date inputs can't be restyled directly).
- **Secondary/meta text in list rows** (notes, dates, task meta) is `text-sm` (14px), not `text-xs` — `text-xs` is reserved for chrome: form labels, filter/nav chips, and small buttons.
- **Dates displayed to the user** are formatted as `D MMM YYYY` (e.g. `25 Aug 2026`), not raw ISO (`2026-08-25`), via `date-format.ts`. Format client-side by splitting the ISO string manually (not via `new Date(iso)` + `toLocaleDateString`), to avoid timezone-shift bugs on date-only values.
- **Dropdown/autocomplete menus** (e.g. the Fitness routine suggestions) are custom-built, not native `<datalist>` — native datalist popups follow OS dark/light mode and can't be restyled. Custom menus: white background, a visible chevron on the trigger field, green hover state on options, thin `ring-1 ring-neutral-200` for definition (no shadow).
- **Icons** come from Google's Material Symbols (Apache-2.0, free). Inline the official `<path>` data as a plain `<svg viewBox="0 -960 960 960" fill="currentColor">` directly in the component — not a font/CDN link and not an npm icon-library dependency — so the icon inherits Tailwind text color/hover states like any other element with zero runtime cost. Get path data by running `npm install @material-symbols/svg-400 --no-save`, copying the `<path>` from `node_modules/@material-symbols/svg-400/outlined/<icon_name>.svg`, then deleting the package — it's just a source to copy from, never a dependency.

## MVP Scope

- Three divisions: Fitness, Daily Life (categories: Home, Car, NOC, Work), and Notebook (see MVP Divisions)
- Add, edit, complete, and delete items
- Categories and priorities
- Due dates (optional per item — not every task needs a deadline)
- Recurring items
- In-app reminders: overdue/due-soon items are visually flagged in daily/weekly views (no push/desktop notifications for v1)
- Daily and weekly views
- Notes or results attached to completed items
- A basic progress summary
- CSV and JSON export

The first version should not attempt to fully build an AI coach, CRM, fitness tracker, marketing planner, and productivity system all at once.

## Minimum Daily/Weekly Workflow

- **Daily**: the main thing the app should surface is overdue items — not a strict "today's agenda," since most Daily Life tasks don't have due dates. Overdue flagging matters more than day-by-day scheduling.
- **Entry frequency is deliberately unscheduled**: Borislav may log data daily or as infrequently as twice a month, depending on the week — the app shouldn't force or nudge toward a fixed cadence. This applies across divisions (matches Fitness's flexible weekly-ish logging and Daily Life's ad-hoc task creation).
- **Navigation**: separate screens per division (Fitness / Daily Life / Notebook), moved between via a switcher control (e.g. tabs or a nav switch) rather than one combined cross-division view.

## MVP Screens

- **Login** — email/password, single user (Borislav only). The email field remembers the last address used, per browser, via `localStorage` (`app/login/email-input.tsx`), and focuses the password field when it finds one — so signing in is password-only after the first time. Deliberately not hard-coded or served from an env var: the repo is public and the login page is reachable by anyone with the deployed URL, so either would publish the address. Added once the app moved to a hosted Supabase backend — needed so the publishable API key (necessarily exposed in the browser bundle once deployed) doesn't grant open read/write access to the data; Row Level Security policies scope every table to the logged-in user's ID.
- **Daily Life** (default/landing screen after login) — task list, filterable by category (Home/Car/NOC/Work), add/edit task, overdue items flagged. No separate combined Home/Overview screen for v1 — the app opens directly here since it already surfaces overdue items.
- **Fitness** — a single screen with two sections: Workouts (weekly batch entry — pick routine, log volume — plus history) and Weight (monthly log plus trend toward goal).
- **Notebook** — list filterable by type (Quote/Books/Movies/Websites/Agencies), add/edit entry.
- **Export** — CSV download, per division (Daily Life / Fitness / Notes) plus one "Export All" that downloads all of them at once. Reached via a small "Export" link in the header, not the division switcher — it's a utility, not a content division. See Decisions Log 2026-08-25.

Navigation between the three content divisions is via a screen switcher (see Minimum Daily/Weekly Workflow), not a combined cross-division view.

## Data Model Direction

**Tasks plus structured activities.**

Daily errands can be stored as normal tasks, while workouts can have specialized fields. For example, a workout should not only be stored as "Complete workout" — useful details such as exercises, sets, repetitions, and weights are needed for future analysis.

This is preferable to treating everything as a generic task, while remaining simpler than a large system with separate tasks, habits, goals, and projects from the beginning.

For MVP, only Fitness has specialized fields (workout routine/volume, weight — see `reference-workout-routines.md`). Everything in Daily Life — including Home, Car, NOC, and Work categories — is a plain task: title, category tag, status, notes, dates. Specialized fields for any of those categories can be added later once it's clear what's actually useful to track.

Notebook is a third, simpler record shape: title, type tag, notes — no status, no dates. It's reference material, not a task or an activity, so it doesn't need completion tracking or scheduling at all.

## Database and Storage

The app should use a database, not a spreadsheet, as primary storage. A spreadsheet/CSV is useful for viewing, editing, downloading, and analyzing data, but a database reliably stores, searches, updates, and organizes records.

Expected data flow:

```text
User enters information in the app
        ->
App stores it in a database
        ->
User views and organizes it in the app
        ->
User exports it as CSV or JSON
        ->
User uploads the export to an AI tool for analysis
```

The app is the primary daily interface; CSV/JSON is an export format, not the main storage system.

## Technology Stack

**Decided:**

- **Frontend:** Next.js (React + TypeScript)
- **Styling:** Tailwind CSS
- **Backend/Database:** Supabase — hosted Postgres, authentication, automatic backups, a dashboard for inspecting data, and a foundation for future AI integrations
- **Deployment:** Vercel (free tier)

Chosen because Supabase's docs/client libraries target Next.js as the primary framework, it's a well-trodden stack for AI-assisted development (the app is expected to be implemented by coding agents, see Agent and Workflow Discussion), and it gives full control over the UI rather than working within a no-code tool's constraints — important given the "calm personal planner" design goal and the custom Fitness fields.

Not yet implemented — still in the planning stage. Device sync is not a v1 requirement since v1 is computer-only (see Decisions Log), but this stack supports it later without a rebuild.

**Cost:** Supabase's and Vercel's free tiers should be sufficient for a private MVP used by one person. Paid tiers may become necessary with many users, large files, heavy traffic, or production-level reliability needs. Data must remain exportable if the project stops using a paid service — CSV/JSON export and regular backups should be planned from the start.

## AI Analysis Approach

Initially manual:

1. Use BSA Life Driver normally.
2. Export the data as CSV or JSON.
3. Upload the export to ChatGPT, Claude, or another AI tool.
4. Ask the AI to identify patterns, problems, and recommendations.

Direct AI functionality inside the app can be considered later, after confirming the collected data is useful and consistently recorded.

## Agent and Workflow Discussion

**Decided: no manual multi-agent setup.** Borislav directs one Claude Code session conversationally — describes what to build, reviews the result, asks for changes. Claude Code may delegate specific sub-tasks to specialized subagents internally when useful (e.g. research), but that's automatic and not something Borislav needs to configure or orchestrate.

The earlier idea of separate Product/UX/UI/Engineering/Testing/Orchestrator agents was considered and dropped — that level of coordination overhead only pays off on a much larger, multi-person-scale project, not a solo personal MVP.

General rule:

> Chat is for thinking, planning, explaining, and deciding.
> Coding agents are for executing, modifying files, and testing.

## Decisions Log

- **2026-08-20** — V1 will be **computer-only**. Phone access and cross-device sync are deferred and will be reconsidered once the computer-only version is in use.
- **2026-08-20** — Reminders for v1 are **in-app indicators only** (overdue/due-soon items flagged in daily/weekly views) — no push or desktop notifications, to keep scope aligned with the computer-only v1.
- **2026-08-20** — Fitness tracks two record types: **workout sessions** (logged weekly, in a batch) and **weight** (logged monthly). No other fitness metrics for now. See `reference-workout-routines.md` for routine templates and detail.
- **2026-08-20** — MVP scope narrowed to **two divisions: Fitness and Daily Life.** Professional Growth and NOC (day job) are not separate divisions for MVP — they're categories under Daily Life (alongside Home and Car), all using the same plain-task fields (title, status, notes, dates). They may become their own divisions later if it turns out they need division-specific structure.
- **2026-08-20** — Added a **3rd division: Notebook**, for personal reference material (quotes, books, movies, websites, agency examples), migrated from an existing external notebook. Simplest record shape in the app: title, type tag, notes — no status or dates, since it's not actionable. Purely for personal reference, not currently part of the AI-analysis scope.
- **2026-08-20** — Minimum workflow defined: daily view centers on **overdue items**, not a scheduled agenda; **data entry cadence is intentionally unforced** (anywhere from daily to twice a month); navigation is **separate screens per division** with a switcher control, not one combined view.
- **2026-08-20** — MVP screens defined: **no dedicated Home/Overview screen** — the app opens directly to Daily Life, which already shows overdue items. **Fitness is one screen** with two sections (Workouts, Weight), not two separate screens. See MVP Screens.
- **2026-08-20** — Technology stack decided: **Next.js (React + TypeScript) + Tailwind CSS + Supabase, deployed on Vercel.** See Technology Stack.
- **2026-08-20** — No manual multi-agent workflow. Borislav directs one Claude Code session conversationally; the earlier Product/UX/UI/Engineering/Testing/Orchestrator agent split was dropped as unnecessary coordination overhead for a solo personal project. See Agent and Workflow Discussion.
- **2026-08-23** — Added a **Login screen** (email/password, single user) with **Row Level Security** on every table. Needed because the Supabase publishable key is exposed in the browser once the app is deployed — without RLS scoped to the logged-in user's ID, anyone who found the deployed URL could read/write the data directly via the API. Not in the original MVP screen list; added when Supabase was actually wired up.
- **2026-08-25** — Visual style settled once the first screens were built: no shadows, no borders on white cards (white-on-gray contrast is enough), dates shown as `D MMM YYYY`, delete actions are tertiary red text. See UI Conventions. Also, workout **duration is no longer typed in** — it's a fixed 40-minute constant (12-series sessions), and workout **volume is no longer typed in per session** either — it's snapshotted automatically from a per-routine lookup (`app/(app)/fitness/routines.ts`) at log time, matching the "name the routine, app already knows its volume" behavior noted in `reference-workout-routines.md`.
- **2026-08-25** — Borislav shared screenshots of a community Figma design-system kit ("Practical UI") to stop the UI from drifting inconsistently across ad hoc requests. Decided to **adopt its structural patterns (spacing, button hierarchy, label-above-field forms, calendar-icon date pickers) but keep this app's existing green accent** rather than switching to the kit's indigo, or to the black/green dashboard look of a second reference image also shared. Formalized as shared code in `app/(app)/ui.ts` (`labelClass`, `inputClass`, `buttonClass`) and `app/(app)/date-field.tsx`, applied across all forms (Daily Life, Fitness, Login). See UI Conventions. Not yet adopted from that kit: custom checkbox/radio styling, the alert/feedback component, and its underline-tab navigation style — Daily Life's checkbox and the nav switcher's pill tabs were left as they were.
- **2026-08-27** — Login prefills the email from `localStorage` instead of a hard-coded value or a `NEXT_PUBLIC_*` env var, keeping Borislav's address out of the public repo and out of the publicly-served login HTML. Costs one manual entry per new browser; after that only the password is typed.
- **2026-08-27** — Fitness Workouts refinements: routine dropdown gained an **"Other — type your own"** option (free-text routines like yoga/swimming/climbing; no volume snapshot is stored for them since `ROUTINE_VOLUMES` has no entry). Filter chips now always list **all three known routines** even with no sessions logged for one, plus an **"Other"** chip that appears once a free-text routine exists and matches anything not in `ROUTINE_VOLUMES`. Added a **month filter** ("August 2026") next to the sort dropdown, both on the same toolbar row as the chips. Secondary row text bumped 12px → 14px.
- **2026-08-25** — Export moved out of the division switcher (it's not a content division like Daily Life/Fitness/Notebook) into a small "Export" link in the header. Implemented as CSV downloads: one button per division (Daily Life, Fitness — which bundles both workouts and weight as two files, Notes) plus an "Export All" that triggers all of them. CSV chosen over JSON for the actual download format since it opens directly in Excel/Sheets and is still plain-text/AI-readable; JSON stays the plan for a possible future all-in-one bundle if needed.

## Reference Material

- `reference-old-excel-tasklist.md` — Borislav's current Excel task list, for data-model comparison. Not loaded by default; read only when relevant.
- `reference-workout-routines.md` — Fitness routine templates, rep/series conventions, and weight-tracking detail. Not loaded by default; read only when relevant.

## Open Questions

None currently blocking. Next planning steps below.

## Suggested Next Planning Steps

1. ~~Decide whether the first version needs computer-and-phone synchronization.~~ Decided: computer-only for v1.
2. ~~Define exactly what information each type of item stores.~~ Decided: see MVP Divisions and Data Model Direction.
3. ~~Define the minimum daily workflow.~~ Decided: see Minimum Daily/Weekly Workflow.
4. ~~Decide which screens are needed for the MVP.~~ Decided: see MVP Screens. Revisit if anything feels missing once the app is in use.
5. Create a short product brief.
6. ~~Choose the technology and project structure.~~ Decided: see Technology Stack.
7. ~~Define the agent workflow.~~ Decided: see Agent and Workflow Discussion.
8. Only then begin implementation.
