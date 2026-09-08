"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
  { name: "Men", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=85", label: "01 / Essentials" },
  { name: "Women", image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=85", label: "02 / Expression" },
  { name: "Accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85", label: "03 / Details" },
];

export default function CategoryShowcase() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }} className="flex flex-wrap justify-between items-end gap-6 mb-10">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] font-extrabold text-[#79776f] mb-2.5">
              Shop by world
            </div>
            <h2 className="font-manrope font-bold text-[clamp(38px,5vw,72px)] leading-[0.95] tracking-[-0.055em]">
              Choose your<br />frequency.
            </h2>
          </div>
          <p className="max-w-[420px] text-[#79776f] text-sm leading-relaxed">
            A fashion-first category system: fewer decisions, stronger visual cues, and every route gets you to products fast.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr_0.8fr] gap-3.5">
          {categories.map((cat, i) => (
            <Link key={cat.name} href={`/products?category=${cat.name.toLowerCase()}`}>
              <motion.div
                initial={{ opacity: 0, y: 55, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-[560px] rounded-[26px] overflow-hidden bg-[#222] text-white cursor-pointer group"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover saturate-[0.65] contrast-[1.05] group-hover:scale-105 group-hover:saturate-[0.85] transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 z-10 flex items-end justify-between">
                  <div>
                    <small className="text-sm text-white/70">{cat.label}</small>
                    <h3 className="text-3xl font-bold font-manrope tracking-[-0.04em] mt-1">{cat.name}</h3>
                  </div>
                  <span className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center group-hover:bg-white group-hover:text-[#111] group-hover:-rotate-[35deg] transition">
                    ↗
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
