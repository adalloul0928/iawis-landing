import React, { useState, useEffect, useRef, HTMLAttributes } from "react";
import Image from "next/image";

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
  /** Callback when an item is clicked */
  onItemClick?: (item: GalleryItem, index: number) => void;
  /** Width of individual cards in pixels */
  cardWidth?: number;
  /** Height of individual cards in pixels */
  cardHeight?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  (
    {
      items,
      className,
      radius = 600,
      autoRotateSpeed = 0.02,
      onItemClick,
      cardWidth = 300,
      cardHeight = 400,
      ...props
    },
    ref,
  ) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isPointerDown, setIsPointerDown] = useState(false);
    const [velocity, setVelocity] = useState(0);
    const [isMomentum, setIsMomentum] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const momentumFrameRef = useRef<number | null>(null);
    const lastPointerXRef = useRef(0);
    const pointerDownXRef = useRef(0);
    const lastMoveTimeRef = useRef(0);
    const velocityHistoryRef = useRef<number[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const DRAG_THRESHOLD = 5; // pixels

    // Effect to handle infinite wheel-based rotation
    useEffect(() => {
      // Handle wheel events for both horizontal and vertical scrolling (infinite rotation)
      const handleWheel = (e: WheelEvent) => {
        // Handle both horizontal (deltaX) and vertical (deltaY) scroll for infinite rotation
        if (Math.abs(e.deltaX) > 0 || Math.abs(e.deltaY) > 0) {
          e.preventDefault(); // Prevent default scroll behavior

          setIsScrolling(true);
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }

          // Combine both horizontal and vertical scroll deltas
          // For vertical: scroll down = rotate right (positive), scroll up = rotate left (negative)
          // For horizontal: scroll right = rotate left (negative), scroll left = rotate right (positive)
          const rotationDelta = (e.deltaY * 0.3) + (-e.deltaX * 0.3);
          setRotation((prev) => prev + rotationDelta);

          scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
          }, 150);
        }
      };

      // Add wheel listener to the container for both horizontal and vertical scrolling
      if (containerRef.current) {
        containerRef.current.addEventListener("wheel", handleWheel, {
          passive: false,
        });
      }

      return () => {
        if (containerRef.current) {
          containerRef.current.removeEventListener("wheel", handleWheel);
        }
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, []);

    // Drag event handlers
    const handlePointerDown = (e: React.PointerEvent) => {
      console.log("Container pointer down");
      setIsPointerDown(true);
      lastPointerXRef.current = e.clientX;
      pointerDownXRef.current = e.clientX;
      // Temporarily remove pointer capture to test if it's interfering
      // if (containerRef.current) {
      //   containerRef.current.setPointerCapture(e.pointerId);
      // }
    };

    const handlePointerMove = (e: React.PointerEvent) => {
      if (!isPointerDown) return;

      const currentX = e.clientX;
      const currentTime = Date.now();
      const totalDragDistance = Math.abs(currentX - pointerDownXRef.current);

      // Only start dragging if we've moved beyond the threshold
      if (totalDragDistance > DRAG_THRESHOLD && !isDragging) {
        setIsDragging(true);
        lastMoveTimeRef.current = currentTime;
      }

      if (isDragging) {
        const dragDelta = currentX - lastPointerXRef.current;
        const timeDelta = currentTime - lastMoveTimeRef.current;

        // Use same sensitivity as scroll (0.3) but invert for natural horizontal interaction
        // Drag right = rotate left (negative), drag left = rotate right (positive)
        const rotationDelta = -dragDelta * 0.3;
        setRotation((prev) => prev + rotationDelta);

        // Calculate velocity for momentum
        if (timeDelta > 0) {
          const currentVelocity = dragDelta / timeDelta;
          velocityHistoryRef.current.push(currentVelocity);
          // Keep only last 5 velocity measurements
          if (velocityHistoryRef.current.length > 5) {
            velocityHistoryRef.current.shift();
          }
        }

        lastMoveTimeRef.current = currentTime;
      }

      lastPointerXRef.current = currentX;
    };

    const handlePointerUp = () => {
      console.log("Container pointer up, isDragging:", isDragging);

      if (isDragging && velocityHistoryRef.current.length > 0) {
        // Calculate average velocity from recent measurements
        const avgVelocity =
          velocityHistoryRef.current.reduce((a, b) => a + b, 0) /
          velocityHistoryRef.current.length;
        const momentumVelocity = -avgVelocity * 0.3 * 5; // Reduced from 20 to 5

        if (Math.abs(momentumVelocity) > 0.05) {
          setVelocity(momentumVelocity);
          setIsMomentum(true);
        }
      }

      setIsPointerDown(false);
      setIsDragging(false);
      velocityHistoryRef.current = [];
    };

    const handlePointerLeave = () => {
      setIsPointerDown(false);
      setIsDragging(false);
      velocityHistoryRef.current = [];
    };

    // Effect for momentum animation
    useEffect(() => {
      if (!isMomentum) return;

      const animateMomentum = () => {
        if (Math.abs(velocity) < 0.01) {
          setIsMomentum(false);
          setVelocity(0);
          return;
        }

        setRotation((prev) => prev + velocity);
        setVelocity((prev) => prev * 0.95); // Friction/decay

        momentumFrameRef.current = requestAnimationFrame(animateMomentum);
      };

      momentumFrameRef.current = requestAnimationFrame(animateMomentum);

      return () => {
        if (momentumFrameRef.current) {
          cancelAnimationFrame(momentumFrameRef.current);
        }
      };
    }, [isMomentum, velocity]);

    // Effect for auto-rotation when not scrolling or dragging (throttled to ~20fps)
    useEffect(() => {
      let lastTime = 0;
      const targetFPS = 120;
      const frameInterval = 1000 / targetFPS;

      const autoRotate = (currentTime: number) => {
        if (currentTime - lastTime >= frameInterval) {
          if (!isScrolling && !isDragging && !isPointerDown && !isMomentum) {
            setRotation((prev) => prev + autoRotateSpeed * (targetFPS / 60));
          }
          lastTime = currentTime;
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isScrolling, isDragging, isPointerDown, isMomentum, autoRotateSpeed]);

    const anglePerItem = 360 / items.length;

    return (
      <div
        ref={containerRef}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn(
          "relative w-full h-full flex items-center justify-center select-none",
          isDragging ? "cursor-grabbing" : "cursor-grab",
          className,
        )}
        style={{ perspective: "2000px", touchAction: "pan-y pinch-zoom" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
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
                className="absolute cursor-pointer pointer-events-none"
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: "50%",
                  top: "50%",
                  marginLeft: `-${cardWidth / 2}px`,
                  marginTop: `-${cardHeight / 2}px`,
                  opacity: opacity,
                  transition: "opacity 0.3s linear",
                  pointerEvents: isDragging || isMomentum ? "none" : "auto",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isDragging) {
                    console.log("Calling onItemClick for:", item.common);
                    onItemClick?.(item, i);
                  }
                }}
              >
                <div
                  className="relative w-full h-full rounded-lg shadow-2xl overflow-hidden group border border-border bg-card/90 dark:bg-card/60"
                  style={{
                    willChange: "transform",
                    transform: "translateZ(0)",
                    WebkitFontSmoothing: "antialiased",
                  }}
                >
                  <Image
                    src={item.photo.url}
                    alt={item.photo.text}
                    fill
                    className="object-cover select-none"
                    style={{ objectPosition: item.photo.pos || "center" }}
                    loading={i < 4 ? "eager" : "lazy"}
                    priority={i < 4}
                    sizes="600px"
                    quality={95}
                    draggable={false}
                  />
                  {/* Replaced text-primary-foreground with text-white for consistent color */}
                  <div
                    className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white"
                    style={{ WebkitFontSmoothing: "antialiased" }}
                  >
                    <h2 className="text-xl font-bold">{item.common}</h2>
                    <em className="text-sm italic">{item.binomial}</em>
                    <p className="text-xs mt-2">Photo by: {item.photo.by}</p>
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
