"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Product } from "@/types/product";
import {
  useResponsiveCardDimensions,
  getResponsiveSpacing,
} from "@/lib/carousel-config";

interface CoverflowCleanProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
}

export const CoverflowClean: React.FC<CoverflowCleanProps> = ({
  products,
  onProductClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollDelta, setScrollDelta] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const scrollThreshold = 100;
  const dragThreshold = 100;

  // Use shared responsive dimensions
  const cardDimensions = useResponsiveCardDimensions();
  const spacing = getResponsiveSpacing(cardDimensions.width);

  // Calculate positions and transforms for left-to-right flow
  const getItemTransform = (index: number) => {
    let position = (index - currentIndex + products.length) % products.length;

    // Responsive values based on card dimensions and viewport
    const isMobile = cardDimensions.width <= 400;
    const viewportWidth =
      typeof window !== "undefined" ? window.innerWidth : 1400;
    const spacingValue = isMobile
      ? 180
      : Math.min(
          cardDimensions.width * 0.6, // Reduced to match coverflow-framer
          viewportWidth * 0.25, // Reduced to match coverflow-framer
        );
    const depth = isMobile ? 80 : 150;
    const rotation = isMobile ? 6 : 12;
    const maxScale = isMobile ? 1.2 : 1.5;
    const scaleStep = isMobile ? 0.12 : 0.18;
    const maxBlur = isMobile ? 4 : 10;
    const blurStep = isMobile ? 1.0 : 1.6;

    // Position 0 = leftmost (largest), increasing positions go right and get progressively smaller
    const baseX = position * spacingValue;
    const baseZ = -position * depth;
    const rotateY = -position * rotation;
    const scale = Math.max(0.5, maxScale - position * scaleStep);
    const opacity = Math.max(0.3, 1 - position * 0.15);
    const blur = Math.min(maxBlur, position * blurStep);

    return {
      x: baseX,
      z: baseZ,
      rotateY,
      scale,
      opacity,
      blur,
      zIndex: 10 - position, // Leftmost has highest z-index
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
      <div className="absolute top-4 sm:top-8 left-1/2 transform -translate-x-1/2 z-20 px-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 text-center">
          Always Wet
        </h1>
      </div>

      {/* Carousel Container */}
      <motion.div
        className="relative w-full h-full flex items-center justify-start ml-8 md:ml-50 cursor-grab active:cursor-grabbing touch-pan-y"
        style={{
          perspective: cardDimensions.width <= 400 ? "600px" : "1400px",
          touchAction: "pan-y pinch-zoom"
        }}
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
                width: `${cardDimensions.width}px`,
                height: `${cardDimensions.height}px`,
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
                scale: transform.scale * 1.08,
                y: -15,
                filter: `blur(${Math.max(0, transform.blur - 1)}px)`,
                rotateY: transform.rotateY + (transform.rotateY !== 0 ? -2 : 0),
              }}
            >
              <div className="relative w-full h-full overflow-hidden bg-transparent">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-2xl"
                />

                {/* Side Panel (only for focused item) */}
                {currentIndex === index && (
                  <div className="absolute -left-8 top-0 bottom-0 w-2/5 bg-gradient-to-r from-white via-white/95 to-transparent flex items-center">
                    <div className="p-2 sm:p-4 text-left ml-8">
                      <h2 className="text-xs sm:text-base font-bold mb-1 leading-tight text-gray-900">
                        {product.name}
                      </h2>
                      <p className="text-xs sm:text-sm leading-relaxed text-gray-600 line-clamp-3">
                        {product.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Navigation Arrows */}
      <button
        type="button"
        className="absolute left-2 sm:left-6 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white text-gray-600 hover:text-gray-900 p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-20"
        onClick={() =>
          setCurrentIndex(
            (prev) => (prev - 1 + products.length) % products.length,
          )
        }
        aria-label="Previous product"
      >
        <svg
          className="w-4 h-4 sm:w-6 sm:h-6"
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
        type="button"
        className="absolute right-2 sm:right-6 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white text-gray-600 hover:text-gray-900 p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-20"
        onClick={() => setCurrentIndex((prev) => (prev + 1) % products.length)}
        aria-label="Next product"
      >
        <svg
          className="w-4 h-4 sm:w-6 sm:h-6"
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
      <div className="absolute bottom-2 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-1 sm:space-x-3 bg-white/20 backdrop-blur-md rounded-lg sm:rounded-2xl px-2 sm:px-6 py-1 sm:py-3 border border-white/30 z-20">
        {products.map((_, index) => (
          <button
            key={`dot-${index}`}
            type="button"
            className={`rounded-full transition-all duration-500 ease-out ${
              index === currentIndex
                ? "w-6 sm:w-8 h-2 sm:h-3 bg-gray-700 shadow-lg"
                : "w-2 sm:w-3 h-2 sm:h-3 bg-gray-700/60 hover:bg-gray-700/80 hover:scale-110"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to product ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
