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
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  (
    { items, className, radius = 600, autoRotateSpeed = 0.02, ...props },
    ref,
  ) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const lastScrollYRef = useRef(0);
    const lastPointerXRef = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Effect to handle infinite scroll-based rotation
    useEffect(() => {
      // Initialize scroll position
      lastScrollYRef.current = window.scrollY;
      
      const handleScroll = () => {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollYRef.current;
        lastScrollYRef.current = currentScrollY;
        
        // Convert scroll delta to rotation delta
        // Sensitivity factor: adjust to control how much scroll = how much rotation
        const rotationDelta = scrollDelta * 0.3;
        
        setRotation((prev) => prev + rotationDelta);

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 150);
      };

      // Handle horizontal wheel events (trackpad, mouse wheel)
      const handleWheel = (e: WheelEvent) => {
        // Check if there's horizontal scroll (deltaX)
        if (Math.abs(e.deltaX) > 0) {
          e.preventDefault(); // Prevent default horizontal scroll
          
          setIsScrolling(true);
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }

          // Use horizontal wheel delta with inverted direction for natural interaction
          // Scroll right = rotate left (negative), scroll left = rotate right (positive)
          const rotationDelta = -e.deltaX * 0.3;
          setRotation((prev) => prev + rotationDelta);

          scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
          }, 150);
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      
      // Add wheel listener specifically to the container for horizontal scrolling
      if (containerRef.current) {
        containerRef.current.addEventListener("wheel", handleWheel, { passive: false });
      }
      
      return () => {
        window.removeEventListener("scroll", handleScroll);
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
      setIsDragging(true);
      lastPointerXRef.current = e.clientX;
      if (containerRef.current) {
        containerRef.current.setPointerCapture(e.pointerId);
      }
    };

    const handlePointerMove = (e: React.PointerEvent) => {
      if (!isDragging) return;
      
      const currentX = e.clientX;
      const dragDelta = currentX - lastPointerXRef.current;
      lastPointerXRef.current = currentX;
      
      // Use same sensitivity as scroll (0.3) but invert for natural horizontal interaction
      // Drag right = rotate left (negative), drag left = rotate right (positive)
      const rotationDelta = -dragDelta * 0.3;
      setRotation((prev) => prev + rotationDelta);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    const handlePointerLeave = () => {
      setIsDragging(false);
    };

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
        ref={containerRef}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn(
          "relative w-full h-full flex items-center justify-center select-none",
          isDragging ? "cursor-grabbing" : "cursor-grab",
          className,
        )}
        style={{ perspective: "2000px", touchAction: "none" }}
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
                className="absolute w-[300px] h-[400px]"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: "50%",
                  top: "50%",
                  marginLeft: "-150px",
                  marginTop: "-200px",
                  opacity: opacity,
                  transition: "opacity 0.3s linear",
                }}
              >
                <div className="relative w-full h-full rounded-lg shadow-2xl overflow-hidden group border border-border bg-card/70 dark:bg-card/30 backdrop-blur-lg">
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: item.photo.pos || "center" }}
                  />
                  {/* Replaced text-primary-foreground with text-white for consistent color */}
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <h2 className="text-xl font-bold">{item.common}</h2>
                    <em className="text-sm italic opacity-80">
                      {item.binomial}
                    </em>
                    <p className="text-xs mt-2 opacity-70">
                      Photo by: {item.photo.by}
                    </p>
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
