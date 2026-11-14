"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

const INVALID = { error: "Invalid username or password", success: false };

export async function login(previousState, formData) {
  try {
    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (typeof result === "string" && result.includes("error=")) {
      return INVALID;
    }
  } catch (error) {
    if (error instanceof AuthError) {
      return INVALID;
    }

    throw error;
  }

  return { error: "", success: true };
}