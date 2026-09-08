"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/product-types";
import { useWishlist } from "@/lib/wishlistStore";
import { useCart } from "@/lib/cartStore";
import { useHydrated } from "@/lib/useHydrated";
import { useState } from "react";
import { ArrowUpRight, Check, Heart, ShoppingBag } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const { toggleItem, isInWishlist } = useWishlist();
  const { addItem } = useCart();
  const hydrated = useHydrated();
  const [justAdded, setJustAdded] = useState(false);
  const liked = hydrated && isInWishlist(product.id);

  const formatPrice = (price: number) => `PKR ${price.toLocaleString()}`;

  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[0.78] rounded-[18px] overflow-hidden bg-[#e4e0d8] transform-gpu transition-transform duration-200 hover:scale-[1.02]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.035]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 z-10 flex gap-1.5 flex-wrap">
          {product.badge && (
            <span className={`px-2 py-1.5 rounded-full text-[8px] tracking-[0.1em] font-extrabold uppercase ${
              product.badge === "Sale" ? "bg-[#ff5e48] text-white" : "bg-[#f2f0ea]/92 text-[#11110f]"
            }`}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleItem(product.id);
          }}
          className={`absolute right-3 top-3 z-10 w-9 h-9 rounded-full border-0 ${
            liked ? "bg-[#11110f] text-white" : "bg-[#f2f0ea]/91"
          } flex items-center justify-center text-lg transition`}
          aria-label={liked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="flex flex-1 flex-col pt-3.5 px-1">
        <div className="flex justify-between gap-3">
          <div>
            <h3 className="font-bold text-sm leading-tight">{product.name}</h3>
            <div className="mt-1 text-[9px] uppercase tracking-[0.1em] text-[#79776f]">
              {product.category} / {product.sub || "Essentials"}
            </div>
          </div>
          <div className="font-bold text-xs whitespace-nowrap">
            {formatPrice(product.price)}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-full border border-[#11110f] bg-[#f8f6f0]">
          <button
            type="button"
            disabled={product.stock <= 0}
            onClick={() => {
              addItem(product, 1, product.sizes[0], product.colors[0]);
              setJustAdded(true);
              window.setTimeout(() => setJustAdded(false), 1600);
            }}
            className="flex min-h-10 items-center justify-center gap-1.5 bg-[#11110f] px-2 text-[9px] font-extrabold uppercase tracking-[0.06em] text-white transition hover:bg-[#b6ff39] hover:text-[#11110f] disabled:cursor-not-allowed disabled:bg-[#aaa] sm:text-[10px]"
          >
            {justAdded ? <Check className="h-3.5 w-3.5" /> : <ShoppingBag className="h-3.5 w-3.5" />}
            {product.stock <= 0 ? "Sold out" : justAdded ? "Added" : "Add to cart"}
          </button>
          <Link
            href={`/products/${product.slug}`}
            className="flex min-h-10 items-center justify-center gap-1 px-2 text-[9px] font-extrabold uppercase tracking-[0.06em] transition hover:bg-[#e4e0d8] sm:text-[10px]"
          >
            See more <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <p className="mt-2 text-center text-[9px] text-[#79776f]">
          Quick add: {product.sizes[0]} / {product.colors[0]}
        </p>
      </div>
    </article>
  );
}
