// types/product.ts
export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    category: string;
    rating: number;
    reviews: Review[];
  }
  
  export interface Review {
    id: number;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
  }
  
  export interface FilterOptions {
    minPrice?: number;
    maxPrice?: number;
    category?: string;
    sortBy?: 'price_asc' | 'price_desc' | 'name' | 'rating';
  }