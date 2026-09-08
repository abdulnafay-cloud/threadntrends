import "server-only";
import { database, ensureAuthSchema } from "@/lib/db";

export async function getDashboardStats() {
  await ensureAuthSchema();

  // ---- 1. Total revenue & orders (last 30 days) ----
  const revenueResult = await database.query(`
    SELECT 
      COALESCE(SUM(total), 0) as total_revenue,
      COUNT(*) as total_orders,
      COALESCE(AVG(total), 0) as avg_order_value
    FROM tnt_orders 
    WHERE status != 'cancelled'
      AND created_at > NOW() - INTERVAL '30 days'
  `);

  // ---- 2. Order status distribution ----
  const statusResult = await database.query(`
    SELECT status, COUNT(*) as count
    FROM tnt_orders
    GROUP BY status
  `);

  // ---- 3. Daily sales for the last 7 days ----
  const dailyResult = await database.query(`
    SELECT 
      DATE(created_at) as date,
      COALESCE(SUM(total), 0) as revenue,
      COUNT(*) as orders
    FROM tnt_orders
    WHERE status != 'cancelled'
      AND created_at > NOW() - INTERVAL '7 days'
    GROUP BY DATE(created_at)
    ORDER BY date ASC
  `);

  // ---- 4. Low stock items (stock < 5) ----
  const lowStockResult = await database.query(`
    SELECT 
      p.id,
      p.name,
      p.slug,
      p.price,
      v.size,
      v.color,
      v.stock,
      p.image
    FROM tnt_product_variants v
    JOIN tnt_products p ON p.id = v.product_id
    WHERE v.stock < 5 AND p.is_active = true
    ORDER BY v.stock ASC
    LIMIT 20
  `);

  // ---- 5. Recent orders (last 5) ----
  const recentOrders = await database.query(`
    SELECT id, order_reference, customer_name, total, status, created_at
    FROM tnt_orders
    ORDER BY created_at DESC
    LIMIT 5
  `);

  // ---- 6. Top 5 selling products (by quantity) ----
  const topProducts = await database.query(`
    SELECT 
      oi.product_name,
      oi.product_id,
      SUM(oi.quantity) as total_sold,
      SUM(oi.unit_price * oi.quantity) as total_revenue
    FROM tnt_order_items oi
    JOIN tnt_orders o ON o.id = oi.order_id
    WHERE o.status != 'cancelled'
    GROUP BY oi.product_name, oi.product_id
    ORDER BY total_sold DESC
    LIMIT 5
  `);

  return {
    revenue: {
      total: Number(revenueResult.rows[0]?.total_revenue) || 0,
      orders: Number(revenueResult.rows[0]?.total_orders) || 0,
      avgOrderValue: Number(revenueResult.rows[0]?.avg_order_value) || 0,
    },
    statusDistribution: statusResult.rows.map(row => ({
      status: row.status,
      count: Number(row.count),
    })),
    dailySales: dailyResult.rows.map(row => ({
      date: row.date,
      revenue: Number(row.revenue),
      orders: Number(row.orders),
    })),
    lowStock: lowStockResult.rows.map(row => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      price: row.price,
      size: row.size,
      color: row.color,
      stock: row.stock,
      image: row.image,
    })),
    recentOrders: recentOrders.rows.map(row => ({
      id: row.id,
      reference: row.order_reference,
      customer: row.customer_name,
      total: row.total,
      status: row.status,
      createdAt: row.created_at,
    })),
    topProducts: topProducts.rows.map(row => ({
      name: row.product_name,
      productId: row.product_id,
      totalSold: Number(row.total_sold),
      totalRevenue: Number(row.total_revenue),
    })),
  };
}