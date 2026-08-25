"use client";

import { useTransition } from "react";
import { deleteWorkout } from "./fitness-actions";
import { formatDate } from "./date-format";

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
    <div className="overflow-hidden rounded-2xl bg-white">
      <table className="w-full text-left text-sm">
        <tbody className="divide-y divide-neutral-100">
          {workouts.map((w) => (
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
                  className="text-xs text-red-400 transition hover:text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
