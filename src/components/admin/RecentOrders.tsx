interface RecentOrder {
  id: string;
  reference: string;
  customer: string;
  total: number;
  status: string;
  createdAt: string | Date;
}

export default function RecentOrders({ orders }: { orders: RecentOrder[] }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-sm font-medium text-gray-700 mb-4">Recent Orders</h3>
      {orders.length === 0 ? <p className="text-gray-400 text-center py-4">No orders yet</p> : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
              <div><p className="font-medium">{order.reference}</p><p className="text-xs text-gray-500">{order.customer}</p></div>
              <div className="text-right"><p className="font-medium">PKR {Number(order.total).toLocaleString()}</p><p className="text-xs capitalize text-gray-500">{order.status}</p></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
