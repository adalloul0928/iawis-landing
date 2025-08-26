"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Product } from "@/types/product";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CoverflowGsapProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
}

export const CoverflowGsap: React.FC<CoverflowGsapProps> = ({
  products,
  onProductClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollDelta, setScrollDelta] = useState(0);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollThreshold = 100;
  const dragThreshold = 100;

  // Initialize GSAP animations
  useEffect(() => {
    if (!containerRef.current || !carouselRef.current) return;

    const items = itemRefs.current.filter(Boolean);
    if (items.length === 0) return;

    // Clear previous animations
    gsap.killTweensOf(items);
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Set initial positions (left-to-right flow)
    items.forEach((item, index) => {
      if (!item) return;
      
      let position = (index - currentIndex + products.length) % products.length;
      
      // Position 0 = leftmost (featured), increasing positions go right and back
      gsap.set(item, {
        x: position * 320,
        z: position === 0 ? 0 : -position * 180,
        rotationY: position === 0 ? 0 : -position * 12,
        scale: position === 0 ? 1 : Math.max(0.4, 1 - position * 0.12),
        opacity: position === 0 ? 1 : Math.max(0.2, 1 - position * 0.18),
        zIndex: position === 0 ? 20 : 20 - position,
      });
    });

    // Create scroll-triggered animation
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const newIndex = Math.round(progress * (products.length - 1));
          if (newIndex !== currentIndex && !isAnimating) {
            setCurrentIndex(newIndex);
          }
        },
      },
    });

    // Animate carousel rotation based on scroll
    scrollTl.to(carouselRef.current, {
      rotationY: 360,
      duration: 1,
      ease: "none",
    });

    // Auto-rotation timeline
    const autoTl = gsap.timeline({ repeat: -1, paused: true });
    autoTl.to({}, { 
      duration: 4, 
      onComplete: () => {
        if (!isAnimating && !isDragging) {
          navigateToIndex((currentIndex + 1) % products.length);
        }
      }
    });

    // Start auto-rotation
    if (!isDragging) {
      autoTl.play();
    }

    // Cleanup
    return () => {
      gsap.killTweensOf(items);
      gsap.killTweensOf(carouselRef.current);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      autoTl.kill();
    };
  }, [currentIndex, products.length, isAnimating, isDragging]);

  // Navigate to specific index
  const navigateToIndex = (newIndex: number) => {
    if (isAnimating || newIndex === currentIndex) return;
    
    setIsAnimating(true);
    const items = itemRefs.current.filter(Boolean);
    
    // Create timeline for smooth transition
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(newIndex);
        setIsAnimating(false);
      },
    });

    items.forEach((item, index) => {
      if (!item) return;
      
      let position = (index - newIndex + products.length) % products.length;
      
      // Position 0 = leftmost (featured), increasing positions go right and back
      tl.to(item, {
        x: position * 320,
        z: position === 0 ? 0 : -position * 180,
        rotationY: position === 0 ? 0 : -position * 12,
        scale: position === 0 ? 1 : Math.max(0.4, 1 - position * 0.12),
        opacity: position === 0 ? 1 : Math.max(0.2, 1 - position * 0.18),
        zIndex: position === 0 ? 20 : 20 - position,
        duration: 0.8,
        ease: "power2.out",
      }, 0);
    });
  };

  // Handle item click
  const handleItemClick = (index: number) => {
    if (isAnimating) return;
    
    if (index === currentIndex && onProductClick) {
      onProductClick(products[index]);
    } else {
      navigateToIndex(index);
    }
  };

  // Handle wheel scroll with accumulation
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (isAnimating) return;
    
    const newDelta = scrollDelta + e.deltaY;
    
    if (Math.abs(newDelta) > scrollThreshold) {
      if (newDelta > 0) {
        navigateToIndex((currentIndex + 1) % products.length);
      } else {
        navigateToIndex((currentIndex - 1 + products.length) % products.length);
      }
      setScrollDelta(0);
    } else {
      setScrollDelta(newDelta);
    }
  };

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isAnimating) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  // Handle drag end
  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || isAnimating) return;
    
    const dragDistance = e.clientX - dragStart.x;
    
    if (Math.abs(dragDistance) > dragThreshold) {
      if (dragDistance > 0) {
        // Dragging right - go to previous
        navigateToIndex((currentIndex - 1 + products.length) % products.length);
      } else {
        // Dragging left - go to next
        navigateToIndex((currentIndex + 1) % products.length);
      }
    }
    
    setIsDragging(false);
    setDragStart({ x: 0, y: 0 });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return;
      
      if (e.key === "ArrowLeft") {
        navigateToIndex((currentIndex - 1 + products.length) % products.length);
      } else if (e.key === "ArrowRight") {
        navigateToIndex((currentIndex + 1) % products.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, products.length, isAnimating]);

  return (
    <div className="relative w-full overflow-x-hidden bg-gray-50">
      {/* Scroll height for ScrollTrigger */}
      <div style={{ height: "300vh" }}>
        {/* Fixed header */}
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            3D Cover Flow - GSAP ScrollTrigger
          </h1>
          <p className="text-gray-600">
            Scroll, use arrow keys, or click to navigate
          </p>
        </div>

        {/* Carousel container */}
        <div
          ref={containerRef}
          className="fixed inset-0 flex items-center justify-start pl-20 cursor-grab active:cursor-grabbing"
          style={{ perspective: "1200px" }}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <div
            ref={carouselRef}
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                ref={(el) => (itemRefs.current[index] = el)}
                className="absolute cursor-pointer"
                style={{
                  width: "450px",
                  height: "600px",
                  left: "50%",
                  top: "50%",
                  marginLeft: "-225px",
                  marginTop: "-300px",
                  transformStyle: "preserve-3d",
                }}
                onClick={() => handleItemClick(index)}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side navigation arrows */}
        <button
          className="fixed left-8 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 p-4 rounded-full shadow-lg transition-all duration-300 z-40"
          onClick={() => navigateToIndex((currentIndex - 1 + products.length) % products.length)}
          disabled={isAnimating}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          className="fixed right-8 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 p-4 rounded-full shadow-lg transition-all duration-300 z-40"
          onClick={() => navigateToIndex((currentIndex + 1) % products.length)}
          disabled={isAnimating}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Fixed navigation dots */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
          <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-md rounded-full px-6 py-3">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => navigateToIndex(index)}
                disabled={isAnimating}
                className={`w-2 h-2 rounded-full transition-all duration-300 disabled:opacity-50 ${
                  index === currentIndex
                    ? "bg-gray-800 scale-125"
                    : "bg-gray-400 hover:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 text-center text-gray-600 text-sm z-40">
          <p>Scroll wheel • Drag • Arrow keys • Click items</p>
        </div>

        {/* Scroll indicator */}
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40">
          <div className="w-1 h-32 bg-gray-300 rounded-full">
            <div 
              className="w-full bg-gradient-to-b from-gray-700 to-gray-900 rounded-full transition-all duration-300"
              style={{ 
                height: `${((currentIndex + 1) / products.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};