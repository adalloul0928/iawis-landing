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
        src="/always-wet-logo.svg"
        alt="It's Always Wet In Seattle"
        width={500}
        height={500}
        className="w-80 h-80 sm:w-96 sm:h-96 lg:w-[28rem] lg:h-[28rem] drop-shadow-2xl"
        priority
      />
    </motion.div>
  );
}
