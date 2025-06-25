"use client";

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
  return (
    <div className="relative h-screen overflow-hidden">
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
      <Logo className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

      {/* Expandable Waitlist Input - Bottom Center */}
      <WaitlistForm className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 sm:bottom-8 pb-safe" />
    </div>
  );
}
