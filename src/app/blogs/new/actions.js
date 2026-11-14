"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { addBlog } from "@/lib/blogs";

const MIN_LENGTH = 5;

export async function createBlog(prevState, formData) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const title = formData.get("title")?.toString().trim() ?? "";
  const author = formData.get("author")?.toString().trim() ?? "";
  const url = formData.get("url")?.toString().trim() ?? "";

  const errors = {};

  if (title.length < MIN_LENGTH) {
    errors.title = `Title must be at least ${MIN_LENGTH} characters long`;
  }

  if (author.length < MIN_LENGTH) {
    errors.author = `Author must be at least ${MIN_LENGTH} characters long`;
  }

  if (url.length < MIN_LENGTH) {
    errors.url = `URL must be at least ${MIN_LENGTH} characters long`;
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { title, author, url }, success: false };
  }

  await addBlog({ title, author, url, userId: Number(session.user.id) });

  revalidatePath("/blogs");

  return { errors: {}, values: {}, success: true };
}