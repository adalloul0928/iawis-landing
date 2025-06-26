"use client";

import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

/**
 * Professional loading spinner component with glass morphism styling
 * Uses SVG stroke-dasharray for smooth grow/shrink animation
 * Industry-standard implementation used by major UI libraries
 */
export function LoadingSpinner({ 
  size = 64, 
  strokeWidth = 2,
  className = "" 
}: LoadingSpinnerProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const center = size / 2;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative inline-block overflow-hidden rounded-full p-[1px] ${className}`}
      style={{
        width: size,
        height: size,
        boxShadow: "0 0 20px rgba(255,255,255,0.3), inset 0 0 20px rgba(255,255,255,0.1)",
      }}
    >
      {/* Spinning gradient border background */}
      <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,rgba(255,255,255,0.4)_0deg,rgba(255,255,255,0.4)_15deg,transparent_16deg,transparent_344deg,rgba(255,255,255,0.4)_345deg)]" />
      
      {/* Glass morphism container */}
      <div className="relative w-full h-full rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
        {/* SVG Loading Animation */}
        <svg
          width={size - 8}
          height={size - 8}
          viewBox={`0 0 ${size} ${size}`}
          className="absolute"
          style={{
            transform: "rotate(-90deg)", // Start from top
          }}
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.7)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            style={{
              filter: "drop-shadow(0 0 6px rgba(255, 255, 255, 0.6))",
              animation: `loading-grow-shrink 2s ease-in-out infinite, spin 2s linear infinite`,
            }}
          />
        </svg>
      </div>
    </motion.div>
  );
}