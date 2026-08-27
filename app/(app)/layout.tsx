import Link from "next/link";
import { NavSwitcher } from "./nav-switcher";
import { signOut } from "./actions";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-100">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <span className="text-sm font-semibold text-neutral-900">BSA Life Driver</span>
          <NavSwitcher />
          <div className="flex items-center gap-4">
            <Link href="/export" className="text-sm text-neutral-400 transition hover:text-neutral-800">
              Export
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="text-sm text-neutral-400 transition hover:text-neutral-800"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8">{children}</main>
    </div>
  );
}
