// app/cart/page.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from '@/lib/features/cartSlice';
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft } from 'lucide-react';
import type { RootState } from '@/lib/store';
import ShoppingCartPage from '@/components/shop-cart';
import Navbar from '@/components/navbar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  // const dispatch = useDispatch();
  // const { items, totalAmount } = useSelector((state: RootState) => state.cart);

  return (
    // <div className="">
    //   <Navbar />
    //   <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
    //     <div className="flex items-center justify-between mb-8">
    //       <h1 className="text-2xl font-bold flex items-center gap-2">
    //         <ShoppingCart className="h-6 w-6" />
    //         <p className='hidden lg:block'>Shopping Cart</p>
    //       </h1>
    //       <Link href="/">
    //         <Button variant="ghost" className="flex items-center gap-2">
    //           <ArrowLeft className="h-4 w-4" />
    //           Continue Shopping
    //         </Button>
    //       </Link>
    //     </div>

    //     <div className="flex justify-between items-center mb-4 sm:mb-6">
    //       {items.length > 0 && (
    //         <button
    //           onClick={() => dispatch(clearCart())}
    //           className="text-red-600 hover:text-red-800 flex items-center gap-2 text-sm sm:text-base"
    //         >
    //           <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
    //           Clear Cart
    //         </button>
    //       )}
    //     </div>

    //     {items.length === 0 ? (
    //       <div className="text-center py-8">
    //         <p className="text-gray-500 text-lg">Your cart is empty</p>
    //       </div>
    //     ) : (
    //       <>
    //         {items.map(item => (
    //           <div
    //             key={item.id}
    //             className="flex flex-col sm:flex-row items-center gap-4 py-4 border-b"
    //           >

    //             {/* Product Image */}
    //             <img
    //               src={item.imageUrl}
    //               alt={item.name}
    //               className="h-20 w-20 rounded-lg object-cover"
    //             />

    //             {/* Product Details */}
    //             <div className="flex-1 space-y-1">
    //               <h3 className="font-medium">{item.name}</h3>
    //               <div className="font-medium">
    //                 ${item.price.toFixed(2)}
    //               </div>
    //             </div>

    //             <img
    //               src={item.imageUrl}
    //               alt={item.name}
    //               className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded"
    //             />
    //             <div className="flex-1 text-center sm:text-left">
    //               <h3 className="font-semibold text-base sm:text-lg">{item.name}</h3>
    //               <p className="text-gray-600 text-sm sm:text-base">${item.price}</p>
    //             </div>
    //             <div className="flex items-center gap-2">
    //               <button
    //                 onClick={() => dispatch(removeFromCart(item.id))}
    //                 className="p-1 rounded hover:bg-gray-100"
    //               >
    //                 <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
    //               </button>
    //               <span className="w-6 sm:w-8 text-center">{item.quantity}</span>
    //               <button
    //                 onClick={() => dispatch(addToCart(item))}
    //                 className="p-1 rounded hover:bg-gray-100"
    //               >
    //                 <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
    //               </button>
    //             </div>
    //             <div className="text-center sm:text-right w-full sm:w-24">
    //               <p className="font-semibold text-sm sm:text-base">
    //                 ${item.total.toFixed(2)}
    //               </p>
    //             </div>
    //           </div>
    //         ))}

    //         <div className="mt-6 text-center sm:text-right sm:flex sm:justify-end sm:items-center">
    //           <p className="text-base sm:text-lg font-bold">
    //             Total: ${totalAmount.toFixed(2)}
    //           </p>
    //           <button className="mt-4 sm:ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    //             Checkout
    //           </button>
    //         </div>
    //       </>
    //     )}
    //   </div>
    // </div>
    <ShoppingCartPage />
  );
}
