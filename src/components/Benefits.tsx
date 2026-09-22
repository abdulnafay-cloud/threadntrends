"use client";

import { motion } from "framer-motion";

const benefits = [["01", "Easy exchange", "Seven days to decide, as long as it is unworn."], ["02", "Quick dispatch", "Thoughtfully packed and usually on its way in 24–48 hours."], ["03", "Checked by hand", "Every piece is inspected before it leaves our studio."], ["04", "Smaller runs", "Better considered production with less unnecessary waste."]];

export default function Benefits() {
  return <section className="bg-[#ece7e1] px-4 py-10 sm:px-7 lg:px-10"><div className="mx-auto max-w-[1440px]"><div className="grid border-y border-[#292421]/15 md:grid-cols-4">{benefits.map(([number, title, text], index) => <motion.article key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .5 }} transition={{ duration: .5, delay: index * .08 }} className="border-b border-[#292421]/15 p-6 last:border-0 md:border-b-0 md:border-r md:last:border-r-0 lg:p-8"><span className="font-playfair text-3xl italic text-[#a56a4b]">{number}</span><h3 className="mt-7 font-manrope text-base font-bold tracking-[-.03em]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#6f6964]">{text}</p></motion.article>)}</div></div></section>;
}
