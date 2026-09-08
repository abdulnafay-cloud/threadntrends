import ProductsBrowser from '@/components/ProductsBrowser';
import { getProducts } from '@/lib/db-products';
export const dynamic = 'force-dynamic';
export default async function ProductsPage() { const products = await getProducts(); return <ProductsBrowser products={products} />; }
