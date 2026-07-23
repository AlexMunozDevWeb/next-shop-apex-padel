import { prisma } from '@/modules/shared/lib/prisma'
import { iUserRepository } from './iUserRepository'

export const userRepository: iUserRepository = {
  changeUserRole: async (userId: string, role: string) => {
    try {
      const newRole = role === 'admin' ? 'admin' : 'user'

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          role: newRole,
        },
      })

      return {
        ok: true,
      }
    } catch (error) {
      console.log(error)
      return {
        ok: false,
        message: 'No se pudo actualizar el role, revisar logs',
      }
    }
  },
  getPaginatedUsers: async (query) => {
    const { page, pageSize, field, orderBy } = query

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        omit: { password: true },
        orderBy: { [field]: orderBy },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.user.count(),
    ])

    return {
      ok: true,
      users,
      total,
    }
  },
}
