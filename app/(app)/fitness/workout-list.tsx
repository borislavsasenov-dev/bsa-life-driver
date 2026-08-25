"use client";

import { useMemo, useState, useTransition } from "react";
import { deleteWorkout } from "./fitness-actions";
import { formatDate } from "../date-format";
import { buttonClass, inputClass } from "../ui";

type Workout = {
  id: string;
  session_date: string;
  routine: string;
  duration_minutes: number | null;
  notes: string | null;
};

type SortOrder = "newest" | "oldest";

export function WorkoutList({ workouts }: { workouts: Workout[] }) {
  const [isPending, startTransition] = useTransition();
  const [routineFilter, setRoutineFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  const routines = useMemo(
    () => ["All", ...Array.from(new Set(workouts.map((w) => w.routine))).sort()],
    [workouts]
  );

  const visibleWorkouts = useMemo(() => {
    const filtered =
      routineFilter === "All" ? workouts : workouts.filter((w) => w.routine === routineFilter);
    // workouts already arrive newest-first from the server query.
    return sortOrder === "newest" ? filtered : [...filtered].reverse();
  }, [workouts, routineFilter, sortOrder]);

  if (workouts.length === 0) {
    return <p className="py-6 text-center text-sm text-neutral-400">No workouts logged yet.</p>;
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
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

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortOrder)}
          className={`${inputClass} w-auto`}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      {visibleWorkouts.length === 0 ? (
        <p className="py-6 text-center text-sm text-neutral-400">No sessions for this routine.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white">
          <table className="w-full text-left text-sm">
            <tbody className="divide-y divide-neutral-100">
              {visibleWorkouts.map((w) => (
                <tr key={w.id}>
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-neutral-800">{w.routine}</td>
                  <td className="px-4 py-3 text-xs text-neutral-500">{w.notes}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-neutral-400">
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
