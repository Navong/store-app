import ProductDetail from '@/components/product-detail';
import { getProductById } from '@/lib/api';
import { Suspense } from 'react';
import { ProductDetailSkeleton } from '../../../components/loading';



export default async function ProductPage({ params }: {
  params: Promise<{ id: string, page: string }>;
}) {
  const proId = (await params).id;
  const page = (await params).page;
  const product = await getProductById(parseInt(proId));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetail product={product}/>
    </Suspense>
  )
}
