"use client";

import { ReactNode } from "react";

interface WaterDroplets1Props {
  children: ReactNode;
  className?: string;
  dropletCount?: number;
}

/**
 * Method 1: Pure CSS Animated Droplets
 * Creates water droplets that slide down over the wrapped element using pure CSS
 * - Multiple circular droplets with staggered animations
 * - Realistic gravity-based motion with easing
 * - Random positioning and timing for natural effect
 */
export function WaterDroplets1({ 
  children, 
  className = "",
  dropletCount = 8
}: WaterDroplets1Props) {
  const droplets = Array.from({ length: dropletCount }, (_, i) => (
    <div
      key={i}
      className="absolute w-2 h-3 bg-blue-200/60 rounded-full droplet-shadow"
      style={{
        left: `${Math.random() * 90 + 5}%`,
        top: '-10px',
        animation: `dropletFall ${3 + Math.random() * 2}s linear infinite`,
        animationDelay: `${Math.random() * 4}s`,
        filter: 'blur(0.5px)',
        boxShadow: '0 0 4px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
      }}
    />
  ));

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      {/* Water droplets overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {droplets}
      </div>
    </div>
  );
}