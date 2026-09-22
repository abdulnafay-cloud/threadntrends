"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();
  return <section className="relative overflow-hidden bg-[#292421] pt-[74px] text-[#f3efeb]">
    <div className="absolute inset-0 hero-noise opacity-40" />
    <div className="relative mx-auto grid min-h-[min(850px,100svh)] max-w-[1600px] grid-cols-1 lg:grid-cols-[1.07fr_0.93fr]">
      <div className="relative flex flex-col justify-between px-5 pb-8 pt-14 sm:px-8 sm:pt-20 lg:px-12 lg:pb-10 xl:px-20">
        <motion.div initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em] text-[#d8d0c8]">
          <span className="h-px w-8 bg-[#a56a4b]" /> Edition 01 · Karachi
        </motion.div>
        <div className="relative z-10 py-14 lg:py-0">
          <motion.p initial={reduced ? false : { opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.12, ease }} className="mb-5 max-w-xs text-sm leading-6 text-[#d8d0c8]">Clothes for a life in motion. Quiet confidence, cut with purpose.</motion.p>
          <motion.h1 initial={reduced ? false : { opacity: 0, y: 44 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.16, ease }} className="font-playfair text-[clamp(76px,11vw,176px)] leading-[0.69] tracking-[-0.075em]">
            Made<br /><i className="ml-[0.48em] text-[#c98a66]">to be</i><br /><span className="font-manrope text-[0.65em] font-semibold not-italic uppercase tracking-[-0.09em]">worn.</span>
          </motion.h1>
          <motion.div initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5, ease }} className="mt-9 flex flex-wrap items-center gap-5">
            <Link href="/products" className="editorial-button bg-[#f3efeb] text-[#292421]">Shop the collection <ArrowUpRight size={16} /></Link>
            <Link href="/lookbook" className="border-b border-[#f3efeb]/45 pb-1 text-[10px] font-bold uppercase tracking-[0.16em] transition hover:border-[#a56a4b] hover:text-[#c98a66]">View the journal</Link>
          </motion.div>
        </div>
        <div className="flex items-end justify-between border-t border-white/15 pt-5">
          <span className="max-w-36 text-[9px] font-bold uppercase leading-5 tracking-[0.16em] text-[#d8d0c8]">Seasonless selections for every part of the day</span>
          <a href="#collection" aria-label="Explore collection" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 transition hover:bg-[#a56a4b] hover:text-[#292421]"><ArrowDown size={17} /></a>
        </div>
      </div>
      <motion.div initial={reduced ? false : { opacity: 0, clipPath: "inset(0 0 100% 0)" }} animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }} transition={{ duration: 1.2, delay: 0.18, ease }} className="relative min-h-[520px] overflow-hidden lg:min-h-full">
        <Image src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1500&q=90" alt="Thread n Trends editorial collection" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-[center_36%] saturate-[0.55] contrast-[1.05]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(41,36,33,.38),transparent_36%),linear-gradient(0deg,rgba(41,36,33,.55),transparent_40%)]" />
        <motion.div animate={reduced ? undefined : { y: [0, -9, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-6 left-6 max-w-[208px] border border-white/25 bg-[#292421]/80 p-4 backdrop-blur-md sm:bottom-10 sm:left-10">
          <p className="text-[8px] font-bold uppercase tracking-[0.19em] text-[#c98a66]">The everyday edit</p>
          <p className="mt-2 font-playfair text-2xl italic leading-none">Uncomplicated, but never ordinary.</p>
        </motion.div>
        <div className="absolute right-5 top-6 writing-mode-vertical text-[8px] font-bold uppercase tracking-[0.26em] text-white/70 sm:right-8 sm:top-10">Thread n Trends · 2026</div>
      </motion.div>
    </div>
  </section>;
}
