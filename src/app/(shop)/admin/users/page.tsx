export const revalidate = 0

// https://tailwindcomponents.com/component/hoverable-table
import { Pagination, Title } from '@/modules/components'

import { redirect } from 'next/navigation'
import { UsersTable } from './ui/UsersTable'

import { serverUserController } from '@/modules/user/controller/serverUserController'

interface Props {
  searchParams: Promise<{ page?: string }>
}

const PAGE_SIZE = 10

export default async function OrdersPage({ searchParams }: Props) {
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
    <>
      <Title
        className=""
        title="Mantenimiento de usuarios"
      />

      <div className="mb-10">
        <UsersTable users={users} />

        <Pagination totalPages={totalPages} />
      </div>
    </>
  )
}
