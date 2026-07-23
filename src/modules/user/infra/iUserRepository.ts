import { GetUsersQuery, User } from '../domain'

export interface iUserRepository {
  changeUserRole: (userId: string, role: string) => Promise<{ ok: false; message: string } | { ok: true }>
  getPaginatedUsers: (
    query: GetUsersQuery
  ) => Promise<{ ok: false; message: string } | { ok: true; users: User[]; total: number }>
}
