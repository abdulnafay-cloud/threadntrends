import { products } from "@/lib/products";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FeaturedProducts() {
  const featured = products.slice(0, 4);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured <span className="text-indigo-600">Collection</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/products">
            <Button variant="outline" size="lg">View All Products</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}