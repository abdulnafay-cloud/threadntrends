"use client";

import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!normalizedQuery) return products;
    return products.filter((product) =>
      [product.name, product.category, product.sub, product.description, ...product.colors]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(normalizedQuery))
    );
  }, [normalizedQuery]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <div className="grid items-end gap-8 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#6f6964]">Search the collection</p>
          <h1 className="mt-2 font-manrope text-6xl font-bold leading-[0.88] tracking-[-0.06em] sm:text-8xl">
            Find your <em className="font-playfair font-semibold text-[#7f5539]">piece.</em>
          </h1>
        </div>
        <div className="relative">
          <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search shirts, trousers, accessories..."
            className="h-16 w-full rounded-full border border-[#292421]/15 bg-[#f3efeb] pl-14 pr-14 text-base outline-none shadow-[0_16px_45px_rgba(17,17,15,0.07)] transition focus:border-[#292421] focus:ring-4 focus:ring-[#a56a4b]/40"
            autoFocus
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#d8d0c8] hover:bg-[#292421] hover:text-white">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-14 flex items-center justify-between border-b border-[#292421]/10 pb-4">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#6f6964]">
          {normalizedQuery ? `${results.length} results for “${query.trim()}”` : `All ${results.length} pieces`}
        </p>
      </div>

      {results.length > 0 ? (
        <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-7 lg:grid-cols-4">
          {results.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="mt-8 rounded-[28px] border border-[#292421]/10 bg-[#f3efeb] px-6 py-20 text-center">
          <Search className="mx-auto h-8 w-8 text-[#6f6964]" />
          <h2 className="mt-5 font-manrope text-3xl font-bold tracking-[-0.04em]">No pieces found.</h2>
          <p className="mt-2 text-sm text-[#6f6964]">Try a product type, color, or category such as “linen”, “black”, or “men”.</p>
        </div>
      )}
    </section>
  );
}
