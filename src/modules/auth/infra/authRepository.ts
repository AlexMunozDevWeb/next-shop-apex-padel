import { signIn, signOut } from '@/auth.config'
import { prisma } from '@/modules/shared/lib/prisma'
import { AuthError } from 'next-auth'
import bcryptjs from 'bcryptjs'
import { iAuthRepository } from './iAuthRepository'

export const authRepository: iAuthRepository = {
  login: async (email, password) => {
    try {
      await signIn('credentials', { email, password })
      return { ok: true }
    } catch (error) {
      return { ok: false, message: 'No se pudo iniciar sesión' }
    }
  },

  authenticate: async (prevState, formData) => {
    try {
      await signIn('credentials', { ...Object.fromEntries(formData), redirect: false })
      return 'Success'
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials'
          default:
            return 'Unknown error'
        }
      }
      throw error
    }
  },

  logout: async () => {
    await signOut()
  },

  registerUser: async (name, email, password) => {
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email: email.toLowerCase(),
          password: bcryptjs.hashSync(password),
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      })
      return { ok: true, user, message: 'Usuario creado' }
    } catch (error) {
      console.log(error)
      return { ok: false, message: 'No se pudo crear el usuario' }
    }
  },
}
