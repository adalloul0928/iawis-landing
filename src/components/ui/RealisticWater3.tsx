"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface RealisticWater3Props {
  children: ReactNode;
  className?: string;
  dropletCount?: number;
}

interface PhysicsDroplet {
  id: number;
  x: number;
  y: number;
  size: number;
  vx: number; // velocity x
  vy: number; // velocity y
  opacity: number;
  merged: boolean;
  trail: Array<{ x: number; y: number; alpha: number }>;
}

/**
 * Method 3: Canvas-Based Physics Simulation
 * Most realistic droplet physics with collision detection and merging
 * - HTML5 Canvas for smooth rendering
 * - Real physics simulation with surface tension
 * - Droplet collision detection and merging
 * - Realistic trails and water behavior
 */
export function RealisticWater3({ 
  children, 
  className = "",
  dropletCount = 4
}: RealisticWater3Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [droplets, setDroplets] = useState<PhysicsDroplet[]>([]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const animationRef = useRef<number>();

  // Track container size
  useEffect(() => {
    const updateSize = () => {
      const container = canvasRef.current?.parentElement;
      if (container) {
        setContainerSize({
          width: container.offsetWidth,
          height: container.offsetHeight
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Generate new droplets
  useEffect(() => {
    const generateDroplet = (): PhysicsDroplet => ({
      id: Date.now() + Math.random(),
      x: Math.random() * 0.7 + 0.15, // 15-85% of width (normalized)
      y: -0.1, // Start above container
      size: 0.03 + Math.random() * 0.04, // 3-7% of container width
      vx: (Math.random() - 0.5) * 0.002, // Small horizontal drift
      vy: 0.001 + Math.random() * 0.001, // Initial slow fall
      opacity: 0.7 + Math.random() * 0.3,
      merged: false,
      trail: []
    });

    const interval = setInterval(() => {
      setDroplets(prev => {
        const active = prev.filter(d => d.y < 1.2 && !d.merged);
        if (active.length < dropletCount) {
          return [...active, generateDroplet()];
        }
        return active;
      });
    }, 3000 + Math.random() * 4000);

    return () => clearInterval(interval);
  }, [dropletCount]);

  // Physics simulation and rendering
  useEffect(() => {
    if (!canvasRef.current || containerSize.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = containerSize.width;
    canvas.height = containerSize.height;

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      setDroplets(prev => {
        const updated = prev.map(droplet => {
          if (droplet.merged) return droplet;

          // Physics update
          const newVy = droplet.vy + 0.00005; // Gravity acceleration
          const newY = droplet.y + newVy;
          const newX = droplet.x + droplet.vx;

          // Add to trail
          const newTrail = [
            { x: droplet.x * canvas.width, y: droplet.y * canvas.height, alpha: 0.3 },
            ...droplet.trail.slice(0, 10)
          ].map((point, index) => ({
            ...point,
            alpha: point.alpha * (1 - index * 0.1)
          }));

          return {
            ...droplet,
            x: newX,
            y: newY,
            vy: Math.min(newVy, 0.01), // Terminal velocity
            trail: newTrail
          };
        });

        // Collision detection and merging
        const merged = updated.map(droplet => {
          if (droplet.merged) return droplet;

          for (let other of updated) {
            if (other.id !== droplet.id && !other.merged) {
              const dx = (droplet.x - other.x) * canvas.width;
              const dy = (droplet.y - other.y) * canvas.height;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const minDistance = (droplet.size + other.size) * canvas.width * 0.7;

              if (distance < minDistance) {
                // Merge droplets
                return {
                  ...droplet,
                  size: Math.min(droplet.size + other.size * 0.3, 0.12), // Max size limit
                  opacity: Math.min(droplet.opacity + 0.1, 1),
                  x: (droplet.x + other.x) / 2,
                  y: Math.min(droplet.y, other.y),
                  vy: (droplet.vy + other.vy) / 2
                };
              }
            }
          }
          return droplet;
        });

        // Mark merged droplets
        const finalDroplets = merged.filter((droplet, index) => {
          for (let i = index + 1; i < merged.length; i++) {
            const other = merged[i];
            const dx = (droplet.x - other.x) * canvas.width;
            const dy = (droplet.y - other.y) * canvas.height;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = (droplet.size + other.size) * canvas.width * 0.7;
            
            if (distance < minDistance) {
              return false; // Remove this droplet (it was merged)
            }
          }
          return true;
        });

        return finalDroplets;
      });

      // Render droplets
      droplets.forEach(droplet => {
        if (droplet.merged) return;

        const x = droplet.x * canvas.width;
        const y = droplet.y * canvas.height;
        const radius = droplet.size * canvas.width;

        // Only render if within logo area (approximate circle)
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const logoRadius = Math.min(canvas.width, canvas.height) * 0.45;
        const distFromCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        
        if (distFromCenter > logoRadius) return;

        // Render trail
        droplet.trail.forEach((point, index) => {
          if (point.alpha > 0.05) {
            ctx.save();
            ctx.globalAlpha = point.alpha;
            
            const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius * 0.3);
            gradient.addColorStop(0, 'rgba(147, 197, 253, 0.6)');
            gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(point.x - radius * 0.3, point.y - radius * 0.6, radius * 0.6, radius * 1.2);
            ctx.restore();
          }
        });

        // Render main droplet
        ctx.save();
        ctx.globalAlpha = droplet.opacity;

        // Shadow
        ctx.save();
        ctx.globalAlpha = droplet.opacity * 0.3;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.beginPath();
        ctx.ellipse(x + 2, y + 3, radius * 0.8, radius * 1.1, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Main droplet body
        const gradient = ctx.createRadialGradient(x - radius * 0.3, y - radius * 0.4, 0, x, y, radius);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        gradient.addColorStop(0.3, 'rgba(147, 197, 253, 0.8)');
        gradient.addColorStop(0.7, 'rgba(59, 130, 246, 0.7)');
        gradient.addColorStop(1, 'rgba(29, 78, 216, 0.5)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(x, y, radius * 0.9, radius * 1.2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.ellipse(x - radius * 0.4, y - radius * 0.5, radius * 0.3, radius * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Edge definition
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(x, y, radius * 0.9, radius * 1.2, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [droplets, containerSize]);

  return (
    <div className={`relative ${className}`}>
      {children}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ 
          zIndex: 10,
          clipPath: 'circle(45% at 50% 50%)' // Mask to logo shape
        }}
      />
    </div>
  );
}