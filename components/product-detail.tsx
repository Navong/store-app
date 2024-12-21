'use client'

import React, { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import {
    Star,
    Heart,
    Share2,
    ShoppingCart,
    Truck,
    ArrowLeft,
    Package,
    RefreshCw,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RadioGroup } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import Navbar from './navbar'
import { addToCart } from '@/lib/features/cartSlice'

interface Review {
    id: number
    comment: string
    rating: number
    userName: string
    date: Date
}

interface Product {
    id: number
    name: string
    description: string
    price: number
    imageUrl: string
    rating: number
    details?: string
    reviews: Review[]
}
  

// Components with loading states
const ProductImage = ({ url, name }: { url: string; name: string }) => (
    <div className="aspect-square overflow-hidden rounded-lg bg-muted">
        <Suspense fallback={<div className="w-full h-full animate-pulse bg-muted" />}>
            <Image
                src={url}
                alt={name}
                width={600}
                height={600}
                className="object-cover"
                priority
            />
        </Suspense>
    </div>
)

const ShippingInfo = () => {
    const options = [
        { icon: Truck, title: 'Free Shipping', desc: '2-3 business days' },
        { icon: Package, title: 'Free Returns', desc: 'Within 30 days' },
        { icon: RefreshCw, title: '2 Year Warranty', desc: 'Full coverage' },
    ]

    return (
        <Card>
            <CardContent className="grid gap-4 p-4">
                {options.map(({ icon: Icon, title, desc }, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <Icon className="h-5 w-5" />
                        <div>
                            <div className="font-medium">{title}</div>
                            <div className="text-sm text-muted-foreground">{desc}</div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

const QuantitySelector = ({
    quantity,
    onChange,
}: {
    quantity: number
    onChange: (value: number) => void
}) => (
    <div className="flex items-center border rounded-md">
        <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange(Math.max(1, quantity - 1))}
        >
            -
        </Button>
        <span className="w-12 text-center">{quantity}</span>
        <Button variant="ghost" size="sm" onClick={() => onChange(quantity + 1)}>
            +
        </Button>
    </div>
)

export default function ProductDetail({ product }: { product: Product, page: string }) {
    const [selectedColor, setSelectedColor] = React.useState('black')
    const [quantity, setQuantity] = React.useState(1)
    const dispatch = useDispatch()

    const handleAddToCart = () => {
        dispatch(addToCart({ product, quantity }))
        toast.success(`${quantity} ${product.name} added to cart`, {
            duration: 2000,
        })
    }

    return (
        <div className="min-h-screen bg-background">
            <Suspense fallback={<div className="h-16 animate-pulse bg-muted" />}>
                <Navbar />
            </Suspense>

            <div className="max-w-7xl mx-auto py-4 px-4">
                <Link href="/">
                    <Button variant="ghost" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Products
                    </Button>
                </Link>
            </div>

            <main className="max-w-5xl mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/2 space-y-4">
                        <ProductImage url={product.imageUrl} name={product.name} />
                    </div>

                    <div className="lg:w-1/2 space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold">{product.name}</h1>
                            <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center">
                                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                                    <span className="ml-1">{product.rating}</span>
                                </div>
                                <Badge variant="secondary">In Stock</Badge>
                            </div>
                        </div>

                        <div className="text-3xl font-bold">
                            ${product.price.toLocaleString()}
                        </div>

                        <p className="text-muted-foreground">{product.description}</p>

                        <div className="space-y-4">
                            <Label>Color</Label>
                            <RadioGroup
                                value={selectedColor}
                                onValueChange={setSelectedColor}
                                className="flex gap-3"
                            >
                                {/* Color options here */}
                            </RadioGroup>
                        </div>

                        <div className="space-y-4">
                            <Label>Quantity</Label>
                            <div className="flex gap-4">
                                <QuantitySelector quantity={quantity} onChange={setQuantity} />

                                <Button
                                    className="flex-1"
                                    size="lg"
                                    onClick={handleAddToCart}
                                >
                                    <ShoppingCart className="h-5 w-5 mr-2" />
                                    Add to Cart
                                </Button>

                                <Button variant="outline" size="icon">
                                    <Heart className="h-5 w-5" />
                                </Button>

                                <Button variant="outline" size="icon">
                                    <Share2 className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        <Suspense fallback={<div className="h-48 animate-pulse bg-muted rounded-lg" />}>
                            <ShippingInfo />
                        </Suspense>
                    </div>
                </div>
            </main>
        </div>
    )
}