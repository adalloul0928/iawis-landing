"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CircularGallery,
  type GalleryItem,
} from "@/components/ui/circular-gallery2";
import ExpandedGallery from "@/components/ui/circular-gallery-expand";

const galleryData: GalleryItem[] = [
  {
    common: "Hoodie",
    binomial: "",
    photo: {
      url: "/full/00D548B5-6138-406E-98AD-C7D0CC99F8C1.jpeg",
      text: "cozy oversized fit",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Beanie",
    binomial: "",
    photo: {
      url: "/closeup/322F338C-8091-4284-A730-DB5503813C21.jpeg",
      text: "soft knit wool",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Sweatshirt",
    binomial: "",
    photo: {
      url: "/full/399CC86C-055F-4E28-87C4-882F4BA47C17.jpeg",
      text: "classic cotton blend",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Cap",
    binomial: "",
    photo: {
      url: "/closeup/3CE40DCD-98CB-4382-9774-17E8EA63637C.jpeg",
      text: "adjustable snapback",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Sweater",
    binomial: "",
    photo: {
      url: "/full/423D6ADB-0510-491C-95EC-F853403AA04B.jpeg",
      text: "extra soft merino",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "T-Shirt",
    binomial: "",
    photo: {
      url: "/closeup/A11347CA-89CA-437D-85F8-32E984FA34C9.jpeg",
      text: "premium organic cotton",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Joggers",
    binomial: "",
    photo: {
      url: "/full/59C35064-0CE6-4664-AD98-39DF4DCDA78F.jpeg",
      text: "tapered athletic fit",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Socks",
    binomial: "",
    photo: {
      url: "/closeup/DACCFE4A-9450-4255-B5A7-06E7BAEA2A41.jpeg",
      text: "moisture wicking fabric",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Jacket",
    binomial: "",
    photo: {
      url: "/full/59E311A3-103A-4F1E-9BB5-6EC119CD2555.jpeg",
      text: "water resistant shell",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Polo",
    binomial: "",
    photo: {
      url: "/closeup/EB1E3784-7462-4A22-92C3-B17B3508EC3A.jpeg",
      text: "breathable mesh collar",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Sweatpants",
    binomial: "",
    photo: {
      url: "/full/79274065-27DC-448F-907B-FA195C43F190.jpeg",
      text: "relaxed comfort fit",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Tank Top",
    binomial: "",
    photo: {
      url: "/closeup/F3C63B3E-785D-4993-A15E-EC658CCE07E1.jpeg",
      text: "lightweight summer wear",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Cardigan",
    binomial: "",
    photo: {
      url: "/full/A420B97A-E5F2-43EC-A792-37C5E35F91BC.jpeg",
      text: "button-up layering piece",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Scarf",
    binomial: "",
    photo: {
      url: "/closeup/F97E7E43-49FA-412A-A201-24EB3820B84D.jpeg",
      text: "warm winter accessory",
      pos: "center",
      by: "Photographer",
    },
  },
];

const CircularGalleryDemo = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [dimensions, setDimensions] = useState({
    radius: 800,
    cardWidth: 300,
    cardHeight: 400,
  });

  // Animation state
  const [animationPhase, setAnimationPhase] = useState<
    "initial" | "animating" | "complete"
  >("initial");
  const [animationProgress, setAnimationProgress] = useState(0);

  // Update dimensions based on screen size
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width >= 1536) {
        setDimensions({ radius: 900, cardWidth: 350, cardHeight: 437.5 });
      } else if (width >= 1280) {
        setDimensions({ radius: 800, cardWidth: 325, cardHeight: 405 });
      } else if (width >= 1024) {
        setDimensions({ radius: 700, cardWidth: 260, cardHeight: 340 });
      } else if (width >= 640) {
        setDimensions({ radius: 650, cardWidth: 240, cardHeight: 320 });
      } else {
        setDimensions({ radius: 550, cardWidth: 200, cardHeight: 250 });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handleItemClick = useCallback((item: GalleryItem, _index: number) => {
    console.log("Item clicked:", item.common);
    setSelectedItem(item);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedItem(null);
  }, []);

  // Start animation when page loads
  useEffect(() => {
    // Start animation after a brief delay
    const timer = setTimeout(() => {
      setAnimationPhase("animating");

      // Animate over 0.4 seconds
      const startTime = Date.now();
      const duration = 400;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Use easing function for smooth deceleration
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        setAnimationProgress(easedProgress);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setAnimationPhase("complete");
        }
      };

      requestAnimationFrame(animate);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Calculate animation values
  const getAnimationStyle = () => {
    if (animationPhase === "initial") {
      return {
        transform: "translateZ(-2000px) scale(0.1)",
        opacity: 0,
        filter: "blur(10px)",
      };
    }

    if (animationPhase === "animating") {
      const z = -2000 + animationProgress * 2000;
      const scale = 0.1 + animationProgress * 0.9;
      const opacity = animationProgress;
      const blur = 10 - animationProgress * 10;

      return {
        transform: `translateZ(${z}px) scale(${scale})`,
        opacity: opacity,
        filter: `blur(${blur}px)`,
      };
    }

    return {
      transform: "translateZ(0px) scale(1)",
      opacity: 1,
      filter: "blur(0px)",
    };
  };

  return (
    // This outer container provides the scrollable height
    <div
      className="w-full bg-black text-foreground relative"
      style={{ height: "100vh" }}
    >
      {/* This inner container sticks to the top while scrolling */}
      <div className="w-full h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10">
          <Link
            href="/"
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            <Image
              src="/always-wet-logo.svg"
              alt="Always Wet Logo"
              width={600}
              height={144}
              className="h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 w-auto"
            />
          </Link>
        </div>
        <div
          className="w-full h-full"
          style={{
            perspective: `${Math.max(dimensions.radius * 2.5, 2000)}px`,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="w-full h-full"
            style={{
              transformStyle: "preserve-3d",
              transition: "none",
              ...getAnimationStyle(),
            }}
          >
            <CircularGallery
              items={galleryData}
              onItemClick={handleItemClick}
              radius={dimensions.radius}
              cardWidth={dimensions.cardWidth}
              cardHeight={dimensions.cardHeight}
              autoRotateSpeed={animationPhase === "animating" ? 2.0 : 0.02}
            />
          </div>
        </div>
      </div>

      {/* Expanded Gallery Modal */}
      <ExpandedGallery selectedItem={selectedItem} onClose={handleClose} />
    </div>
  );
};

export default CircularGalleryDemo;
