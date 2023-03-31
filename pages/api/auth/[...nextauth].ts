import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.Google_Auth_Client_Id!,
      clientSecret: process.env.Google_Auth_Client_Secret!,
    }),
  ],
  session: {
    strategy: 'jwt'
  }
});