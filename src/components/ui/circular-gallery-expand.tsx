"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import Image from "next/image";
import { GalleryItem } from "./circular-gallery2";

interface ExpandedGalleryProps {
  selectedItem: GalleryItem | null;
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ExpandedGallery({
  selectedItem,
  items,
  currentIndex,
  onClose,
  onNavigate,
}: ExpandedGalleryProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        const newIndex = Math.max(0, currentIndex - 1);
        onNavigate(newIndex);
      } else if (e.key === "ArrowRight") {
        const newIndex = Math.min(items.length - 1, currentIndex + 1);
        onNavigate(newIndex);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedItem, onClose, currentIndex, items.length, onNavigate]);

  if (!selectedItem || typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence mode="wait">
      <motion.div
        key="expansion-overlay"
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Close Button */}
        <motion.button
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
            role="img"
          >
            <path d="M12.728 3.272a1 1 0 0 0-1.414 0L8 6.586 4.686 3.272a1 1 0 1 0-1.414 1.414L6.586 8l-3.314 3.314a1 1 0 0 0 1.414 1.414L8 9.414l3.314 3.314a1 1 0 0 0 1.414-1.414L9.414 8l3.314-3.314a1 1 0 0 0 0-1.414z" />
          </svg>
        </motion.button>

        {/* Main Content */}
        <motion.div
          key={currentIndex}
          className="relative max-w-[85vw] max-h-[85vh] w-auto mx-auto will-change-transform md:pointer-events-none"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, { offset, velocity }) => {
            const swipeThreshold = 50;
            const velocityThreshold = 500;

            // Check for swipe gesture on mobile only
            if (window.innerWidth <= 768) {
              if (offset.x > swipeThreshold || velocity.x > velocityThreshold) {
                // Swipe right - go to previous
                const newIndex = Math.max(0, currentIndex - 1);
                onNavigate(newIndex);
              } else if (
                offset.x < -swipeThreshold ||
                velocity.x < -velocityThreshold
              ) {
                // Swipe left - go to next
                const newIndex = Math.min(items.length - 1, currentIndex + 1);
                onNavigate(newIndex);
              }
            }
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 25,
          }}
        >
          <div className="bg-white/1 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/3 shadow-2xl">
            {/* Image Container with Overlaid Text */}
            <div className="relative">
              <div className="relative w-full" style={{ aspectRatio: "auto" }}>
                <Image
                  src={selectedItem.photo.url}
                  alt={selectedItem.photo.text}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover max-h-[75vh] rounded-2xl"
                  draggable={false}
                  quality={95}
                  priority={true}
                  loading="eager"
                  sizes="(max-width: 768px) 85vw, 800px"
                />
              </div>

              {/* Subtle gradient for text contrast */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

              {/* Glass overlay for text - conditional layout */}
              <motion.div
                className={`absolute bottom-0 left-0 right-0 rounded-2xl ${
                  isMobile ? "m-2 py-2 px-3" : "m-4 px-4 py-2"
                }`}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                  boxShadow:
                    "0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
                }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.1,
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              >
                {isMobile ? (
                  /* Single-line layout for all mobile views */
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <h2
                        className="text-lg font-medium text-white/95 tracking-tight flex-shrink-0"
                        style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)" }}
                      >
                        {selectedItem.common}
                      </h2>
                      {selectedItem.photo.text && (
                        <>
                          <span className="text-white/70 flex-shrink-0">•</span>
                          <p
                            className="text-sm text-white/85 font-semibold truncate"
                            style={{
                              textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
                            }}
                          >
                            {selectedItem.photo.text}
                          </p>
                        </>
                      )}
                    </div>
                    <div
                      className="text-lg font-medium text-white/95 flex-shrink-0"
                      style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)" }}
                    >
                      ${selectedItem.price}
                    </div>
                  </div>
                ) : (
                  /* Two-line layout for desktop */
                  <div className="space-y-1">
                    {/* Title and Price Row */}
                    <div className="flex items-center justify-between gap-4">
                      <h2
                        className="text-xl md:text-2xl font-medium text-white/95 tracking-tight"
                        style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)" }}
                      >
                        {selectedItem.common}
                      </h2>
                      <div
                        className="text-xl md:text-2xl font-medium text-white/95"
                        style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)" }}
                      >
                        ${selectedItem.price}
                      </div>
                    </div>

                    {/* Description */}
                    {selectedItem.photo.text && (
                      <p
                        className="text-sm md:text-base text-white/85 leading-relaxed font-normal"
                        style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)" }}
                      >
                        {selectedItem.photo.text}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

export default ExpandedGallery;
