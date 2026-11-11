import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex gap-4 border-b border-gray-300 p-4">
      <Link href="/" className="font-semibold hover:underline">
        Home
      </Link>
      <Link href="/blogs" className="font-semibold hover:underline">
        Blogs
      </Link>
    </nav>
  );
};