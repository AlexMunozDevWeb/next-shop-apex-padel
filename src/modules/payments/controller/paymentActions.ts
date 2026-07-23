'use server'

import { serverPaymentController } from './serverPaymentController'

export const setTransactionId = async (orderId: string, transactionId: string) => {
  return serverPaymentController().setTransactionId(orderId, transactionId)
}

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  return serverPaymentController().paypalCheckPayment(paypalTransactionId)
}
