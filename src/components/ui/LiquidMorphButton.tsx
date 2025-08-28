"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface LiquidMorphButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary";
}

interface Blob {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export default function LiquidMorphButton({
  children,
  className,
  href,
  onClick,
  variant = "primary",
}: LiquidMorphButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  // Generate random blobs for liquid effect
  useEffect(() => {
    const newBlobs: Blob[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 20 + Math.random() * 30,
      delay: i * 0.1,
    }));
    setBlobs(newBlobs);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsClicked(true);

    // Navigate or call onClick after animation
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
      setIsClicked(false);
    }, 600);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const baseClasses = cn(
    "relative overflow-hidden font-semibold transition-all duration-500 transform",
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
        borderRadius: isHovered ? "30% 70% 70% 30% / 30% 30% 70% 70%" : "50px",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Liquid blobs */}
      {blobs.map((blob) => (
        <div
          key={blob.id}
          className="absolute rounded-full bg-blue-300/30 blur-sm"
          style={{
            left: `${blob.x}%`,
            top: `${blob.y}%`,
            width: `${blob.size}px`,
            height: `${blob.size}px`,
            transform: "translate(-50%, -50%)",
            animation: isHovered
              ? `liquidFloat 3s ease-in-out infinite ${blob.delay}s`
              : "none",
            filter: isHovered ? "blur(2px)" : "blur(1px)",
            transition: "all 0.5s ease",
          }}
        />
      ))}

      {/* Morphing border effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-full border-2 border-blue-300/50",
          "transition-all duration-700 ease-out",
        )}
        style={{
          borderRadius: isHovered
            ? "70% 30% 30% 70% / 60% 40% 60% 40%"
            : "50px",
          borderColor: isHovered
            ? "rgba(147, 197, 253, 0.8)"
            : "rgba(147, 197, 253, 0.5)",
          transform: isHovered ? "rotate(180deg)" : "rotate(0deg)",
          scale: isHovered ? 1.1 : 1,
        }}
      />

      {/* Click splash effect */}
      {isClicked && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-blue-300/40 animate-splash" />
          <div
            className="absolute inset-0 bg-blue-200/30 animate-splash-delayed"
            style={{ animationDelay: "0.1s" }}
          />
          <div
            className="absolute inset-0 bg-blue-100/20 animate-splash-delayed"
            style={{ animationDelay: "0.2s" }}
          />
        </div>
      )}

      {/* Content */}
      <span className="relative z-10 px-8 py-4 text-lg font-medium">
        {children}
      </span>

      {/* Glow effect on hover */}
      <div
        className={cn(
          "absolute inset-0 rounded-full opacity-0 transition-opacity duration-500",
          "bg-gradient-to-r from-blue-400/20 to-blue-500/20 blur-xl",
          isHovered && "opacity-100",
        )}
        style={{
          borderRadius: isHovered
            ? "30% 70% 70% 30% / 30% 30% 70% 70%"
            : "50px",
        }}
      />

      <style jsx>{`
        @keyframes liquidFloat {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0px) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translate(-50%, -50%) translateY(-10px) scale(1.1);
            opacity: 0.6;
          }
          50% {
            transform: translate(-50%, -50%) translateY(-5px) scale(0.9);
            opacity: 0.4;
          }
          75% {
            transform: translate(-50%, -50%) translateY(-15px) scale(1.2);
            opacity: 0.7;
          }
        }
        
        .animate-splash {
          animation: splash 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .animate-splash-delayed {
          animation: splash 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @keyframes splash {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
}
