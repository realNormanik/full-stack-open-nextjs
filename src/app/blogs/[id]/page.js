import { notFound } from "next/navigation";
import { getBlog } from "@/lib/blogs";
import { likeBlog } from "./actions";

export default async function BlogPage({ params }) {
  const { id } = await params;
  const blog = getBlog(id);

  if (!blog) {
    notFound();
  };

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>Author: {blog.author}</p>
      <p>
        URL: <a href={blog.url}>{blog.url}</a>
      </p>
      <p>Likes: {blog.likes}</p>

      <form action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">Like</button>
      </form>
    </div>
  );
};