export const revalidate = 0

import { Pagination, Title } from '@/modules/shared/ui/components'
import { redirect } from 'next/navigation'
import { UsersTable } from './ui/UsersTable'
import { serverUserController } from '@/modules/user/controller/serverUserController'

interface Props {
  searchParams: Promise<{ page?: string }>
}

const PAGE_SIZE = 10

export default async function AdminUsersPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams
  const page = Number(pageParam) || 1

  const { getPaginatedUsers } = serverUserController()

  const response = await getPaginatedUsers({
    orderBy: 'asc',
    field: 'name',
    page,
    pageSize: PAGE_SIZE,
  })

  if (!response.ok) {
    redirect('/auth/login')
  }

  const { users = [], total } = response
  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div className="space-y-6 pb-16">
      <Title
        title="Gestión de Usuarios"
        subtitle="Administra los permisos y roles de los usuarios registrados."
        className="my-0"
      />

      <UsersTable users={users} />

      <Pagination totalPages={totalPages} />
    </div>
  )
}
