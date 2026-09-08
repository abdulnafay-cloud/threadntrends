import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { getOrderById, updateOrderStatus } from '@/lib/admin/orders';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const order = await getOrderById(id);
    if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const body = await request.json();
    const { status } = body;
    if (!status) return NextResponse.json({ error: 'Status required' }, { status: 400 });
    const { id } = await params;
    await updateOrderStatus(id, status);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
