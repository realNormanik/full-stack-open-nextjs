import { Suspense } from "react";
import Link from "next/link";
import { getBlogs } from "@/lib/blogs";

async function FilteredBlogs({ searchParams }) {
  const { filter = "" } = await searchParams;

  const blogs = [...getBlogs()]
    .filter((blog) => blog.title.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.likes - a.likes);

  return (
    <>
      <form action="/blogs">
        <input type="text" name="filter" defaultValue={filter} placeholder="Filter by title" />
        <button type="submit">Search</button>
      </form>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <a href={blog.url}>{blog.title}</a> by {blog.author} ({blog.likes} likes)
          </li>
        ))}
      </ul>
    </>
  );
};

export default function BlogsPage({ searchParams }) {
  return (
    <div>
      <h1>Blogs</h1>
      <Link href="/blogs/new">Create new blog</Link>

      <Suspense fallback={<p>Loading...</p>}>
        <FilteredBlogs searchParams={searchParams} />
      </Suspense>
    </div>
  );
};