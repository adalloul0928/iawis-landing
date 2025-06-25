"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

/**
 * Animated logo component for the landing page
 * Features a spring animation entrance with scale and fade effects
 * Responsive sizing: 240px mobile, 320px tablet, 400px desktop
 */
export function Logo({ className }: LogoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
      className={`max-w-[90vw] ${className}`}
    >
      <Image
        src="/alwayswet.png"
        alt="It's Always Wet In Seattle"
        width={400}
        height={400}
        className="w-60 h-60 sm:w-80 sm:h-80 lg:w-96 lg:h-96 drop-shadow-2xl"
        priority
      />
    </motion.div>
  );
}
