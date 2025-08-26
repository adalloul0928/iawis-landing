"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Product } from "@/types/product";

interface CoverflowFramerProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
}

export const CoverflowFramer: React.FC<CoverflowFramerProps> = ({
  products,
  onProductClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollDelta, setScrollDelta] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const scrollThreshold = 100;
  const dragThreshold = 100;

  // Calculate positions and transforms for left-to-right flow
  const getItemTransform = (index: number) => {
    let position = (index - currentIndex + products.length) % products.length;

    // Position 0 = leftmost (featured), increasing positions go right and back
    const baseX = position * 480; // Wider spacing for full-width layout
    const baseZ = position === 0 ? 0 : -position * 180; // Featured item at front, others progressively back
    const rotateY = position === 0 ? 0 : -position * 12; // No rotation for featured, rotate others
    const scale = position === 0 ? 1.2 : Math.max(0.5, 1.2 - position * 0.15); // Featured largest, others progressively smaller
    const opacity = position === 0 ? 1 : Math.max(0.3, 1 - position * 0.15); // Featured full opacity, others fade more
    const blur = position === 0 ? 0 : Math.min(8, position * 2); // No blur for featured, progressive blur for others

    return {
      x: baseX,
      z: baseZ,
      rotateY,
      scale,
      opacity,
      blur,
      zIndex: position === 0 ? 10 : 10 - position,
    };
  };


  // Handle wheel scroll with accumulation
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newDelta = scrollDelta + e.deltaY;

    if (Math.abs(newDelta) > scrollThreshold) {
      if (newDelta > 0) {
        setCurrentIndex((prev) => (prev + 1) % products.length);
      } else {
        setCurrentIndex(
          (prev) => (prev - 1 + products.length) % products.length,
        );
      }
      setScrollDelta(0);
    } else {
      setScrollDelta(newDelta);
    }
  };

  // Handle drag functionality
  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);
    setDragOffset(0);

    const dragDistance = info.offset.x;
    const dragVelocity = Math.abs(info.velocity.x);

    if (Math.abs(dragDistance) > dragThreshold || dragVelocity > 500) {
      if (dragDistance > 0) {
        // Dragging right - go to previous
        setCurrentIndex(
          (prev) => (prev - 1 + products.length) % products.length,
        );
      } else {
        // Dragging left - go to next
        setCurrentIndex((prev) => (prev + 1) % products.length);
      }
    }
  };

  const handleDrag = (event: any, info: any) => {
    setDragOffset(info.offset.x * 0.3); // Reduced sensitivity for preview
  };

  // Handle item click
  const handleItemClick = (index: number) => {
    if (index === currentIndex && onProductClick) {
      onProductClick(products[index]);
    } else {
      setCurrentIndex(index);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      {/* Header */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <h1 className="text-4xl font-bold text-gray-900 text-center">
          Always Wet
        </h1>
      </div>

      {/* Carousel Container */}
      <motion.div
        className="relative w-full h-full flex items-center justify-start pl-10 cursor-grab active:cursor-grabbing"
        style={{ perspective: "1400px" }}
        onWheel={handleWheel}
        drag="x"
        dragConstraints={{ left: -300, right: 300 }}
        dragElastic={0.2}
        onDragStart={() => setIsDragging(true)}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        animate={{ x: dragOffset }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
      >
        {/* Items */}
        {products.map((product, index) => {
          const transform = getItemTransform(index);

          return (
            <motion.div
              key={product.id}
              className="absolute cursor-pointer"
              style={{
                width: "550px",
                height: "700px",
                transformStyle: "preserve-3d",
                zIndex: transform.zIndex,
              }}
              animate={{
                x: transform.x,
                z: transform.z,
                rotateY: transform.rotateY,
                scale: transform.scale,
                opacity: transform.opacity,
                filter: `blur(${transform.blur}px)`,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              onClick={() => handleItemClick(index)}
              whileHover={{
                scale: transform.scale * 1.05,
                y: -10,
                filter: `blur(${Math.max(0, transform.blur - 1)}px)`,
              }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 p-4 rounded-full shadow-lg transition-all duration-300 z-20"
        onClick={() =>
          setCurrentIndex(
            (prev) => (prev - 1 + products.length) % products.length,
          )
        }
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 p-4 rounded-full shadow-lg transition-all duration-300 z-20"
        onClick={() => setCurrentIndex((prev) => (prev + 1) % products.length)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {products.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-gray-800 scale-125"
                : "bg-gray-400 hover:bg-gray-600"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
