// components/Header.tsx
'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { ShoppingCart } from 'lucide-react';
import type { RootState } from '@/lib/store';

export default function Header() {
  const { totalQuantity } = useSelector((state: RootState) => state.cart);

  return (
    <nav className="bg-gray-800 p-4 fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          Shop Name
        </Link>
        
        <Link href="/cart" className="relative">
          <ShoppingCart className="text-white w-6 h-6" />
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalQuantity}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
