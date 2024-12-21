import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { updateQuantity, removeItem } from '@/lib/features/cartSlice';
import {
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  ArrowLeft,
  CreditCard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import Navbar from './navbar';
import { PaymentModal } from './payment-modal';
import Image from 'next/image';

export default function ShoppingCartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <ShoppingCart className="h-6 w-6" />
              <p className="hidden lg:block">Shopping Cart</p>
            </h1>
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <Card>
                <CardHeader>
                  <CardTitle>Cart Items ({cartItems.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.id}>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-20 w-20 rounded-lg object-cover"
                        />

                        <div className="flex-1 space-y-1">
                          <h3 className="font-medium">{item.name}</h3>
                          {/* <div className="text-sm text-muted-foreground">
                            Color: {item.color} | Size: {item.size}
                          </div> */}
                          <div className="font-medium">${item.price.toFixed(2)}</div>
                        </div>

                        <div className="flex sm:flex-col items-start sm:items-end gap-4 sm:gap-2">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                            onClick={() => dispatch(removeItem(item.id))}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                      <Separator className="my-4" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="lg:w-80">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild size="lg" className="w-full">
                    {cartItems.length > 0 ? (
                      <>
                        <Button size="lg" className="w-full" onClick={() => setIsModalOpen(true)}>
                          <CreditCard className="h-5 w-5 mr-2" />
                          Proceed to Payment
                        </Button>
                        <PaymentModal open={isModalOpen} onOpenChange={setIsModalOpen} />
                      </>
                    ) : (
                      <span>Cart is empty</span>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}