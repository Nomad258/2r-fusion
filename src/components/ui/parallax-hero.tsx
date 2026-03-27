"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxHeroProps {
  backgroundImage?: string;
  children: React.ReactNode;
  height?: string;
  className?: string;
}

export function ParallaxHero({
  backgroundImage = "/images/hero-bg.jpg",
  children,
  height = "80vh",
  className = "",
}: ParallaxHeroProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <section
      ref={ref}
      style={{ minHeight: height }}
      className={`relative w-full overflow-hidden flex items-center justify-center ${className}`}
    >
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        {/* Dark to transparent gradient overlay for readability and premium feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-stone-950/70 to-stone-950" />
      </motion.div>

      <div className="relative z-10 w-full">
        {children}
      </div>
    </section>
  );
}
