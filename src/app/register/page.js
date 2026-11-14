"use client";

import { useActionState } from "react";
import { registerUser } from "./actions";

const initialState = { errors: {} };

function FieldError({ id, message }) {
  if (!message) return null;

  return (
    <p data-testid={`${id}-error`} className="mt-1.5 text-sm text-red-600">
      {message}
    </p>
  );
}

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState);

  return (
    <div className="card mx-auto max-w-lg">
      <h1>Register</h1>

      <form action={formAction} className="mt-6 grid gap-4">
        <div>
          <label className="grid gap-1.5 text-sm font-medium">
            Username
            <input name="username" type="text" />
          </label>
          <FieldError id="username" message={state.errors?.username} />
        </div>

        <div>
          <label className="grid gap-1.5 text-sm font-medium">
            Name
            <input name="name" type="text" />
          </label>
        </div>

        <div>
          <label className="grid gap-1.5 text-sm font-medium">
            Password
            <input name="password" type="password" />
          </label>
          <FieldError id="password" message={state.errors?.password} />
        </div>

        <div>
          <label className="grid gap-1.5 text-sm font-medium">
            Confirm Password
            <input name="passwordConfirm" type="password" />
          </label>
          <FieldError id="passwordConfirm" message={state.errors?.passwordConfirm} />
        </div>

        <button type="submit" data-testid="register-button" className="create">
          Register
        </button>
      </form>
    </div>
  );
}