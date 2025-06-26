"use client";

import { ReactNode } from "react";

interface WaterDroplets2Props {
  children: ReactNode;
  className?: string;
  dropletCount?: number;
}

/**
 * Method 2: SVG Path-Based Droplets
 * Creates realistic teardrop-shaped water droplets using SVG paths
 * - Authentic teardrop shapes with SVG paths
 * - SVG filters for realistic water effects (blur, refraction)
 * - Smooth sliding animation with subtle size variations
 */
export function WaterDroplets2({ 
  children, 
  className = "",
  dropletCount = 6
}: WaterDroplets2Props) {
  const droplets = Array.from({ length: dropletCount }, (_, i) => {
    const size = 12 + Math.random() * 8; // 12-20px
    const delay = Math.random() * 5;
    const duration = 4 + Math.random() * 3;
    const leftPosition = Math.random() * 85 + 5;

    return (
      <svg
        key={i}
        className="absolute pointer-events-none"
        style={{
          left: `${leftPosition}%`,
          top: '-30px',
          width: `${size}px`,
          height: `${size * 1.3}px`,
          animation: `svgDropletPath ${duration}s ease-in infinite`,
          animationDelay: `${delay}s`,
        }}
        viewBox="0 0 20 26"
      >
        <defs>
          <filter id={`dropletGlow-${i}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id={`dropletGradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(147, 197, 253, 0.8)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.6)" />
            <stop offset="100%" stopColor="rgba(29, 78, 216, 0.4)" />
          </linearGradient>
        </defs>
        
        {/* Teardrop shape path */}
        <path
          d="M10 2 C6 2, 2 6, 2 12 C2 18, 6 22, 10 22 C14 22, 18 18, 18 12 C18 6, 14 2, 10 2 Z"
          fill={`url(#dropletGradient-${i})`}
          filter={`url(#dropletGlow-${i})`}
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="0.5"
        />
        
        {/* Highlight for realism */}
        <ellipse
          cx="8"
          cy="8"
          rx="2"
          ry="3"
          fill="rgba(255, 255, 255, 0.4)"
          opacity="0.7"
        />
      </svg>
    );
  });

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      {/* SVG droplets overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {droplets}
      </div>
    </div>
  );
}