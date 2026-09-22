"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function StorySection() {
  return <section className="overflow-hidden bg-[#a56a4b] text-[#292421]">
    <div className="marquee border-y border-[#292421]/20 py-3 font-manrope text-[10px] font-bold uppercase tracking-[0.2em]">Thread n Trends <span>·</span> Independent wardrobe <span>·</span> Made for the in-between <span>·</span> Thread n Trends <span>·</span> Independent wardrobe <span>·</span> Made for the in-between</div>
    <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="relative min-h-[440px] lg:min-h-[650px]">
        <Image src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1400&q=85" alt="Fashion editorial" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover saturate-[0.56] contrast-[1.04]" />
        <div className="absolute inset-0 bg-[#292421]/18" />
        <div className="absolute bottom-6 left-6 max-w-48 border border-white/30 bg-[#f3efeb]/90 p-4 sm:bottom-8 sm:left-8"><p className="text-[8px] font-bold uppercase tracking-[0.17em] text-[#6f6964]">Studio note / 01</p><p className="mt-2 font-playfair text-xl italic leading-5">Wear more of what feels like you.</p></div>
      </div>
      <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }} className="flex flex-col justify-between px-6 py-16 sm:px-12 lg:px-20 lg:py-20">
        <div><p className="eyebrow text-[#292421]/60">Why we exist</p><h2 className="mt-5 max-w-3xl font-playfair text-[clamp(53px,6.3vw,100px)] leading-[0.8] tracking-[-0.075em]">Not louder.<br /><i>More you.</i></h2></div>
        <div className="mt-14 max-w-xl"><p className="text-base leading-8 text-[#292421]/75">Thread n Trends makes room for the pieces that keep up—through slow mornings, long days, and whatever happens next. A wardrobe isn&apos;t a costume. It&apos;s an extension of you.</p><Link href="/about" className="mt-8 inline-flex items-center gap-2 border-b border-[#292421] pb-2 text-[10px] font-bold uppercase tracking-[0.15em] transition hover:text-[#f3efeb] hover:border-[#f3efeb]">Read our story <ArrowUpRight size={15} /></Link></div>
        <div className="mt-14 grid grid-cols-3 border-t border-[#292421]/25 pt-6 text-center"><div><b className="block font-playfair text-4xl italic">07</b><span className="mt-1 block text-[8px] font-bold uppercase tracking-[0.13em]">Core fabrics</span></div><div className="border-x border-[#292421]/25"><b className="block font-playfair text-4xl italic">365</b><span className="mt-1 block text-[8px] font-bold uppercase tracking-[0.13em]">Wear days</span></div><div><b className="block font-playfair text-4xl italic">01</b><span className="mt-1 block text-[8px] font-bold uppercase tracking-[0.13em]">Your identity</span></div></div>
      </motion.div>
    </div>
  </section>;
}
