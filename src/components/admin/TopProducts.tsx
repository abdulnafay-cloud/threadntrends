interface TopProduct {
  name: string;
  productId: number;
  totalSold: number;
  totalRevenue: number;
}

export default function TopProducts({ products }: { products: TopProduct[] }) {
  if (products.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-700 mb-4">🏆 Top Selling Products</h3>
        <p className="text-gray-400 text-center py-4">No sales yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-sm font-medium text-gray-700 mb-4">🏆 Top Selling Products</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Product</th>
            <th className="text-right">Sold</th>
            <th className="text-right">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.productId} className="border-b">
              <td className="py-2">{p.name}</td>
              <td className="text-right">{p.totalSold}</td>
              <td className="text-right">PKR {p.totalRevenue.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}