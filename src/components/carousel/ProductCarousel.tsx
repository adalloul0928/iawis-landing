"use client";

import { useState, useEffect, useRef } from "react";
import { ProductCard } from "./ProductCard";
import { CarouselControls } from "./CarouselControls";
import { useSwipeable } from "react-swipeable";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "AquaTech Pro",
    description: "Advanced water purification system with smart monitoring",
    price: "$299",
    image: "/products/aquatech-pro.svg",
    category: "Technology",
  },
  {
    id: 2,
    name: "HydroFlow Elite",
    description: "Premium hydration solution for active lifestyles",
    price: "$149",
    image: "/products/hydroflow-elite.svg",
    category: "Lifestyle",
  },
  {
    id: 3,
    name: "WaveSync Navigator",
    description: "Smart navigation system for marine adventures",
    price: "$399",
    image: "/products/wavesync-navigator.svg",
    category: "Navigation",
  },
  {
    id: 4,
    name: "OceanGuard Shield",
    description: "Protective gear for extreme water sports",
    price: "$199",
    image: "/products/oceanguard-shield.svg",
    category: "Sports",
  },
];

export function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [carouselElement, setCarouselElement] = useState<HTMLElement | null>(
    null,
  );

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoRotating || isDragging) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoRotating, isDragging]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setIsAutoRotating(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartX;
    const carouselWidth = carouselElement?.offsetWidth || 0;
    const rotationPerPixel = 360 / (carouselWidth * 0.8);

    setDragOffset(deltaX * rotationPerPixel);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    setIsDragging(false);
    setDragOffset(0);

    // Snap to nearest product
    const carouselWidth = carouselElement?.offsetWidth || 0;
    const dragDistance = Math.abs(dragOffset);
    const threshold = 30; // degrees

    if (dragDistance > threshold) {
      if (dragOffset > 0) {
        setCurrentIndex(
          (prev) => (prev - 1 + products.length) % products.length,
        );
      } else {
        setCurrentIndex((prev) => (prev + 1) % products.length);
      }
    }

    // Resume auto-rotation after a delay
    setTimeout(() => setIsAutoRotating(true), 2000);
  };

  // Touch/swipe handlers
  const { ref: swipeRef } = useSwipeable({
    onSwipedLeft: () => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
      setIsAutoRotating(false);
      setTimeout(() => setIsAutoRotating(true), 2000);
    },
    onSwipedRight: () => {
      setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
      setIsAutoRotating(false);
      setTimeout(() => setIsAutoRotating(true), 2000);
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  // Callback ref to get the carousel element
  const setCarouselRefs = (element: HTMLElement | null) => {
    setCarouselElement(element);
    swipeRef(element);
  };

  const goToProduct = (index: number) => {
    setCurrentIndex(index);
    setIsAutoRotating(false);
    setTimeout(() => setIsAutoRotating(true), 2000);
  };

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
    setIsAutoRotating(false);
    setTimeout(() => setIsAutoRotating(true), 2000);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    setIsAutoRotating(false);
    setTimeout(() => setIsAutoRotating(true), 2000);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* 3D Carousel Container */}
      <section
        ref={setCarouselRefs}
        className="relative h-[600px] w-full perspective-1000"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        aria-label="Product carousel"
      >
        {/* Products positioned in 3D space */}
        {products.map((product, index) => {
          const angle = (index - currentIndex) * 90 + dragOffset;
          const radius = 400; // Distance from center
          const z = Math.cos((angle * Math.PI) / 180) * radius;
          const x = Math.sin((angle * Math.PI) / 180) * radius;
          const opacity = Math.abs(z) < 200 ? 1 : 0.3;
          const scale = Math.abs(z) < 200 ? 1 : 0.7;
          const zIndex = Math.abs(z) < 200 ? 10 : 1;

          return (
            <div
              key={product.id}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
              style={{
                transform: `translate3d(${x}px, 0, ${z}px) scale(${scale})`,
                opacity,
                zIndex,
              }}
            >
              <ProductCard
                product={product}
                isActive={index === currentIndex}
              />
            </div>
          );
        })}

        {/* Center indicator */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full opacity-50 pointer-events-none"
          aria-hidden="true"
          role="presentation"
        />
      </section>

      {/* Controls */}
      <CarouselControls
        currentIndex={currentIndex}
        totalProducts={products.length}
        onNext={nextProduct}
        onPrev={prevProduct}
        onGoTo={goToProduct}
        isAutoRotating={isAutoRotating}
        onToggleAutoRotate={() => setIsAutoRotating(!isAutoRotating)}
      />

      {/* Instructions */}
      <div className="text-center mt-8 text-gray-400">
        <p className="text-sm">
          Drag to rotate • Swipe on mobile • Click controls to navigate
        </p>
      </div>
    </div>
  );
}
