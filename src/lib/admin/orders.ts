import "server-only";
import { database, ensureAuthSchema } from "../db";

export type OrderStatus = 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  order_reference: string;
  user_id: string | null;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
  notes: string | null;
  status: OrderStatus;
  subtotal: number;
  discount_code: string | null;
  discount_amount: number;
  total: number;
  created_at: Date;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  product_id: number;
  product_name: string;
  unit_price: number;
  quantity: number;
  selected_size: string;
  selected_color: string;
}

export async function getOrders(): Promise<Order[]> {
  await ensureAuthSchema();
  const result = await database.query(`
    SELECT * FROM tnt_orders ORDER BY created_at DESC
  `);
  const orders: Order[] = [];
  for (const row of result.rows) {
    const itemsResult = await database.query(`
      SELECT * FROM tnt_order_items WHERE order_id = $1
    `, [row.id]);
    orders.push({
      id: row.id,
      order_reference: row.order_reference,
      user_id: row.user_id,
      customer_name: row.customer_name,
      email: row.email,
      phone: row.phone,
      address: row.address,
      city: row.city,
      postal_code: row.postal_code,
      notes: row.notes,
      status: row.status,
      subtotal: row.subtotal,
      discount_code: row.discount_code,
      discount_amount: row.discount_amount,
      total: row.total,
      created_at: row.created_at,
      items: itemsResult.rows.map((item: any) => ({
        id: item.id,
        product_id: item.product_id,
        product_name: item.product_name,
        unit_price: item.unit_price,
        quantity: item.quantity,
        selected_size: item.selected_size,
        selected_color: item.selected_color,
      })),
    });
  }
  return orders;
}

export async function getOrderById(id: string): Promise<Order | null> {
  await ensureAuthSchema();
  const result = await database.query(`SELECT * FROM tnt_orders WHERE id = $1`, [id]);
  if (result.rows.length === 0) return null;
  const row = result.rows[0];
  const itemsResult = await database.query(`
    SELECT * FROM tnt_order_items WHERE order_id = $1
  `, [id]);
  return {
    id: row.id,
    order_reference: row.order_reference,
    user_id: row.user_id,
    customer_name: row.customer_name,
    email: row.email,
    phone: row.phone,
    address: row.address,
    city: row.city,
    postal_code: row.postal_code,
    notes: row.notes,
    status: row.status,
    subtotal: row.subtotal,
    discount_code: row.discount_code,
    discount_amount: row.discount_amount,
    total: row.total,
    created_at: row.created_at,
    items: itemsResult.rows.map((item: any) => ({
      id: item.id,
      product_id: item.product_id,
      product_name: item.product_name,
      unit_price: item.unit_price,
      quantity: item.quantity,
      selected_size: item.selected_size,
      selected_color: item.selected_color,
    })),
  };
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
  await ensureAuthSchema();
  await database.query(
    `UPDATE tnt_orders SET status = $1 WHERE id = $2`,
    [status, id]
  );
}