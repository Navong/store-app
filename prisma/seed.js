import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fetchDataAndSeed() {
  try {
    // Step 1: Fetch products data from the API
    const response = await axios.get('https://api.escuelajs.co/api/v1/products');
    const products = response.data;

    for (const product of products) {
      // Step 2: Extract product data (excluding category)
      const { title, price, description, images, category } = product;

      // Step 3: Insert product data
      await prisma.product.create({
        data: {
          name: title,
          price,
          description,
          imageUrl: images[0],
          category: category.name
        },
      });
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error fetching or seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fetchDataAndSeed();
