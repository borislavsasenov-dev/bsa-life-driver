"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const screens = [
  { href: "/", label: "Daily Life" },
  { href: "/fitness", label: "Fitness" },
  { href: "/notebook", label: "Notebook" },
  { href: "/export", label: "Export" },
];

export function NavSwitcher() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 rounded-full bg-neutral-100 p-1">
      {screens.map((screen) => {
        const isActive = pathname === screen.href;
        return (
          <Link
            key={screen.href}
            href={screen.href}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              isActive
                ? "bg-green-400 text-neutral-900"
                : "text-neutral-500 hover:text-neutral-800"
            }`}
          >
            {screen.label}
          </Link>
        );
      })}
    </nav>
  );
}
