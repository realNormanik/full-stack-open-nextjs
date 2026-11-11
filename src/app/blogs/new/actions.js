"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addBlog } from "@/lib/blogs";

export async function createBlog(formData) {
  const title = formData.get("title")?.toString().trim();
  const author = formData.get("author")?.toString().trim();
  const url = formData.get("url")?.toString().trim();

  addBlog({ title, author, url });

  revalidatePath("/blogs");
  redirect("/blogs");
};