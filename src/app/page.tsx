"use client";

import { useState } from "react";
import { Logo } from "@/components/landing/Logo";
import { SocialIcons } from "@/components/landing/SocialIcons";
import { WaitlistForm } from "@/components/landing/WaitlistForm";
import WaterRippleButton from "@/components/ui/WaterRippleButton";
import LiquidMorphButton from "@/components/ui/LiquidMorphButton";
import TransitionButtons from "@/components/ui/TransitionButtons";
import ScreenTransition, {
  TransitionType,
} from "@/components/ui/ScreenTransition";
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
  const [selectedTransition, setSelectedTransition] =
    useState<TransitionType>("water-ripple");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [clickPoint, setClickPoint] = useState({ x: 50, y: 50 });
  const router = useRouter();

  const handleTransitionSelect = (type: TransitionType) => {
    setSelectedTransition(type);
  };

  const handlePreviewClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setClickPoint({ x, y });
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    if (selectedTransition === "circle-expand") {
      router.push(`/option?preview=true&transition=${selectedTransition}`);
    } else if (selectedTransition === "fade-to-black") {
      router.push(`/option?preview=true&transition=${selectedTransition}`);
    } else {
      router.push(`/circular?preview=true&transition=${selectedTransition}`);
    }
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

      {/* Transition Selection - Below Logo */}
      <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-4">
        <TransitionButtons onTransitionSelect={handleTransitionSelect} />
      </div>

      {/* Preview Button - Below Transition Selection */}
      <div className="absolute top-[75%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
        {/* Selected Transition Indicator */}
        <div className="text-center mb-4">
          <div className="text-white/80 text-sm mb-2">Selected Transition:</div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-2xl">
              {selectedTransition === "water-ripple" && "🌊"}
              {selectedTransition === "liquid-wave" && "🌊"}
              {selectedTransition === "droplet-explosion" && "💥"}
              {selectedTransition === "vortex-spiral" && "🌀"}
              {selectedTransition === "ink-diffusion" && "🖋️"}
              {selectedTransition === "waterfall-cascade" && "🌊"}
            </span>
            <span className="text-white font-medium capitalize">
              {selectedTransition.replace("-", " ")}
            </span>
          </div>
        </div>

        {/* Preview Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <WaterRippleButton
            onClick={handlePreviewClick}
            variant="primary"
            className="w-full sm:w-auto"
          >
            🌊 Preview Gallery
          </WaterRippleButton>

          <LiquidMorphButton
            onClick={handlePreviewClick}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            💧 Liquid Preview
          </LiquidMorphButton>
        </div>
      </div>

      {/* Expandable Waitlist Input - Bottom Center */}
      <WaitlistForm className="absolute bottom-12 left-1/2 transform -translate-x-1/2 px-4 sm:bottom-16 pb-safe-enhanced" />

      {/* Screen Transition Overlay */}
      <ScreenTransition
        isActive={isTransitioning}
        transitionType={selectedTransition}
        onComplete={handleTransitionComplete}
        clickPoint={clickPoint}
      />
    </div>
  );
}
