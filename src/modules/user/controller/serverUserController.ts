import { auth } from '@/auth.config'
import { revalidatePath } from 'next/cache'
import { GetUsersQuery, User, canManageUsers } from '../domain'
import { iUserRepository, userRepository } from '../infra'

type ChangeUserResult = { ok: false; message: string } | { ok: true }
type PaginatedUsersResult = { ok: false; message: string } | { ok: true; users: User[]; total: number }

export interface iUserController {
  changeUserRole: (userId: string, role: string) => Promise<ChangeUserResult>
  getPaginatedUsers: (query: GetUsersQuery) => Promise<PaginatedUsersResult>
}

const UserController = (api: iUserRepository): iUserController => ({
  changeUserRole: async (userId, role) => {
    const session = await auth()

    if (!canManageUsers(session?.user.role)) {
      return {
        ok: false,
        message: 'Debe de estar autenticado como admin',
      }
    }

    const result = await api.changeUserRole(userId, role)

    if (result.ok) {
      revalidatePath('/admin/users')
    }

    return result
  },

  getPaginatedUsers: async (query) => {
    const session = await auth()

    if (!canManageUsers(session?.user.role)) {
      return {
        ok: false,
        message: 'Debe de ser un usuario administrador',
      }
    }

    return api.getPaginatedUsers(query)
  },
})

export const serverUserController = (): iUserController => {
  return UserController(userRepository)
}
