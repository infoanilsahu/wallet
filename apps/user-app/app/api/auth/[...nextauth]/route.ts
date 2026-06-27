import NextAuth,{ type AuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@repo/db";
import bcrypt from "bcrypt"
import type { Session } from "next-auth"
import type { JWT } from "next-auth/jwt"

interface SessionProp {
  token: JWT,
  session: Session
}


export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Phone Number",
      credentials: {
        name: {label: "Full Name", type: "text", placeholder: "Rajesh"},
        phone: {label: "Phone number", type: "text", placeholder: "1234567890"},
        password: {label: "Password", type: "password"}
      }, 
      async authorize(credentials) {
        if(!credentials?.phone || !credentials.password) {
          return null
        }

        const { phone, password, name } = credentials

        // zod validation or OTP validation
        const existUser = await prisma.user.findFirst({
          where: {phone}
        })

        if( existUser ) {
          const passwordCheck = await bcrypt.compare(password, existUser.password)
          if( passwordCheck ) {
            return {
              id: existUser.id.toString(),
              phone: existUser.phone,
              name: existUser.name
            }
          }
          return null
        }

        try {

          const hashPassword = await bcrypt.hash(password, 10)

          
          const user = await prisma.user.create({
            data: {
              name, 
              phone,
              password: hashPassword, 
            }
          })

          return {
            id: user.id.toString(),
            name: user.name,
            phone: user.phone
          }
          
        } catch (error) {
          console.error(error)
        }
        
        return null
      }
    })
  ],
  secret: process.env.JWT_SECRET || "secretofauth",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }

      return token
    },
    
    async session({token, session}: SessionProp) {
      if( session.user ) {
        session.user.id = token.id
      }

      return session
    },
  }
  
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
