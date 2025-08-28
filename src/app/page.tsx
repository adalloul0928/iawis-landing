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

      <SocialIcons className="absolute top-4 right-4 sm:top-6 sm:right-6" />

      {/* Centered Logo */}
      <Logo className="absolute top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

      {/* Secret button in top left */}
      <button
        type="button"
        onClick={handlePreviewClothes}
        className="absolute top-4 left-4 bg-transparent border-none text-transparent hover:bg-transparent transition-all duration-300 rounded-full px-6 py-4 text-md font-medium shadow-none whitespace-nowrap h-[56px] w-[120px] cursor-pointer z-20"
        style={{
          boxShadow: "none",
        }}
      >
        Preview Clothes
      </button>

      {/* Waitlist Form at Bottom Center */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 px-4 sm:bottom-16 pb-safe-enhanced">
        <WaitlistForm />
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
