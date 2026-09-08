import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { getProducts } from '@/lib/db-products';
import { createProduct } from '@/lib/admin/products';

export async function GET() {
  try {
    await requireAdmin();
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const data = await request.json();
    const id = await createProduct(data);
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
