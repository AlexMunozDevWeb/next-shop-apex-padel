export interface User {
  id: string
  name: string
  email: string
  emailVerified?: Date | null
  role: string
  image?: string | null
}

export type UserSortField = 'name' | 'email' | 'role'

export type GetUsersQuery = {
  orderBy: 'asc' | 'desc'
  field: UserSortField
  page: number
  pageSize: number
}
