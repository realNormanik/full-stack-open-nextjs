"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getBlog, incrementLikes } from "@/lib/blogs";
import { addToReadingList, markAsRead } from "@/lib/readingList";

export async function likeBlog(formData) {
  const id = formData.get("id")?.toString();

  await incrementLikes(Number(id));

  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
}

export async function addBlogToReadingList(formData) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const blogId = Number(formData.get("id"));
  const userId = Number(session.user.id);

  const blog = await getBlog(blogId);

  if (!blog || blog.userId === userId) {
    return;
  }

  await addToReadingList(userId, blogId);

  revalidatePath(`/blogs/${blogId}`);
}

export async function markBlogAsRead(formData) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const blogId = Number(formData.get("id"));

  await markAsRead(Number(session.user.id), blogId);

  revalidatePath(`/blogs/${blogId}`);
  revalidatePath("/me");
}