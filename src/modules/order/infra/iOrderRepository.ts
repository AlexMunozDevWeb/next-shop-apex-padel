import type { Address } from '@/modules/address/domain'
import type { ProductToOrder, OrderDetailResult, OrderListResult, OrderResult } from '../domain'

export interface iOrderRepository {
  placeOrder: (userId: string, productIds: ProductToOrder[], address: Address) => Promise<OrderResult>
  getOrderById: (id: string) => Promise<OrderDetailResult>
  getOrdersByUser: (userId: string) => Promise<OrderListResult>
  getPaginatedOrders: () => Promise<OrderListResult>
}
