import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { blogs, readingList } from "@/db/schema";

export async function addToReadingList(userId, blogId) {
  await db.insert(readingList).values({ userId, blogId }).onConflictDoNothing();
}

export async function getReadingListEntry(userId, blogId) {
  const [entry] = await db
    .select()
    .from(readingList)
    .where(and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)));

  return entry;
}

export async function markAsRead(userId, blogId) {
  await db
    .insert(readingList)
    .values({ userId, blogId, read: true })
    .onConflictDoUpdate({
      target: [readingList.userId, readingList.blogId],
      set: { read: true },
    });
}

export async function getReadingListBlogs(userId) {
  return db
    .select({
      id: blogs.id,
      title: blogs.title,
      author: blogs.author,
      read: readingList.read,
    })
    .from(readingList)
    .innerJoin(blogs, eq(readingList.blogId, blogs.id))
    .where(eq(readingList.userId, userId));
}