import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";

export async function getUsers() {
  return db.select().from(users);
}

export async function getUserWithBlogs(username) {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
  });
}

export async function getUserByUsername(username) {
  const [user] = await db.select().from(users).where(eq(users.username, username));

  return user;
}

export async function createUser({ username, name, passwordHash }) {
  const [user] = await db.insert(users).values({ username, name, passwordHash }).returning();

  return user;
}

export async function getUserById(id) {
  const [user] = await db.select().from(users).where(eq(users.id, id));

  return user;
}

export async function setUserToken(id, token) {
  await db.update(users).set({ token }).where(eq(users.id, id));
}

export async function getUserByToken(token) {
  return db.query.users.findFirst({
    where: eq(users.token, token),
    with: { blogs: true },
  });
}