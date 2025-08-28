<<<<<<< HEAD
import React, { useState, useEffect, useRef, HTMLAttributes } from "react";

// A simple utility for conditional class names
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(" ");
};

// Define the type for a single gallery item
=======
"use client";

import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

>>>>>>> carousel
export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
<<<<<<< HEAD
    url: string;
=======
    url: string; 
>>>>>>> carousel
    text: string;
    pos?: string;
    by: string;
  };
}

<<<<<<< HEAD
// Define the props for the CircularGallery component
interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /** Controls how far the items are from the center. */
  radius?: number;
  /** Controls the speed of auto-rotation when not scrolling. */
  autoRotateSpeed?: number;
  /** Optional click handler for gallery items */
  onItemClick?: (item: GalleryItem) => void;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  (
    {
      items,
      className,
      radius = 800,
      autoRotateSpeed = 0.02,
      onItemClick,
      ...props
    },
    ref,
  ) => {
    // Responsive values based on screen size
    const [responsiveRadius, setResponsiveRadius] = useState(radius);
    const [cardDimensions, setCardDimensions] = useState({
      width: 400,
      height: 500,
    });
    const [perspective, setPerspective] = useState(2000);

    useEffect(() => {
      const updateResponsiveValues = () => {
        const width = window.innerWidth;

        // Much more aggressive scaling - scale directly with viewport width
        const baseWidth = 1200; // Reference width for full size
        const scale = Math.max(0.3, Math.min(width / baseWidth, 1)); // Reduced max scale from 1.2 to 0.9

        // Scale everything proportionally - increase radius to prevent overlap
        const scaledRadius = Math.round(scale * 600); // Increased base radius from 400 to 600
        const scaledCardWidth = Math.round(scale * 300); // Base card width of 300
        const scaledCardHeight = Math.round(scale * 400); // Base card height of 400
        const scaledPerspective = Math.round(scale * 1500); // Base perspective of 1500

        setResponsiveRadius(scaledRadius);
        setCardDimensions({ width: scaledCardWidth, height: scaledCardHeight });
        setPerspective(scaledPerspective);
      };

      updateResponsiveValues();
      window.addEventListener("resize", updateResponsiveValues);
      return () => window.removeEventListener("resize", updateResponsiveValues);
    }, [radius]);
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [lastMouseX, setLastMouseX] = useState(0);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Effect to handle scroll-based rotation
    useEffect(() => {
      const handleScroll = () => {
        if (isDragging) return; // Don't update rotation while dragging

=======
interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  radius?: number;
  autoRotateSpeed?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 600, autoRotateSpeed = 0.02, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    // Scroll-based rotation effect
    useEffect(() => {
      const handleScroll = () => {
>>>>>>> carousel
        setIsScrolling(true);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

<<<<<<< HEAD
        const scrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress =
          scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
=======
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
>>>>>>> carousel
        const scrollRotation = scrollProgress * 360;
        setRotation(scrollRotation);

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 150);
      };

<<<<<<< HEAD
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
=======
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
>>>>>>> carousel
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
<<<<<<< HEAD
    }, [isDragging]);

    // Handle mouse drag events
    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      setLastMouseX(e.clientX);
    };

    // Effect for mouse move and up events (global)
    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;

        const deltaX = e.clientX - lastMouseX;
        const rotationChange = deltaX * 0.5; // Sensitivity adjustment

        setRotation((prev) => prev + rotationChange);
        setLastMouseX(e.clientX);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      if (isDragging) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      }

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [isDragging, lastMouseX]);

    // Effect for auto-rotation when not scrolling or dragging
    useEffect(() => {
      const autoRotate = () => {
        if (!isScrolling && !isDragging) {
          setRotation((prev) => prev + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);
=======
    }, []);

    // Auto-rotation when not scrolling
    useEffect(() => {
      if (!isScrolling) {
        const animate = () => {
          setRotation(prev => prev + autoRotateSpeed);
          animationFrameRef.current = requestAnimationFrame(animate);
        };
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      }
>>>>>>> carousel

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
<<<<<<< HEAD
    }, [isScrolling, isDragging, autoRotateSpeed]);

    const anglePerItem = 360 / items.length;
=======
    }, [isScrolling, autoRotateSpeed]);

    // Responsive radius calculation
    const getResponsiveRadius = () => {
      if (typeof window === 'undefined') return radius;
      
      const screenWidth = window.innerWidth;
      if (screenWidth < 480) return Math.min(radius * 0.4, 200);
      if (screenWidth < 768) return Math.min(radius * 0.6, 300);
      if (screenWidth < 1024) return Math.min(radius * 0.8, 400);
      return radius;
    };

    const [currentRadius, setCurrentRadius] = useState(getResponsiveRadius());

    useEffect(() => {
      const handleResize = () => {
        setCurrentRadius(getResponsiveRadius());
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [radius]);
>>>>>>> carousel

    return (
      <div
        ref={ref}
<<<<<<< HEAD
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn(
          "relative w-full h-full flex items-center justify-center cursor-grab select-none",
          isDragging && "cursor-grabbing",
          className,
        )}
        style={{
          perspective: `${perspective}px`,
          touchAction: "pan-x",
        }}
        onMouseDown={handleMouseDown}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(
              relativeAngle > 180 ? 360 - relativeAngle : relativeAngle,
            );
            const opacity = Math.max(0.3, 1 - normalizedAngle / 180);

            return (
              <div
                key={item.photo.url}
                role="group"
                aria-label={item.common}
                className="absolute cursor-pointer"
                style={{
                  width: `${cardDimensions.width}px`,
                  height: `${cardDimensions.height}px`,
                  transform: `rotateY(${itemAngle}deg) translateZ(${responsiveRadius}px)`,
                  left: "50%",
                  top: "50%",
                  marginLeft: `-${cardDimensions.width / 2}px`,
                  marginTop: `-${cardDimensions.height / 2}px`,
                  opacity: opacity,
                  transition: "opacity 0.3s linear",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isDragging) {
                    onItemClick?.(item);
                  }
                }}
              >
                <div className="relative w-full h-full rounded-lg shadow-lg sm:shadow-2xl overflow-hidden group border border-border bg-card/70 dark:bg-card/30 backdrop-blur-lg hover:scale-105 transition-transform duration-300 touch-manipulation">
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: item.photo.pos || "center" }}
                  />
                  {/* Responsive text sizing based on card dimensions */}
                  <div
                    className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent text-white"
                    style={{
                      padding: `${Math.max(8, cardDimensions.width * 0.03)}px`,
                    }}
                  >
                    <h2
                      className="font-bold leading-tight"
                      style={{
                        fontSize: `${Math.max(12, cardDimensions.width * 0.06)}px`,
                      }}
                    >
                      {item.common}
                    </h2>
                    <em
                      className="italic opacity-80 line-clamp-1"
                      style={{
                        fontSize: `${Math.max(10, cardDimensions.width * 0.04)}px`,
                      }}
                    >
                      {item.binomial}
                    </em>
