"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSpring, animated, config } from "react-spring";
import { useDrag } from "@use-gesture/react";
import Image from "next/image";
import { Product } from "@/types/product";

interface CoverflowSpringProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
}

export const CoverflowSpring: React.FC<CoverflowSpringProps> = ({
  products,
  onProductClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollDelta, setScrollDelta] = useState(0);
  const scrollThreshold = 100;

  // Spring animation for the carousel container
  const [{ x }, api] = useSpring(() => ({
    x: 0,
    config: config.gentle,
  }));

  // Calculate transform values for left-to-right flow
  const getItemStyle = useCallback((index: number) => {
    let position = (index - currentIndex + products.length) % products.length;
    
    // Position 0 = leftmost (featured), increasing positions go right and back
    const translateX = position * 320; // Increased spacing for larger images
    const translateZ = position === 0 ? 0 : -position * 180; // Featured item at front, others progressively back
    const rotateY = position === 0 ? 0 : -position * 12; // No rotation for featured, rotate others
    const scale = position === 0 ? 1 : Math.max(0.4, 1 - position * 0.12); // Featured full size, others smaller
    const opacity = position === 0 ? 1 : Math.max(0.2, 1 - position * 0.18); // Featured full opacity, others fade more
    
    return {
      transform: `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex: position === 0 ? 20 : 20 - position,
    };
  }, [currentIndex, products.length]);

  // Handle wheel scroll with accumulation
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newDelta = scrollDelta + e.deltaY;
    
    if (Math.abs(newDelta) > scrollThreshold) {
      if (newDelta > 0) {
        setCurrentIndex((prev) => (prev + 1) % products.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
      }
      setScrollDelta(0);
    } else {
      setScrollDelta(newDelta);
    }
  };

  // Drag gesture handling with improved sensitivity
  const bind = useDrag(
    ({ active, movement: [mx], direction: [xDir], velocity: [vx] }) => {
      if (active) {
        setIsDragging(true);
        api.start({ x: mx * 0.3 }); // Further reduced sensitivity for smoother preview
      } else {
        setIsDragging(false);
        api.start({ x: 0 });
        
        // Improved threshold for navigation
        if (Math.abs(mx) > 100 || Math.abs(vx) > 400) {
          if (xDir > 0) {
            // Dragging right - go to previous
            setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
          } else {
            // Dragging left - go to next
            setCurrentIndex((prev) => (prev + 1) % products.length);
          }
        }
      }
    },
    {
      axis: "x",
      bounds: { left: -300, right: 300 },
      rubberband: true,
    }
  );

  // Auto-rotation
  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [products.length, isDragging]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % products.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [products.length]);

  // Handle item click
  const handleItemClick = (index: number) => {
    if (index === currentIndex && onProductClick) {
      onProductClick(products[index]);
    } else {
      setCurrentIndex(index);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-50">
      {/* Header */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          3D Cover Flow - React Spring
        </h1>
        <p className="text-gray-600">
          Drag, use arrow keys, or click to navigate
        </p>
      </div>

      {/* Carousel Container */}
      <animated.div
        className="relative w-full h-full flex items-center justify-start pl-20 touch-none"
        style={{
          perspective: "1000px",
          transform: x.to((x) => `translateX(${x}px)`),
        }}
        {...bind()}
      >
        {products.map((product, index) => {
          const style = getItemStyle(index);
          
          return (
            <animated.div
              key={product.id}
              className="absolute cursor-pointer select-none"
              style={{
                width: "450px",
                height: "600px",
                transformStyle: "preserve-3d",
                ...style,
              }}
              onClick={() => handleItemClick(index)}
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  draggable={false}
                />
              </div>
            </animated.div>
          );
        })}
      </animated.div>


      {/* Progress indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {products.map((_, index) => (
          <button
            key={index}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === currentIndex
                ? "bg-gray-800 w-8"
                : "bg-gray-400 hover:bg-gray-600 w-3"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center text-gray-600 text-sm z-30">
        <p>Drag horizontally • Arrow keys • Click items</p>
      </div>
    </div>
  );
};