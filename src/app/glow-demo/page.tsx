"use client";

import { SmoothGlowButton1 } from "@/components/ui/SmoothGlowButton1";
import { SmoothGlowButton2 } from "@/components/ui/SmoothGlowButton2";
import { SmoothGlowButton3 } from "@/components/ui/SmoothGlowButton3";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.082 5.48.207 4.955.43a5.427 5.427 0 0 0-1.962 1.276A5.392 5.392 0 0 0 1.717 3.67C1.493 4.195 1.368 4.81 1.334 5.757.299 6.706.286 7.112.286 10.733s.013 4.027.048 4.976c.034.947.159 1.562.383 2.087a5.427 5.427 0 0 0 1.276 1.962 5.392 5.392 0 0 0 1.962 1.276c.525.224 1.14.35 2.087.383.949.035 1.356.048 4.977.048s4.027-.013 4.976-.048c.947-.034 1.562-.159 2.087-.383a5.427 5.427 0 0 0 1.962-1.276 5.392 5.392 0 0 0 1.276-1.962c.224-.525.35-1.14.383-2.087.035-.949.048-1.356.048-4.977s-.013-4.027-.048-4.976c-.034-.947-.159-1.562-.383-2.087a5.427 5.427 0 0 0-1.276-1.962A5.392 5.392 0 0 0 19.33 1.717c-.525-.224-1.14-.35-2.087-.383C16.294.013 15.888 0 12.267 0h-.25zm-.266 2.171c3.534 0 3.953.014 5.35.048.838.038 1.293.177 1.595.294.401.156.687.343.988.644.301.301.488.587.644.988.117.302.256.757.294 1.595.034 1.397.048 1.816.048 5.35s-.014 3.953-.048 5.35c-.038.838-.177 1.293-.294 1.595a2.654 2.654 0 0 1-.644.988 2.654 2.654 0 0 1-.988.644c-.302.117-.757.256-1.595.294-1.397.034-1.816.048-5.35.048s-3.953-.014-5.35-.048c-.838-.038-1.293-.177-1.595-.294a2.654 2.654 0 0 1-.988-.644 2.654 2.654 0 0 1-.644-.988c-.117-.302-.256-.757-.294-1.595-.034-1.397-.048-1.816-.048-5.35s.014-3.953.048-5.35c.038-.838.177-1.293.294-1.595.156-.401.343-.687.644-.988.301-.301.587-.488.988-.644.302-.117.757-.256 1.595-.294 1.397-.034 1.816-.048 5.35-.048z" />
    <path d="M12.017 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12.017 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
    <circle cx="18.406" cy="5.594" r="1.44" />
  </svg>
);

/**
 * Demo page showcasing three different glowing circle button implementations
 * Each uses a different approach for creating the traveling glow effect
 */
export default function GlowDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-8">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      >
        <source src="/full-short-seattle.mp4" type="video/mp4" />
      </video>
      
      <div className="relative z-10">
        {/* Title */}
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          Smooth Glowing Circle Buttons
        </h1>
        
        {/* Buttons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-center">
          
          {/* Variation 1: Separated Rotation + Arc Growth */}
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-lg font-semibold text-white/90 text-center">
              Variation 1: Separated
            </h2>
            <p className="text-sm text-white/70 text-center max-w-xs">
              Continuous rotation with separate smooth arc pulsing. No keyframe stuttering.
            </p>
            <SmoothGlowButton1 size={80}>
              <InstagramIcon className="w-8 h-8" />
            </SmoothGlowButton1>
          </div>
          
          {/* Variation 2: Mathematical Sine Wave */}
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-lg font-semibold text-white/90 text-center">
              Variation 2: Sine Wave
            </h2>
            <p className="text-sm text-white/70 text-center max-w-xs">
              Mathematical sine wave growth pattern with gradient falloff for ultra-smooth motion.
            </p>
            <SmoothGlowButton2 size={80}>
              <InstagramIcon className="w-8 h-8" />
            </SmoothGlowButton2>
          </div>
          
          {/* Variation 3: Ultra-Smooth Bezier */}
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-lg font-semibold text-white/90 text-center">
              Variation 3: Bezier Curves
            </h2>
            <p className="text-sm text-white/70 text-center max-w-xs">
              Custom cubic-bezier timing with multiple glow layers for the smoothest possible animation.
            </p>
            <SmoothGlowButton3 size={80}>
              <InstagramIcon className="w-8 h-8" />
            </SmoothGlowButton3>
          </div>
          
        </div>
        
        {/* Description */}
        <div className="mt-16 max-w-2xl text-center text-white/80 space-y-4">
          <p className="text-lg">
            Fixed Method 2: These variations eliminate keyframe stuttering for perfectly smooth animations.
          </p>
          <p className="text-sm">
            Each uses continuous rotation with different arc growth patterns. The glowing line smoothly grows and shrinks 
            as it travels around the border without getting stuck at animation keyframe points.
          </p>
        </div>
      </div>
    </div>
  );
}