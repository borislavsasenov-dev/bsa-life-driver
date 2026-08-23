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
    <nav className="flex gap-1 rounded-full bg-stone-100 p-1">
      {screens.map((screen) => {
        const isActive = pathname === screen.href;
        return (
          <Link
            key={screen.href}
            href={screen.href}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              isActive
                ? "bg-white text-stone-900 shadow-sm"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            {screen.label}
          </Link>
        );
      })}
    </nav>
  );
}
