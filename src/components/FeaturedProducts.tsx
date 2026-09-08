'use client'; // keep if it uses client-side hooks, otherwise remove

import { Product } from '@/lib/product-types';
import ProductCard from './ProductCard';

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (!products.length) {
    return <p className="text-center text-gray-500">No products available.</p>;
  }

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-center mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}