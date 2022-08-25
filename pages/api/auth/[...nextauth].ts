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
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.tag = session.user?.name
        .split('')
        .join('')
        .toLocaleLowerCase()
      session.user.uid = token.sub
      return session
    }
  }
}

export default NextAuth(authOptions)