// pages/api/products.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,  // Ensure your Upstash Redis URL
    token: process.env.UPSTASH_REDIS_REST_TOKEN! // Ensure your Redis Token
})


export async function GET(params: { params: { id: string } }) {

    try {

        const cacheKey = `products:${params.params.id}`;

        // Step 1: Check Redis Cache
        const cachedProduct = await redis.get(cacheKey);

        if (cachedProduct) {
            console.log('Cache Hit'); // Log cached data
            return NextResponse.json(cachedProduct); // Return cached product
        }
        
        const products = await prisma.product.findMany({
            where: {
                id: Number(params.params.id),
            },
        });

        // Step 3: Save to Redis Cache
        await redis.set(cacheKey, JSON.stringify(products), {
            ex: 3600, // Set expiration time in seconds (1 hour)
        });
        console.log('Saved to Redis');

        return NextResponse.json(products);

    } catch (error) {
        // console.error("Error fetching products:", error);
        return NextResponse.json({ error });
    }
}
