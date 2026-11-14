import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getUserWithBlogs } from "@/lib/users";

async function UserDetails({ params }) {
  const { username } = await params;
  const user = await getUserWithBlogs(username);

  if (!user) {
    notFound();
  }

  return (
    <>
      <h1>{user.name}</h1>
      <h2>Blogs</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            {blog.title} by {blog.author} ({blog.likes} likes)
          </li>
        ))}
      </ul>
    </>
  );
}

export default function UserPage({ params }) {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <UserDetails params={params} />
      </Suspense>
    </div>
  );
}