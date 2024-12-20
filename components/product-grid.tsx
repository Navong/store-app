import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PageProps {
    id: number;
    name: string;
    price: number;
    rating: number;
    imageUrl: string; // Renamed to match the API data field
    category: string;
    status: string;
}

const ProductGrid = ({ products, itemsPerPage = 6 }: { products: PageProps[]; itemsPerPage?: number }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate total number of pages
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Get current products
    const indexOfLastItem = (currentPage || 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    // console.log(currentPage);





    // Generate page numbers for pagination
    const generatePaginationItems = () => {
        let items = [];

        // Always show first page
        items.push(
            <PaginationItem key="1">
                <PaginationLink
                    onClick={() => handlePageChange(1)}
                    isActive={currentPage === 1}
                >
                    1
                </PaginationLink>
            </PaginationItem>
        );

        // Add ellipsis if needed
        if (currentPage > 3) {
            items.push(
                <PaginationItem key="ellipsis1">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        // Add current page and surrounding pages
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            if (i === 1 || i === totalPages) continue;
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        onClick={() => handlePageChange(i)}
                        isActive={currentPage === i}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Add ellipsis if needed
        if (currentPage < totalPages - 2) {
            items.push(
                <PaginationItem key="ellipsis2">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        // Always show last page if there's more than one page
        if (totalPages > 1) {
            items.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink
                        onClick={() => handlePageChange(totalPages)}
                        isActive={currentPage === totalPages}
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return items;
    };



    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map(product => (
                    <Link key={product.id} href={`/products/${product.id}?page=${currentPage}`}>
                        <Card className="block overflow-hidden">
                            <CardContent className="p-0">
                                {product.imageUrl ? (
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-38 object-cover"
                                    />
                                ) : null}
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

            <Pagination className="justify-center">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                        />
                    </PaginationItem>

                    {generatePaginationItems()}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default ProductGrid;
