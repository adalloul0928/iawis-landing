"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SmoothGlowButton1Props {
  children: ReactNode;
  size?: number;
  onClick?: () => void;
  className?: string;
}

/**
 * Smooth Glow Button - Variation 1: Continuous Rotation + Smooth Arc Growth
 * Separates rotation from arc size changes for smoother animation
 * - Continuous rotation at constant speed
 * - Separate smooth arc size pulsing with ease-in-out
 */
export function SmoothGlowButton1({ 
  children, 
  size = 64, 
  onClick,
  className = "" 
}: SmoothGlowButton1Props) {
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
      
      {/* Smooth Rotating + Growing Conic Gradient */}
      <div 
        className="absolute inset-[1px] rounded-full"
        style={{
          background: `conic-gradient(from var(--smooth-rotation, 0deg), 
            rgba(255,255,255,0.4) 0deg, 
            rgba(255,255,255,0.4) var(--smooth-arc-size, 30deg), 
            transparent var(--smooth-arc-size, 30deg), 
            transparent 360deg)`,
          filter: "blur(0.8px) drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))",
          animation: "smooth-rotation 3s linear infinite, smooth-arc-pulse 4.5s ease-in-out infinite",
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