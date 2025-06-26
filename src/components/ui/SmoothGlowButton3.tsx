"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SmoothGlowButton3Props {
  children: ReactNode;
  size?: number;
  onClick?: () => void;
  className?: string;
}

/**
 * Smooth Glow Button - Variation 3: Ultra-Smooth Bezier Curves
 * Uses custom cubic-bezier timing functions for ultra-smooth transitions
 * - Multiple layers for complex glow effects
 * - Bezier curve based easing for natural motion
 */
export function SmoothGlowButton3({ 
  children, 
  size = 64, 
  onClick,
  className = "" 
}: SmoothGlowButton3Props) {
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
      
      {/* Ultra-Smooth Bezier Conic Gradient - Layer 1 */}
      <div 
        className="absolute inset-[1px] rounded-full"
        style={{
          background: `conic-gradient(from var(--bezier-rotation, 0deg), 
            rgba(255,255,255,0.95) 0deg, 
            rgba(255,255,255,0.95) var(--bezier-arc-size, 45deg), 
            rgba(255,255,255,0.4) calc(var(--bezier-arc-size, 45deg) + 10deg),
            transparent calc(var(--bezier-arc-size, 45deg) + 30deg), 
            transparent 360deg)`,
          filter: "blur(0.2px) drop-shadow(0 0 12px rgba(255, 255, 255, 0.9))",
          animation: "bezier-rotation 3s linear infinite, bezier-arc-breathing 5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite",
          maskImage: `radial-gradient(circle, transparent ${size/2 - 3}px, black ${size/2 - 2}px)`,
          WebkitMaskImage: `radial-gradient(circle, transparent ${size/2 - 3}px, black ${size/2 - 2}px)`,
        }}
      />
      
      {/* Additional glow layer for extra smoothness */}
      <div 
        className="absolute inset-[2px] rounded-full opacity-60"
        style={{
          background: `conic-gradient(from calc(var(--bezier-rotation, 0deg) + 30deg), 
            transparent 0deg,
            rgba(255,255,255,0.6) calc(var(--bezier-arc-size, 45deg) / 2), 
            transparent var(--bezier-arc-size, 45deg), 
            transparent 360deg)`,
          filter: "blur(1px)",
          animation: "bezier-rotation 3s linear infinite, bezier-arc-breathing 5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite",
          maskImage: `radial-gradient(circle, transparent ${size/2 - 4}px, black ${size/2 - 3}px)`,
          WebkitMaskImage: `radial-gradient(circle, transparent ${size/2 - 4}px, black ${size/2 - 3}px)`,
        }}
      />
      
      {/* Button content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center text-white/90">
        {children}
      </div>
    </motion.button>
  );
}