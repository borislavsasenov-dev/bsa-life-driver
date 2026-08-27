"use client";

import { useEffect, useRef } from "react";
import { inputClass } from "../(app)/ui";

// Remembering the email in the browser rather than baking it into the source:
// this repo is public, and the login page is served to anyone who reaches the
// deployed URL, so a hard-coded address would be readable in both places. Kept
// per-browser, it never leaves this machine.
const STORAGE_KEY = "bsa-life-driver:login-email";

function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    // Private windows / blocked site data — just fall back to an empty field.
    return "";
  }
}

function writeStored(email: string) {
  try {
    if (email.trim()) localStorage.setItem(STORAGE_KEY, email.trim());
  } catch {
    // Not being able to remember it is not worth failing the sign-in over.
  }
}

export function EmailInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    // Filled after mount, not during render, so the server-rendered HTML and
    // the first client render still match.
    const stored = readStored();
    if (stored) {
      input.value = stored;
      // Nothing left to type but the password, so start the cursor there.
      document.getElementById("password")?.focus();
    }

    // Blur covers tabbing to the password field; the form's own submit covers
    // typing the email and hitting Enter straight away.
    const persist = () => writeStored(input.value);
    const form = input.form;

    input.addEventListener("blur", persist);
    form?.addEventListener("submit", persist);
    return () => {
      input.removeEventListener("blur", persist);
      form?.removeEventListener("submit", persist);
    };
  }, []);

  return (
    <input
      ref={inputRef}
      id="email"
      name="email"
      type="email"
      required
      autoComplete="username"
      className={`mt-1 ${inputClass}`}
    />
  );
}
