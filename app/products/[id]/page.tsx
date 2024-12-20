// app/products/[id]/page.tsx
import ProductDetail from '@/components/product-detail';
import { getProductById } from '@/lib/api';



export default async function ProductPage({ params }: {
  params: Promise<{ id: string, page: string }>;
}) {
  const proId = (await params).id;
  const page = (await params).page;
  const product = await getProductById(parseInt(proId));

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetail product={product} page={page} />;
}
