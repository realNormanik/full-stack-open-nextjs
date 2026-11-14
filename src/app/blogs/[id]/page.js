import { Suspense } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { getBlog } from "@/lib/blogs";
import { getReadingListEntry } from "@/lib/readingList";
import { likeBlog, addBlogToReadingList, markBlogAsRead } from "./actions";

async function BlogDetails({ params }) {
  await connection();

  const { id } = await params;
  const blog = await getBlog(Number(id));

  if (!blog) {
    notFound();
  }

  const session = await auth();
  const userId = session ? Number(session.user.id) : null;
  const entry = userId !== null ? await getReadingListEntry(userId, blog.id) : undefined;
  const canAdd = userId !== null && blog.userId !== userId && !entry;

  return (
    <div data-testid="blog-detail">
      <h1 data-testid="blog-title">{blog.title}</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="card sm:col-span-2">
          <p className="text-sm text-muted">Author</p>
          <p data-testid="blog-author" className="font-display text-xl font-semibold">
            {blog.author}
          </p>

          <p className="mt-4 text-sm text-muted">URL</p>
          <a href={blog.url} className="break-all text-brand-ink underline-offset-4 hover:underline">
            {blog.url}
          </a>
        </div>

        <div className="card-brand flex flex-col justify-between gap-4">
          <div>
            <p className="text-sm opacity-80">Likes</p>
            <p className="font-display text-5xl font-bold">{blog.likes}</p>
          </div>

          <form action={likeBlog}>
            <input type="hidden" name="id" value={blog.id} />
            <button type="submit" className="vote">
              Like
            </button>
          </form>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {canAdd && (
          <form action={addBlogToReadingList}>
            <input type="hidden" name="id" value={blog.id} />
            <button type="submit" data-testid="add-to-reading-list-button" className="create">
              Add to reading list
            </button>
          </form>
        )}

        {userId !== null && !entry?.read && (
          <form action={markBlogAsRead}>
            <input type="hidden" name="id" value={blog.id} />
            <button type="submit" className="create">
              Mark as read
            </button>
          </form>
        )}

        {entry?.read && <p className="text-sm text-muted">You have read this blog.</p>}
      </div>
    </div>
  );
}

export default function BlogPage({ params }) {
  return (
    <div>
      <Suspense fallback={<p className="text-muted">Loading...</p>}>
        <BlogDetails params={params} />
      </Suspense>
    </div>
  );
}