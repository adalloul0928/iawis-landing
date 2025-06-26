"use client";

import { ReactNode } from "react";

interface WaterDroplets4Props {
  children: ReactNode;
  className?: string;
  dropletCount?: number;
}

/**
 * Method 4: CSS Gradient + Pseudo-elements
 * Creates water droplets using CSS pseudo-elements and radial gradients
 * - Lightweight approach using only CSS
 * - Pseudo-elements for performance
 * - Radial gradients for realistic water appearance
 * - Subtle glow and shadow effects
 */
export function WaterDroplets4({ 
  children, 
  className = "",
  dropletCount = 9
}: WaterDroplets4Props) {
  const droplets = Array.from({ length: dropletCount }, (_, i) => {
    const size = 8 + Math.random() * 10; // 8-18px
    const delay = Math.random() * 4;
    const duration = 4.5 + Math.random() * 2;
    const leftPosition = Math.random() * 88 + 6;

    return (
      <div
        key={i}
        className="absolute pseudo-droplet"
        style={{
          left: `${leftPosition}%`,
          top: '-25px',
          width: `${size}px`,
          height: `${size * 1.4}px`,
          animation: `dropletFallSlow ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite`,
          animationDelay: `${delay}s`,
        }}
      />
    );
  });

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      
      {/* CSS Gradient droplets overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {droplets}
      </div>
      
      <style jsx>{`
        .pseudo-droplet::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse 40% 30% at 35% 25%, 
            rgba(255, 255, 255, 0.9) 0%,
            rgba(147, 197, 253, 0.8) 20%,
            rgba(59, 130, 246, 0.6) 50%,
            rgba(29, 78, 216, 0.4) 80%,
            rgba(29, 78, 216, 0.2) 100%
          );
          border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
          filter: blur(0.4px);
          box-shadow: 
            0 2px 4px rgba(59, 130, 246, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.7),
            inset 0 -1px 1px rgba(29, 78, 216, 0.2);
        }
        
        .pseudo-droplet::after {
          content: '';
          position: absolute;
          top: 15%;
          left: 25%;
          width: 30%;
          height: 25%;
          background: radial-gradient(ellipse, 
            rgba(255, 255, 255, 0.8) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          );
          border-radius: 50%;
          filter: blur(0.2px);
        }
      `}</style>
    </div>
  );
}