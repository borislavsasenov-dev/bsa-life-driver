"use client";

import { useRef } from "react";
import { formatDate } from "./date-format";

export function DateField({
  id,
  name,
  value,
  onChange,
  required,
  placeholder = "Select date",
}: {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative h-11 w-40">
      <button
        type="button"
        onClick={() => {
          const el = inputRef.current;
          if (!el) return;
          if (typeof el.showPicker === "function") {
            el.showPicker();
          } else {
            el.focus();
          }
        }}
        className="flex h-11 w-40 items-center justify-between gap-2 rounded-lg border border-neutral-300 bg-white px-3 text-left text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
      >
        <span className={value ? "text-neutral-700" : "text-neutral-400"}>
          {value ? formatDate(value) : placeholder}
        </span>
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-4 w-4 shrink-0 text-neutral-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M13.25 3v2.25M3.5 7.75h13M4.75 5h10.5a1.25 1.25 0 0 1 1.25 1.25v9a1.25 1.25 0 0 1-1.25 1.25H4.75A1.25 1.25 0 0 1 3.5 15.25v-9A1.25 1.25 0 0 1 4.75 5Z"
          />
        </svg>
      </button>
      <input
        ref={inputRef}
        id={id}
        type="date"
        name={name}
        required={required}
        tabIndex={-1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pointer-events-none absolute inset-0 h-11 w-40 opacity-0"
      />
    </div>
  );
}
