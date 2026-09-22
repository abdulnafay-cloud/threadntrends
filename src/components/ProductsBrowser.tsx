"use client";

import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/product-types";
import { SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";

const filters = ["All", "Men", "Women", "Accessories"];

function Browser({ products }: { products: Product[] }) {
  const params = useSearchParams();
  const queryCategory = params.get("category") || "All";
  const [active, setActive] = useState(queryCategory === "All" ? "All" : queryCategory[0].toUpperCase() + queryCategory.slice(1));
  const [count, setCount] = useState(12);
  const visible = useMemo(() => active === "All" ? products : products.filter((product) => product.category.toLowerCase() === active.toLowerCase()), [active, products]);
  return <main className="pt-[74px]">
    <section className="bg-[#292421] px-4 pb-12 pt-16 text-[#f3efeb] sm:px-7 sm:pb-16 sm:pt-24 lg:px-10">
      <div className="mx-auto max-w-[1440px]"><p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#c98a66]">Thread n Trends / Collection 2026</p><div className="mt-5 grid gap-8 md:grid-cols-[1.25fr_.75fr] md:items-end"><h1 className="font-playfair text-[clamp(60px,9vw,135px)] leading-[0.72] tracking-[-0.075em]">The<br /><i>everyday</i> edit.</h1><p className="max-w-sm text-sm leading-7 text-[#d8d0c8] md:mb-2">A changing collection of considered pieces made for easy repeat wear. Find your new constants here.</p></div></div>
    </section>
    <section className="px-4 py-10 sm:px-7 lg:px-10"><div className="mx-auto max-w-[1440px]">
      <div className="mb-9 flex flex-wrap items-center justify-between gap-4 border-b border-[#292421]/14 pb-4"><div className="flex flex-wrap gap-x-5 gap-y-3">{filters.map((filter) => <button key={filter} onClick={() => { setActive(filter); setCount(12); }} className={`border-b pb-1 text-[10px] font-bold uppercase tracking-[0.14em] transition ${active === filter ? "border-[#292421] text-[#292421]" : "border-transparent text-[#6f6964] hover:text-[#a56a4b]"}`}>{filter}</button>)}</div><span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[#6f6964]"><SlidersHorizontal size={14} /> {visible.length} pieces</span></div>
      {visible.length ? <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">{visible.slice(0, count).map((product) => <ProductCard key={product.id} product={product} />)}</div> : <p className="py-24 text-center font-playfair text-3xl italic text-[#6f6964]">No pieces in this edit yet.</p>}
      {count < visible.length && <div className="mt-16 text-center"><button onClick={() => setCount((value) => value + 12)} className="editorial-button bg-[#292421] text-[#f3efeb]">Load more pieces</button></div>}
    </div></section>
  </main>;
}

export default function ProductsBrowser({ products }: { products: Product[] }) { return <Suspense fallback={<main className="min-h-screen" />}><Browser products={products} /></Suspense>; }
