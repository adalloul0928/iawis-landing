"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CircularGallery from "@/components/ui/circular-gallery";
import { galleryData } from "@/components/ui/circular-gallery-data";
import { TransitionType } from "@/components/ui/ScreenTransition";

export default function CircularPage() {
  const searchParams = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";
  const transitionType =
    (searchParams.get("transition") as TransitionType) || "water-ripple";
  const [showEntranceAnimation, setShowEntranceAnimation] = useState(isPreview);
  const [animationPhase, setAnimationPhase] = useState<
    "welcome" | "ripple" | "complete"
  >("welcome");

  useEffect(() => {
    if (isPreview) {
      // Phase 1: Welcome message
      const welcomeTimer = setTimeout(() => {
        setAnimationPhase("ripple");
      }, 2000);

      // Phase 2: Ripple expansion
      const rippleTimer = setTimeout(() => {
        setAnimationPhase("complete");
        setShowEntranceAnimation(false);
      }, 4000);

      return () => {
        clearTimeout(welcomeTimer);
        clearTimeout(rippleTimer);
      };
    }
  }, [isPreview]);

  const getWelcomeMessage = () => {
    const messages = {
      "water-ripple": {
        emoji: "🌊",
        title: "Water Ripple Effect",
        subtitle: "Ripples expanding from center...",
      },
      "liquid-wave": {
        emoji: "🌊",
        title: "Liquid Wave Sweep",
        subtitle: "Wave washing over the screen...",
      },
      "droplet-explosion": {
        emoji: "💥",
        title: "Droplet Explosion",
        subtitle: "Glass shattering and falling...",
      },
      "vortex-spiral": {
        emoji: "🌀",
        title: "Vortex Spiral",
        subtitle: "Spinning into the whirlpool...",
      },
      "ink-diffusion": {
        emoji: "🖋️",
        title: "Ink Diffusion",
        subtitle: "Ink spreading across screen...",
      },
      "waterfall-cascade": {
        emoji: "🌊",
        title: "Waterfall Cascade",
        subtitle: "Strips falling like water...",
      },
      "circle-expand": {
        emoji: "⚫",
        title: "Circle Expand",
        subtitle: "Black circle expanding from click...",
      },
      "fade-to-black": {
        emoji: "🌑",
        title: "Fade to Black",
        subtitle: "Screen fading to black, then cards spin in...",
      },
    };

    return messages[transitionType] || messages["water-ripple"];
  };

  const welcomeData = getWelcomeMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {showEntranceAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
          {/* Water droplet background effect */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`droplet-${i}`}
                className="absolute w-2 h-2 bg-blue-300/30 rounded-full animate-droplet"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Main welcome content */}
          <div className="text-center text-white relative z-10">
            <div
              className="text-8xl mb-6 animate-bounce"
              style={{ animationDelay: "0.5s" }}
            >
              {welcomeData.emoji}
            </div>
            <div
              className="text-3xl font-light mb-4 animate-fade-in"
              style={{ animationDelay: "0.8s" }}
            >
              {welcomeData.title}
            </div>
            <div
              className="text-xl text-blue-200 animate-fade-in"
              style={{ animationDelay: "1.1s" }}
            >
              {welcomeData.subtitle}
            </div>

            {/* Ripple effect during ripple phase */}
            {animationPhase === "ripple" && (
              <div className="mt-8">
                <div className="relative">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={`ripple-${i}`}
                      className="absolute inset-0 border-2 border-blue-300/50 rounded-full animate-ripple-expand"
                      style={{
                        animationDelay: `${i * 0.3}s`,
                        animationDuration: "1.5s",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <CircularGallery
        items={galleryData}
        className={showEntranceAnimation ? "opacity-0" : "opacity-100"}
        style={{
          transition: "opacity 1.5s ease-in-out",
          animation:
            isPreview && !showEntranceAnimation
              ? "galleryEntrance 2s ease-out"
              : "none",
        }}
      />

      <style jsx>{`
        @keyframes droplet {
          0% {
            transform: translateY(-100vh) scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) scale(1);
            opacity: 0;
          }
        }
        
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes ripple-expand {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }
        
        @keyframes galleryEntrance {
          0% {
            transform: scale(0.1) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.1) rotate(180deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(1) rotate(360deg);
            opacity: 1;
          }
        }
        
        .animate-droplet {
          animation: droplet linear infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-ripple-expand {
          animation: ripple-expand ease-out forwards;
        }
      `}</style>
    </div>
  );
}
