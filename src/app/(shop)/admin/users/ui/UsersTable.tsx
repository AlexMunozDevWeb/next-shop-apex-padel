'use client'

import { useUserController } from '@/modules/user/controller/clientUserController'
import { User } from '@/modules/user/domain'

interface Props {
  users: User[]
}

export const UsersTable = ({ users }: Props) => {
  const { changeUserRole } = useUserController()

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e3e2e7] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#e3e2e7] bg-[#f4f3f8] tracking-wider text-[#4c4546] uppercase">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 font-extrabold"
              >
                Correo Electrónico
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-extrabold"
              >
                Nombre Completo
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-extrabold"
              >
                Rol Asignado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f4f3f8]">
            {users.map((user) => (
              <tr
                key={user.id}
                className="transition-colors hover:bg-[#faf8fe]"
              >
                <td className="px-6 py-4 font-medium text-[#1a1b1f]">{user.email}</td>
                <td className="px-6 py-4 font-bold text-[#1a1b1f]">{user.name}</td>
                <td className="px-6 py-3">
                  <select
                    value={user.role}
                    onChange={(e) => changeUserRole(user.id, e.target.value)}
                    className="rounded-lg border border-[#e3e2e7] bg-white px-3 py-1.5 text-xs font-bold text-[#1a1b1f] transition-colors focus:border-black focus:outline-none"
                  >
                    <option value="admin">Administrador</option>
                    <option value="user">Cliente (User)</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
