"use client";

import { useRef } from "react";
import { addWeightLog } from "./fitness-actions";

const today = () => new Date().toISOString().slice(0, 10);

export function WeightForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await addWeightLog(formData);
        formRef.current?.reset();
      }}
      className="mb-4 flex flex-wrap items-center gap-2 rounded-3xl bg-white p-4"
    >
      <input
        type="date"
        name="log_date"
        required
        defaultValue={today()}
        className="rounded-lg border border-neutral-300 px-2 py-1 text-xs text-neutral-700"
      />

      <input
        type="number"
        name="weight_kg"
        placeholder="Weight (kg)"
        step="0.1"
        min={0}
        required
        className="w-28 rounded-lg border border-neutral-300 px-2 py-1 text-xs text-neutral-700 placeholder:text-neutral-400"
      />

      <input
        name="notes"
        placeholder="Notes (optional)"
        className="min-w-[10rem] flex-1 rounded-lg border border-neutral-300 px-2 py-1 text-xs text-neutral-700 placeholder:text-neutral-400"
      />

      <button
        type="submit"
        className="rounded-full bg-green-400 px-4 py-1 text-xs font-medium text-neutral-900 transition hover:bg-green-300"
      >
        Log weight
      </button>
    </form>
  );
}
