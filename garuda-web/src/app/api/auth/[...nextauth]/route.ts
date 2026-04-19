import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Student Credentials",
      credentials: {
        name: { label: "Student Name", type: "text" },
        usn: { label: "USN", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.usn || !credentials?.password) return null;

        const student = await prisma.student.findUnique({
          where: { usn: credentials.usn as string },
        });

        if (!student) return null;

        const isValid = await bcrypt.compare(credentials.password as string, student.password);
        if (!isValid) return null;

        return {
          id: student.id.toString(),
          name: student.name,
          email: student.usn, // Mapping USN to email field for NextAuth
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export const { GET, POST } = handlers;
