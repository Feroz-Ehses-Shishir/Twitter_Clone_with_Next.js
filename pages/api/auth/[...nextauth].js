import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
    // CredentialsProvider({
    //   name : "credentials",
    //   credentials: {},

    //   async authorize(credentials){
    //     const user = {id:"1"};
    //     return user;
    //   }
    // })
  ],
  // session: {
  //   strategy: "jwt",
  // },
  // secret: process.env.NEXTAUTH_SECRET,
  // pages: {
  //   signIn: "http://localhost:3000/",
  // }
}

export default NextAuth(authOptions);