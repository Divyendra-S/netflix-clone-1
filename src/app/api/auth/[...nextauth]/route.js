import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/github";

const authOptions = {
  providers: [
    GoogleProvider({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
   }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user.username = session?.user?.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();

      session.user.uid = token.sub;
      console.log(token)
      console.log(session)
      return session;
      
    },
  },
  secret: "default_secret_key",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
