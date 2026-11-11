"use server";

import { revalidatePath } from "next/cache";
import { incrementLikes } from "@/lib/blogs";

export async function likeBlog(formData) {
  const id = formData.get("id")?.toString();

  incrementLikes(id);

  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};