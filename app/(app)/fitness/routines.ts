// Volume snapshot for each known routine, per reference-workout-routines.md.
// Editing these does not rewrite past sessions — addWorkout snapshots the
// current text into the session's own record at log time.
export const ROUTINE_VOLUMES: Record<string, string> = {
  "Legs and Shoulders": "10 series legs, 5 series shoulders",
  "Back and Triceps": "McGill Big 3, 10 series back, 2 series triceps",
  "Chest and Biceps": "McGill Big 3, 10 series chest, 2 series biceps",
};

export const knownRoutines = Object.keys(ROUTINE_VOLUMES);
