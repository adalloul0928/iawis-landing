"use client";

import { useState, useEffect, useRef } from "react";
import { ProductCard } from "./ProductCard";
import { ProductCarouselControls } from "./ProductCarouselControls";
import { useSwipeable } from "react-swipeable";

interface Product {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

const products: Product[] = [
  {
    id: 1,
    name: "Product One",
    role: "Premium Quality",
    image: "/product-images/image1.jpeg",
    description:
      "Our flagship product featuring innovative design and exceptional craftsmanship.",
    socialLinks: {
      twitter: "https://twitter.com/alwayswet",
      linkedin: "https://linkedin.com/company/alwayswet",
    },
  },
  {
    id: 2,
    name: "Product Two",
    role: "Advanced Technology",
    image: "/product-images/image2.jpeg",
    description:
      "Cutting-edge technology combined with elegant aesthetics for the modern consumer.",
    socialLinks: {
      twitter: "https://twitter.com/alwayswet",
      linkedin: "https://linkedin.com/company/alwayswet",
    },
  },
  {
    id: 3,
    name: "Product Three",
    role: "Design Excellence",
    image: "/product-images/image3.jpeg",
    description:
      "Sophisticated design that seamlessly blends form and function for everyday use.",
    socialLinks: {
      twitter: "https://twitter.com/alwayswet",
      linkedin: "https://linkedin.com/company/alwayswet",
    },
  },
];

export function PeopleCarousel() {
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
      setCurrentIndex((prev) => (prev + 1) % 3);
    }, 4000);

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
    const rotationPerPixel = 360 / (carouselWidth * 0.6);

    setDragOffset(deltaX * rotationPerPixel);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    setIsDragging(false);
    setDragOffset(0);

    // Snap to nearest person
    const dragDistance = Math.abs(dragOffset);
    const threshold = 25; // degrees

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
    setTimeout(() => setIsAutoRotating(true), 3000);
  };

  // Touch/swipe handlers
  const { ref: swipeRef } = useSwipeable({
    onSwipedLeft: () => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
      setIsAutoRotating(false);
      setTimeout(() => setIsAutoRotating(true), 3000);
    },
    onSwipedRight: () => {
      setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
      setIsAutoRotating(false);
      setTimeout(() => setIsAutoRotating(true), 3000);
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
    setTimeout(() => setIsAutoRotating(true), 3000);
  };

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
    setIsAutoRotating(false);
    setTimeout(() => setIsAutoRotating(true), 3000);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    setIsAutoRotating(false);
    setTimeout(() => setIsAutoRotating(true), 3000);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* 3D Carousel Container */}
      <section
        ref={setCarouselRefs}
        className="relative h-[700px] w-full perspective-1000"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        aria-label="Product carousel"
      >
        {/* Products positioned in 3D space */}
        {products.map((product, index) => {
          const angle = (index - currentIndex) * 120 + dragOffset; // 360° / 3 products = 120°
          const radius = 500; // Distance from center
          const z = Math.cos((angle * Math.PI) / 180) * radius;
          const x = Math.sin((angle * Math.PI) / 180) * radius;

          // Calculate opacity and scale based on z position
          const distanceFromCenter = Math.abs(z);
          const maxDistance = radius * 0.8;
          const opacity = Math.max(0.3, 1 - distanceFromCenter / maxDistance);
          const scale = Math.max(
            0.6,
            1 - (distanceFromCenter / maxDistance) * 0.4,
          );
          const zIndex = Math.round(1000 - distanceFromCenter);

          // Center product should have no blur, only background items get slight blur
          const blur =
            index === currentIndex
              ? 0
              : Math.min(2, (distanceFromCenter / maxDistance) * 3);

          return (
            <div
              key={product.id}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out"
              style={{
                transform: `translate3d(${x}px, 0, ${z}px) scale(${scale})`,
                opacity,
                zIndex,
                filter: `blur(${blur}px)`,
              }}
            >
              <ProductCard
                product={product}
                isActive={index === currentIndex}
                isNext={index === (currentIndex + 1) % products.length}
                isPrev={
                  index ===
                  (currentIndex - 1 + products.length) % products.length
                }
              />
            </div>
          );
        })}

        {/* Center indicator */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-400 rounded-full opacity-30 pointer-events-none"
          aria-hidden="true"
          role="presentation"
        />
      </section>

      {/* Controls */}
      <ProductCarouselControls
        currentIndex={currentIndex}
        totalProducts={products.length}
        onNext={nextProduct}
        onPrev={prevProduct}
        onGoTo={goToProduct}
        isAutoRotating={isAutoRotating}
        onToggleAutoRotating={() => setIsAutoRotating(!isAutoRotating)}
      />

      {/* Instructions */}
      <div className="text-center mt-8 text-gray-500">
        <p className="text-sm">
          Drag to rotate • Swipe on mobile • Click controls to navigate
        </p>
      </div>
    </div>
  );
}
