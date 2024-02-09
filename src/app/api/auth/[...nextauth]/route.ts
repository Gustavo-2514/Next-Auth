import NextAuth, { AuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { redirect } from 'next/navigation'

export const authOptions: AuthOptions = {

    pages: {
        signIn: "/auth/signin"
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: { maxAge: 3600,  },

    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials, req) {
                console.log(req.body)
                const res = await fetch('http://localhost:3000/api/getUser', {
                    headers: {
                        "content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(credentials)
                })
                const user = await res.json()
          
                if (res.ok && user) {

                    return user
                }

                return null

            },
            type: 'credentials',

        }),

    ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

// fEeSDcvqCYXjAqDS   -   db pass
// DB_NAME   =    ToDoList

// `mongodb+srv://admin:${process.env.DB_PASS}@applications.c5gbjcz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`