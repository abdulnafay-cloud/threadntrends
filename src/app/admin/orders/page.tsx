import { requireAdmin } from '@/lib/admin-auth';
import { getOrders } from '@/lib/admin/orders';
import OrdersTable from '@/components/admin/OrdersTable';
import ExportOrdersButton from '@/components/admin/ExportOrdersButton';

export default async function AdminOrdersPage() {
  await requireAdmin();
  const orders = await getOrders();

  return (
    <div>
      <div className="flex items-center justify-between mb-6"><h1 className="text-2xl font-bold">Orders</h1><ExportOrdersButton orders={orders} /></div>
      <OrdersTable orders={orders} />
    </div>
  );
}
