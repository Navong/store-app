import { prisma } from "@/lib/prisma";
import { Redis } from "@upstash/redis";


type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  details?: string;
}

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,  // Ensure your Upstash Redis URL
  token: process.env.UPSTASH_REDIS_REST_TOKEN! // Ensure your Redis Token
})
// Fetch product by ID
export async function getProductById(productId: number) {
  try {
    const cacheKey = `products:${productId}`;

    // Step 1: Check Redis Cache
    const cachedProduct : Product | null = await redis.get(cacheKey);

    if (cachedProduct) {
      console.log('Cache Hit'); // Log cached data
      return (cachedProduct); // Return cached product
    }
    const product = await prisma.product.findUnique({
      where: { id: productId },
      // include: {
      //   reviews: true, // Include reviews to pass as initial data
      // },
    });

    if (!product) {
      return null;
    }

    // Step 3: Save to Redis Cache
    await redis.set(cacheKey, JSON.stringify(product), {
      ex: 3600, // Set expiration time in seconds (1 hour)
    });
    console.log('Saved to Redis');

    if (!product) {
      return null;
    }

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      rating: product.rating,
      // reviews: product.reviews.map((review: { id: number; comment: string; rating: number; userName: string; date: Date }) => ({

      //   id: review.id,
      //   comment: review.comment,
      //   rating: review.rating,
      //   userName: review.userName,
      //   date: review.date,
      // })),
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Failed to fetch product');
  }
}


export async function getAllProducts() {
  const cacheKey = `products`;

  // Step 1: Check Redis Cache
  const cachedProduct = await redis.get(cacheKey);

  if (cachedProduct) {
    console.log('Cache Hit:', (cachedProduct)); // Log cached data
    return (cachedProduct); // Return cached product
  }


  try {
    const products = await prisma.product.findMany({
      orderBy: {
        rating: 'desc',
      },
    });

    // Step 3: Save to Redis Cache
    await redis.set(cacheKey, JSON.stringify(products), {
      ex: 3600, // Set expiration time in seconds (1 hour)
    });
    console.log('Saved to Redis');

    return products.map((product: { id: number; name: string; description: string; price: number; imageUrl: string; rating: number; }) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl, // Provide a default image path if imageUrl is missing

      rating: product.rating,
    }));
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
}
