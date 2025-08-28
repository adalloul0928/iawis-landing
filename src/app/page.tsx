"use client";

import { useState } from "react";
import { Logo } from "@/components/landing/Logo";
import { SocialIcons } from "@/components/landing/SocialIcons";
import { WaitlistForm } from "@/components/landing/WaitlistForm";
import ScreenTransition from "@/components/ui/ScreenTransition";
import { useRouter } from "next/navigation";

/**
 * Landing page component featuring:
 * - Full-screen video background
 * - Centered animated logo
 * - Social media icons in top-right corner
 * - Transition selection system
 * - Preview buttons for circular gallery
 * - Expandable waitlist form at bottom
 */
export default function Home() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const handlePreviewClothes = () => {
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    router.push(`/wet`);
  };

  return (
    <div
      className="relative overflow-hidden"
      style={{
        height: "100svh",
        // Fallback for older browsers that don't support svh
        minHeight: "100dvh",
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/full-short-seattle.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Social Media Icons - Top Right */}
      <SocialIcons className="absolute top-4 right-4 sm:top-6 sm:right-6" />

      {/* Centered Logo */}
      <Logo className="absolute top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

      {/* Buttons at Bottom Center */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 px-4 sm:bottom-16 pb-safe-enhanced flex flex-col sm:flex-row gap-4 items-center">
        <WaitlistForm />

        {/* Preview Clothes Button */}
        <button
          type="button"
          onClick={handlePreviewClothes}
          className="bg-white/20 border-none text-white hover:bg-white/30 transition-all duration-300 rounded-full px-6 py-4 sm:px-8 sm:py-6 text-md sm:text-base font-medium shadow-none hover:scale-105 active:scale-95 whitespace-nowrap h-[56px] sm:h-[72px] cursor-pointer backdrop-blur-md"
          style={{
            boxShadow:
              "0 0 20px rgba(255,255,255,0.3), inset 0 0 20px rgba(255,255,255,0.1)",
          }}
        >
          Preview Clothes
        </button>
      </div>

      {/* Screen Transition Overlay */}
      <ScreenTransition
        isActive={isTransitioning}
        transitionType="fade-to-black"
        onComplete={handleTransitionComplete}
        clickPoint={{ x: 50, y: 50 }}
      />
    </div>
  );
}
