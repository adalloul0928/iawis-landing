"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SmoothGlowButton2Props {
  children: ReactNode;
  size?: number;
  onClick?: () => void;
  className?: string;
}

/**
 * Smooth Glow Button - Variation 2: Mathematical Sine Wave Growth
 * Uses smoother mathematical transitions for arc size
 * - Sine wave based arc growth for natural breathing effect
 * - Continuous smooth rotation
 */
export function SmoothGlowButton2({ 
  children, 
  size = 64, 
  onClick,
  className = "" 
}: SmoothGlowButton2Props) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative overflow-hidden rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Glass morphism background */}
      <div 
        className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
        style={{
          boxShadow: "0 0 20px rgba(255,255,255,0.3), inset 0 0 20px rgba(255,255,255,0.1)",
        }}
      />
      
      {/* Mathematical Sine Wave Conic Gradient */}
      <div 
        className="absolute inset-[1px] rounded-full"
        style={{
          background: `conic-gradient(from var(--sine-rotation, 0deg), 
            rgba(255,255,255,0.9) 0deg, 
            rgba(255,255,255,0.9) var(--sine-arc-size, 60deg), 
            rgba(255,255,255,0.3) var(--sine-arc-size, 60deg),
            transparent calc(var(--sine-arc-size, 60deg) + 20deg), 
            transparent 360deg)`,
          filter: "blur(0.3px) drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))",
          animation: "sine-rotation 2.5s linear infinite, sine-arc-growth 4s ease-in-out infinite",
          maskImage: `radial-gradient(circle, transparent ${size/2 - 3}px, black ${size/2 - 2}px)`,
          WebkitMaskImage: `radial-gradient(circle, transparent ${size/2 - 3}px, black ${size/2 - 2}px)`,
        }}
      />
      
      {/* Button content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center text-white/90">
        {children}
      </div>
    </motion.button>
  );
}