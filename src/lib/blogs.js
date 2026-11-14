import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { blogs } from "@/db/schema";
import { addToReadingList } from "./readingList";

export async function getBlogs() {
  return db.select().from(blogs);
}

export async function getBlog(id) {
  if (!Number.isInteger(id)) {
    return undefined;
  }

  const [blog] = await db.select().from(blogs).where(eq(blogs.id, id));

  return blog;
}

export async function addBlog({ title, author, url, userId }) {
  const [blog] = await db.insert(blogs).values({ title, author, url, userId }).returning();

  if (userId) {
    await addToReadingList(userId, blog.id);
  }

  return blog;
}

export async function incrementLikes(id) {
  if (!Number.isInteger(id)) {
    return undefined;
  }

  const [blog] = await db
    .update(blogs)
    .set({ likes: sql`${blogs.likes} + 1` })
    .where(eq(blogs.id, id))
    .returning();

  return blog;
}