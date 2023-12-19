import { useState, useEffect } from "react";

interface Product {
    id: number;
    name: string;
    price: number;
    rating: number;
    image: string;
    category: string;
    status: string;
}

export const useFetchProducts = () => {
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

                // console.log(data);

                setItems(
                    data.map((product : Product) => ({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        rating: product.rating,
                        image: product.image,
                        category: product.category || "", // Replace or map if necessary
                        status: product.status || "", // Replace or map if necessary
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

    return { items, isLoading, error };
};