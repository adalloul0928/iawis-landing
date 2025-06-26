"use client";

import { ReactNode, useEffect, useState } from "react";

interface RealisticWater2Props {
  children: ReactNode;
  className?: string;
  dropletCount?: number;
}

interface GlassDroplet {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  refraction: number;
}

/**
 * Method 2: SVG Filters + Glass Distortion
 * Realistic refraction effects using advanced SVG filters
 * - feTurbulence and feDisplacementMap for glass distortion
 * - Droplets that magnify and distort the logo behind them
 * - Realistic light refraction and optical properties
 * - Glass-like visual effects with highlights and shadows
 */
export function RealisticWater2({ 
  children, 
  className = "",
  dropletCount = 3
}: RealisticWater2Props) {
  const [droplets, setDroplets] = useState<GlassDroplet[]>([]);

  useEffect(() => {
    const generateDroplet = (): GlassDroplet => ({
      id: Date.now() + Math.random(),
      x: Math.random() * 70 + 15, // 15-85% of width
      y: -15,
      size: 25 + Math.random() * 25, // 25-50px very large droplets
      speed: 0.2 + Math.random() * 0.3, // Very slow for realism
      opacity: 0.8 + Math.random() * 0.2,
      refraction: 15 + Math.random() * 25 // Distortion strength
    });

    const interval = setInterval(() => {
      setDroplets(prev => {
        const active = prev.filter(d => d.y < 110);
        if (active.length < dropletCount) {
          return [...active, generateDroplet()];
        }
        return active;
      });
    }, 4000 + Math.random() * 4000); // 4-8 second intervals

    return () => clearInterval(interval);
  }, [dropletCount]);

  useEffect(() => {
    const animate = () => {
      setDroplets(prev => prev.map(droplet => ({
        ...droplet,
        y: droplet.y + droplet.speed,
        speed: Math.min(droplet.speed + 0.005, 0.8) // Gentle acceleration
      })));
    };

    const interval = setInterval(animate, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {children}
      
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
        <defs>
          {/* Logo mask for constraining effects */}
          <clipPath id="glassLogoMask">
            <circle cx="50%" cy="50%" r="45%" />
          </clipPath>
          
          {/* Turbulence for glass distortion */}
          <filter id="glassDistortion" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence 
              baseFrequency="0.02" 
              numOctaves="3" 
              result="turbulence"
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="turbulence" 
              scale="8"
              result="displacement"
            />
            <feGaussianBlur 
              in="displacement" 
              stdDeviation="0.5"
              result="blur"
            />
          </filter>

          {/* Individual droplet filters */}
          {droplets.map(droplet => (
            <g key={`filter-${droplet.id}`}>
              {/* Magnification effect */}
              <filter id={`magnify-${droplet.id}`} x="-100%" y="-100%" width="300%" height="300%">
                <feTurbulence 
                  baseFrequency="0.01" 
                  numOctaves="1" 
                  result="noise"
                />
                <feDisplacementMap 
                  in="SourceGraphic" 
                  in2="noise" 
                  scale={droplet.refraction}
                  result="distorted"
                />
                <feGaussianBlur 
                  in="distorted" 
                  stdDeviation="0.3"
                  result="softened"
                />
                <feSpecularLighting 
                  in="softened"
                  specularConstant="2"
                  specularExponent="20"
                  lightingColor="white"
                  result="lighting"
                >
                  <fePointLight x="30%" y="20%" z="200"/>
                </feSpecularLighting>
                <feComposite 
                  in="lighting" 
                  in2="softened" 
                  operator="screen"
                  result="lit"
                />
              </filter>

              {/* Droplet shape gradient */}
              <radialGradient id={`glassGradient-${droplet.id}`} cx="35%" cy="25%" r="65%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
                <stop offset="20%" stopColor="rgba(147, 197, 253, 0.85)" />
                <stop offset="50%" stopColor="rgba(59, 130, 246, 0.75)" />
                <stop offset="80%" stopColor="rgba(29, 78, 216, 0.6)" />
                <stop offset="100%" stopColor="rgba(29, 78, 216, 0.3)" />
              </radialGradient>
            </g>
          ))}
        </defs>
        
        {/* Glass droplets with refraction effects */}
        <g clipPath="url(#glassLogoMask)">
          {droplets.map(droplet => (
            <g key={droplet.id} transform={`translate(${droplet.x}%, ${droplet.y}%)`}>
              {/* Background distortion area */}
              <circle
                cx="0"
                cy="0"
                r={`${droplet.size / 8}%`}
                fill="none"
                filter={`url(#magnify-${droplet.id})`}
                opacity={droplet.opacity * 0.7}
              />
              
              {/* Main glass droplet */}
              <ellipse
                cx="0"
                cy="0"
                rx={`${droplet.size / 10}%`}
                ry={`${droplet.size / 7}%`}
                fill={`url(#glassGradient-${droplet.id})`}
                opacity={droplet.opacity}
                style={{
                  filter: `
                    drop-shadow(0 3px 8px rgba(59, 130, 246, 0.4))
                    drop-shadow(inset 0 1px 0 rgba(255, 255, 255, 0.8))
                  `
                }}
              />
              
              {/* Refraction highlight */}
              <ellipse
                cx="-0.4%"
                cy="-0.5%"
                rx={`${droplet.size / 25}%`}
                ry={`${droplet.size / 18}%`}
                fill="rgba(255, 255, 255, 0.9)"
                opacity={droplet.opacity}
                style={{
                  filter: 'blur(0.5px)'
                }}
              />
              
              {/* Secondary highlight for depth */}
              <ellipse
                cx="0.2%"
                cy="0.3%"
                rx={`${droplet.size / 40}%`}
                ry={`${droplet.size / 30}%`}
                fill="rgba(255, 255, 255, 0.6)"
                opacity={droplet.opacity * 0.8}
              />
              
              {/* Edge enhancement */}
              <ellipse
                cx="0"
                cy="0"
                rx={`${droplet.size / 10}%`}
                ry={`${droplet.size / 7}%`}
                fill="none"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="0.2%"
                opacity={droplet.opacity * 0.6}
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}