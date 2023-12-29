import NextAuth from "next-auth";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

import CredentialsProvider from "./CredentialsProvider";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [CredentialsProvider],
  callbacks: {
    async session({ session, token }) {
      const email = token.email || session?.user?.email;
      if (!email) return session;
      const [user] = await db
        .select({
          id: usersTable.displayId,
          username: usersTable.username,
          email: usersTable.email,
        })
        .from(usersTable)
        .where(eq(usersTable.email, email.toLowerCase()))
        .execute();

      return {
        ...session,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      };
    },
    async jwt({ token, account }) {
      if (!account) return token;
      const { name, email } = token;
      const provider = account.provider;
      if (!name || !email || !provider) return token;

      // Check if the email has been registered
      const [existedUser] = await db
        .select({
          id: usersTable.displayId,
        })
        .from(usersTable)
        .where(eq(usersTable.email, email.toLowerCase()))
        .execute();
      if (existedUser) return token;
      if (provider !== "github") return token;

      // Sign up
      await db
        .insert(usersTable)
        .values({
          username: name,
          email: email.toLowerCase(),
        });

      return token;
    },
  },
  pages: {
    signIn: "/",
  },
});
