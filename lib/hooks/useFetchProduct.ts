import { useState, useEffect } from "react";

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

export const useFetchProducts = (): {
    items: Product[];
    isLoading: boolean;
    error: string | null;
} => {
    const [items, setItems] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products");
                if (!response.ok) {
                    throw new Error("Failed to fetch products.");
                }

                const data = await response.json();

                setItems(
                    data.map((product: Product) => ({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        rating: product.rating,
                        imageUrl: product.imageUrl, // Corrected to match the API data field
                        category: product.category || "",
                        status: product.status || "",
                        description: product.description || "",
                        createdAt: product.createdAt || "",
                    }))
                );
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to fetch products.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // console.log(items);

    return { items, isLoading, error };
};
