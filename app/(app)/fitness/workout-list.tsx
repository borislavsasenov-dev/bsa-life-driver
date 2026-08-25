"use client";

import { useTransition } from "react";
import { deleteWorkout } from "./fitness-actions";

type Workout = {
  id: string;
  session_date: string;
  routine: string;
  duration_minutes: number | null;
  notes: string | null;
};

export function WorkoutList({ workouts }: { workouts: Workout[] }) {
  const [isPending, startTransition] = useTransition();

  if (workouts.length === 0) {
    return <p className="py-6 text-center text-sm text-neutral-400">No workouts logged yet.</p>;
  }

  return (
    <ul className="space-y-2">
      {workouts.map((w) => (
        <li
          key={w.id}
          className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-neutral-800">
                {w.routine}
                {w.duration_minutes ? (
                  <span className="ml-2 text-xs font-normal text-neutral-400">
                    {w.duration_minutes} min
                  </span>
                ) : null}
              </p>
              <p className="mt-0.5 text-xs text-neutral-500">{w.session_date}</p>
              {w.notes && <p className="mt-1 text-xs text-neutral-500">{w.notes}</p>}
            </div>

            <button
              onClick={() => startTransition(() => deleteWorkout(w.id))}
              disabled={isPending}
              className="text-xs text-neutral-300 transition hover:text-red-500"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
