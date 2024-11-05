import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./database";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";

export const authOptions : NextAuthOptions = {

    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session:{
        strategy: 'jwt'
    },
    pages: {
        signIn: '/login',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials) {
            if(!credentials?.email || !credentials?.password)
            {
                return null;
            }
            const existingUser = await prisma.user.findUnique({ where:{ email:credentials?.email } });
            if(!existingUser) 
            {
                return null;
            }
            if(existingUser.password)
            {
                const passwordMatch = await compare(credentials.password, existingUser.password);
                if(!passwordMatch)
                {
                    return null;
                }
            }
            return { id:`${existingUser.id}`, fullname:existingUser.fullname, email:existingUser.email }
          }
        })
    ],
    callbacks: {
        async signIn({ profile, account }) {
            if (account?.provider === 'google') {
                if (!profile?.email) {
                    throw new Error("No email found in profile");
                }
    
                await prisma.user.upsert({
                    where: { email: profile.email },
                    create: {
                        email: profile.email,
                        fullname: profile.name,
                    },
                    update: {
                        fullname: profile.name,
                    },
                });
                return true;
            }
            if (account?.provider === 'credentials') {
                return true;
            }
    
            return false;
        },
        async jwt({ token, user }) {
            if(user)
            {
                return {
                    ...token,
                    fullname: user.fullname,
                }
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user:{
                    ...session.user,
                    fullname: token.fullname
                }
            }
        }
    }
}