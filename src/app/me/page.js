import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserById } from "@/lib/users";
import { getReadingListBlogs } from "@/lib/readingList";
import { markBlogAsRead } from "../blogs/[id]/actions";
import { generateToken } from "./actions";

function BlogLink({ blog }) {
  return (
    <>
      <Link href={`/blogs/${blog.id}`} className="font-semibold hover:text-brand-ink">
        {blog.title}
      </Link>
      <span className="text-sm text-muted"> by {blog.author}</span>
    </>
  );
}

async function MyDetails() {
  await connection();

  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const userId = Number(session.user.id);
  const user = await getUserById(userId);

  if (!user) {
    redirect("/login");
  }

  const readingList = await getReadingListBlogs(userId);
  const unread = readingList.filter((blog) => !blog.read);
  const read = readingList.filter((blog) => blog.read);

  return (
    <div className="grid gap-4">
      <div className="card" data-testid="user-profile">
        <p className="text-sm text-muted">Name</p>
        <p data-testid="user-name" className="font-display text-xl font-semibold">
          {user.name}
        </p>

        <p className="mt-4 text-sm text-muted">Username</p>
        <p data-testid="user-username" className="font-display text-xl font-semibold">
          {user.username}
        </p>
      </div>

      <div className="card-soft" data-testid="api-token-section">
        <h2>API token</h2>

        {user.token ? (
          <div data-testid="token-display" className="mt-3 rounded-2xl bg-panel px-4 py-3">
            <code data-testid="api-token" className="break-all font-mono text-sm">
              {user.token}
            </code>
          </div>
        ) : (
          <p data-testid="no-token-message" className="mt-3 text-muted">
            No token has been generated yet.
          </p>
        )}

        <form action={generateToken} className="mt-4">
          <button type="submit" data-testid="generate-token-button" className="create">
            Generate new token
          </button>
        </form>
      </div>

      <div className="grid gap-4" data-testid="reading-list-section">
        {readingList.length === 0 ? (
          <div className="card">
            <h2>Reading list</h2>
            <p data-testid="empty-reading-list" className="mt-3 text-muted">
              Your reading list is empty.
            </p>
          </div>
        ) : (
          <>
            <div className="card" data-testid="unread-section">
              <h2>Unread</h2>

              {unread.length === 0 ? (
                <p data-testid="no-unread-blogs" className="mt-3 text-muted">
                  No unread blogs in your reading list.
                </p>
              ) : (
                <ul className="mt-3 grid gap-3">
                  {unread.map((blog) => (
                    <li key={blog.id} className="flex items-center justify-between gap-4">
                      <div>
                        <BlogLink blog={blog} />
                      </div>
                      <form action={markBlogAsRead}>
                        <input type="hidden" name="id" value={blog.id} />
                        <button type="submit" data-testid={`mark-read-${blog.id}`} className="vote">
                          Mark as read
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="card" data-testid="read-section">
              <h2>Read</h2>

              {read.length === 0 ? (
                <p className="mt-3 text-muted">You have not read any blogs from your reading list yet.</p>
              ) : (
                <ul className="mt-3 grid gap-3">
                  {read.map((blog) => (
                    <li key={blog.id}>
                      <BlogLink blog={blog} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function MePage() {
  return (
    <div>
      <h1 className="mb-6">My page</h1>
      <Suspense fallback={<p className="text-muted">Loading...</p>}>
        <MyDetails />
      </Suspense>
    </div>
  );
}