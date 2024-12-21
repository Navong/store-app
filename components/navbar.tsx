
"use client";

import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Menu, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';



function Navbar({FiltersContent = () => null}: {FiltersContent?: React.ComponentType<Record<string, unknown>>} = {}) {
    // const [priceRange, setPriceRange] = React.useState([0]);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = React.useState(false);
    const { totalQuantity } = useSelector((state: RootState) => state.cart);

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
                        <SheetContent side="left" onClick={() => setIsMobileFiltersOpen(false)}>
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
                            <span className="text-xl font-extrabold tracking-wide">MYSTORE</span>
                        </div>
                    </Link>

            

                    {/* Cart */}
                    <Link href="/cart">
                        <div className="relative hover:bg-secondary hover:text-secondary-foreground hover:rounded-lg cursor-pointer">
                            <ShoppingCart className="h-7 w-7" />
                            {totalQuantity > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {totalQuantity}
                                </span>
                            )}
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
