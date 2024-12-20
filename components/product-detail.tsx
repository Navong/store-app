'use client'

import React, { useEffect } from 'react';
import {
    Star,
    Heart,
    Share2,
    ShoppingCart,
    Truck,
    ArrowLeft,
    Package,
    RefreshCw,
    ThumbsDown,
    ThumbsUp
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Navbar from './navbar';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/lib/features/cartSlice';
import { toast } from 'sonner';
import { Separator } from '@radix-ui/react-select';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from './ui/textarea';
interface PageProps {
    product: {
        id: number;
        name: string;
        description: string;
        price: number;
        imageUrl: string;
        rating: number;
        details?: string;
        reviews: {
            id: number;
            comment: string;
            rating: number;
            userName: string;
            date: Date;
        }[];
    };
    page: string;
}






export default function ProductDetail({ product, page }: PageProps) {
    const [selectedColor, setSelectedColor] = React.useState("black");
    const [quantity, setQuantity] = React.useState(1);
    const dispatch = useDispatch();
    const [selectAddItem, setSelectAddItem] = React.useState(false);

    useEffect(() => {
        if (selectAddItem) {
            const toastId = toast.success(`${quantity} Product added to cart`, {
                position: "bottom-right",
            });
            const timer = setTimeout(() => toast.dismiss(toastId), 3000);
            setSelectAddItem(false);
            return () => clearTimeout(timer);
        }
    }, [selectAddItem, quantity]);

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation Breadcrumb */}
            <Navbar />
            <div className="max-w-7xl mx-auto py-4">
                <Link href={`/`}>
                    <Button variant="ghost" className="flex items-center gap-2" >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Products
                    </Button>
                </Link>

            </div>

            <main className="max-w-5xl mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Product Images */}
                    <div className="lg:w-1/2 space-y-4">
                        <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                    </div>

                    {/* Product Info */}
                    <div className="lg:w-1/2 space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold">{product.name}</h1>
                            <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center">
                                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                                    <span className="ml-1">{product.rating}</span>
                                    {/* <span className="text-muted-foreground ml-1">
                                        ({product} reviews)
                                    </span> */}
                                </div>
                                <Badge variant="secondary">In Stock</Badge>
                            </div>
                        </div>

                        <div className="text-3xl font-bold">${product.price}</div>

                        <p className="text-muted-foreground">{product.description}</p>

                        {/* Color Selection */}
                        <div className="space-y-4">
                            <Label>Color</Label>
                            <RadioGroup
                                value={selectedColor}
                                onValueChange={setSelectedColor}
                                className="flex gap-3"
                            >
                                {/* {product.colors.map((color) => (
                                    <div key={color.value} className="flex items-center space-x-2">
                                        <RadioGroupItem value={color.value} id={color.value} />
                                        <Label htmlFor={color.value}>{color.name}</Label>
                                    </div>
                                ))} */}
                            </RadioGroup>
                        </div>

                        {/* Quantity and Add to Cart */}
                        <div className="space-y-4">
                            <Label>Quantity</Label>
                            <div className="flex gap-4">
                                <div className="flex items-center border rounded-md">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >
                                        -
                                    </Button>
                                    <span className="w-12 text-center">{quantity}</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        +
                                    </Button>
                                </div>

                                <Button
                                    className="flex-1"
                                    size="lg"
                                    onClick={() => {
                                        dispatch(
                                            addToCart({ product, quantity }),
                                        );
                                        setSelectAddItem(true);
                                    }}
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


                        {/* Delivery Options */}
                        <Card>
                            <CardContent className="grid gap-4 p-4">
                                <div className="flex items-center gap-4">
                                    <Truck className="h-5 w-5" />
                                    <div>
                                        <div className="font-medium">Free Shipping</div>
                                        <div className="text-sm text-muted-foreground">2-3 business days</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Package className="h-5 w-5" />
                                    <div>
                                        <div className="font-medium">Free Returns</div>
                                        <div className="text-sm text-muted-foreground">Within 30 days</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <RefreshCw className="h-5 w-5" />
                                    <div>
                                        <div className="font-medium">2 Year Warranty</div>
                                        <div className="text-sm text-muted-foreground">Full coverage</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    {/* Comments Section */}

                    {/* <div className="pl-10 lg:w-3/12">
                        <CommentSection />
                    </div> */}
                </div>
            </main>
        </div>
    );
};

