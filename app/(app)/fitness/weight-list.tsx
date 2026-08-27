"use client";

import { useTransition } from "react";
import { deleteWeightLog } from "./fitness-actions";
import { formatDate } from "../date-format";
import { buttonClass } from "../ui";

type WeightLog = {
  id: string;
  log_date: string;
  weight_kg: number;
  notes: string | null;
};

const GOAL_KG = 80;

export function WeightList({ logs }: { logs: WeightLog[] }) {
  const [isPending, startTransition] = useTransition();

  if (logs.length === 0) {
    return <p className="py-6 text-center text-sm text-neutral-400">No weight logged yet.</p>;
  }

  const latest = logs[0];
  const remaining = GOAL_KG - latest.weight_kg;

  return (
    <div>
      <p className="mb-3 text-sm text-neutral-600">
        Latest: <span className="font-medium text-neutral-900">{latest.weight_kg} kg</span>
        {" · "}
        Goal: <span className="font-medium text-neutral-900">{GOAL_KG} kg</span>
        {" · "}
        {remaining > 0 ? (
          <span>{remaining.toFixed(1)} kg to go</span>
        ) : (
          <span className="text-green-600">Goal reached</span>
        )}
      </p>

      <ul className="space-y-2">
        {logs.map((log) => (
          <li
            key={log.id}
            className="flex items-center justify-between rounded-2xl bg-white px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium text-neutral-800">{log.weight_kg} kg</p>
              <p className="mt-0.5 text-sm text-neutral-500">{formatDate(log.log_date)}</p>
              {log.notes && <p className="mt-1 text-sm text-neutral-500">{log.notes}</p>}
            </div>

            <button
              onClick={() => startTransition(() => deleteWeightLog(log.id))}
              disabled={isPending}
              className={buttonClass("tertiary", "destructive", "sm")}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
