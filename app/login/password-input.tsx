"use client";

import { useState } from "react";
import { inputClass } from "../(app)/ui";

export function PasswordInput() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative mt-1">
      <input
        id="password"
        name="password"
        type={visible ? "text" : "password"}
        required
        autoComplete="current-password"
        className={`${inputClass} pr-10`}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 transition hover:text-neutral-600"
      >
        {visible ? (
          <svg viewBox="0 -960 960 960" fill="currentColor" className="size-5">
            <path d="m629-419-44-44q26-71-27-118t-115-24l-44-44q17-11 38-16t43-5q71 0 120.5 49.5T650-500q0 22-5.5 43.5T629-419Zm129 129-40-40q49-36 85.5-80.5T857-500q-50-111-150-175.5T490-740q-42 0-86 8t-69 19l-46-47q35-16 89.5-28T485-800q143 0 261.5 81.5T920-500q-26 64-67 117t-95 93Zm58 226L648-229q-35 14-79 21.5t-89 7.5q-146 0-265-81.5T40-500q20-52 55.5-101.5T182-696L56-822l42-43 757 757-39 44ZM223-654q-37 27-71.5 71T102-500q51 111 153.5 175.5T488-260q33 0 65-4t48-12l-64-64q-11 5-27 7.5t-30 2.5q-70 0-120-49t-50-121q0-15 2.5-30t7.5-27l-97-97Zm305 142Zm-116 58Z" />
          </svg>
        ) : (
          <svg viewBox="0 -960 960 960" fill="currentColor" className="size-5">
            <path d="M480-330q71 0 120.5-49.5T650-500q0-71-49.5-120.5T480-670q-71 0-120.5 49.5T310-500q0 71 49.5 120.5T480-330Zm0-72q-38 0-64-26t-26-64q0-38 26-64t64-26q38 0 64 26t26 64q0 38-26 64t-64 26Zm0 172q-146 0-264-83T40-500q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Zm0-300Zm0 240q121 0 222.5-65.5T857-500q-54-109-155.5-174.5T480-740q-121 0-222.5 65.5T102-500q54 109 155.5 174.5T480-260Z" />
          </svg>
        )}
      </button>
    </div>
  );
}
