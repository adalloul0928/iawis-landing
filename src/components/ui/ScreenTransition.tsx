"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export type TransitionType =
  | "water-ripple"
  | "liquid-wave"
  | "droplet-explosion"
  | "vortex-spiral"
  | "ink-diffusion"
  | "waterfall-cascade"
  | "circle-expand"
  | "fade-to-black";

interface ScreenTransitionProps {
  isActive: boolean;
  transitionType: TransitionType;
  onComplete: () => void;
  clickPoint?: { x: number; y: number };
}

export default function ScreenTransition({
  isActive,
  transitionType,
  onComplete,
  clickPoint = { x: 50, y: 50 },
}: ScreenTransitionProps) {
  const [animationPhase, setAnimationPhase] = useState<
    "start" | "middle" | "end"
  >("start");
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isActive) {
      setAnimationPhase("start");

      // Phase 1: Start animation
      const startTimer = setTimeout(() => {
        setAnimationPhase("middle");
      }, 150);

      // Phase 2: Middle of animation
      const middleTimer = setTimeout(() => {
        setAnimationPhase("end");
      }, 400);

      // Phase 3: Complete and navigate
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 600);

      return () => {
        clearTimeout(startTimer);
        clearTimeout(middleTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  const getTransitionContent = () => {
    switch (transitionType) {
      case "water-ripple":
        return (
          <div className="absolute inset-0 overflow-hidden">
            {/* Multiple expanding ripples from click point */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`ripple-${i}`}
                className={cn(
                  "absolute rounded-full border-2 border-blue-400/60 bg-blue-900/80",
                  "animate-ripple-expand",
                )}
                style={{
                  left: `${clickPoint.x}%`,
                  top: `${clickPoint.y}%`,
                  transform: "translate(-50%, -50%)",
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: "1.2s",
                }}
              />
            ))}
          </div>
        );

      case "liquid-wave":
        return (
          <div className="absolute inset-0 overflow-hidden">
            {/* Liquid wave sweeping across screen */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900",
                "animate-wave-sweep",
              )}
              style={{
                clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0)",
                animationDuration: "1.2s",
              }}
            />
            {/* Wave crest effect */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-blue-300/40 to-transparent animate-wave-crest"
              style={{
                height: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                animationDuration: "1.2s",
              }}
            />
          </div>
        );

      case "droplet-explosion":
        return (
          <div className="absolute inset-0 overflow-hidden">
            {/* Glass shards falling */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "absolute w-4 h-4 bg-blue-300/80",
                  "animate-glass-shatter",
                )}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: "1.2s",
                }}
              />
            ))}
            {/* Background reveal */}
            <div
              className={cn("absolute inset-0 bg-blue-900", "animate-fade-in")}
              style={{ animationDelay: "0.6s", animationDuration: "0.6s" }}
            />
          </div>
        );

      case "vortex-spiral":
        return (
          <div className="absolute inset-0 overflow-hidden">
            {/* Spinning vortex effect */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900",
                "animate-vortex-spin",
              )}
              style={{
                borderRadius: "50%",
                animationDuration: "1.2s",
              }}
            />
            {/* Spiral arms */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`spiral-${i}`}
                className="absolute inset-0 border-2 border-blue-300/40 animate-spiral-arm"
                style={{
                  borderRadius: "50%",
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: "1.2s",
                }}
              />
            ))}
          </div>
        );

      case "ink-diffusion":
        return (
          <div className="absolute inset-0 overflow-hidden">
            {/* Ink drop at click point */}
            <div
              className={cn(
                "absolute w-8 h-8 bg-black rounded-full",
                "animate-ink-drop",
              )}
              style={{
                left: `${clickPoint.x}%`,
                top: `${clickPoint.y}%`,
                transform: "translate(-50%, -50%)",
                animationDuration: "1.2s",
              }}
            />
            {/* Ink spreading effect */}
            <div
              className={cn("absolute inset-0 bg-black", "animate-ink-spread")}
              style={{
                borderRadius: "50%",
                left: `${clickPoint.x}%`,
                top: `${clickPoint.y}%`,
                transform: "translate(-50%, -50%)",
                animationDuration: "1.2s",
              }}
            />
          </div>
        );

      case "waterfall-cascade":
        return (
          <div className="absolute inset-0 overflow-hidden">
            {/* Horizontal strips falling */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`strip-${i}`}
                className={cn(
                  "absolute w-full bg-blue-900",
                  "animate-strip-fall",
                )}
                style={{
                  height: "5vh",
                  top: `${i * 5}%`,
                  animationDelay: `${i * 0.05}s`,
                  animationDuration: "1.2s",
                }}
              />
            ))}
            {/* Gallery rising from bottom */}
            <div
              className={cn(
                "absolute bottom-0 left-1/2 transform -translate-x-1/2 text-white text-center",
                "animate-gallery-rise",
              )}
              style={{
                animationDelay: "0.8s",
                animationDuration: "0.8s",
              }}
            >
              <div className="text-4xl mb-2">🌊</div>
              <div className="text-xl">Gallery Loading...</div>
            </div>
          </div>
        );

      case "circle-expand":
        return (
          <div className="absolute inset-0 overflow-hidden">
            {/* Black circle expanding from click point */}
            <div
              className={cn(
                "absolute bg-black rounded-full",
                "animate-circle-expand",
              )}
              style={{
                left: `${clickPoint.x}%`,
                top: `${clickPoint.y}%`,
                transform: "translate(-50%, -50%)",
                animationDuration: "1.2s",
              }}
            />
          </div>
        );

      case "fade-to-black":
        return (
          <div className="absolute inset-0 bg-black animate-fade-to-black" />
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={overlayRef}
      className={cn(
        "fixed inset-0 z-[9999] pointer-events-none",
        "transition-all duration-1000 ease-out",
      )}
      style={{
        opacity: animationPhase === "start" ? 0 : 1,
        pointerEvents: animationPhase === "middle" ? "auto" : "none",
      }}
    >
      {getTransitionContent()}

      <style jsx>{`
        @keyframes ripple-expand {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            width: 300vw;
            height: 300vw;
            opacity: 0;
          }
        }
        
        @keyframes wave-sweep {
          0% {
            clip-path: polygon(0 0, 0 100%, 0 100%, 0 0);
          }
          100% {
            clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 0);
          }
        }
        
        @keyframes wave-crest {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
        
        @keyframes glass-shatter {
          0% {
            transform: rotate(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: rotate(360deg) scale(0) translateY(100vh);
            opacity: 0;
          }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes vortex-spin {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: scale(4) rotate(720deg);
            opacity: 1;
          }
        }
        
        @keyframes spiral-arm {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(4) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes ink-drop {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
        }
        
        @keyframes ink-spread {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 1;
          }
        }
        
        @keyframes strip-fall {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        
        @keyframes gallery-rise {
          0% {
            transform: translate(-50%, 100px);
            opacity: 0;
          }
          100% {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }
        
        @keyframes circle-expand {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            width: 300vw;
            height: 300vw;
            opacity: 1;
          }
        }
        
        @keyframes fade-to-black {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
