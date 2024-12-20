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

export default function ProductListing() {
  const [priceRange, setPriceRange] = React.useState([0, 1000]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = React.useState(false);
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [sortOption, setSortOption] = React.useState('popular');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = React.useState('');

  const { items: fetchedProducts, isLoading, error } = useFetchProducts();

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
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar - Moved to top of page */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="pl-10 w-full"
              placeholder="Search products by name, description, or category..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
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
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} results
                {debouncedSearchQuery && ` for "${debouncedSearchQuery}"`}
              </p>
              <Select value={sortOption} onValueChange={handleSortChange}>
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

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-8">
                <p>Loading products...</p>
              </div>
            )}

            {/* No Results State */}
            {!isLoading && filteredProducts.length === 0 && (
              <div className="text-center py-8">
                <p>No products found. Try adjusting your search or filters.</p>
              </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Card className="block overflow-hidden">
                    <CardContent className="p-0">
                      {product.imageUrl && (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-38 object-cover"
                        />
                      )}
                    </CardContent>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{product.name}</CardTitle>
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
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}