"use client";

import React, { useState } from "react";
import { TransitionType } from "./ScreenTransition";
import { cn } from "@/lib/utils";

interface TransitionButtonsProps {
  onTransitionSelect: (type: TransitionType) => void;
  className?: string;
}

const transitionOptions = [
  {
    type: "water-ripple" as TransitionType,
    label: "Water Ripple",
    icon: "🌊",
    description: "Expanding ripples from center",
    color: "from-blue-500 to-blue-600",
    hoverColor: "from-blue-600 to-blue-700",
  },
  {
    type: "liquid-wave" as TransitionType,
    label: "Liquid Wave",
    icon: "🌊",
    description: "Wave sweeps across screen",
    color: "from-cyan-500 to-blue-600",
    hoverColor: "from-cyan-600 to-blue-700",
  },
  {
    type: "droplet-explosion" as TransitionType,
    label: "Droplet Explosion",
    icon: "💥",
    description: "Glass shatters and falls",
    color: "from-indigo-500 to-purple-600",
    hoverColor: "from-indigo-600 to-purple-700",
  },
  {
    type: "vortex-spiral" as TransitionType,
    label: "Vortex Spiral",
    icon: "🌀",
    description: "Spinning whirlpool effect",
    color: "from-purple-500 to-pink-600",
    hoverColor: "from-purple-600 to-pink-700",
  },
  {
    type: "ink-diffusion" as TransitionType,
    label: "Ink Diffusion",
    icon: "🖋️",
    description: "Ink spreads from click",
    color: "from-gray-700 to-black",
    hoverColor: "from-gray-800 to-black",
  },
  {
    type: "waterfall-cascade" as TransitionType,
    label: "Waterfall Cascade",
    icon: "🌊",
    description: "Strips fall like waterfall",
    color: "from-teal-500 to-green-600",
    hoverColor: "from-teal-600 to-green-700",
  },
  {
    type: "circle-expand" as TransitionType,
    label: "Circle Expand",
    icon: "⚫",
    description: "Black circle expands from click",
    color: "from-gray-800 to-black",
    hoverColor: "from-gray-900 to-black",
  },
  {
    type: "fade-to-black" as TransitionType,
    label: "Fade to Black",
    icon: "🌑",
    description: "Screen fades to black",
    color: "from-gray-900 to-black",
    hoverColor: "from-black to-gray-900",
  },
];

export default function TransitionButtons({
  onTransitionSelect,
  className,
}: TransitionButtonsProps) {
  const [selectedType, setSelectedType] = useState<TransitionType | null>(null);

  const handleTransitionSelect = (type: TransitionType) => {
    setSelectedType(type);
    onTransitionSelect(type);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Choose Your Transition
        </h2>
        <p className="text-blue-200">
          Select how you want to experience the gallery
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {transitionOptions.map((option) => (
          <button
            type="button"
            key={option.type}
            onClick={() => handleTransitionSelect(option.type)}
            className={cn(
              "group relative p-6 rounded-xl text-left transition-all duration-300 transform",
              "bg-gradient-to-br hover:scale-105 active:scale-95",
              "border-2 border-white/20 hover:border-white/40",
              "shadow-lg hover:shadow-xl",
              option.color,
              selectedType === option.type &&
                "ring-4 ring-blue-400/50 scale-105",
            )}
            style={
              {
                background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                "--tw-gradient-from": option.color.split(" ")[1],
                "--tw-gradient-to": option.color.split(" ")[3],
              } as React.CSSProperties
            }
          >
            {/* Icon */}
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
              {option.icon}
            </div>

            {/* Label */}
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-100 transition-colors">
              {option.label}
            </h3>

            {/* Description */}
            <p className="text-blue-100 text-sm opacity-90 group-hover:opacity-100 transition-opacity">
              {option.description}
            </p>

            {/* Hover effect overlay */}
            <div
              className={cn(
                "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                "bg-gradient-to-br from-white/10 to-transparent",
              )}
            />

            {/* Selection indicator */}
            {selectedType === option.type && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Instructions */}
      <div className="text-center mt-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
        <p className="text-white/80 text-sm">
          Click any transition button above to see the effect, then click the
          preview button to experience the full animation!
        </p>
      </div>
    </div>
  );
}
