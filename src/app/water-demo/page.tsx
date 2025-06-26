"use client";

import { WaterDroplets1 } from "@/components/ui/WaterDroplets1";
import { WaterDroplets2 } from "@/components/ui/WaterDroplets2";
import { WaterDroplets3 } from "@/components/ui/WaterDroplets3";
import { WaterDroplets4 } from "@/components/ui/WaterDroplets4";

/**
 * Demo page showcasing four different water droplet animation methods
 * Each demonstrates a unique approach to creating realistic rain effects
 */
export default function WaterDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/full-short-seattle.mp4" type="video/mp4" />
      </video>
      
      <div className="relative z-10 p-8">
        {/* Title */}
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          Water Droplet Animation Methods
        </h1>
        
        {/* Grid of methods */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Method 1: Pure CSS */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white mb-2">
                Method 1: Pure CSS
              </h2>
              <p className="text-white/70 text-sm max-w-md mx-auto">
                Lightweight circular droplets using CSS animations with staggered timing and realistic gravity effects
              </p>
            </div>
            
            <WaterDroplets1 className="h-64 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">LOGO</span>
                </div>
                <p className="text-white/90 font-medium">Always Wet</p>
              </div>
            </WaterDroplets1>
          </div>

          {/* Method 2: SVG Paths */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white mb-2">
                Method 2: SVG Paths
              </h2>
              <p className="text-white/70 text-sm max-w-md mx-auto">
                Realistic teardrop shapes using SVG paths with filters, gradients, and highlights for authentic water appearance
              </p>
            </div>
            
            <WaterDroplets2 className="h-64 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">LOGO</span>
                </div>
                <p className="text-white/90 font-medium">Always Wet</p>
              </div>
            </WaterDroplets2>
          </div>

          {/* Method 3: Framer Motion */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white mb-2">
                Method 3: Framer Motion
              </h2>
              <p className="text-white/70 text-sm max-w-md mx-auto">
                Physics-based animations with spring dynamics, staggered generation, and smooth transitions using React components
              </p>
            </div>
            
            <WaterDroplets3 className="h-64 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">LOGO</span>
                </div>
                <p className="text-white/90 font-medium">Always Wet</p>
              </div>
            </WaterDroplets3>
          </div>

          {/* Method 4: CSS Gradients */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white mb-2">
                Method 4: CSS Gradients
              </h2>
              <p className="text-white/70 text-sm max-w-md mx-auto">
                Performant pseudo-elements with radial gradients, subtle shadows, and highlights for realistic water effects
              </p>
            </div>
            
            <WaterDroplets4 className="h-64 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">LOGO</span>
                </div>
                <p className="text-white/90 font-medium">Always Wet</p>
              </div>
            </WaterDroplets4>
          </div>
          
        </div>
        
        {/* Comparison notes */}
        <div className="mt-16 max-w-4xl mx-auto text-center text-white/80 space-y-4">
          <h3 className="text-xl font-semibold text-white mb-6">Method Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <p><strong>Performance:</strong> Method 1 (Pure CSS) and Method 4 (Gradients) are most lightweight</p>
              <p><strong>Realism:</strong> Method 2 (SVG) offers the most authentic teardrop shapes</p>
            </div>
            <div className="space-y-2">
              <p><strong>Flexibility:</strong> Method 3 (Framer Motion) provides the most customization options</p>
              <p><strong>Simplicity:</strong> Method 1 (Pure CSS) is easiest to implement and modify</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}