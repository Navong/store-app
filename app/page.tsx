/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";


import React, { useEffect } from 'react';
import { Search, ShoppingCart, Filter, Star, Menu } from 'lucide-react';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Link from 'next/link';
import Navbar from '@/components/navbar';
import { getAllProducts } from '@/lib/api';
import { useFetchProducts } from '@/lib/hooks/useFetchProduct';
import { products } from '@/lib/data';
import { it } from 'node:test';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  rating?: number;
}

export default function ProductListing() {
  const [priceRange, setPriceRange] = React.useState([0]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = React.useState(false);


  const { items: fetchedProducts, isLoading, error } = useFetchProducts();

  // console.log(fetchedProducts);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  // const products = [
  //   {
  //     id: 1,
  //     name: "Premium Wireless Headphones",
  //     price: 199.99,
  //     rating: 4.5,
  //     image: "/api/placeholder/200/200",
  //     category: "Electronics",
  //     status: "In Stock"
  //   },
  //   {
  //     id: 2,
  //     name: "Organic Cotton T-Shirt",
  //     price: 29.99,
  //     rating: 4.8,
  //     image: "/api/placeholder/200/200",
  //     category: "Clothing",
  //     status: "Low Stock"
  //   },
  // ];

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div className="space-y-4">
        <h3 className="font-medium">Categories</h3>
        <div className="space-y-2">
          {['Electronics', 'Clothing', 'Books', 'Home'].map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox id={category} />
              <Label htmlFor={category}>{category}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h3 className="font-medium">Price Range</h3>
        <Slider
          defaultValue={[0]}
          max={1000}
          step={1}
          value={priceRange}
          onValueChange={setPriceRange}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>$1000</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar - hidden on mobile */}
          <Card className="hidden lg:block w-64 h-fit flex-shrink-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FiltersContent />
            </CardContent>
          </Card>

          {/* Product Grid */}
          <div className="flex-1 space-y-6">
            {/* Sort Controls */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center">
              {/* <p className="text-muted-foreground">
                Showing {products.length} results
              </p> */}
              <Select defaultValue="popular">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* {featuredProducts.map((product: Product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            ))} */}

            {/* Products Grid */}
            < div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" >
              {
                fetchedProducts.map(product => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    {/* <a className="block"> */}
                    <Card className="block overflow-hidden">
                      <CardContent className="p-0">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-38 object-cover"
                          />
                        ) : null}
                      </CardContent>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{product.name}</CardTitle>
                          {/* <Badge variant={product.status === "In Stock" ? "default" : "secondary"}>
                            {product.status}
                          </Badge> */}
                        </div>
                      </CardHeader>
                      <CardFooter className="flex flex-col gap-4">
                        <div className="flex items-center justify-between w-full">
                          <span className="text-lg font-bold">
                            ${product.price}
                          </span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm text-muted-foreground">
                              {product.rating}
                            </span>
                          </div>
                        </div>
                        <Button className="w-full">View Product</Button>
                      </CardFooter>
                    </Card>
                    {/* </a> */}
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
      </main >
    </div >
  );
};

// export default ProductListing;