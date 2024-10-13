import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import NextAuth from "next-auth/next";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

export const authOption: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.SECRET,
};

const handler = NextAuth(authOption);
export { handler as FET, handler as POST };
