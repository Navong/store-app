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
// import { PageProps } from '@/.next/types/app/layout';
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
}



const CommentSection = () => {
    const [comments] = React.useState([
        {
            id: 1,
            user: {
                name: "Sarah Johnson",
                avatar: "/api/placeholder/32/32"
            },
            rating: 5,
            date: "2 days ago",
            content: "Absolutely love this product! The quality is outstanding and it exceeded my expectations. Would definitely recommend to others.",
            likes: 12,
            dislikes: 1,
            verified: true
        },
        {
            id: 2,
            user: {
                name: "Mike Smith",
                avatar: "/api/placeholder/32/32"
            },
            rating: 4,
            date: "1 week ago",
            content: "Great product overall. The only minor issue is the delivery took a bit longer than expected, but the quality makes up for it.",
            likes: 8,
            dislikes: 2,
            verified: true
        }
    ]);
    const [newComment, setNewComment] = React.useState("");

    return (
        <Card className="w-full lg:w-80">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Customer Reviews
                    <Badge variant="secondary">
                        {comments.length} reviews
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Add New Comment */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Button
                                key={star}
                                variant="ghost"
                                size="sm"
                                className="p-0 h-auto"
                            >
                                <Star
                                    className="h-4 w-4"
                                    fill={star <= 4 ? "gold" : "transparent"}
                                />
                            </Button>
                        ))}
                    </div>
                    <Textarea
                        placeholder="Write your review..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="resize-none"
                    />
                    <Button className="w-full">
                        Submit Review
                    </Button>
                </div>

                <Separator />

                {/* Comments List */}
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="space-y-2">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={comment.user.avatar} />
                                        <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">{comment.user.name}</span>
                                            {comment.verified && (
                                                <Badge variant="secondary" className="text-xs">
                                                    Verified
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="flex">
                                                {Array(5).fill(0).map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className="h-3 w-3"
                                                        fill={i < comment.rating ? "gold" : "transparent"}
                                                    />
                                                ))}
                                            </div>
                                            <span>·</span>
                                            <span>{comment.date}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <p className="text-sm">{comment.content}</p>
                            <div className="flex items-center gap-4">
                                <Button variant="ghost" size="sm" className="text-muted-foreground">
                                    <ThumbsUp className="h-4 w-4 mr-1" />
                                    {comment.likes}
                                </Button>
                                <Button variant="ghost" size="sm" className="text-muted-foreground">
                                    <ThumbsDown className="h-4 w-4 mr-1" />
                                    {comment.dislikes}
                                </Button>
                            </div>
                            <Separator />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default function ProductDetail({ product }: PageProps) {
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
                <Link href="/">
                    <Button variant="ghost" className="flex items-center gap-2">
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
                        {/* <div className="grid grid-cols-4 gap-4">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`aspect-square rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-primary' : 'border-transparent'
                                        }`}
                                >
                                    <img
                                        src={image}
                                        alt={`Product ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div> */}
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
                    <div className="pl-10 lg:w-3/12">
                        <CommentSection />
                    </div>
                </div>
            </main>
        </div>
    );
};

