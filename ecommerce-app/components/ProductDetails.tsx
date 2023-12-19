"use client";

import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/lib/features/cartSlice';
import {  Star } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from './ui/button';



interface ProductDetailsProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    rating: number;
    details: string;
  };
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const dispatch = useDispatch();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pt-24">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Image Section */}
          <div className="relative">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-[82%] object-cover rounded-lg"
            />
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="text-xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg text-gray-700">
                  {product.rating.toFixed(1)}
                </span>
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <div className='cursor-pointer'>
                    <p className="text-gray-600 text-lg mb-4">
                      {`${product.description.substring(0, 100)}${product.description.length > 100 ? '...' : ''}`}
                    </p>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[22vw]">
                  <div className=''>
                    {product.description.length > 100 && (
                      <p className="text-gray-600 text-lg">
                        {product.description}
                      </p>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
              <div className="text-xl font-bold text-gray-900 mb-6">
                ${product.price.toFixed(2)}
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={(e) => {
                e.preventDefault();
                dispatch(addToCart({ product, quantity: 1 }));
              }}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}