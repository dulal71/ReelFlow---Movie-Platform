import { authClient } from './client'

export async function signOut() {
  return authClient.signOut()
}
