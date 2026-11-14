import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByUsername } from "@/lib/users";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        const user = await getUserByUsername(String(credentials.username));

        if (!user || !user.passwordHash) {
          return null;
        }

        const passwordCorrect = await bcrypt.compare(String(credentials.password), user.passwordHash);

        if (!passwordCorrect) {
          return null;
        }

        return { id: String(user.id), name: user.name };
      },
    }),
  ],
});