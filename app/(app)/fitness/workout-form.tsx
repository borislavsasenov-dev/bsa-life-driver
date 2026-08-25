"use client";

import { useRef } from "react";
import { addWorkout } from "./fitness-actions";

const knownRoutines = ["Legs and Shoulders", "Back and Triceps", "Chest and Biceps"];

const today = () => new Date().toISOString().slice(0, 10);

export function WorkoutForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await addWorkout(formData);
        formRef.current?.reset();
      }}
      className="mb-4 rounded-3xl border border-neutral-200 bg-white p-4"
    >
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="date"
          name="session_date"
          required
          defaultValue={today()}
          className="rounded-lg border border-neutral-300 px-2 py-1 text-xs text-neutral-700"
        />

        <input
          name="routine"
          list="routine-suggestions"
          placeholder="Routine (e.g. Legs and Shoulders)"
          required
          className="min-w-[12rem] flex-1 rounded-lg border border-neutral-300 px-2 py-1 text-xs text-neutral-700 placeholder:text-neutral-400"
        />
        <datalist id="routine-suggestions">
          {knownRoutines.map((r) => (
            <option key={r} value={r} />
          ))}
        </datalist>

        <button
          type="submit"
          className="rounded-full bg-green-400 px-4 py-1 text-xs font-medium text-neutral-900 transition hover:bg-green-300"
        >
          Log session
        </button>
      </div>

      <textarea
        name="notes"
        placeholder="Volume (e.g. Squats 3x8 @60kg, Shoulder press 3x10 @20kg...)"
        rows={2}
        className="mt-2 w-full resize-none rounded-lg border border-neutral-300 px-2 py-1.5 text-xs text-neutral-700 placeholder:text-neutral-400"
      />
    </form>
  );
}
