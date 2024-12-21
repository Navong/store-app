'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { processPayment } from './actions'
import { CheckCircle } from 'lucide-react'
import { clearCart } from '@/lib/features/cartSlice'

const formSchema = z.object({
    cardNumber: z.string().regex(/^\d{16}$/, 'Card number must be 16 digits'),
    expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, 'Expiry date must be in MM/YY format'),
    cvv: z.string().regex(/^\d{3}$/, 'CVV must be 3 digits'),
})

interface PaymentFormProps {
    onSuccess?: () => void;
}

export default function PaymentForm({ onSuccess }: PaymentFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    //   const { toast } = useToast()
    const dispatch = useDispatch();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cardNumber: '1234123412341234',
            expiryDate: '12/25',
            cvv: '123',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            await processPayment(values)
            setPaymentSuccess(true)
            toast.success('Payment processed successfully')
            if (onSuccess) {
                setTimeout(() => {
                    onSuccess()
                }, 2000) // Delay closing the modal to show the success message
            }
        } catch (error) {
            console.error('Payment failed:', error)
            toast.error('Payment failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    if (paymentSuccess) {
        dispatch(clearCart());
        return (
            <div className="text-center">
                <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
                <h2 className="mb-4 text-2xl font-bold">Payment Successful!</h2>
                <p className="mb-6 text-gray-600">
                    Thank you for your purchase. Your payment has been processed successfully.
                </p>
            </div>
        )
    }

    

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                                <Input placeholder="1234 5678 9012 3456" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Expiry Date</FormLabel>
                            <FormControl>
                                <Input placeholder="MM/YY" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>CVV</FormLabel>
                            <FormControl>
                                <Input placeholder="123" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button size="lg" type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? 'Processing...' : 'Pay Now'}
                </Button>
            </form>
        </Form>
    )
}

