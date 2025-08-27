"use client";

import { useState } from "react";
import { Logo } from "@/components/landing/Logo";
import { SocialIcons } from "@/components/landing/SocialIcons";
import { WaitlistForm } from "@/components/landing/WaitlistForm";

/**
 * Landing page component featuring:
 * - Full-screen video background
 * - Centered animated logo
 * - Social media icons in top-right corner
 * - Expandable waitlist form at bottom
 */
export default function Home() {
  const [clickCount, setClickCount] = useState(0);
  const [showNavigation, setShowNavigation] = useState(false);

  const handleTopRightClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 3) {
      setShowNavigation(true);
    }

    // Reset count after 2 seconds of no clicking
    setTimeout(() => {
      if (newCount === clickCount) {
        setClickCount(0);
      }
    }, 2000);
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

      {/* Invisible click area in top left */}
      <div
        className="absolute top-0 left-0 w-20 h-20 cursor-pointer z-20"
        onClick={handleTopRightClick}
      />

      {/* Navigation to carousels - only show after 3 clicks */}
      {showNavigation && (
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-col gap-2 animate-fade-in">
          <a
            href="/coverflow-framer"
            className="inline-flex items-center mt-10 px-4 py-2 bg-purple-800/80 hover:bg-purple-700/80 border border-purple-600/50 rounded-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 backdrop-blur-sm"
          >
            Option 1{" "}
          </a>
          <a
            href="/coverflow-clean"
            className="inline-flex items-center px-4 py-2 bg-purple-800/80 hover:bg-purple-700/80 border border-purple-600/50 rounded-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 backdrop-blur-sm"
          >
            Option 1b
          </a>{" "}
          {/* 
        <a
          href="/coverflow-spring"
          className="inline-flex items-center px-4 py-2 bg-green-800/80 hover:bg-green-700/80 border border-green-600/50 rounded-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 backdrop-blur-sm"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          React Spring
        </a> */}
          <a
            href="/3d-carousel-cult"
            className="inline-flex items-center px-4 py-2 bg-purple-800/80 hover:bg-purple-700/80 border border-purple-600/50 rounded-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 backdrop-blur-sm"
          >
            Option 2
          </a>
          <a
            href="/card-carousel"
            className="inline-flex items-center px-4 py-2 bg-purple-800/80 hover:bg-purple-700/80 border border-purple-600/50 rounded-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 backdrop-blur-sm"
          >
            Option 3
          </a>
          <a
            href="/interactive-selector"
            className="inline-flex items-center px-4 py-2 bg-purple-800/80 hover:bg-purple-700/80 border border-purple-600/50 rounded-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 backdrop-blur-sm"
          >
            Option 4
          </a>
          <a
            href="/circular-gallery"
            className="inline-flex items-center px-4 py-2 bg-purple-800/80 hover:bg-purple-700/80 border border-purple-600/50 rounded-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 backdrop-blur-sm"
          >
            Option 5
          </a>
        </div>
      )}

      <Logo className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      <WaitlistForm className="absolute bottom-12 left-1/2 transform -translate-x-1/2 px-4 sm:bottom-16 pb-safe-enhanced" />
    </div>
  );
}
