"use client";

import { useRef, useState } from "react";
import { addWorkout } from "./fitness-actions";
import { knownRoutines, isKnownRoutine, OTHER_ROUTINE } from "./routines";
import { DateField } from "../date-field";
import { labelClass, inputClass, buttonClass } from "../ui";

const today = () => new Date().toISOString().slice(0, 10);

export function WorkoutForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const routineRef = useRef<HTMLInputElement>(null);

  const [dateValue, setDateValue] = useState(today());
  const [routineValue, setRoutineValue] = useState("");
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  const matches = knownRoutines.filter((r) =>
    r.toLowerCase().includes(routineValue.toLowerCase())
  );
  // "Other" always sits at the bottom of the list — it isn't a routine to pick,
  // it's the way into typing a free-text one.
  const suggestions = [...matches, OTHER_ROUTINE];

  const pickSuggestion = (suggestion: string) => {
    if (suggestion === OTHER_ROUTINE) {
      // Only wipe the field if it holds one of the fixed routines; a
      // half-typed custom name should survive.
      if (isKnownRoutine(routineValue)) setRoutineValue("");
      routineRef.current?.focus();
    } else {
      setRoutineValue(suggestion);
    }
    setSuggestionsOpen(false);
  };

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
          <label htmlFor="session_date" className={labelClass}>
            Date
          </label>
          <DateField
            id="session_date"
            name="session_date"
            value={dateValue}
            onChange={setDateValue}
            required
          />
        </div>

        <div className="relative flex min-w-[12rem] flex-1 flex-col gap-1">
          <label htmlFor="routine" className={labelClass}>
            Routines
          </label>
          <div className="relative">
            <input
              ref={routineRef}
              id="routine"
              name="routine"
              autoComplete="off"
              required
              value={routineValue}
              onChange={(e) => setRoutineValue(e.target.value)}
              onFocus={() => setSuggestionsOpen(true)}
              onBlur={() => setSuggestionsOpen(false)}
              className={`${inputClass} pr-10`}
            />
            <svg
              viewBox="0 -960 960 960"
              fill="currentColor"
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
            >
              <path d="M480-344 240-584l43-43 197 197 197-197 43 43-240 240Z" />
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
                      pickSuggestion(r);
                    }}
                    className="block w-full px-3 py-2 text-left text-sm text-neutral-700 hover:bg-green-100"
                  >
                    {r === OTHER_ROUTINE ? (
                      <span className="text-neutral-500">Other — type your own</span>
                    ) : (
                      r
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" className={`${buttonClass("primary", "brand", "md")} shrink-0 self-end`}>
          Log session
        </button>
      </div>
    </form>
  );
}
