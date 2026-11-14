import { Suspense } from "react";
import Link from "next/link";
import { getUsers } from "@/lib/users";

async function UsersList() {
  const users = await getUsers();

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <Link href={`/users/${user.username}`}>{user.name}</Link> ({user.username})
        </li>
      ))}
    </ul>
  );
}

export default function UsersPage() {
  return (
    <div>
      <h1>Users</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <UsersList />
      </Suspense>
    </div>
  );
}