import Navbar from '@/components/navbar'
import PaymentForm from './payment-form'

export default function PaymentPage() {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto max-w-md p-6">
                <h1 className="mb-6 text-2xl font-bold">Payment Details</h1>
                <PaymentForm />
            </div>
        </div>
    )
}

