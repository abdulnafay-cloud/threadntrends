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
    const databaseError = error as { code?: string; constraint?: string; message?: string };
    if (databaseError.code === '23505') {
      const message = databaseError.constraint?.includes('slug')
        ? 'That product URL name already exists. Use a different slug.'
        : 'That SKU is already in use. Leave SKU blank or enter a unique one.';
      return NextResponse.json({ error: message }, { status: 409 });
    }
    if (databaseError.message?.startsWith('Add at least') || databaseError.message?.startsWith('Each variant')) {
      return NextResponse.json({ error: databaseError.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Could not create the product. Please try again.' }, { status: 500 });
  }
}
