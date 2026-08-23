"use client";

import { useRef, useState } from "react";
import { addTask } from "./daily-life-actions";

export function TaskForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [expanded, setExpanded] = useState(false);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await addTask(formData);
        formRef.current?.reset();
        setExpanded(false);
      }}
      className="mb-6 rounded-xl border border-stone-200 bg-white p-4"
    >
      <input
        name="title"
        placeholder="Add a task..."
        required
        onFocus={() => setExpanded(true)}
        className="w-full text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
      />

      {expanded && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <select
            name="category"
            required
            defaultValue="Home"
            className="rounded-lg border border-stone-300 px-2 py-1 text-xs text-stone-700"
          >
            <option value="Home">Home</option>
            <option value="Car">Car</option>
            <option value="NOC">NOC</option>
            <option value="Work">Work</option>
          </select>

          <select
            name="priority"
            defaultValue="Normal"
            className="rounded-lg border border-stone-300 px-2 py-1 text-xs text-stone-700"
          >
            <option value="Normal">Normal</option>
            <option value="High">High</option>
          </select>

          <input
            type="date"
            name="due_date"
            className="rounded-lg border border-stone-300 px-2 py-1 text-xs text-stone-700"
          />

          <input
            name="notes"
            placeholder="Notes (optional)"
            className="min-w-[10rem] flex-1 rounded-lg border border-stone-300 px-2 py-1 text-xs text-stone-700 placeholder:text-stone-400"
          />

          <button
            type="submit"
            className="rounded-lg bg-stone-800 px-3 py-1 text-xs font-medium text-white transition hover:bg-stone-700"
          >
            Add
          </button>
        </div>
      )}
    </form>
  );
}
