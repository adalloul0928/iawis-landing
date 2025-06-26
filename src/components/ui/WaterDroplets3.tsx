"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface WaterDroplets3Props {
  children: ReactNode;
  className?: string;
  dropletCount?: number;
}

interface Droplet {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

/**
 * Method 3: Framer Motion React Components
 * Uses Framer Motion for physics-based droplet animations
 * - Spring physics for realistic motion
 * - Staggered droplet generation
 * - Smooth entrance and exit transitions
 */
export function WaterDroplets3({ 
  children, 
  className = "",
  dropletCount = 7
}: WaterDroplets3Props) {
  const [droplets, setDroplets] = useState<Droplet[]>([]);

  useEffect(() => {
    const generateDroplets = () => {
      const newDroplets: Droplet[] = Array.from({ length: dropletCount }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 85 + 5, // 5% to 90% width
        size: 6 + Math.random() * 8, // 6-14px
        duration: 3 + Math.random() * 2, // 3-5 seconds
        delay: Math.random() * 3, // 0-3 second delay
      }));
      setDroplets(newDroplets);
    };

    generateDroplets();
    
    // Regenerate droplets periodically for continuous effect
    const interval = setInterval(generateDroplets, 8000);
    return () => clearInterval(interval);
  }, [dropletCount]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      
      {/* Framer Motion droplets overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {droplets.map((droplet) => (
          <motion.div
            key={droplet.id}
            className="absolute rounded-full"
            style={{
              left: `${droplet.x}%`,
              width: `${droplet.size}px`,
              height: `${droplet.size * 1.2}px`,
              background: `radial-gradient(ellipse at 30% 20%, 
                rgba(255, 255, 255, 0.8) 0%, 
                rgba(147, 197, 253, 0.7) 30%, 
                rgba(59, 130, 246, 0.5) 70%, 
                rgba(29, 78, 216, 0.3) 100%)`,
              boxShadow: `
                0 0 6px rgba(59, 130, 246, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.6),
                inset 0 -1px 0 rgba(29, 78, 216, 0.3)
              `,
              filter: 'blur(0.3px)',
            }}
            initial={{ 
              y: -50, 
              opacity: 0, 
              scale: 0.7 
            }}
            animate={{ 
              y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000, 
              opacity: [0, 1, 1, 0],
              scale: [0.7, 1, 0.9, 0.6]
            }}
            transition={{
              duration: droplet.duration,
              delay: droplet.delay,
              ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier
              opacity: {
                times: [0, 0.2, 0.8, 1],
                duration: droplet.duration,
              },
              scale: {
                times: [0, 0.3, 0.7, 1],
                duration: droplet.duration,
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}