=======
        className={cn(
          "relative w-full min-h-screen flex items-center justify-center overflow-hidden",
          className
        )}
        style={{ minHeight: `${currentRadius * 2.5}px` }}
        {...props}
      >
        <div 
          className="relative"
          style={{
            width: `${currentRadius * 2}px`,
            height: `${currentRadius * 2}px`,
          }}
        >
          {items.map((item, index) => {
            const angle = (360 / items.length) * index + rotation;
            const radian = (angle * Math.PI) / 180;
            
            const x = Math.cos(radian) * currentRadius;
            const y = Math.sin(radian) * currentRadius;

            return (
              <div
                key={index}
                className="absolute group cursor-pointer transition-all duration-300 ease-out hover:scale-110 hover:z-10"
                style={{
                  transform: `translate(${x + currentRadius}px, ${y + currentRadius}px) translate(-50%, -50%)`,
                }}
              >
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56">
                  <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white/20 group-hover:border-white/40 transition-all duration-300 shadow-2xl group-hover:shadow-3xl">
                    <img
                      src={item.photo.url}
                      alt={item.common}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-3 shadow-xl border border-white/20 max-w-xs">
                      <h3 className="font-semibold text-gray-900 text-sm lg:text-base leading-tight">
                        {item.common}
                      </h3>
                      <p className="text-gray-600 text-xs lg:text-sm italic mt-1">
                        {item.binomial}
                      </p>
                      {item.photo.text && (
                        <p className="text-gray-700 text-xs mt-2 leading-relaxed">
                          {item.photo.text}
                        </p>
                      )}
                      <p className="text-gray-500 text-xs mt-2">
                        Photo by {item.photo.by}
                      </p>
                    </div>
>>>>>>> carousel
                  </div>
                </div>
              </div>
            );
          })}
        </div>
<<<<<<< HEAD
      </div>
    );
  },
=======
        
        {/* Center focal point */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white/30 rounded-full blur-sm" />
        
        {/* Instructions */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-white/70 text-sm bg-black/20 backdrop-blur-sm rounded-full px-6 py-2">
            Scroll to rotate • Hover for details
          </p>
        </div>
      </div>
    );
  }
>>>>>>> carousel
);

CircularGallery.displayName = "CircularGallery";

<<<<<<< HEAD
export { CircularGallery };
=======
export default CircularGallery;
>>>>>>> carousel
