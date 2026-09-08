import { requireAdmin } from '@/lib/admin-auth';
import { getOrderById, updateOrderStatus, OrderStatus } from '@/lib/admin/orders';
import { notFound } from 'next/navigation';

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) notFound();

  async function updateStatus(formData: FormData) {
    'use server';
    const status = formData.get('status') as OrderStatus;
    await updateOrderStatus(id, status);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Order #{order.order_reference}</h1>
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><strong>Customer:</strong> {order.customer_name}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Address:</strong> {order.address}, {order.city}, {order.postal_code}</p>
          </div>
          <div>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total:</strong> PKR {order.total}</p>
            <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
          </div>
        </div>
        <form action={updateStatus} className="mt-4 flex items-end gap-2">
          <div>
            <label className="block text-sm font-medium">Update Status</label>
            <select name="status" defaultValue={order.status} className="border rounded px-3 py-2">
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
        </form>
      </div>

      <h2 className="text-xl font-semibold mb-4">Items</h2>
      <table className="w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">Product</th>
            <th className="text-left p-3">Size</th>
            <th className="text-left p-3">Color</th>
            <th className="text-right p-3">Qty</th>
            <th className="text-right p-3">Price</th>
            <th className="text-right p-3">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-3">{item.product_name}</td>
              <td className="p-3">{item.selected_size}</td>
              <td className="p-3">{item.selected_color}</td>
              <td className="text-right p-3">{item.quantity}</td>
              <td className="text-right p-3">PKR {item.unit_price}</td>
              <td className="text-right p-3">PKR {item.unit_price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
