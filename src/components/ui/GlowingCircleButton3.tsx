"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowingCircleButton3Props {
  children: ReactNode;
  size?: number;
  onClick?: () => void;
  className?: string;
}

/**
 * Glowing Circle Button - Method 3: CSS Transform + Box-Shadow Pulse
 * Creates a breathing glow effect with rotating elements
 * - Uses pseudo-elements with rotating transforms
 * - Box-shadow creates the glowing effect
 * - Multiple layered animations for complex timing
 */
export function GlowingCircleButton3({ 
  children, 
  size = 64, 
  onClick,
  className = "" 
}: GlowingCircleButton3Props) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative overflow-hidden rounded-full glow-button-3 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Glass morphism background */}
      <div 
        className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
        style={{
          boxShadow: "0 0 20px rgba(255,255,255,0.3), inset 0 0 20px rgba(255,255,255,0.1)",
        }}
      />
      
      {/* Rotating glow elements */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          animation: "pulse-glow-travel 3s ease-in-out infinite",
        }}
      >
        <div 
          className="absolute w-full h-full rounded-full"
          style={{
            background: `linear-gradient(45deg, 
              rgba(255,255,255,0.8) 0%, 
              transparent 20%, 
              transparent 80%, 
              rgba(255,255,255,0.8) 100%)`,
            filter: "blur(1px)",
            animation: "rotate-glow 3s linear infinite",
          }}
        />
      </div>
      
      {/* Additional glow layer */}
      <div 
        className="absolute inset-[2px] rounded-full"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4)",
          animation: "inner-glow-pulse 3s ease-in-out infinite",
        }}
      />
      
      {/* Button content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center text-white/90">
        {children}
      </div>
    </motion.button>
  );
}