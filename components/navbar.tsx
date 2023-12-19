import React from 'react'
import {
    Sheet,
    SheetContent,
    
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Checkbox } from '@radix-ui/react-checkbox';
import { Label } from '@radix-ui/react-label';
import { Slider } from '@radix-ui/react-slider';
import { Menu, Search, ShoppingCart } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';



function Navbar() {
    const [priceRange, setPriceRange] = React.useState([0]);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = React.useState(false);
    const { totalQuantity } = useSelector((state: RootState) => state.cart);


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
        <div className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Mobile menu button */}
                    <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <SheetHeader>
                                <SheetTitle>Filters</SheetTitle>
                            </SheetHeader>
                            <div className="mt-6">
                                <FiltersContent />
                            </div>
                        </SheetContent>
                    </Sheet>

                    {/* Logo */}
                    <Link href="/">
                        <div className="flex-shrink-0">
                            <span className="text-xl font-bold">YourStore</span>
                        </div>
                    </Link>

                    {/* Search - hidden on mobile */}
                    <div className="hidden md:flex flex-1 max-w-xl mx-8">
                        <div className="relative w-full">
                            <Input
                                type="text"
                                placeholder="Search products..."
                                className="w-full"
                            />
                            <Search className="absolute right-3 top-2.5 text-muted-foreground h-5 w-5" />
                        </div>
                    </div>

                    {/* Cart */}
                    <Link href="/cart">
                        <Button variant="ghost" size="icon" className="relative">
                            <ShoppingCart className="h-6 w-6" />
                            {totalQuantity > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {totalQuantity}
                                </span>
                            )}
                        </Button>
                    </Link>
                </div>

                {/* Mobile search - visible only on mobile */}
                <div className="md:hidden pb-4">
                    <Input
                        type="text"
                        placeholder="Search products..."
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    )
}

export default Navbar;
