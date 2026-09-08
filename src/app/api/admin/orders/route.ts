import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { getOrders } from '@/lib/admin/orders';

export async function GET() {
  try {
    await requireAdmin();
    const orders = await getOrders();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}