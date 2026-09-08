"use client";
import { motion } from "framer-motion";

const benefits = [
  ["◎", "Easy Exchange", "7-day exchange on eligible unworn products."],
  ["⌁", "Fast Dispatch", "Orders typically dispatch in 24–48 business hours."],
  ["◇", "Quality Checked", "Each piece inspected before packing."],
  ["♲", "Lower Waste", "Limited drops and smaller production runs."],
];

export default function Benefits() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-[#11110f]/14">
          {benefits.map(([icon, title, description], index) => <motion.div key={title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.7 }} transition={{ duration: 0.55, delay: index * 0.09 }} className="p-7 md:p-9 border-r border-[#11110f]/14 last:border-0"><motion.span whileHover={{ rotate: 18, scale: 1.2 }} className="inline-block text-3xl">{icon}</motion.span><div className="font-bold text-base mt-4 mb-2">{title}</div><span className="text-sm text-[#79776f] leading-relaxed">{description}</span></motion.div>)}
        </div>
      </div>
    </section>
  );
}
