import { auth } from '@/auth.config'
import type { Address } from '@/modules/address/domain'
import { canManageUsers } from '@/modules/user/domain'
import type { ProductToOrder, OrderDetailResult, OrderListResult, OrderResult } from '../domain'
import { iOrderRepository, orderRepository } from '../infra'

export interface iOrderController {
  placeOrder: (productIds: ProductToOrder[], address: Address) => Promise<OrderResult>
  getOrderById: (id: string) => Promise<OrderDetailResult>
  getOrdersByUser: () => Promise<OrderListResult>
  getPaginatedOrders: () => Promise<OrderListResult>
}

const OrderController = (repo: iOrderRepository): iOrderController => ({
  placeOrder: async (productIds, address) => {
    const session = await auth()
    const userId = session?.user.id

    if (!userId) {
      return { ok: false, message: 'No hay sesión de usuario' }
    }

    return repo.placeOrder(userId, productIds, address)
  },

  getOrderById: async (id) => {
    const session = await auth()

    if (!session?.user) {
      return { ok: false, message: 'Debe de estar autenticado' }
    }

    const result = await repo.getOrderById(id)

    if (!result.ok) return result

    const order = result.order as { userId: string }

    if (session.user.role === 'user' && session.user.id !== order.userId) {
      return { ok: false, message: 'No tiene acceso a esta orden' }
    }

    return result
  },

  getOrdersByUser: async () => {
    const session = await auth()

    if (!session?.user) {
      return { ok: false, message: 'Debe de estar autenticado' }
    }

    return repo.getOrdersByUser(session.user.id)
  },

  getPaginatedOrders: async () => {
    const session = await auth()

    if (!canManageUsers(session?.user.role)) {
      return { ok: false, message: 'Debe de estar autenticado como admin' }
    }

    return repo.getPaginatedOrders()
  },
})

export const serverOrderController = (): iOrderController => {
  return OrderController(orderRepository)
}
