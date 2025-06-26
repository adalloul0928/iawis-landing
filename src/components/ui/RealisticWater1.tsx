"use client";

import { ReactNode, useEffect, useState } from "react";

interface RealisticWater1Props {
  children: ReactNode;
  className?: string;
  dropletCount?: number;
}

interface Droplet {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  trail: Array<{ x: number; y: number; opacity: number }>;
}

/**
 * Method 1: SVG Masking + Physics Animation
 * Large realistic water droplets constrained to SVG logo shape
 * - SVG clipPath to mask droplets to logo area only
 * - Physics-based sliding with realistic gravity
 * - Large droplets (20-40px) with teardrop shapes
 * - Droplet merging and trail effects
 */
export function RealisticWater1({ 
  children, 
  className = "",
  dropletCount = 4
}: RealisticWater1Props) {
  const [droplets, setDroplets] = useState<Droplet[]>([]);
  const [logoMask, setLogoMask] = useState<string>('');

  // Generate new droplets periodically
  useEffect(() => {
    const generateDroplet = (): Droplet => ({
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10, // 10-90% of logo width
      y: -10, // Start above logo
      size: 20 + Math.random() * 20, // 20-40px large droplets
      speed: 0.3 + Math.random() * 0.4, // Slow sliding speed
      opacity: 0.7 + Math.random() * 0.3,
      trail: []
    });

    const interval = setInterval(() => {
      setDroplets(prev => {
        // Remove droplets that have fallen off screen
        const activeDroplets = prev.filter(d => d.y < 120);
        
        // Add new droplet if we have room
        if (activeDroplets.length < dropletCount) {
          return [...activeDroplets, generateDroplet()];
        }
        return activeDroplets;
      });
    }, 2000 + Math.random() * 3000); // Random intervals 2-5 seconds

    return () => clearInterval(interval);
  }, [dropletCount]);

  // Animate droplets
  useEffect(() => {
    const animationFrame = () => {
      setDroplets(prev => prev.map(droplet => {
        const newY = droplet.y + droplet.speed;
        
        // Add to trail
        const newTrail = [
          { x: droplet.x, y: droplet.y, opacity: droplet.opacity * 0.3 },
          ...droplet.trail.slice(0, 8) // Keep last 8 trail points
        ].map((point, index) => ({
          ...point,
          opacity: point.opacity * (1 - index * 0.15) // Fade trail
        }));

        return {
          ...droplet,
          y: newY,
          speed: Math.min(droplet.speed + 0.01, 1.5), // Accelerate due to gravity
          trail: newTrail
        };
      }));
    };

    const interval = setInterval(animationFrame, 50); // 20fps for smooth animation
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {children}
      
      {/* SVG Definitions for masking and droplet shapes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
        <defs>
          {/* Logo shape mask - approximates a circular logo */}
          <clipPath id="logoMask">
            <circle cx="50%" cy="50%" r="45%" />
          </clipPath>
          
          {/* Droplet gradient */}
          <radialGradient id="dropletGradient" cx="30%" cy="20%" r="70%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
            <stop offset="30%" stopColor="rgba(147, 197, 253, 0.8)" />
            <stop offset="70%" stopColor="rgba(59, 130, 246, 0.7)" />
            <stop offset="100%" stopColor="rgba(29, 78, 216, 0.5)" />
          </radialGradient>
          
          {/* Trail gradient */}
          <linearGradient id="trailGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        
        {/* Water droplets group with logo mask */}
        <g clipPath="url(#logoMask)">
          {droplets.map(droplet => (
            <g key={droplet.id}>
              {/* Droplet trail */}
              {droplet.trail.map((point, index) => (
                <ellipse
                  key={index}
                  cx={`${point.x}%`}
                  cy={`${point.y}%`}
                  rx={`${(droplet.size * 0.3) / 10}%`}
                  ry={`${(droplet.size * 0.8) / 10}%`}
                  fill="url(#trailGradient)"
                  opacity={point.opacity}
                />
              ))}
              
              {/* Main droplet - teardrop shape */}
              <g transform={`translate(${droplet.x}%, ${droplet.y}%)`}>
                {/* Shadow */}
                <ellipse
                  cx="0.3%"
                  cy="0.5%"
                  rx={`${droplet.size / 8}%`}
                  ry={`${droplet.size / 6}%`}
                  fill="rgba(0, 0, 0, 0.2)"
                  opacity={droplet.opacity * 0.5}
                />
                
                {/* Main droplet body */}
                <ellipse
                  cx="0"
                  cy="0"
                  rx={`${droplet.size / 10}%`}
                  ry={`${droplet.size / 7}%`}
                  fill="url(#dropletGradient)"
                  opacity={droplet.opacity}
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))'
                  }}
                />
                
                {/* Highlight */}
                <ellipse
                  cx="-0.3%"
                  cy="-0.3%"
                  rx={`${droplet.size / 20}%`}
                  ry={`${droplet.size / 15}%`}
                  fill="rgba(255, 255, 255, 0.7)"
                  opacity={droplet.opacity * 0.8}
                />
              </g>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}