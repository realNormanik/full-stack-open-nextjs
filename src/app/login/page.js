"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "./actions";
import { useNotification } from "../components/NotificationContext";

const initialState = { error: "", success: false };

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification("Logged in");
      router.push("/");
      router.refresh();
    }
  }, [state, showNotification, router]);

  return (
    <div className="card mx-auto max-w-lg">
      <h1>Login</h1>

      <form action={formAction} className="mt-6 grid gap-4">
        <label className="grid gap-1.5 text-sm font-medium">
          Username
          <input name="username" type="text" />
        </label>

        <label className="grid gap-1.5 text-sm font-medium">
          Password
          <input name="password" type="password" />
        </label>

        <button type="submit" data-testid="login-button" disabled={pending} className="create">
          Login
        </button>

        {state.error && (
          <p data-testid="error-message" className="text-sm text-red-600">
            {state.error}
          </p>
        )}
      </form>
    </div>
  );
}