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
    <div className="relative h-8 w-40">
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
        className="flex h-8 w-40 items-center justify-between gap-2 rounded-lg border border-neutral-300 bg-white px-3 text-left text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
      >
        <span className={value ? "text-neutral-700" : "text-neutral-400"}>
          {value ? formatDate(value) : placeholder}
        </span>
        <svg viewBox="0 -960 960 960" fill="currentColor" className="h-4 w-4 shrink-0 text-neutral-400">
          <path d="M180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Zm300 230q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-188.5-11.5Q280-423 280-440t11.5-28.5Q303-480 320-480t28.5 11.5Q360-457 360-440t-11.5 28.5Q337-400 320-400t-28.5-11.5ZM640-400q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-188.5-11.5Q280-263 280-280t11.5-28.5Q303-320 320-320t28.5 11.5Q360-297 360-280t-11.5 28.5Q337-240 320-240t-28.5-11.5ZM640-240q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" />
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
        className="pointer-events-none absolute inset-0 h-8 w-40 opacity-0"
      />
    </div>
  );
}
