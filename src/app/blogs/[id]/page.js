import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getBlog } from "@/lib/blogs";
import { likeBlog } from "./actions";

async function BlogDetails({ params }) {
  const { id } = await params;
  const blog = getBlog(id);

  if (!blog) {
    notFound();
  };

  return (
    <>
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
    </>
  );
};

export default function BlogPage({ params }) {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <BlogDetails params={params} />
      </Suspense>
    </div>
  );
};