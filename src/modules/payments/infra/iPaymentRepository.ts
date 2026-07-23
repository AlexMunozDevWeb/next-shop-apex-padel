import type { PaymentResult } from '../domain'

export interface iPaymentRepository {
  setTransactionId: (orderId: string, transactionId: string) => Promise<PaymentResult>
  paypalCheckPayment: (paypalTransactionId: string) => Promise<PaymentResult>
}
