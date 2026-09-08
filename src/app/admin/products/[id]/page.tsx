import { requireAdmin } from '@/lib/admin-auth';
import { getProductWithVariants } from '@/lib/admin/products';
import { notFound } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const productData = await getProductWithVariants(parseInt(id));
  if (!productData) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <ProductForm product={productData} />
    </div>
  );
}
