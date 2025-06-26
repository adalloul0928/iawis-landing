"use client";

import { motion } from "framer-motion";
import type React from "react";

interface TestButtonProps {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  href?: string;
}

/**
 * Clean circular glass morphism button matching Join the Waitlist styling
 * No visible backgrounds, pure glass effect with subtle glowing border
 */
export function TestButton({
  onClick,
  className = "",
  children,
  href,
}: TestButtonProps) {
  const buttonContent = (
    <div className={`relative ${className}`}>
      {/* Glowing border container */}
      <span
        className="relative inline-block overflow-hidden rounded-full p-[1px] bg-transparent"
        style={{
          boxShadow:
            "0 0 20px rgba(255,255,255,0.3), inset 0 0 20px rgba(255,255,255,0.1)",
          backgroundColor: "transparent",
        }}
      >
        {/* Spinning border animation (like Join the Waitlist) */}
        <span
          className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite]"
          style={{
            background:
              "conic-gradient(from 90deg at 50% 50%, rgba(255,255,255,0.4) 0deg, rgba(255,255,255,0.4) 15deg, transparent 16deg, transparent 344deg, rgba(255,255,255,0.4) 345deg)",
            animationDelay: "0s",
          }}
        />

        {/* Main button */}
        <motion.button
          onClick={onClick}
          whileTap={{ scale: 0.95 }}
          className="relative text-white rounded-full shadow-lg w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center font-medium text-sm sm:text-base transition-all duration-300 cursor-pointer hover:bg-white/30"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {children || "Test"}
        </motion.button>
      </span>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
}
