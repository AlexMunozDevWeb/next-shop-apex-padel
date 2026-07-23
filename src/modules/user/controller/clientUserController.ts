import { changeUserRoleAction } from './userActions'

type ChangeUserResult = { ok: false; message: string } | { ok: true }

export interface iUserController {
  changeUserRole: (userId: string, role: string) => Promise<ChangeUserResult>
}

export const useUserController = (): iUserController => {
  return {
    changeUserRole: (userId, role) => changeUserRoleAction(userId, role),
  }
}
