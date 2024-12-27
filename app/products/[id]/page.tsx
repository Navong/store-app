import ProductDetail from '@/components/product-detail';
import { getProductById } from '@/lib/api';
import { Suspense } from 'react';
import { ProductDetailSkeleton } from '../../../components/loading';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  details?: string;
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const paramId = await params;
  const product: Product | null = await getProductById(parseInt(paramId.id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetail product={product} />
    </Suspense>
  );
}

