"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();
  return <section className="relative isolate min-h-[min(860px,100svh)] overflow-hidden bg-[#292421] px-4 pb-8 pt-[74px] text-[#f3efeb] sm:px-7 lg:px-10">
    <div className="hero-noise absolute inset-0 opacity-40" />
    <div className="absolute left-1/2 top-1/2 h-[630px] w-[630px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a56a4b]/20 blur-[130px]" />
    <div className="relative mx-auto grid min-h-[calc(min(860px,100svh)-106px)] max-w-[1440px] grid-cols-2 items-center gap-3 py-9 sm:gap-6 lg:grid-cols-[.78fr_1.15fr_.78fr] lg:gap-10">
      <motion.figure initial={reduced ? false : { opacity: 0, x: -72, rotate: -7 }} animate={{ opacity: 1, x: 0, rotate: -4 }} transition={{ duration: 1.05, ease }} className="relative z-10 col-start-1 row-start-1 mt-20 overflow-hidden border border-white/20 bg-[#393330] shadow-[0_28px_80px_rgba(0,0,0,.28)] lg:mt-0">
        <motion.div animate={reduced ? undefined : { y: [0, -16, 0], scale: [1, 1.035, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="relative aspect-[.69]"><Image src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=900&q=90" alt="Thread n Trends menswear editorial" fill priority sizes="(max-width: 1024px) 43vw, 26vw" className="object-cover saturate-[.55]" /></motion.div>
        <figcaption className="absolute bottom-3 left-3 border border-white/25 bg-[#292421]/80 px-2.5 py-2 text-[7px] font-bold uppercase tracking-[.16em] backdrop-blur-sm sm:bottom-5 sm:left-5">Look 01 / Form</figcaption>
      </motion.figure>

      <motion.div initial={reduced ? false : { opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .22, ease }} className="relative z-20 col-span-2 col-start-1 row-start-1 mx-auto flex max-w-[760px] flex-col items-center px-1 text-center lg:col-span-1 lg:col-start-2">
        <motion.p initial={reduced ? false : { opacity: 0, scale: .86 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .6, delay: .38, ease }} className="mb-5 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[.2em] text-[#d8d0c8]"><span className="h-px w-7 bg-[#c98a66]" /> Edition 01 · 2026 <span className="h-px w-7 bg-[#c98a66]" /></motion.p>
        <motion.h1 initial={reduced ? false : { opacity: 0, y: 40, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1.05, delay: .15, ease }} className="font-playfair text-[clamp(61px,10vw,154px)] leading-[.7] tracking-[-.08em]">Wear the<br /><i className="text-[#d59b79]">moment.</i></motion.h1>
        <motion.p initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .72, delay: .58, ease }} className="mt-7 max-w-[310px] text-sm leading-6 text-[#d8d0c8]">Intentional pieces for the hours that happen between plans.</motion.p>
        <motion.div initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .72, delay: .69, ease }} className="mt-7 flex flex-wrap justify-center gap-3"><Link href="/products" className="editorial-button bg-[#f3efeb] text-[#292421]">Shop collection <ArrowUpRight size={16} /></Link><Link href="/lookbook" className="editorial-button border border-white/30 text-[#f3efeb] hover:border-[#a56a4b] hover:bg-[#a56a4b] hover:text-[#292421]">View lookbook</Link></motion.div>
      </motion.div>

      <motion.figure initial={reduced ? false : { opacity: 0, x: 72, rotate: 7 }} animate={{ opacity: 1, x: 0, rotate: 4 }} transition={{ duration: 1.05, delay: .1, ease }} className="relative z-10 col-start-2 row-start-1 self-end overflow-hidden border border-white/20 bg-[#393330] shadow-[0_28px_80px_rgba(0,0,0,.28)] lg:col-start-3 lg:self-center">
        <motion.div animate={reduced ? undefined : { y: [-12, 5, -12], scale: [1.035, 1, 1.035] }} transition={{ duration: 8.8, repeat: Infinity, ease: "easeInOut" }} className="relative aspect-[.69]"><Image src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=90" alt="Thread n Trends womenswear editorial" fill priority sizes="(max-width: 1024px) 43vw, 26vw" className="object-cover saturate-[.55]" /></motion.div>
        <figcaption className="absolute bottom-3 right-3 border border-white/25 bg-[#292421]/80 px-2.5 py-2 text-[7px] font-bold uppercase tracking-[.16em] backdrop-blur-sm sm:bottom-5 sm:right-5">Look 02 / Ease</figcaption>
      </motion.figure>
    </div>
    <motion.a href="#collection" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05 }} className="absolute bottom-5 left-1/2 z-20 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border border-white/30 transition hover:bg-[#a56a4b] hover:text-[#292421]" aria-label="Explore collection"><ArrowDown size={17} /></motion.a>
  </section>;
}
