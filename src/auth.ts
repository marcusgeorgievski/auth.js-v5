// import NextAuth from "next-auth"
// import GitHub from "next-auth/providers/github"

// export const {
//     handlers: { GET, POST },
//     auth,
// } = NextAuth({
//     providers: [GitHub],
// })

import NextAuth, { DefaultSession } from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserById } from "./data/user"
import "next-auth"
import { UserRole } from "@prisma/client"

declare module "next-auth" {
    interface User {
        role: UserRole
    }
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    callbacks: {
        async signIn({ user }) {
            try {
                const existingUser = await getUserById(user.id!)

                if (!existingUser || !existingUser.emailVerified) return false
            } catch (e) {
                console.error(e)
                return false
            }

            return true
        },
        async jwt({ token }) {
            if (!token.sub) return token

            const existingUser = await getUserById(token.sub)

            if (!existingUser) return token

            token.role = existingUser.role

            return token
        },
        async session({ session, token }) {
            // console.log(token)
            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole
            }

            return session
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})
