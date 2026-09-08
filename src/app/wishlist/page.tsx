"use client";

import { useWishlist } from "@/lib/wishlistStore";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { products } from "@/lib/products";

export default function WishlistClient() {
  const wishlistItems = useWishlist((state) => state.items);
  const wishlistProducts = products.filter((p) => wishlistItems.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Your wishlist is empty.</p>
        <Link href="/products" className="text-blue-600 underline">Browse products</Link>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
