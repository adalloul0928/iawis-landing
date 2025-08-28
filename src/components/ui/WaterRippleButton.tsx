"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface WaterRippleButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary";
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
  createdAt: number;
}

export default function WaterRippleButton({
  children,
  className,
  href,
  onClick,
  variant = "primary",
}: WaterRippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleIdRef = useRef(0);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const newRipple: Ripple = {
        id: rippleIdRef.current++,
        x,
        y,
        size,
        createdAt: Date.now(),
      };

      setRipples((prev) => [...prev, newRipple]);

      // Navigate or call onClick after ripple animation
      setTimeout(() => {
        if (href) {
          router.push(href);
        } else if (onClick) {
          // Create a synthetic event that matches what the parent expects
          const syntheticEvent = {
            ...e,
            currentTarget: buttonRef.current,
            target: buttonRef.current,
          } as React.MouseEvent<HTMLButtonElement>;
          onClick(syntheticEvent);
        }
      }, 300);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Clean up old ripples
  useEffect(() => {
    const interval = setInterval(() => {
      setRipples((prev) =>
        prev.filter((ripple) => Date.now() - ripple.createdAt < 1000),
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const baseClasses = cn(
    "relative overflow-hidden rounded-full font-semibold transition-all duration-300 transform",
    "focus:outline-none focus:ring-4 focus:ring-blue-400/50",
    "active:scale-95",
    className,
  );

  const variantClasses = {
    primary: cn(
      "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      "text-white shadow-lg hover:shadow-xl",
      "border-2 border-blue-400/30 hover:border-blue-300/50",
    ),
    secondary: cn(
      "bg-gradient-to-r from-blue-400/20 to-blue-500/20 hover:from-blue-400/30 hover:to-blue-500/30",
      "text-blue-100 border-2 border-blue-300/30 hover:border-blue-200/50",
      "backdrop-blur-sm",
    ),
  };

  return (
    <button
      type="button"
      ref={buttonRef}
      className={cn(baseClasses, variantClasses[variant])}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered ? "scale(1.05)" : "scale(1)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Hover wave effect */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-blue-300/20 to-blue-400/20",
          "transform transition-transform duration-700 ease-out",
          isHovered ? "translate-y-0" : "translate-y-full",
        )}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(147, 197, 253, 0.2), transparent)",
          backgroundSize: "200% 100%",
          animation: isHovered ? "wave 2s ease-in-out infinite" : "none",
        }}
      />

      {/* Ripples */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-blue-300/40 animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Content */}
      <span className="relative z-10 px-8 py-4 text-lg font-medium">
        {children}
      </span>

      {/* Glow effect on hover */}
      <div
        className={cn(
          "absolute inset-0 rounded-full opacity-0 transition-opacity duration-300",
          "bg-gradient-to-r from-blue-400/20 to-blue-500/20 blur-xl",
          isHovered && "opacity-100",
        )}
      />

      <style jsx>{`
        @keyframes wave {
          0%, 100% { background-position: -200% 0; }
          50% { background-position: 200% 0; }
        }
        
        .animate-ripple {
          animation: ripple 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
}
