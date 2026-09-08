import { requireAdmin } from '@/lib/admin-auth';
import ProductForm from '@/components/admin/ProductForm';

export default async function NewProductPage() {
  await requireAdmin();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>
      <ProductForm />
    </div>
  );
}