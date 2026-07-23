'use server'

import { serverUserController } from './serverUserController'

export const changeUserRoleAction = async (userId: string, role: string) => {
  return serverUserController().changeUserRole(userId, role)
}
