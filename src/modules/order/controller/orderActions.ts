'use server'

import type { Address } from '@/modules/address/domain'
import type { ProductToOrder } from '../domain'
import { serverOrderController } from './serverOrderController'

export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {
  return serverOrderController().placeOrder(productIds, address)
}

export const getOrderById = async (id: string) => {
  return serverOrderController().getOrderById(id)
}

export const getOrdersByUser = async () => {
  return serverOrderController().getOrdersByUser()
}

export const getPaginatedOrders = async () => {
  return serverOrderController().getPaginatedOrders()
}
