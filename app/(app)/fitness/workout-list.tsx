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

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}`;
}

export function WorkoutList({ workouts }: { workouts: Workout[] }) {
  const [isPending, startTransition] = useTransition();

  if (workouts.length === 0) {
    return <p className="py-6 text-center text-sm text-neutral-400">No workouts logged yet.</p>;
  }

  return (
    <ul className="space-y-2">
      {workouts.map((w) => (
        <li key={w.id} className="rounded-2xl bg-white px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span className="text-sm font-medium text-neutral-800">{w.routine}</span>
              {w.notes && <span className="text-xs text-neutral-500">· {w.notes}</span>}
              <span className="text-xs text-neutral-400">· {formatDate(w.session_date)}</span>
            </div>

            <button
              onClick={() => startTransition(() => deleteWorkout(w.id))}
              disabled={isPending}
              className="shrink-0 text-xs text-red-400 transition hover:text-red-600"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
