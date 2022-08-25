import NextAuth from "next-auth/next";
import Google from 'next-auth/providers/google'
import { NextAuthOptions } from "next-auth";
import { OAuthUserConfig } from "next-auth/providers";

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    async session({ session }) {
      return session
    }
  }
}

export default NextAuth(authOptions)