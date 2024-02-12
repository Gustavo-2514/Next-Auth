import NextAuth, { AuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'


export const authOptions: AuthOptions = {

    pages: {
        signIn: "/auth/signin"
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: { maxAge: 3600, },

    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials, req) {

                const userObj = { email: credentials?.email, password: credentials?.password }
                const res = await fetch('http://localhost:3000/api/getUser', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(userObj)
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