// app/api/products/search/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { FilterOptions } from '@/types/product';



export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get('term') || '';
  const category = searchParams.get('category') || undefined;
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
  const sortBy = searchParams.get('sortBy') as FilterOptions['sortBy'];

  try {
    const products = await prisma.product.findMany({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: term, mode: 'insensitive' } },
              { description: { contains: term, mode: 'insensitive' } },
            ],
          },
          category ? { category: { equals: category } } : {},
          minPrice ? { price: { gte: minPrice } } : {},
          maxPrice ? { price: { lte: maxPrice } } : {},
        ],
      },
      orderBy: {
        ...(sortBy === 'price_asc' && { price: 'asc' }),
        ...(sortBy === 'price_desc' && { price: 'desc' }),
        ...(sortBy === 'name' && { name: 'asc' }),
        ...(sortBy === 'rating' && { rating: 'desc' }),
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json(
      { error: 'Error searching products' },
      { status: 500 }
    );
  }
}