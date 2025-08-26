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

      {/* Navigation to carousels */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-col gap-2 max-h-[80vh] overflow-y-auto">
        <a
          href="/carousel"
          className="inline-flex items-center px-4 py-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/50 rounded-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 backdrop-blur-sm"
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
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          Product Showcase
        </a>

        <a
          href="/people-carousel"
          className="inline-flex items-center px-4 py-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/50 rounded-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 backdrop-blur-sm"
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          People Showcase
        </a>

        {/* 3D Cover Flow Comparisons */}
        <div className="text-xs text-gray-400 mt-2 px-2">
          3D Cover Flow Implementations:
        </div>

        <a
          href="/coverflow-framer"
          className="inline-flex items-center px-4 py-2 bg-blue-800/80 hover:bg-blue-700/80 border border-blue-600/50 rounded-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 backdrop-blur-sm"
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
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          Framer Motion
        </a>

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
        </a>

        <a
          href="/coverflow-gsap"
          className="inline-flex items-center px-4 py-2 bg-orange-800/80 hover:bg-orange-700/80 border border-orange-600/50 rounded-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 backdrop-blur-sm"
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
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          GSAP ScrollTrigger
        </a>

        {/* 21st.dev Components */}
        <div className="text-xs text-gray-400 mt-4 px-2">
          21st.dev Components:
        </div>


        <a
          href="/3d-carousel-cult"
          className="inline-flex items-center px-4 py-2 bg-purple-800/80 hover:bg-purple-700/80 border border-purple-600/50 rounded-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 backdrop-blur-sm"
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
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8a2 2 0 002-2V8a2 2 0 00-2-2H8a2 2 0 00-2 2v4a2 2 0 002 2z"
            />
          </svg>
          3D Cylinder
        </a>

        <a
          href="/card-carousel-reuno"
          className="inline-flex items-center px-4 py-2 bg-purple-800/80 hover:bg-purple-700/80 border border-purple-600/50 rounded-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 backdrop-blur-sm"
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
              d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v8a1 1 0 01-1 1h-8a1 1 0 01-1-1V4a1 1 0 011-1h8zm-8 0V3a1 1 0 00-1-1H4a1 1 0 00-1 1v8a1 1 0 001 1h4a1 1 0 001-1V4z"
            />
          </svg>
          Card Coverflow
        </a>

        <a
          href="/interactive-selector"
          className="inline-flex items-center px-4 py-2 bg-purple-800/80 hover:bg-purple-700/80 border border-purple-600/50 rounded-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 backdrop-blur-sm"
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
              d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
            />
          </svg>
          Interactive Cards
        </a>

        <a
          href="/circular-gallery-david"
          className="inline-flex items-center px-4 py-2 bg-purple-800/80 hover:bg-purple-700/80 border border-purple-600/50 rounded-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 backdrop-blur-sm"
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
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          WebGL Gallery
        </a>

      </div>

      <Logo className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      <WaitlistForm className="absolute bottom-12 left-1/2 transform -translate-x-1/2 px-4 sm:bottom-16 pb-safe-enhanced" />
    </div>
  );
}
