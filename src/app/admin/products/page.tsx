import { requireAdmin } from '@/lib/admin-auth';
import { getProducts } from '@/lib/db-products';
import Link from 'next/link';
import ProductActions from '@/components/admin/ProductActions';
import ProductStatusToggle from '@/components/admin/ProductStatusToggle';

export default async function AdminProductsPage() {
  await requireAdmin();
  const products = await getProducts();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/admin/products/new" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Product
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Category</th>
              <th className="text-right p-3">Price</th>
              <th className="text-right p-3">Stock</th>
              <th className="text-center p-3">Status</th><th className="text-center p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.category}</td>
                <td className="text-right p-3">PKR {product.price}</td>
                <td className="text-right p-3">{product.stock}</td>
                <td className="text-center p-3"><ProductStatusToggle id={product.id} active={product.isActive} /></td><td className="text-center p-3">
                  <Link href={`/admin/products/${product.id}`} className="text-blue-600 mr-3">Edit</Link>
                  <ProductActions id={product.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
