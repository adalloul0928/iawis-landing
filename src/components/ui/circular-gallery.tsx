import React, { useState, useEffect, useRef, HTMLAttributes } from "react";

// A simple utility for conditional class names
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(" ");
};

// Define the type for a single gallery item
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

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isScrolling, isDragging, autoRotateSpeed]);

    const anglePerItem = 360 / items.length;

    return (
      <div
        ref={ref}
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

CircularGallery.displayName = "CircularGallery";

export { CircularGallery };
