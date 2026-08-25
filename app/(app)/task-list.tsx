"use client";

import { useState, useTransition } from "react";
import { deleteTask, setTaskStatus } from "./daily-life-actions";

type Task = {
  id: string;
  title: string;
  category: string;
  priority: string;
  status: string;
  due_date: string | null;
  completed_date: string | null;
  notes: string | null;
};

const categories = ["All", "Home", "Car", "NOC", "Work"] as const;

function isOverdue(task: Task) {
  if (!task.due_date || task.status === "Done") return false;
  const today = new Date().toISOString().slice(0, 10);
  return task.due_date < today;
}

export function TaskList({ tasks }: { tasks: Task[] }) {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [isPending, startTransition] = useTransition();

  const visibleTasks = tasks.filter((t) => filter === "All" || t.category === filter);

  return (
    <div>
      <div className="mb-4 flex gap-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              filter === c
                ? "bg-green-400 text-neutral-900"
                : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {visibleTasks.length === 0 && (
        <p className="py-8 text-center text-sm text-neutral-400">
          No tasks here yet.
        </p>
      )}

      <ul className="space-y-2">
        {visibleTasks.map((task) => {
          const overdue = isOverdue(task);
          const done = task.status === "Done";

          return (
            <li
              key={task.id}
              className={`rounded-2xl border px-4 py-3 ${
                overdue
                  ? "border-red-200 bg-red-50"
                  : "border-neutral-200 bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={done}
                    disabled={isPending}
                    onChange={() =>
                      startTransition(() =>
                        setTaskStatus(task.id, done ? "Not Started" : "Done")
                      )
                    }
                    className="mt-1 size-4 rounded border-neutral-300 accent-green-500"
                  />
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        done ? "text-neutral-400 line-through" : "text-neutral-800"
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                      <span className="rounded-full bg-neutral-100 px-2 py-0.5">
                        {task.category}
                      </span>
                      {task.priority === "High" && (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-700">
                          High
                        </span>
                      )}
                      {task.due_date && (
                        <span className={overdue ? "font-medium text-red-600" : ""}>
                          {overdue ? "Overdue: " : "Due "}
                          {task.due_date}
                        </span>
                      )}
                    </div>
                    {task.notes && (
                      <p className="mt-1 text-xs text-neutral-500">{task.notes}</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => startTransition(() => deleteTask(task.id))}
                  disabled={isPending}
                  className="text-xs text-neutral-300 transition hover:text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
