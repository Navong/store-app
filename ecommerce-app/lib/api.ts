import { prisma} from "@/lib/prisma";

// Fetch product by ID
export async function getProductById(productId: number) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        reviews: true, // Include reviews to pass as initial data
      },
    });

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
      reviews: product.reviews.map((review) => ({
        id: review.id,
        comment: review.comment,
        rating: review.rating,
        userName: review.userName,
        date: review.date,
      })),
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Failed to fetch product');
  }
}


export async function getAllProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        rating: 'desc',
      },
    });

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      rating: product.rating,
    }));
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
}