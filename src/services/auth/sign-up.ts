import { authClient } from './client'

export interface SignUpParams {
  name: string
  email: string
  password: string
  image?: string
  callbackURL?: string
}

export async function signUp({ name, email, password, image, callbackURL }: SignUpParams) {
  return authClient.signUp.email({
    name,
    email,
    password,
    ...(image ? { image } : {}),
    ...(callbackURL ? { callbackURL } : {}),
  })
}
