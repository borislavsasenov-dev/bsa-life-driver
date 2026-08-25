"use client";

import { useRef, useState } from "react";
import { addTask } from "./daily-life-actions";
import { DateField } from "./date-field";
import { labelClass, inputClass, buttonClass } from "./ui";

export function TaskForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [dueDate, setDueDate] = useState("");

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await addTask(formData);
        formRef.current?.reset();
        setExpanded(false);
        setDueDate("");
      }}
      className="mb-6 rounded-3xl bg-white p-4"
    >
      <input
        name="title"
        placeholder="Add a task..."
        required
        onFocus={() => setExpanded(true)}
        className="w-full text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
      />

      {expanded && (
        <div className="mt-3 flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="category" className={labelClass}>
              Category
            </label>
            <select
              id="category"
              name="category"
              required
              defaultValue="Home"
              className={`${inputClass} px-3`}
            >
              <option value="Home">Home</option>
              <option value="Car">Car</option>
              <option value="NOC">NOC</option>
              <option value="Work">Work</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="priority" className={labelClass}>
              Priority
            </label>
            <select id="priority" name="priority" defaultValue="Normal" className={`${inputClass} px-3`}>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="due_date" className={labelClass}>
              Due date
            </label>
            <DateField id="due_date" name="due_date" value={dueDate} onChange={setDueDate} />
          </div>

          <div className="flex min-w-[10rem] flex-1 flex-col gap-1">
            <label htmlFor="notes" className={labelClass}>
              Notes
            </label>
            <input id="notes" name="notes" className={inputClass} />
          </div>

          <button type="submit" className={`${buttonClass("primary", "brand", "md")} shrink-0`}>
            Add
          </button>
        </div>
      )}
    </form>
  );
}
