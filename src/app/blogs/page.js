import { Suspense } from "react";
import Link from "next/link";
import { getBlogs } from "@/lib/blogs";

async function FilteredBlogs({ searchParams }) {
  const { filter = "" } = await searchParams;

  const blogs = (await getBlogs())
    .filter((blog) => blog.title.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.likes - a.likes);

  return (
    <div className="mt-6 grid gap-6">
      <form action="/blogs" className="flex gap-2">
        <input type="text" name="filter" defaultValue={filter} placeholder="Filter by title" data-testid="filter-input" />
        <button type="submit" data-testid="search-button" className="create">
          Search
        </button>
      </form>

      <ul data-testid="blogs-list" className="grid gap-4">
        {blogs.map((blog) => (
          <li key={blog.id} className="card flex items-start justify-between gap-4">
            <div>
              <Link href={`/blogs/${blog.id}`} className="font-display text-xl font-semibold hover:text-brand-ink">
                {blog.title}
              </Link>
              <p className="mt-1 text-sm text-muted">by {blog.author}</p>
            </div>
            <span className="chip">{blog.likes} likes</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function BlogsPage({ searchParams }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1>Blogs</h1>
        <Link href="/blogs/new" className="create">
          Create new blog
        </Link>
      </div>

      <Suspense fallback={<p className="mt-6 text-muted">Loading...</p>}>
        <FilteredBlogs searchParams={searchParams} />
      </Suspense>
    </div>
  );
}