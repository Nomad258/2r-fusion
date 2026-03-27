"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  animation?: "fade-in" | "slide-up" | "slide-right" | "scale-in";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const animations = {
  "fade-in": {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
  },
  "slide-up": {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
  },
  "slide-right": {
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0 },
  },
  "scale-in": {
    initial: { opacity: 0, scale: 0.95 },
    whileInView: { opacity: 1, scale: 1 },
  },
};

export function ScrollAnimation({
  children,
  animation = "slide-up",
  delay = 0,
  duration = 0.5,
  className = "",
  once = true,
}: ScrollAnimationProps) {
  return (
    <motion.div
      initial={animations[animation].initial}
      whileInView={animations[animation].whileInView}
      viewport={{ once, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
