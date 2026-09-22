"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Heart, Plus } from "lucide-react";
import { useState } from "react";
import { Product } from "@/lib/product-types";
import { useCart } from "@/lib/cartStore";
import { useHydrated } from "@/lib/useHydrated";
import { useWishlist } from "@/lib/wishlistStore";

export default function ProductCard({ product }: { product: Product }) {
  const { toggleItem, isInWishlist } = useWishlist();
  const { addItem } = useCart();
  const hydrated = useHydrated();
  const [added, setAdded] = useState(false);
  const saved = hydrated && isInWishlist(product.id);
  const money = new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(product.price);
  const add = () => { addItem(product, 1, product.sizes[0], product.colors[0]); setAdded(true); window.setTimeout(() => setAdded(false), 1600); };

  return <article className="group relative">
    <div className="relative aspect-[0.79] overflow-hidden bg-[#d8d0c8]">
      <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`} className="absolute inset-0 z-0"><Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover transition duration-[1000ms] group-hover:scale-[1.06]" /></Link>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#292421]/45 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
      <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-2">{product.badge && <span className="bg-[#f3efeb] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.15em] text-[#292421]">{product.badge}</span>}<span className="bg-[#292421] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.15em] text-[#f3efeb]">{product.category}</span></div>
      <button onClick={() => toggleItem(product.id)} aria-label={saved ? `Remove ${product.name} from saved pieces` : `Save ${product.name}`} className={`absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center transition ${saved ? "bg-[#a56a4b] text-[#292421]" : "bg-[#f3efeb]/90 text-[#292421] hover:bg-[#292421] hover:text-white"}`}><Heart size={16} className={saved ? "fill-current" : ""} /></button>
      <button disabled={product.stock <= 0} onClick={add} className="absolute bottom-3 right-3 z-10 flex h-10 items-center gap-2 bg-[#f3efeb] px-3 text-[9px] font-bold uppercase tracking-[0.12em] text-[#292421] opacity-100 transition hover:bg-[#a56a4b] disabled:cursor-not-allowed disabled:opacity-60 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">{added ? <Check size={15} /> : <Plus size={15} />}{product.stock <= 0 ? "Sold out" : added ? "Added" : "Quick add"}</button>
    </div>
    <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-[#292421]/14 py-4">
      <div><p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#6f6964]">{product.sub || "Core collection"}</p><Link href={`/products/${product.slug}`} className="mt-1 block font-manrope text-sm font-bold leading-tight tracking-[-0.03em] hover:text-[#a56a4b]">{product.name}</Link></div>
      <div className="text-right"><p className="font-manrope text-sm font-bold">{money}</p>{product.oldPrice && <p className="mt-1 text-[10px] text-[#6f6964] line-through">PKR {product.oldPrice.toLocaleString()}</p>}</div>
    </div>
    <Link href={`/products/${product.slug}`} className="mt-2 inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#6f6964] transition hover:text-[#a56a4b]">Details <ArrowUpRight size={13} /></Link>
  </article>;
}
