"use client";

import ProductCard from "@/components/ProductCard";
import { categoryKey, productTypesByCategory, shopCategories } from "@/lib/product-categories";
import type { Product } from "@/lib/product-types";
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

function Browser({ products }: { products: Product[] }) {
  const params = useSearchParams();
  const categoryParam = params.get("category") || "all";
  const activeCategory = shopCategories.find((category) => category.toLowerCase() === categoryParam.toLowerCase()) || "All";
  const activeTypeKey = params.get("type") || "all";
  const categoryTypes = activeCategory === "All" ? [] : productTypesByCategory[activeCategory];
  const activeType = categoryTypes.find((type) => categoryKey(type) === activeTypeKey.toLowerCase());
  const [count, setCount] = useState(12);

  useEffect(() => setCount(12), [activeCategory, activeTypeKey]);

  const visible = useMemo(() => products.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesType = !activeType || categoryKey(product.sub || "") === categoryKey(activeType);
    return matchesCategory && matchesType;
  }), [activeCategory, activeType, products]);

  const heading = activeType || (activeCategory === "All" ? "The everyday edit." : `${activeCategory} edit.`);
  return <main className="pt-[74px]">
    <section className="bg-[#292421] px-4 pb-12 pt-16 text-[#f3efeb] sm:px-7 sm:pb-16 sm:pt-24 lg:px-10">
      <div className="mx-auto max-w-[1440px]"><p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#c98a66]">Thread n Trends / Collection 2026</p><div className="mt-5 grid gap-8 md:grid-cols-[1.25fr_.75fr] md:items-end"><h1 className="font-playfair text-[clamp(60px,9vw,135px)] leading-[0.72] tracking-[-0.075em]">{activeType ? <><span className="block">{activeCategory}</span><i>{activeType}.</i></> : <>{heading.split(" ").map((word, index) => index === 0 ? <span key={word} className="block">{word}</span> : <i key={word}>{word} </i>)}</>}</h1><p className="max-w-sm text-sm leading-7 text-[#d8d0c8] md:mb-2">A changing collection of considered pieces made for easy repeat wear. Find your new constants here.</p></div></div>
    </section>
    <section className="px-4 py-10 sm:px-7 lg:px-10"><div className="mx-auto max-w-[1440px]">
      <div className="border-b border-[#292421]/14 pb-4"><div className="flex flex-wrap gap-x-5 gap-y-3">{["All", ...shopCategories].map((category) => <Link key={category} href={category === "All" ? "/products" : `/products?category=${category.toLowerCase()}`} className={`border-b pb-1 text-[10px] font-bold uppercase tracking-[0.14em] transition ${activeCategory === category ? "border-[#292421] text-[#292421]" : "border-transparent text-[#6f6964] hover:text-[#a56a4b]"}`}>{category}</Link>)}</div>
        {categoryTypes.length > 0 && <div className="mt-5 flex flex-wrap gap-2"><Link href={`/products?category=${activeCategory.toLowerCase()}`} className={`rounded-full border px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.11em] transition ${!activeType ? "border-[#292421] bg-[#292421] text-[#f3efeb]" : "border-[#292421]/16 text-[#6f6964] hover:border-[#a56a4b] hover:text-[#a56a4b]"}`}>All {activeCategory}</Link>{categoryTypes.map((type) => <Link key={type} href={`/products?category=${activeCategory.toLowerCase()}&type=${categoryKey(type)}`} className={`rounded-full border px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.11em] transition ${activeType === type ? "border-[#292421] bg-[#292421] text-[#f3efeb]" : "border-[#292421]/16 text-[#6f6964] hover:border-[#a56a4b] hover:text-[#a56a4b]"}`}>{type}</Link>)}</div>}
      </div>
      <div className="mb-8 mt-5 flex justify-end"><span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[#6f6964]"><SlidersHorizontal size={14} /> {visible.length} {visible.length === 1 ? "piece" : "pieces"}</span></div>
      {visible.length ? <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">{visible.slice(0, count).map((product) => <ProductCard key={product.id} product={product} />)}</div> : <p className="py-24 text-center font-playfair text-3xl italic text-[#6f6964]">No pieces in this edit yet.</p>}
      {count < visible.length && <div className="mt-16 text-center"><button onClick={() => setCount((value) => value + 12)} className="editorial-button bg-[#292421] text-[#f3efeb]">Load more pieces</button></div>}
    </div></section>
  </main>;
}

export default function ProductsBrowser({ products }: { products: Product[] }) { return <Suspense fallback={<main className="min-h-screen" />}><Browser products={products} /></Suspense>; }
