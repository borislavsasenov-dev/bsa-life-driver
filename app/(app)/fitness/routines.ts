// Volume snapshot for each known routine, per reference-workout-routines.md.
// Editing these does not rewrite past sessions — addWorkout snapshots the
// current text into the session's own record at log time.
export const ROUTINE_VOLUMES: Record<string, string> = {
  "Legs and Shoulders": "10 series legs, 5 series shoulders",
  "Back and Triceps": "McGill Big 3, 10 series back, 2 series triceps",
  "Chest and Biceps": "McGill Big 3, 10 series chest, 2 series biceps",
};

export const knownRoutines = Object.keys(ROUTINE_VOLUMES);

// Escape hatch in the routine dropdown / filter chips for anything outside the
// three fixed routines (yoga, swimming, mountain climbing...). It is never
// stored as a routine name itself — picking it just clears the field so a free
// -text routine can be typed, and as a filter it means "not a known routine".
export const OTHER_ROUTINE = "Other";

export function isKnownRoutine(routine: string) {
  return Object.prototype.hasOwnProperty.call(ROUTINE_VOLUMES, routine);
}
