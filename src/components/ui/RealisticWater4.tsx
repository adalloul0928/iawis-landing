"use client";

import { ReactNode, useEffect, useState } from "react";

interface RealisticWater4Props {
  children: ReactNode;
  className?: string;
  dropletCount?: number;
}

interface LayeredDroplet {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  layer: 'background' | 'main' | 'highlight';
  zIndex: number;
  trail: Array<{ x: number; y: number; size: number; opacity: number }>;
  merging: boolean;
}

/**
 * Method 4: Multi-Layer CSS + JavaScript
 * Sophisticated layering with JavaScript collision detection
 * - Multiple CSS layers for realistic depth
 * - JavaScript-controlled droplet generation and merging
 * - Performance-optimized CSS animations
 * - Complex droplet interactions and behaviors
 */
export function RealisticWater4({ 
  children, 
  className = "",
  dropletCount = 5
}: RealisticWater4Props) {
  const [droplets, setDroplets] = useState<LayeredDroplet[]>([]);

  // Generate droplets with multiple layers
  useEffect(() => {
    const generateDropletGroup = (): LayeredDroplet[] => {
      const baseId = Date.now() + Math.random();
      const x = Math.random() * 70 + 15; // 15-85%
      const y = -10;
      const baseSize = 20 + Math.random() * 20; // 20-40px
      const speed = 0.15 + Math.random() * 0.25;
      const opacity = 0.6 + Math.random() * 0.4;

      return [
        // Background blur layer
        {
          id: baseId + 0.1,
          x: x + (Math.random() - 0.5) * 2,
          y: y + (Math.random() - 0.5) * 2,
          size: baseSize * 1.4,
          speed: speed * 0.95,
          opacity: opacity * 0.3,
          layer: 'background' as const,
          zIndex: 1,
          trail: [],
          merging: false
        },
        // Main droplet
        {
          id: baseId,
          x,
          y,
          size: baseSize,
          speed,
          opacity,
          layer: 'main' as const,
          zIndex: 2,
          trail: [],
          merging: false
        },
        // Highlight layer
        {
          id: baseId + 0.2,
          x: x - 1,
          y: y - 1,
          size: baseSize * 0.4,
          speed: speed * 1.02,
          opacity: opacity * 0.8,
          layer: 'highlight' as const,
          zIndex: 3,
          trail: [],
          merging: false
        }
      ];
    };

    const interval = setInterval(() => {
      setDroplets(prev => {
        const mainDroplets = prev.filter(d => d.layer === 'main' && d.y < 110);
        if (mainDroplets.length < dropletCount) {
          return [...prev.filter(d => d.y < 110), ...generateDropletGroup()];
        }
        return prev.filter(d => d.y < 110);
      });
    }, 2500 + Math.random() * 3500);

    return () => clearInterval(interval);
  }, [dropletCount]);

  // Animation and collision detection
  useEffect(() => {
    const animate = () => {
      setDroplets(prev => {
        // Group droplets by their base ID (for layered droplets)
        const groups = new Map<number, LayeredDroplet[]>();
        prev.forEach(droplet => {
          const baseId = Math.floor(droplet.id);
          if (!groups.has(baseId)) groups.set(baseId, []);
          groups.get(baseId)!.push(droplet);
        });

        const updated: LayeredDroplet[] = [];

        // Check for collisions between main droplets
        const mainDroplets = prev.filter(d => d.layer === 'main');
        const mergedIds = new Set<number>();

        mainDroplets.forEach((droplet, i) => {
          if (mergedIds.has(Math.floor(droplet.id))) return;

          for (let j = i + 1; j < mainDroplets.length; j++) {
            const other = mainDroplets[j];
            if (mergedIds.has(Math.floor(other.id))) continue;

            const dx = droplet.x - other.x;
            const dy = droplet.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = (droplet.size + other.size) * 0.015; // Threshold for merging

            if (distance < minDistance) {
              // Merge droplets
              mergedIds.add(Math.floor(other.id));
              
              // Update the surviving droplet
              const survivingGroup = groups.get(Math.floor(droplet.id));
              if (survivingGroup) {
                survivingGroup.forEach(layerDroplet => {
                  layerDroplet.size = Math.min(layerDroplet.size * 1.3, 60);
                  layerDroplet.opacity = Math.min(layerDroplet.opacity + 0.1, 1);
                  layerDroplet.x = (droplet.x + other.x) / 2;
                  layerDroplet.y = Math.min(droplet.y, other.y);
                  layerDroplet.merging = true;
                });
              }
              break;
            }
          }
        });

        // Update all droplets
        groups.forEach((group, baseId) => {
          if (mergedIds.has(baseId)) return; // Skip merged droplets

          group.forEach(droplet => {
            // Physics update
            const newY = droplet.y + droplet.speed;
            const newSpeed = Math.min(droplet.speed + 0.008, 1.2);

            // Add to trail for main droplets
            let newTrail = droplet.trail;
            if (droplet.layer === 'main') {
              newTrail = [
                { 
                  x: droplet.x, 
                  y: droplet.y, 
                  size: droplet.size * 0.3, 
                  opacity: droplet.opacity * 0.4 
                },
                ...droplet.trail.slice(0, 6)
              ].map((point, index) => ({
                ...point,
                opacity: point.opacity * (1 - index * 0.15)
              }));
            }

            updated.push({
              ...droplet,
              y: newY,
              speed: newSpeed,
              trail: newTrail,
              merging: false
            });
          });
        });

        return updated;
      });
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, []);

  const getDropletStyle = (droplet: LayeredDroplet) => {
    const baseStyle = {
      position: 'absolute' as const,
      left: `${droplet.x}%`,
      top: `${droplet.y}%`,
      width: `${droplet.size}px`,
      height: `${droplet.size * 1.3}px`,
      opacity: droplet.opacity,
      zIndex: droplet.zIndex,
      pointerEvents: 'none' as const,
      transition: droplet.merging ? 'all 0.5s ease-out' : 'none'
    };

    switch (droplet.layer) {
      case 'background':
        return {
          ...baseStyle,
          background: `radial-gradient(ellipse, 
            rgba(59, 130, 246, 0.2) 0%,
            rgba(29, 78, 216, 0.1) 60%,
            transparent 100%)`,
          borderRadius: '50%',
          filter: 'blur(3px)'
        };
      
      case 'main':
        return {
          ...baseStyle,
          background: `radial-gradient(ellipse 40% 30% at 35% 25%, 
            rgba(255, 255, 255, 0.9) 0%,
            rgba(147, 197, 253, 0.8) 25%,
            rgba(59, 130, 246, 0.7) 55%,
            rgba(29, 78, 216, 0.5) 80%,
            rgba(29, 78, 216, 0.3) 100%)`,
          borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
          boxShadow: `
            0 3px 8px rgba(59, 130, 246, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.6),
            inset 0 -2px 1px rgba(29, 78, 216, 0.2)
          `,
          filter: 'blur(0.3px)'
        };
      
      case 'highlight':
        return {
          ...baseStyle,
          background: `radial-gradient(ellipse, 
            rgba(255, 255, 255, 0.9) 0%,
            rgba(255, 255, 255, 0.4) 50%,
            transparent 100%)`,
          borderRadius: '50%',
          filter: 'blur(0.5px)'
        };
      
      default:
        return baseStyle;
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      
      {/* Droplet container with logo mask */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          clipPath: 'circle(45% at 50% 50%)',
          zIndex: 10
        }}
      >
        {/* Render trails */}
        {droplets
          .filter(d => d.layer === 'main')
          .map(droplet => 
            droplet.trail.map((trail, index) => (
              <div
                key={`${droplet.id}-trail-${index}`}
                style={{
                  position: 'absolute',
                  left: `${trail.x}%`,
                  top: `${trail.y}%`,
                  width: `${trail.size}px`,
                  height: `${trail.size * 2}px`,
                  background: `linear-gradient(to bottom, 
                    rgba(59, 130, 246, ${trail.opacity}) 0%,
                    transparent 100%)`,
                  borderRadius: '50%',
                  opacity: trail.opacity,
                  filter: 'blur(1px)',
                  zIndex: 0
                }}
              />
            ))
          )}
        
        {/* Render droplets */}
        {droplets.map(droplet => (
          <div
            key={droplet.id}
            style={getDropletStyle(droplet)}
          />
        ))}
      </div>
    </div>
  );
}