import { createAuthClient } from 'better-auth/react'

function getBaseUrl(): string {
  const url = import.meta.env.BETTER_AUTH_URL
  if (!url) {
    throw new Error('BETTER_AUTH_URL is not set')
  }
  return url
}

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
})

export const { signIn, signUp, signOut, useSession } = authClient

export type Session = typeof authClient.$Infer.Session
export type User = typeof authClient.$Infer.Session.user
