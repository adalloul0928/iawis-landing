"use client";

import { RealisticWater1 } from "@/components/ui/RealisticWater1";
import { RealisticWater2 } from "@/components/ui/RealisticWater2";
import { RealisticWater3 } from "@/components/ui/RealisticWater3";
import { RealisticWater4 } from "@/components/ui/RealisticWater4";
import Image from "next/image";

/**
 * Demo page showcasing four realistic water droplet methods
 * Large droplets that slide down glass-like surfaces with physics
 */
export default function RealisticWaterDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      >
        <source src="/full-short-seattle.mp4" type="video/mp4" />
      </video>
      
      <div className="relative z-10 p-8">
        {/* Title */}
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          Realistic Water Droplets on Glass
        </h1>
        <p className="text-white/80 text-center mb-12 max-w-3xl mx-auto">
          Large, realistic water droplets that slide down your logo like water on glass. 
          Each method offers unique physics, visual effects, and performance characteristics.
        </p>
        
        {/* Grid of methods */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          
          {/* Method 1: SVG Masking + Physics */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white mb-2">
                Method 1: SVG Masking + Physics
              </h2>
              <p className="text-white/70 text-sm max-w-md mx-auto">
                Large droplets with SVG clipPath masking, realistic teardrop shapes, trailing effects, and physics-based gravity acceleration
              </p>
            </div>
            
            <RealisticWater1 className="h-80 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center">
              <div className="text-center">
                <Image
                  src="/always-wet-logo.svg"
                  alt="Logo"
                  width={200}
                  height={200}
                  className="w-48 h-48 drop-shadow-2xl"
                />
                <p className="text-white/90 font-medium mt-2">Always Wet Logo</p>
              </div>
            </RealisticWater1>
          </div>

          {/* Method 2: SVG Filters + Glass Distortion */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white mb-2">
                Method 2: Glass Refraction
              </h2>
              <p className="text-white/70 text-sm max-w-md mx-auto">
                Advanced SVG filters create realistic glass effects with feTurbulence, feDisplacementMap, and specular lighting for authentic refraction
              </p>
            </div>
            
            <RealisticWater2 className="h-80 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center">
              <div className="text-center">
                <Image
                  src="/always-wet-logo.svg"
                  alt="Logo"
                  width={200}
                  height={200}
                  className="w-48 h-48 drop-shadow-2xl"
                />
                <p className="text-white/90 font-medium mt-2">Always Wet Logo</p>
              </div>
            </RealisticWater2>
          </div>

          {/* Method 3: Canvas Physics */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white mb-2">
                Method 3: Canvas Physics
              </h2>
              <p className="text-white/70 text-sm max-w-md mx-auto">
                HTML5 Canvas with real physics simulation, collision detection, droplet merging, surface tension, and realistic trail rendering
              </p>
            </div>
            
            <RealisticWater3 className="h-80 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center">
              <div className="text-center">
                <Image
                  src="/always-wet-logo.svg"
                  alt="Logo"
                  width={200}
                  height={200}
                  className="w-48 h-48 drop-shadow-2xl"
                />
                <p className="text-white/90 font-medium mt-2">Always Wet Logo</p>
              </div>
            </RealisticWater3>
          </div>

          {/* Method 4: Multi-Layer CSS */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white mb-2">
                Method 4: Multi-Layer CSS
              </h2>
              <p className="text-white/70 text-sm max-w-md mx-auto">
                Sophisticated layering with background blur, main droplet, and highlight layers plus JavaScript collision detection and merging
              </p>
            </div>
            
            <RealisticWater4 className="h-80 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center">
              <div className="text-center">
                <Image
                  src="/always-wet-logo.svg"
                  alt="Logo"
                  width={200}
                  height={200}
                  className="w-48 h-48 drop-shadow-2xl"
                />
                <p className="text-white/90 font-medium mt-2">Always Wet Logo</p>
              </div>
            </RealisticWater4>
          </div>
          
        </div>
        
        {/* Detailed comparison */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">Technical Comparison</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h4 className="text-lg font-semibold text-white mb-4">Method 1: SVG Masking</h4>
              <ul className="text-white/80 space-y-2">
                <li><span className="text-green-400">✓</span> Great performance</li>
                <li><span className="text-green-400">✓</span> Perfect logo masking</li>
                <li><span className="text-green-400">✓</span> Smooth trails</li>
                <li><span className="text-green-400">✓</span> Easy to customize</li>
                <li><span className="text-yellow-400">~</span> Basic physics</li>
              </ul>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h4 className="text-lg font-semibold text-white mb-4">Method 2: Glass Effects</h4>
              <ul className="text-white/80 space-y-2">
                <li><span className="text-green-400">✓</span> Most realistic optics</li>
                <li><span className="text-green-400">✓</span> True refraction</li>
                <li><span className="text-green-400">✓</span> Glass distortion</li>
                <li><span className="text-yellow-400">~</span> Browser dependent</li>
                <li><span className="text-yellow-400">~</span> Complex filters</li>
              </ul>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h4 className="text-lg font-semibold text-white mb-4">Method 3: Canvas Physics</h4>
              <ul className="text-white/80 space-y-2">
                <li><span className="text-green-400">✓</span> Real physics sim</li>
                <li><span className="text-green-400">✓</span> Droplet merging</li>
                <li><span className="text-green-400">✓</span> Collision detection</li>
                <li><span className="text-green-400">✓</span> Most interactive</li>
                <li><span className="text-yellow-400">~</span> Higher CPU usage</li>
              </ul>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h4 className="text-lg font-semibold text-white mb-4">Method 4: Multi-Layer</h4>
              <ul className="text-white/80 space-y-2">
                <li><span className="text-green-400">✓</span> Great visual depth</li>
                <li><span className="text-green-400">✓</span> Good performance</li>
                <li><span className="text-green-400">✓</span> Smart merging</li>
                <li><span className="text-green-400">✓</span> CSS optimized</li>
                <li><span className="text-yellow-400">~</span> Complex layering</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 text-center text-white/80">
            <p className="text-lg mb-4">
              <strong>Recommendation:</strong> Choose based on your priorities
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-sm">
              <div>
                <p><strong>Best Overall:</strong> Method 1 (SVG Masking) - Perfect balance of realism and performance</p>
                <p><strong>Most Realistic:</strong> Method 2 (Glass Effects) - True optical refraction</p>
              </div>
              <div>
                <p><strong>Most Interactive:</strong> Method 3 (Canvas) - Real physics with merging</p>
                <p><strong>Best Performance:</strong> Method 4 (Multi-Layer) - Optimized CSS rendering</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}