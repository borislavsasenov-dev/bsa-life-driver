import { login } from "./actions";
import { EmailInput } from "./email-input";
import { PasswordInput } from "./password-input";
import { buttonClass } from "../(app)/ui";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8">
        <h1 className="text-xl font-semibold text-neutral-900">BSA Life Driver</h1>
        <p className="mt-1 text-sm text-neutral-500">Sign in to continue.</p>

        <form action={login} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
              Email
            </label>
            <EmailInput />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
              Password
            </label>
            <PasswordInput />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" className={`w-full ${buttonClass("primary", "brand", "md")}`}>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
