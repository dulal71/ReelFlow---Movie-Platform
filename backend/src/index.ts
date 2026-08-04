import { connectToDatabase } from './db/mongo'
import { createApp } from './app'
import { env } from './config/env'

async function main() {
  await connectToDatabase()
  console.log('[server] MongoDB connected')

  const app = createApp()

  app.listen(env.port, () => {
    console.log(`[server] ReelFlow auth server listening on http://localhost:${env.port}`)
  })
}

main().catch((error) => {
  console.error('[server] Failed to start', error)
  process.exit(1)
})
