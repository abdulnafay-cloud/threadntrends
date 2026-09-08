"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 130, damping: 28, restDelta: 0.001 });
  return <motion.div aria-hidden="true" className="fixed left-0 right-0 top-0 z-[80] h-[3px] origin-left bg-[#b6ff39]" style={{ scaleX }} />;
}
