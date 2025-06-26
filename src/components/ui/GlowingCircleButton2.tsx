"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowingCircleButton2Props {
  children: ReactNode;
  size?: number;
  onClick?: () => void;
  className?: string;
}

/**
 * Glowing Circle Button - Method 2: CSS Conic Gradient with @property
 * Creates a smooth rotating gradient that grows and shrinks
 * - Modern CSS approach using CSS custom properties
 * - Conic gradient rotates while arc size changes
 * - Smooth interpolation for natural motion
 */
export function GlowingCircleButton2({ 
  children, 
  size = 64, 
  onClick,
  className = "" 
}: GlowingCircleButton2Props) {
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
      
      {/* Rotating Conic Gradient Border */}
      <div 
        className="absolute inset-[1px] rounded-full"
        style={{
          background: `conic-gradient(from var(--rotation-angle, 0deg), 
            rgba(255,255,255,0.9) 0deg, 
            rgba(255,255,255,0.9) var(--arc-size, 30deg), 
            transparent var(--arc-size, 30deg), 
            transparent 360deg)`,
          filter: "blur(0.5px) drop-shadow(0 0 6px rgba(255, 255, 255, 0.6))",
          animation: "conic-glow-travel 4s ease-in-out infinite",
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