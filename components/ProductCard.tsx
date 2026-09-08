import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/products";
import { Badge } from "@/components/ui/badge";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
        <div className="aspect-square relative bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-indigo-600 font-bold">${product.price}</span>
            <Badge variant="secondary">{product.category}</Badge>
          </div>
        </div>
      </div>
    </Link>
  );
}