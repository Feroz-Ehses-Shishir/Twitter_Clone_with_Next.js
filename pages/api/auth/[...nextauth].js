import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../libs/MongoConnect";
import user from "../../../libs/models/userModel";
import { compare } from "bcrypt";

const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name : "Credentials",
      async authorize(credentials,req){
        connectMongoDB().catch(err => {err : "connection failed"});

        //check user
        const result = await user.findOne({email : credentials.email});
        if(!result){
          throw new Error("No user Found");
        }
        //compare
        const checkPassword = await compare(credentials.password,result.password);
        //incorrect password
        if(!checkPassword || result.email!==credentials.email){
          throw new Error("Username or Password doesn't match");
        }

        return result;

      }
    })
  ],
  callbacks: {
    async session({ session, token}) {
      connectMongoDB().catch(err => {err : "connection failed"});
      const check = await user.findOne({email:session.user.email});
      // console.log(check);
      if(check==null){
        const data = await user.create({ name:session.user.name, email:session.user.email, password:"-" });
      }
      return session;
    }
  }
}

export default NextAuth(authOptions);