"use client";

import { useRef, useState } from "react";
import { addWorkout } from "./fitness-actions";
import { knownRoutines } from "./routines";
import { formatDate } from "./date-format";

const today = () => new Date().toISOString().slice(0, 10);

const fieldClass =
  "h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm text-neutral-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500";

export function WorkoutForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const [dateValue, setDateValue] = useState(today());
  const [routineValue, setRoutineValue] = useState("");
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  const suggestions = knownRoutines.filter((r) =>
    r.toLowerCase().includes(routineValue.toLowerCase())
  );

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await addWorkout(formData);
        formRef.current?.reset();
        setDateValue(today());
        setRoutineValue("");
      }}
      className="mb-4 rounded-3xl bg-white p-4"
    >
      <div className="flex flex-wrap items-start gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="session_date" className="text-xs font-medium text-neutral-500">
            Date
          </label>
          <div className="relative h-11 w-40">
            <button
              type="button"
              onClick={() => {
                const el = dateInputRef.current;
                if (!el) return;
                if (typeof el.showPicker === "function") {
                  el.showPicker();
                } else {
                  el.focus();
                }
              }}
              className="flex h-11 w-40 items-center rounded-lg border border-neutral-300 px-3 text-left text-sm text-neutral-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            >
              {formatDate(dateValue)}
            </button>
            <input
              ref={dateInputRef}
              id="session_date"
              type="date"
              name="session_date"
              required
              tabIndex={-1}
              value={dateValue}
              onChange={(e) => setDateValue(e.target.value)}
              className="pointer-events-none absolute inset-0 h-11 w-40 opacity-0"
            />
          </div>
        </div>

        <div className="relative flex min-w-[12rem] flex-1 flex-col gap-1">
          <label htmlFor="routine" className="text-xs font-medium text-neutral-500">
            Routines
          </label>
          <div className="relative">
            <input
              id="routine"
              name="routine"
              autoComplete="off"
              required
              value={routineValue}
              onChange={(e) => setRoutineValue(e.target.value)}
              onFocus={() => setSuggestionsOpen(true)}
              onBlur={() => setSuggestionsOpen(false)}
              className={`${fieldClass} pr-9`}
            />
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {suggestionsOpen && suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-lg bg-white py-1 ring-1 ring-neutral-200">
              {suggestions.map((r) => (
                <li key={r}>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setRoutineValue(r);
                      setSuggestionsOpen(false);
                    }}
                    className="block w-full px-3 py-2 text-left text-sm text-neutral-700 hover:bg-green-100"
                  >
                    {r}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="h-11 shrink-0 self-end rounded-full bg-green-400 px-5 text-sm font-medium text-neutral-900 transition hover:bg-green-300"
        >
          Log session
        </button>
      </div>
    </form>
  );
}
