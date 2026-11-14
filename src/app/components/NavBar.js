import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { auth } from "@/auth";
import { logout } from "./actions";

const linkClass =
  "rounded-full px-3 py-1.5 text-sm font-medium text-muted transition hover:bg-soft hover:text-foreground cursor-pointer";

async function AuthLinks() {
  await connection();

  const session = await auth();

  if (session) {
    return (
      <>
        <Link href="/me" className={linkClass}>
          me
        </Link>
        <form action={logout}>
          <button type="submit" className={linkClass}>
            logout
          </button>
        </form>
      </>
    );
  }

  return (
    <>
      <Link href="/login" className={linkClass}>
        login
      </Link>
      <Link href="/register" className={linkClass}>
        register
      </Link>
    </>
  );
}

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-10 border-b border-line bg-panel/80 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center gap-1 px-4 py-3">
        <Link href="/" className={linkClass}>
          home
        </Link>
        <Link href="/blogs" className={linkClass}>
          blogs
        </Link>
        <Link href="/users" className={linkClass}>
          users
        </Link>
        <div className="ml-auto flex items-center gap-1">
          <Suspense fallback={null}>
            <AuthLinks />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}