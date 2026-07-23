import { revalidatePath } from 'next/cache'
import type { PaymentResult } from '../domain'
import { iPaymentRepository, paymentRepository } from '../infra'

export interface iPaymentController {
  setTransactionId: (orderId: string, transactionId: string) => Promise<PaymentResult>
  paypalCheckPayment: (paypalTransactionId: string) => Promise<PaymentResult>
}

const PaymentController = (repo: iPaymentRepository): iPaymentController => ({
  setTransactionId: (orderId, transactionId) => repo.setTransactionId(orderId, transactionId),

  paypalCheckPayment: async (paypalTransactionId) => {
    const result = await repo.paypalCheckPayment(paypalTransactionId)

    if (result.ok) {
      revalidatePath(`/orders/${paypalTransactionId}`)
    }

    return result
  },
})

export const serverPaymentController = (): iPaymentController => {
  return PaymentController(paymentRepository)
}
