"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { createUser, getUserByUsername } from "@/lib/users";

const MIN_LENGTH = 4;

export async function registerUser(prevState, formData) {
  const username = formData.get("username")?.toString().trim() ?? "";
  const name = formData.get("name")?.toString().trim() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const passwordConfirm = formData.get("passwordConfirm")?.toString() ?? "";

  const errors = {};

  if (username.length < MIN_LENGTH) {
    errors.username = `Username must be at least ${MIN_LENGTH} characters`;
  } else if (await getUserByUsername(username)) {
    errors.username = "Username is already taken";
  }

  if (password.length < MIN_LENGTH) {
    errors.password = `Password must be at least ${MIN_LENGTH} characters`;
  }

  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await createUser({ username, name, passwordHash });

  redirect("/login");
}