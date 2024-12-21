// eslint-disable-next-line @typescript-eslint/no-unused-vars

"use client";

import React, { useEffect } from 'react';
import { Search, Filter, Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import Image from 'next/image';
import Navbar from '@/components/navbar';
import { useFetchProducts } from '@/lib/hooks/useFetchProduct';

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  imageUrl: string; // Renamed to match the API data field
  category: string;
  status: string;
  description: string;
  createdAt: string;
}

// Optimize image placeholder generation
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#eee" offset="20%" />
      <stop stop-color="#ddd" offset="50%" />
      <stop stop-color="#eee" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#eee" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
</svg>`;

const toBase64 = (str: string) => typeof window === 'undefined'
  ? Buffer.from(str).toString('base64')
  : window.btoa(str);

// Skeleton loader component for smooth loading states
const ProductCardSkeleton = () => (
  <div className="animate-pulse">
    <Card className="block overflow-hidden">
      <CardContent className="p-0">
        <div className="w-full aspect-[2/1] bg-gray-200" />
      </CardContent>
      <CardHeader>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
      </CardHeader>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex items-center justify-between w-full">
          <div className="h-6 bg-gray-200 rounded w-1/4" />
          <div className="h-6 bg-gray-200 rounded w-1/4" />
        </div>
        <div className="h-10 bg-gray-200 rounded w-full" />
      </CardFooter>
    </Card>
  </div>
);

// Separate ProductCard component for better performance
const ProductCard = React.memo(({ product }: { product: Product }) => (
  <Link href={`/products/${product.id}`} className="block">
    <Card className="block overflow-hidden transition-transform hover:scale-[1.02]">
      <CardContent className="p-0 relative aspect-[2/1]">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(400, 200))}`}
          priority={false} // Only set priority for above-the-fold images
        />
      </CardContent>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
        </div>
      </CardHeader>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex items-center justify-between w-full">
          <span className="text-lg font-bold">${product.price}</span>
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
  </Link>
));

ProductCard.displayName = 'ProductCard';

// Main component with optimizations
export default function ProductListing() {
  const [priceRange, setPriceRange] = React.useState([0, 1000]);
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [sortOption, setSortOption] = React.useState('popular');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = React.useState('');

  const { items: fetchedProducts, isLoading } = useFetchProducts();
  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle category selection
  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories(prev => {
      if (checked) {
        return [...prev, category];
      } else {
        return prev.filter(cat => cat !== category);
      }
    });
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Apply filters and sorting
  useEffect(() => {
    if (!fetchedProducts) return;

    let filtered = [...fetchedProducts];

    // Apply search filter first
    if (debouncedSearchQuery.trim()) {
      const searchTerms = debouncedSearchQuery.toLowerCase().split(' ');
      filtered = filtered.filter(product => {
        const searchableText = `${product.name} ${product.description || ''} ${product.category || ''}`.toLowerCase();
        return searchTerms.every(term => searchableText.includes(term));
      });
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    // Apply price range filter
    filtered = filtered.filter(({ price }) =>
      price >= priceRange[0] && price <= priceRange[1]
    );

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'popular':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [fetchedProducts, selectedCategories, priceRange, sortOption, debouncedSearchQuery]);

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div className="space-y-4">
        <h3 className="font-medium">Categories</h3>
        <div className="space-y-2">
          {['Electronics', 'Miscellaneous', 'Shoes', 'Furniture'].map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category, checked as boolean)
                }
              />
              <Label htmlFor={category}>{category}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h3 className="font-medium">Price Range</h3>
        <Slider
          defaultValue={[0, 1000]}
          max={1000}
          step={1}
          value={priceRange}
          onValueChange={setPriceRange}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar FiltersContent={FiltersContent} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar - Moved to top of page */}
        <div className="h-[52px] mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="pl-10 w-full h-[52px]"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Reserve space for filters */}
          <aside className="hidden lg:block w-64 h-fit flex-shrink-0">
            <Card className="w-full">
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
          </aside>

          {/* Product Grid */}
          <div className="flex-1 space-y-6">
            {/* Reserve space for results count and sort */}
            <div className="h-[40px] flex justify-between items-center">
              <p className="text-muted-foreground">
                {isLoading ? 'Loading...' : `Showing ${filteredProducts.length} results`}
              </p>
              <Select value={sortOption} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
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
            <div
              className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            >
              {isLoading ? (
                // Show skeleton loaders while loading
                Array.from({ length: 6 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              ) : (
                filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}