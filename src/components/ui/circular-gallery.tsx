"use client";

import React, { useState, useEffect, useRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by: string;
  };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  radius?: number;
  autoRotateSpeed?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  (
    { items, className, radius = 600, autoRotateSpeed = 0.02, ...props },
    ref,
  ) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    // Scroll-based rotation effect
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        const scrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress =
          scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        const scrollRotation = scrollProgress * 360;
        setRotation(scrollRotation);

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 150);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, []);

    // Auto-rotation when not scrolling
    useEffect(() => {
      if (!isScrolling) {
        const animate = () => {
          setRotation((prev) => prev + autoRotateSpeed);
          animationFrameRef.current = requestAnimationFrame(animate);
        };
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      }

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isScrolling, autoRotateSpeed]);

    // Responsive radius calculation
    const getResponsiveRadius = () => {
      if (typeof window === "undefined") return radius;

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

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [radius]);

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full min-h-screen flex items-center justify-center overflow-hidden",
          className,
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
                        Photo by {item.photo.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

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
  },
);

CircularGallery.displayName = "CircularGallery";

export default CircularGallery;
