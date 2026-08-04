import express from 'express'
import { toNodeHandler, fromNodeHeaders } from 'better-auth/node'
import { auth } from './auth/auth'

type AuthInstance = typeof auth

export function createApp(instance: AuthInstance = auth): express.Express {
  const app = express()

  app.all('/api/auth/*', toNodeHandler(instance))

  app.get('/api/me', async (req, res) => {
    const session = await instance.api.getSession({
      headers: fromNodeHeaders(req.headers),
    })
    res.json(session)
  })

  return app
}
