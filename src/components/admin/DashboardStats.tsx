interface StatsProps {
  totalOrders: number;
  totalRevenue: number;
  lowStockCount: number;
  avgOrderValue: number;
}

export default function DashboardStats({ totalOrders, totalRevenue, lowStockCount, avgOrderValue }: StatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">Total Orders</h3>
        <p className="text-3xl font-bold">{totalOrders}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">Revenue (30d)</h3>
        <p className="text-3xl font-bold">PKR {totalRevenue.toLocaleString()}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">Average Order Value</h3>
        <p className="text-3xl font-bold">PKR {avgOrderValue.toLocaleString()}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">Low Stock Items</h3>
        <p className="text-3xl font-bold">{lowStockCount}</p>
      </div>
    </div>
  );
}