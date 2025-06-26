"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowingCircleButton1Props {
  children: ReactNode;
  size?: number;
  onClick?: () => void;
  className?: string;
}

/**
 * Glowing Circle Button - Method 1: SVG Stroke-Dasharray
 * Creates a glowing line that travels around the button's border
 * - Starts as small arc, grows to full circle, shrinks back
 * - Uses SVG stroke-dasharray and stroke-dashoffset for smooth animation
 * - Natural acceleration/deceleration with ease-in-out timing
 */
export function GlowingCircleButton1({ 
  children, 
  size = 64, 
  onClick,
  className = "" 
}: GlowingCircleButton1Props) {
  const radius = (size - 4) / 2;
  const circumference = radius * 2 * Math.PI;
  const center = size / 2;

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
      
      {/* SVG Glowing Animation */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.8)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          style={{
            filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))",
            animation: "svg-glow-travel 3s ease-in-out infinite",
          }}
        />
      </svg>
      
      {/* Button content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center text-white/90">
        {children}
      </div>
    </motion.button>
  );
}