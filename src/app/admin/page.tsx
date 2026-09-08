import { requireAdmin } from '@/lib/admin-auth';
import { getDashboardStats } from '@/lib/admin/stats';
import DashboardStats from '@/components/admin/DashboardStats';
import SalesChart from '@/components/admin/SalesChart';
import OrderStatusChart from '@/components/admin/OrderStatusChart';
import LowStockAlert from '@/components/admin/LowStockAlert';
import TopProducts from '@/components/admin/TopProducts';
import RecentOrders from '@/components/admin/RecentOrders';

export default async function AdminDashboard() {
  await requireAdmin();
  const stats = await getDashboardStats();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stats cards – only the four props that DashboardStats expects */}
      <DashboardStats
        totalOrders={stats.revenue.orders}
        totalRevenue={stats.revenue.total}
        lowStockCount={stats.lowStock.length}
        avgOrderValue={stats.revenue.avgOrderValue}
      />

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart data={stats.dailySales} />
        <OrderStatusChart data={stats.statusDistribution} />
      </div>

      {/* Low stock alert */}
      <LowStockAlert products={stats.lowStock} />

      {/* Top products & recent orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProducts products={stats.topProducts} />
        <RecentOrders orders={stats.recentOrders} />
      </div>
    </div>
  );
}