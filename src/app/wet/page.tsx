"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ExpandedGallery } from "@/components/ui/circular-gallery-expand";
import {
  CircularGallery,
  type GalleryItem,
} from "@/components/ui/circular-gallery2";

const galleryData: GalleryItem[] = [
  {
    common: "Sweatpants",
    binomial: "",
    price: 169,
    photo: {
      url: "/full/00D548B5-6138-406E-98AD-C7D0CC99F8C1.jpeg",
      text: "Orca Black",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Crewneck",
    binomial: "",
    price: 169,
    photo: {
      url: "/closeup/322F338C-8091-4284-A730-DB5503813C21.jpeg",
      text: "Lake Union Blue",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Crewneck",
    binomial: "",
    price: 169,
    photo: {
      url: "/full/399CC86C-055F-4E28-87C4-882F4BA47C17.jpeg",
      text: "Lake Union Blue",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Hoodie",
    binomial: "",
    price: 169,
    photo: {
      url: "/closeup/3CE40DCD-98CB-4382-9774-17E8EA63637C.jpeg",
      text: "Lake Union Blue",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Crewneck",
    binomial: "",
    price: 169,
    photo: {
      url: "/full/423D6ADB-0510-491C-95EC-F853403AA04B.jpeg",
      text: "Orca Black",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Hoodie",
    binomial: "",
    price: 169,
    photo: {
      url: "/closeup/A11347CA-89CA-437D-85F8-32E984FA34C9.jpeg",
      text: "Lake Union Blue",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Sweatpants",
    binomial: "",
    price: 169,
    photo: {
      url: "/full/59C35064-0CE6-4664-AD98-39DF4DCDA78F.jpeg",
      text: "Lake Union Blue",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Hoodie",
    binomial: "",
    price: 169,
    photo: {
      url: "/closeup/DACCFE4A-9450-4255-B5A7-06E7BAEA2A41.jpeg",
      text: "Orca Black",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Crewneck",
    binomial: "",
    price: 169,
    photo: {
      url: "/full/59E311A3-103A-4F1E-9BB5-6EC119CD2555.jpeg",
      text: "Orca Black",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Beanie",
    binomial: "",
    price: 69,
    photo: {
      url: "/closeup/EB1E3784-7462-4A22-92C3-B17B3508EC3A.jpeg",
      text: "Cascade White",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Hoodie",
    binomial: "",
    price: 169,
    photo: {
      url: "/full/79274065-27DC-448F-907B-FA195C43F190.jpeg",
      text: "Lake Union Blue",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Beanie",
    binomial: "",
    price: 69,
    photo: {
      url: "/closeup/F3C63B3E-785D-4993-A15E-EC658CCE07E1.jpeg",
      text: "Orca Black",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Hoodie",
    binomial: "",
    price: 169,
    photo: {
      url: "/full/A420B97A-E5F2-43EC-A792-37C5E35F91BC.jpeg",
      text: "Lake Union Blue",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Hoodie",
    binomial: "",
    price: 169,
    photo: {
      url: "/closeup/F97E7E43-49FA-412A-A201-24EB3820B84D.jpeg",
      text: "Orca Black",
      pos: "center",
      by: "Photographer",
    },
  },
];

const CircularGalleryDemo = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
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

  // Update dimensions based on screen size and detect touch device
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width >= 1536) {
        setDimensions({ radius: 900, cardWidth: 350, cardHeight: 437.5 });
      } else if (width >= 1440) {
        setDimensions({ radius: 750, cardWidth: 290, cardHeight: 355 });
      } else if (width >= 1280) {
        setDimensions({ radius: 800, cardWidth: 325, cardHeight: 405 });
      } else if (width >= 1024) {
        setDimensions({ radius: 700, cardWidth: 260, cardHeight: 340 });
      } else if (width >= 640) {
        setDimensions({ radius: 650, cardWidth: 240, cardHeight: 320 });
      } else if (width >= 375) {
        setDimensions({ radius: 550, cardWidth: 200, cardHeight: 250 });
      } else {
        setDimensions({ radius: 450, cardWidth: 160, cardHeight: 200 });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handleItemClick = useCallback((item: GalleryItem, index: number) => {
    setSelectedItem(item);
    setSelectedIndex(index);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const handleNavigate = useCallback((index: number) => {
    setSelectedIndex(index);
    setSelectedItem(galleryData[index]);
  }, []);

  // Calculate dynamic logo position - position at 20% of space above carousel for better visual balance
  const logoTopPosition = `calc((50vh - ${dimensions.cardHeight / 2}px) * 0.15)`;

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
        const easedProgress = 1 - (1 - progress) ** 3;

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
    // This outer container provides the fixed height
    <div
      className="w-full bg-black text-foreground relative overflow-hidden"
      style={{
        height: "100dvh",
        // Fallback for older browsers that don't support dvh
        minHeight: "100vh",
      }}
    >
      {/* Gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-black to-slate-800/30" />

      {/* Large radial glow underneath carousel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vh]">
        {/* Main glow */}
        <div className="absolute inset-0 bg-gradient-radial from-white/[0.08] via-white/[0.03] to-transparent rounded-full blur-3xl" />
        {/* Blue accent glow */}
        <div
          className="absolute inset-0 bg-gradient-radial from-blue-400/[0.06] via-blue-600/[0.02] to-transparent rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: "3s" }}
        />
        {/* Purple accent */}
        <div
          className="absolute inset-0 bg-gradient-radial from-purple-500/[0.03] via-transparent to-transparent rounded-full blur-xl animate-pulse"
          style={{ animationDuration: "4s", animationDelay: "1s" }}
        />
      </div>

      {/* Apple-like noise texture */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 1%), radial-gradient(circle at 25% 25%, rgba(255,255,255,0.05) 0%, transparent 2%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.08) 0%, transparent 1.5%)",
            backgroundSize: "3px 3px, 7px 7px, 5px 5px",
          }}
        />
      </div>

      {/* This inner container contains the gallery */}
      <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden relative z-10">
        <div
          className="absolute left-1/2 -translate-x-1/2 z-10"
          style={{ top: logoTopPosition }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              animationPhase === "complete"
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.8 }
            }
            transition={{
              duration: 0.8,
              type: "spring",
              bounce: 0.3,
              delay: 0.2,
            }}
          >
            <Link
              href="/"
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              <Image
                src="/always-wet-logo.svg"
                alt="Always Wet Logo"
                width={600}
                height={144}
                className="h-20 [@media(min-width:375px)]:h-32 sm:h-24 md:h-28 lg:h-32 xl:h-36 w-auto"
                priority={true}
              />
            </Link>
          </motion.div>
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
      <ExpandedGallery
        selectedItem={selectedItem}
        items={galleryData}
        currentIndex={selectedIndex}
        onClose={handleClose}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default CircularGalleryDemo;
