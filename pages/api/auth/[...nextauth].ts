import NextAuth from "next-auth/next";
import Google from 'next-auth/providers/google'
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    Google({
      id: 'google',
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    async session({ session }) {
      return session
    }
  },
  secret: 'anystring'
}

export default NextAuth(authOptions)