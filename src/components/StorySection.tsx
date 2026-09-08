"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function StorySection() {
  return (
    <section className="bg-[#111] text-white overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[680px]">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="relative min-h-[520px] md:min-h-full overflow-hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1400&q=85"
            alt="Fashion editorial"
            fill
            className="object-cover saturate-[0.55] scale-[1.08] transition-transform duration-[1600ms] hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#111]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="p-[9vw] flex flex-col justify-center"
        >
          <div className="text-[10px] uppercase tracking-[0.18em] font-extrabold text-[#777] mb-2.5">
            Brand journal / 01
          </div>
          <h2 className="font-manrope font-bold text-[clamp(48px,6vw,88px)] leading-[0.95] tracking-[-0.055em] max-w-[620px]">
            Built for the <em className="font-playfair not-italic text-[#b6ff39]">in-between.</em>
          </h2>
          <p className="text-[#aaa] leading-relaxed max-w-[520px] mt-4">
            Between traditional and modern. Relaxed and refined. Work and midnight plans. Thread n Trends is a wardrobe system for people whose style changes with the day—not with the algorithm.
          </p>
          <div className="grid grid-cols-3 gap-6 border-t border-[#333] mt-11 pt-9">
            <div>
              <strong className="font-manrope font-extrabold text-3xl block">07</strong>
              <small className="text-[#888] text-[10px] uppercase tracking-[0.13em]">Core fabrics</small>
            </div>
            <div>
              <strong className="font-manrope font-extrabold text-3xl block">365</strong>
              <small className="text-[#888] text-[10px] uppercase tracking-[0.13em]">Wear days</small>
            </div>
            <div>
              <strong className="font-manrope font-extrabold text-3xl block">01</strong>
              <small className="text-[#888] text-[10px] uppercase tracking-[0.13em]">Your identity</small>
            </div>
          </div>
          <button className="mt-6 bg-[#b6ff39] text-[#111] px-6 py-4 rounded-full font-extrabold text-[11px] tracking-[0.09em] uppercase flex items-center gap-2.5 hover:translate-y-[-3px] hover:shadow-[0_12px_30px_rgba(182,255,57,0.2)] transition w-fit">
            Our story ↗
          </button>
        </motion.div>
      </div>
    </section>
  );
}
