import { NuxtAuthHandler } from '#auth'
import Google from 'next-auth/providers/google'

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  // your authentication configuration here!
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    Google.default({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ]
})