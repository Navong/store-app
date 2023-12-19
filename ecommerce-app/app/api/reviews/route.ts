import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST: Create a new review
export async function POST(request: Request) {
  try {
    // Use a default anonymous user for testing
    const user = {
      id: 'anonymous',
      firstName: 'Anonymous',
    };

    // Parse the request body
    const body = await request.json();
    const { productId, rating, comment } = body;

    if (!productId || !rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Invalid data. Ensure productId and rating (1-5) are provided.' },
        { status: 400 }
      );
    }

    // Create the review
    const review = await prisma.review.create({
      data: {
        productId: parseInt(productId),
        userId: user.id,
        userName: user.firstName,
        rating,
        comment,
        date: new Date().toISOString(),
      },
    });

    // Recalculate and update product's average rating
    const reviews = await prisma.review.findMany({
      where: { productId: parseInt(productId) },
    });
    const avgRating =
      reviews.reduce((total, rev) => total + rev.rating, 0) / reviews.length;

    await prisma.product.update({
      where: { id: parseInt(productId) },
      data: { rating: avgRating },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Error creating review.' },
      { status: 500 }
    );
  }
}

// GET: Retrieve reviews for a specific product
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required.' }, { status: 400 });
    }

    const reviews = await prisma.review.findMany({
      where: { productId: parseInt(productId) },
      orderBy: { date: 'desc' },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Error fetching reviews.' },
      { status: 500 }
    );
  }
}
