"use client";

import { useMemo, useState, useTransition } from "react";
import { deleteWorkout } from "./fitness-actions";
import { knownRoutines, isKnownRoutine, OTHER_ROUTINE } from "./routines";
import { formatDate, formatMonth } from "../date-format";
import { buttonClass, inputBaseClass } from "../ui";

type Workout = {
  id: string;
  session_date: string;
  routine: string;
  duration_minutes: number | null;
  notes: string | null;
};

type SortOrder = "newest" | "oldest";

const ALL = "All";
const ALL_MONTHS = "all";

export function WorkoutList({ workouts }: { workouts: Workout[] }) {
  const [isPending, startTransition] = useTransition();
  const [routineFilter, setRoutineFilter] = useState(ALL);
  const [monthFilter, setMonthFilter] = useState(ALL_MONTHS);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  // The three fixed routines are always offered, even with no sessions logged
  // for one of them yet; "Other" appears once there's a free-text routine to
  // filter down to.
  const routines = useMemo(() => {
    const hasCustom = workouts.some((w) => !isKnownRoutine(w.routine));
    return [ALL, ...knownRoutines, ...(hasCustom ? [OTHER_ROUTINE] : [])];
  }, [workouts]);

  // Months that actually have sessions, newest first.
  const months = useMemo(
    () =>
      Array.from(new Set(workouts.map((w) => w.session_date.slice(0, 7)))).sort((a, b) =>
        b.localeCompare(a)
      ),
    [workouts]
  );

  const visibleWorkouts = useMemo(() => {
    const filtered = workouts.filter((w) => {
      const matchesRoutine =
        routineFilter === ALL ||
        (routineFilter === OTHER_ROUTINE ? !isKnownRoutine(w.routine) : w.routine === routineFilter);
      const matchesMonth = monthFilter === ALL_MONTHS || w.session_date.startsWith(monthFilter);
      return matchesRoutine && matchesMonth;
    });
    // workouts already arrive newest-first from the server query.
    return sortOrder === "newest" ? filtered : [...filtered].reverse();
  }, [workouts, routineFilter, monthFilter, sortOrder]);

  if (workouts.length === 0) {
    return <p className="py-6 text-center text-sm text-neutral-400">No workouts logged yet.</p>;
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-1">
          {routines.map((r) => (
            <button
              key={r}
              onClick={() => setRoutineFilter(r)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                routineFilter === r
                  ? "bg-green-400 text-neutral-900"
                  : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className={inputBaseClass}
            aria-label="Filter by month"
          >
            <option value={ALL_MONTHS}>All months</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {formatMonth(m)}
              </option>
            ))}
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            className={inputBaseClass}
            aria-label="Sort by date"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>

      {visibleWorkouts.length === 0 ? (
        <p className="py-6 text-center text-sm text-neutral-400">No sessions match these filters.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white">
          <table className="w-full text-left text-sm">
            <tbody className="divide-y divide-neutral-100">
              {visibleWorkouts.map((w) => (
                <tr key={w.id}>
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-neutral-800">{w.routine}</td>
                  <td className="px-4 py-3 text-sm text-neutral-500">{w.notes}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-neutral-400">
                    {formatDate(w.session_date)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => startTransition(() => deleteWorkout(w.id))}
                      disabled={isPending}
                      className={buttonClass("tertiary", "destructive", "sm")}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
