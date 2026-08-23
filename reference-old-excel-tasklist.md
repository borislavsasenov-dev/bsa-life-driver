# Reference: Old Excel Task List (Borislav_tasks_2026)

Not loaded automatically — read only when needed for data-model or migration discussions.

## Structure

Flat single-table task list with columns:

- **Task** — free text title
- **Type** — category: Home, Work, Car (seen so far; not necessarily exhaustive)
- **Priority** — Normal, High
- **Start Date**
- **End Date** (often blank)
- **Status** — checkbox (done / not done)
- **Notes** — free text, used for details like alternatives considered or specs

## Observations for BSA Life Driver Design

- Type categories (Home/Work/Car) don't map cleanly onto the three planned MVP divisions (Fitness, Daily Life, Professional Growth). "Car" falls under Daily Life. No Fitness entries present in this list — fitness wasn't tracked here at all.
- Every row is generic — no structured fields for anything (e.g. a workout couldn't hold exercises/sets/reps/weights here). Confirms the need for the "tasks plus structured activities" data model rather than one flat table.
- No recurring-task concept — repeated chores (e.g. cleaning) appear to be entered manually each time rather than generated from a recurrence rule.
- Notes column does double duty as unstructured detail capture — worth preserving a similar free-text field in the new app even with structured fields added.

## Status

This is legacy/reference only. Borislav may look at other tool examples in the future before finalizing the data model.
