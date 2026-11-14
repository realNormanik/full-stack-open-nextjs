import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createUser } from "@/lib/users";

export async function POST(request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }

  const { username, name, password } = await request.json();

  if (!username || !name || !password) {
    return NextResponse.json(
      { error: "username, name and password are required" },
      { status: 400 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser({ username, name, passwordHash });

  return NextResponse.json(
    { id: user.id, username: user.username, name: user.name },
    { status: 201 },
  );
}