'use server'

import { serverAuthController } from './serverAuthController'

export const authenticate = async (prevState: string | undefined, formData: FormData) => {
  return serverAuthController().authenticate(prevState, formData)
}

export const login = async (email: string, password: string) => {
  return serverAuthController().login(email, password)
}

export const logout = async () => {
  return serverAuthController().logout()
}

export const registerUser = async (name: string, email: string, password: string) => {
  return serverAuthController().registerUser(name, email, password)
}
