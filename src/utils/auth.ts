import { PrismaAdapter } from "@auth/prisma-adapter"
import {NextAuthOptions,User,getServerSession} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/utils/connect";


declare module "next-auth" {
  interface Session {
    user: User & {
      isAdmin: Boolean;
    };
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    isAdmin: Boolean;
  }
}

export const authOptions:NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session:{
    strategy:"jwt"
  },
  providers: [
    GoogleProvider({
        // both are same wether you you "as string" or !
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET! ,
    }),
  ],
  callbacks:{
    async session({token,session}){
      if(token){
        session.user.isAdmin = token.isAdmin
      }
      return session
    },
    
    async jwt({token}){
      
      const userInDb = await prisma.user.findUnique({
        where:{
          email:token.email!
        }
      })
      token.isAdmin = userInDb?.isAdmin!
      return token
    }
  }
}


export const getAuthSession = ()=>getServerSession(authOptions)
