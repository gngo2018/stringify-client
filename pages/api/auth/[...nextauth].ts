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
  },
  secret: process.env.SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },

    async session({ session, token }) {
      session.user.role = typeof token.role === 'string' ? token.role : undefined
      return session;
    },

    async jwt({ token, user, account, profile, isNewUser }) {
      //TODO: Add db query logic
      if (user && user.email === 'gngo2018@gmail.com' && user.name === 'George Go') {
        token.role = 'Admin'
      }
      else if(user){
        token.role = 'Guest'
      }
      return token;
    },
  },
});