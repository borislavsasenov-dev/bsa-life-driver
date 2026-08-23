import { NavSwitcher } from "./nav-switcher";
import { signOut } from "./actions";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <span className="text-sm font-semibold text-stone-800">BSA Life Driver</span>
          <NavSwitcher />
          <form action={signOut}>
            <button
              type="submit"
              className="text-sm text-stone-400 transition hover:text-stone-700"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8">{children}</main>
    </div>
  );
}
