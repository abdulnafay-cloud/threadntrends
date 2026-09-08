import Link from 'next/link';

interface LowStockProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  size: string;
  color: string;
  stock: number;
  image: string;
}

export default function LowStockAlert({ products }: { products: LowStockProduct[] }) {
  if (products.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
        <h3 className="text-sm font-medium text-gray-700">✅ Stock Status</h3>
        <p className="text-green-600 text-sm">All products have sufficient stock.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
      <h3 className="text-sm font-medium text-gray-700">⚠️ Low Stock Alert</h3>
      <p className="text-red-600 text-sm mb-3">{products.length} items need restock.</p>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Product</th>
              <th className="text-left">Variant</th>
              <th className="text-left">Stock</th>
              <th className="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.slice(0, 5).map((p) => (
              <tr key={`${p.id}-${p.size}-${p.color}`} className="border-b">
                <td className="py-2">{p.name}</td>
                <td>{p.size} / {p.color}</td>
                <td className="font-bold text-red-600">{p.stock}</td>
                <td>
                  <Link href={`/admin/products/${p.id}`} className="text-blue-600 underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length > 5 && (
          <p className="text-xs text-gray-500 mt-2">+ {products.length - 5} more</p>
        )}
      </div>
    </div>
  );
}