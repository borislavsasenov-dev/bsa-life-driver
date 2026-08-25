"use client";

import { useRef, useState } from "react";
import { addWeightLog } from "./fitness-actions";
import { DateField } from "../date-field";
import { labelClass, inputClass, buttonClass } from "../ui";

const today = () => new Date().toISOString().slice(0, 10);

export function WeightForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [dateValue, setDateValue] = useState(today());

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await addWeightLog(formData);
        formRef.current?.reset();
        setDateValue(today());
      }}
      className="mb-4 rounded-3xl bg-white p-4"
    >
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="log_date" className={labelClass}>
            Date
          </label>
          <DateField id="log_date" name="log_date" value={dateValue} onChange={setDateValue} required />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="weight_kg" className={labelClass}>
            Weight (kg)
          </label>
          <input
            id="weight_kg"
            type="number"
            name="weight_kg"
            step="0.1"
            min={0}
            required
            className={`${inputClass} w-28`}
          />
        </div>

        <div className="flex min-w-[10rem] flex-1 flex-col gap-1">
          <label htmlFor="weight_notes" className={labelClass}>
            Notes
          </label>
          <input id="weight_notes" name="notes" className={inputClass} />
        </div>

        <button type="submit" className={`${buttonClass("primary", "brand", "md")} shrink-0`}>
          Log weight
        </button>
      </div>
    </form>
  );
}
