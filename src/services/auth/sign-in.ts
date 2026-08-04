import { authClient } from './client'

export interface SignInParams {
  email: string
  password: string
  callbackURL?: string
}

export async function signIn({ email, password, callbackURL }: SignInParams) {
  return authClient.signIn.email({
    email,
    password,
    ...(callbackURL ? { callbackURL } : {}),
  })
}
