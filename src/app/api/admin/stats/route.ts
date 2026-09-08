import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { getDashboardStats } from '@/lib/admin/stats';

export async function GET() {
  try {
    await requireAdmin();
    const stats = await getDashboardStats();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}