"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "Menswear", query: "men", index: "01", note: "New proportions for the everyday.", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=85", style: "md:col-span-7 md:row-span-2" },
  { name: "Womenswear", query: "women", index: "02", note: "Soft structure. Strong point of view.", image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=85", style: "md:col-span-5" },
  { name: "Objects", query: "accessories", index: "03", note: "The details change everything.", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85", style: "md:col-span-5" },
];

export default function CategoryShowcase() {
  return <section id="collection" className="bg-[#f3efeb] px-4 py-20 sm:px-7 sm:py-28 lg:px-10">
    <div className="mx-auto max-w-[1440px]">
      <div className="mb-12 grid gap-7 border-b border-[#292421]/15 pb-8 md:grid-cols-[1fr_1fr] md:items-end">
        <div><p className="eyebrow">The collection</p><h2 className="mt-4 max-w-xl font-playfair text-[clamp(48px,6.5vw,94px)] leading-[0.82] tracking-[-0.07em]">Your wardrobe, <i className="text-[#a56a4b]">considered.</i></h2></div>
        <p className="max-w-md text-sm leading-7 text-[#6f6964] md:justify-self-end">Three ways into the current collection. Built to be lived in, re-worn, and made your own.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-12 md:grid-rows-2">
        {categories.map((category, index) => <Link key={category.name} href={`/products?category=${category.query}`} className={`group relative min-h-[360px] overflow-hidden bg-[#393330] ${category.style}`}>
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.75, delay: index * 0.08 }} className="absolute inset-0">
            <Image src={category.image} alt={category.name} fill sizes="(max-width: 768px) 100vw, 58vw" className="object-cover saturate-[0.56] transition duration-[1200ms] group-hover:scale-105 group-hover:saturate-[0.8]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#292421]/85 via-[#292421]/8 to-transparent" />
          </motion.div>
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-[#f3efeb] sm:p-8"><div><p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#d8d0c8]">{category.index} / {category.note}</p><h3 className="mt-2 font-playfair text-[clamp(36px,4vw,62px)] italic leading-none">{category.name}</h3></div><span className="grid h-12 w-12 place-items-center border border-white/40 transition duration-300 group-hover:rotate-45 group-hover:bg-[#a56a4b] group-hover:text-[#292421]"><ArrowUpRight size={19} /></span></div>
        </Link>)}
      </div>
    </div>
  </section>;
}
