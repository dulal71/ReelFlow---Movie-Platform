import { config } from 'dotenv'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const envFilePath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../../.env',
)

config({ path: envFilePath })

const toNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value)
  return Number.isNaN(parsed) ? fallback : parsed
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: toNumber(process.env.PORT, 3000),
  mongodbUri: process.env.MONGODB_URI ?? '',
  betterAuthSecret: process.env.BETTER_AUTH_SECRET ?? '',
  betterAuthUrl: process.env.BETTER_AUTH_URL ?? 'http://localhost:3000',
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:5173',
}
