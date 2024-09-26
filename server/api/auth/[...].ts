import { NuxtAuthHandler } from '#auth'
import Google from 'next-auth/providers/google'
import { users } from '~/server/database/schema'
import { eq } from 'drizzle-orm'
import {generateUniqueUsername} from '~/server/utils/username-gen'
import { createId } from '@paralleldrive/cuid2'


export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    Google.default({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async signIn({ account, user }) {
      try {
        if (account && user && user.email) {
          const db = useDrizzle()
          const userExist = await db.select().from(users).where(eq(users.email, user.email)).get()
          const allUsernames = (await db.select().from(users)).map((user) => user.username).filter((username): username is string => username !== null); // Filter out null values
          const uniqueUsernames = new Set<string>(allUsernames);
          const generatedUsername = generateUniqueUsername(user.name!, user.email, uniqueUsernames)
          if (!userExist) {
            console.log('User does not exist, creating new user: ', user.email, generatedUsername , createId())
            await db.insert(users).values({
              email: user.email,
              name: user.name || '',
              avatar: user.image || '',
              username: generatedUsername,
            }).run()
          }
        }
        return true
      } catch (error) {
        console.error('Sign in error:', error)
        return false
      }
    },
    async jwt({ token, user, account }) {
      try {
        const db = useDrizzle()
        if (account && user && user.email) {
          const existingUser = await db.select().from(users).where(eq(users.email, user.email)).get()

          if (existingUser) {
            token.userId = existingUser.id
            token.email = existingUser.email
            token.name = existingUser.name
            token.username = existingUser.username
          }
        }
        return token
      } catch (error) {
        console.error('JWT error:', error)
        return token
      }
    },
    async session({ session, token }) {
      try {
        if (token && session.user) {
          session.user.id = token.userId as string
          session.user.email = token.email as string
          session.user.name = token.name as string
          session.user.username = token.username as string
        }
        return session
      } catch (error) {
        console.error('Session error:', error)
        return session
      }
    },
  },
  pages: {
    signOut: '/',
  },
})