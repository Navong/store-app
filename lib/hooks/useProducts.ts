export const fetchProducts = async () => {
    const response = await fetch("/api/products"); // Replace with your API endpoint
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return response.json();
};


export const fetchProductsId = async (id: string) => {
    const response = await fetch(`/api/products/${id}`); // Replace with your API endpoint
    console.log(response)
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return response.json();
};