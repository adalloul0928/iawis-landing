"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import Image from "next/image";
import { GalleryItem } from "./circular-gallery2";

interface ExpandedGalleryProps {
  selectedItem: GalleryItem | null;
  onClose: () => void;
}

export function ExpandedGallery({
  selectedItem,
  onClose,
}: ExpandedGalleryProps) {
  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedItem, onClose]);

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
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
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
          className="relative max-w-[85vw] max-h-[85vh] w-auto mx-auto will-change-transform"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 25,
          }}
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
            {/* Image Container */}
            <div className="relative">
              <div className="relative w-full" style={{ aspectRatio: "auto" }}>
                <Image
                  src={selectedItem.photo.url}
                  alt={selectedItem.photo.text}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover max-h-[60vh] rounded-t-2xl"
                  draggable={false}
                  quality={95}
                  priority={true}
                  loading="eager"
                  sizes="(max-width: 768px) 85vw, 800px"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Content Panel - Apple-like design */}
            <motion.div
              className="px-6 py-5 bg-white/[0.02] backdrop-blur-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.1), 0 -1px 0 rgba(255,255,255,0.05)",
                borderTop: "1px solid rgba(255,255,255,0.08)",
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
              {/* Mobile layout: title/desc on left, price on right */}
              <div className="flex items-start justify-between md:grid md:grid-cols-3 gap-4">
                {/* Title and Description */}
                <div className="flex-1 md:col-span-2 space-y-1">
                  <h2 className="text-xl md:text-2xl font-medium text-white/95 tracking-tight">
                    {selectedItem.common}
                  </h2>
                  {selectedItem.photo.text && (
                    <p className="text-sm md:text-base text-white/65 leading-relaxed font-light">
                      {selectedItem.photo.text}
                    </p>
                  )}
                </div>

                {/* Price - right side on mobile, separate column on desktop */}
                <div className="flex-shrink-0 md:col-span-1 flex md:justify-center">
                  <div className="text-xl md:text-2xl font-medium text-white/95">
                    $69.69
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Mobile swipe instruction */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/50 text-sm md:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
            role="img"
          >
            <path d="M8 15a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
          <span>Swipe down to close</span>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

export default ExpandedGallery;
