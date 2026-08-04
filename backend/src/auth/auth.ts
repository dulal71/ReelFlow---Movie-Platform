import { betterAuth } from 'better-auth/minimal'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import { env } from '../config/env'
import { getDb, getMongoClient } from '../db/mongo'

export const auth = betterAuth({
  appName: 'ReelFlow',
  baseURL: env.betterAuthUrl,
  secret: env.betterAuthSecret,
  trustedOrigins: [env.frontendUrl],
  database: mongodbAdapter(getDb(), {
    client: getMongoClient(),
  }),
  emailAndPassword: {
    enabled: true,
  },
})
