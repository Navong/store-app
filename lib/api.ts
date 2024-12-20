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
<<<<<<< HEAD
      reviews: product.reviews.map((review: { id: number; comment: string; rating: number; userName: string; date: Date }) => ({
=======
      reviews: product.reviews.map((review) => ({
>>>>>>> e1e6e3d78cf15cb3aaaae8632875f74b3188f30b
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

<<<<<<< HEAD
    return products.map((product: { id: number; name: string; description: string; price: number; imageUrl: string; rating: number; }) => ({
=======
    return products.map((product) => ({
>>>>>>> e1e6e3d78cf15cb3aaaae8632875f74b3188f30b
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
<<<<<<< HEAD
      imageUrl: product.imageUrl, // Provide a default image path if imageUrl is missing
=======
      imageUrl: product.imageUrl,
>>>>>>> e1e6e3d78cf15cb3aaaae8632875f74b3188f30b
      rating: product.rating,
    }));
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> e1e6e3d78cf15cb3aaaae8632875f74b3188f30b
