'use server'

import { z } from 'zod'

const paymentSchema = z.object({
  cardNumber: z.string(),
  expiryDate: z.string(),
  cvv: z.string(),
})

export async function processPayment(data: z.infer<typeof paymentSchema>) {
  const result = paymentSchema.safeParse(data)
  
  if (!result.success) {
    throw new Error('Invalid payment data')
  }

  // Simulate payment processing delay
  await new Promise(resolve => setTimeout(resolve, 2000))

  // In a real application, you would process the payment here
  // For this example, we'll just return a success message
  return { success: true, message: 'Payment processed successfully' }
}

