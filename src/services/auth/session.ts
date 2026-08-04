import { authClient } from './client'

export function useSession() {
  return authClient.useSession()
}

export async function getSession() {
  return authClient.getSession()
}

export async function getUser() {
  const { data } = await authClient.getSession()
  return data?.user ?? null
}
