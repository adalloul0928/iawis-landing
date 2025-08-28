"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  CircularGallery,
  GalleryItem,
} from "@/components/ui/circular-gallery2";

const galleryData: GalleryItem[] = [
  {
    common: "Lion",
    binomial: "Panthera leo",
    photo: {
      url: "https://images.unsplash.com/photo-1583499871880-de841d1ace2a?w=900&auto=format&fit=crop&q=80",
      text: "lion couple kissing on a brown rock",
      pos: "47% 35%",
      by: "Clément Roy",
    },
  },
  {
    common: "Asiatic elephant",
    binomial: "Elephas maximus",
    photo: {
      url: "https://images.unsplash.com/photo-1571406761758-9a3eed5338ef?w=900&auto=format&fit=crop&q=80",
      text: "herd of Sri Lankan elephants walking away from a river",
      pos: "75% 65%",
      by: "Alex Azabache",
    },
  },
  {
    common: "Red-tailed black cockatoo",
    binomial: "Calyptorhynchus banksii",
    photo: {
      url: "https://images.unsplash.com/photo-1619664208054-41eefeab29e9?w=900&auto=format&fit=crop&q=80",
      text: "close-up of a black cockatoo",
      pos: "53% 43%",
      by: "David Clode",
    },
  },
  {
    common: "Dromedary",
    binomial: "Camelus dromedarius",
    photo: {
      url: "https://images.unsplash.com/photo-1662841238473-f4b137e123cb?w=900&auto=format&fit=crop&q=80",
      text: "camel and her new born calf walking in the Sahara desert",
      pos: "65% 65%",
      by: "Moaz Tobok",
    },
  },
  {
    common: "Polar bear",
    binomial: "Ursus maritimus",
    photo: {
      url: "https://images.unsplash.com/photo-1589648751789-c8ecb7a88bd5?w=900&auto=format&fit=crop&q=80",
      text: "polar bear on the snow, by the water, raised on the hind legs, front paws together",
      pos: "50% 25%",
      by: "Hans-Jurgen Mager",
    },
  },
  {
    common: "Giant panda",
    binomial: "Ailuropoda melanoleuca",
    photo: {
      url: "https://images.unsplash.com/photo-1659540181281-1d89d6112832?w=900&auto=format&fit=crop&q=80",
      text: "giant panda hanging from a tree branch",
      pos: "47%",
      by: "Jiachen Lin",
    },
  },
  {
    common: "Grévy's zebra",
    binomial: "Equus grevyi",
    photo: {
      url: "https://images.unsplash.com/photo-1526095179574-86e545346ae6?w=900&auto=format&fit=crop&q=80",
      text: "zebra standing on wheat field, looking back towards the camera",
      pos: "65% 35%",
      by: "Jeff Griffith",
    },
  },
  {
    common: "Cheetah",
    binomial: "Acinonyx jubatus",
    photo: {
      url: "https://images.unsplash.com/photo-1541707519942-08fd2f6480ba?w=900&auto=format&fit=crop&q=80",
      text: "cheetah sitting in the grass under a blue sky",
      by: "Mike Bird",
    },
  },
  {
    common: "King penguin",
    binomial: "Aptenodytes patagonicus",
    photo: {
      url: "https://images.unsplash.com/photo-1595792419466-23cec2476fa6?w=900&auto=format&fit=crop&q=80",
      text: "king penguin with a fluffy brown chick on grey rocks",
      pos: "35%",
      by: "Martin Wettstein",
    },
  },
  {
    common: "Red panda",
    binomial: "Ailurus fulgens",
    photo: {
      url: "https://images.unsplash.com/photo-1689799513565-44d2bc09d75b?w=900&auto=format&fit=crop&q=80",
      text: "a red panda in a tree",
      by: "Niels Baars",
    },
  },
];

const CircularGalleryDemo = () => {
  const searchParams = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";

  // Animation state
  const [animationPhase, setAnimationPhase] = useState<
    "initial" | "animating" | "complete"
  >("initial");
  const [animationProgress, setAnimationProgress] = useState(0);

  // Start animation when page loads
  useEffect(() => {
    if (isPreview) {
      // Start animation after a very brief delay
      const timer = setTimeout(() => {
        setAnimationPhase("animating");

        // Animate over 0.8 seconds (very fast)
        const startTime = Date.now();
        const duration = 800;

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
    }
  }, [isPreview]);

  // Calculate animation values
  const getAnimationStyle = () => {
    if (animationPhase === "initial") {
      return {
        transform: "translateZ(-2000px) scale(0.1)",
        opacity: 0,
        filter: "blur(10px)", // Add blur effect for depth
      };
    }

    if (animationPhase === "animating") {
      // Start from far back and small, come forward and grow
      const z = -2000 + animationProgress * 2000; // -2000px to 0px
      const scale = 0.1 + animationProgress * 0.9; // 0.1 to 1.0
      const opacity = animationProgress;
      const blur = 10 - animationProgress * 10; // Blur decreases as it comes forward

      return {
        transform: `translateZ(${z}px) scale(${scale})`,
        opacity: opacity,
        filter: `blur(${blur}px)`,
      };
    }

    // Complete state
    return {
      transform: "translateZ(0px) scale(1)",
      opacity: 1,
      filter: "blur(0px)",
    };
  };

  return (
    <div
      className="w-full bg-black text-foreground"
      style={{ height: "500vh" }}
    >
      {/* This inner container sticks to the top while scrolling */}
      <div className="w-full h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden">
        <div className="text-center mb-8 absolute top-16 z-10">
          <h1 className="text-4xl font-bold">Animal Gallery</h1>
          <p className="text-muted-foreground">
            Scroll or drag to rotate the gallery
          </p>
        </div>
        <div
          className="w-full h-full"
          style={{
            perspective: "2000px",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="w-full h-full"
            style={{
              transformStyle: "preserve-3d",
              transition: "none", // Disable CSS transitions for our custom animation
              ...getAnimationStyle(),
            }}
          >
            <CircularGallery
              items={galleryData}
              autoRotateSpeed={
                animationPhase === "animating"
                  ? 2.0 // Very fast rotation during animation (100x normal speed)
                  : 0.02 // Normal speed when not animating
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularGalleryDemo;
