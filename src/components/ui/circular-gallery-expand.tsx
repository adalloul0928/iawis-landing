"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { GalleryItem } from './circular-gallery2';

interface ExpandedGalleryProps {
  selectedItem: GalleryItem | null;
  onClose: () => void;
}

export function ExpandedGallery({ selectedItem, onClose }: ExpandedGalleryProps) {
  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedItem, onClose]);

  if (!selectedItem || typeof window === 'undefined') return null;

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
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
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
          transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 30 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M12.728 3.272a1 1 0 0 0-1.414 0L8 6.586 4.686 3.272a1 1 0 1 0-1.414 1.414L6.586 8l-3.314 3.314a1 1 0 0 0 1.414 1.414L8 9.414l3.314 3.314a1 1 0 0 0 1.414-1.414L9.414 8l3.314-3.314a1 1 0 0 0 0-1.414z"/>
          </svg>
        </motion.button>

        {/* Main Content */}
        <motion.div
          className="relative max-w-[85vw] max-h-[85vh] w-auto mx-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.5 
          }}
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
            {/* Image Container */}
            <div className="relative">
              <img
                src={selectedItem.photo.url}
                alt={selectedItem.photo.text}
                className="max-w-[85vw] h-auto object-contain max-h-[60vh] rounded-t-2xl block"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Content Panel */}
            <motion.div
              className="p-6 bg-gradient-to-t from-white/15 to-white/5"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 30 }}
            >
              <div className="grid md:grid-cols-3 gap-4">
                {/* Title and Scientific Name */}
                <div className="md:col-span-2 space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {selectedItem.common}
                  </h2>
                  <p className="text-lg md:text-xl text-white/70 italic">
                    {selectedItem.binomial}
                  </p>
                  {selectedItem.photo.text && (
                    <p className="text-white/80 leading-relaxed mt-3">
                      {selectedItem.photo.text}
                    </p>
                  )}
                </div>
                
                {/* Metadata */}
                <div className="space-y-3">
                  <div className="bg-white/10 rounded-lg p-3 border border-white/10">
                    <div className="flex items-center gap-2 text-white/70">
                      <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM1.5 8a6.5 6.5 0 1 1 13 0A6.5 6.5 0 0 1 1.5 8z"/>
                          <path d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.252.434l-2.5 1.5a.5.5 0 1 1-.496-.868L8 7.354V4a.5.5 0 0 1 .5-.5z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">Photography</div>
                        <div className="text-xs">by {selectedItem.photo.by}</div>
                      </div>
                    </div>
                  </div>
                  
                  {selectedItem.photo.pos && (
                    <div className="bg-white/10 rounded-lg p-3 border border-white/10">
                      <div className="flex items-center gap-2 text-white/70">
                        <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">Location</div>
                          <div className="text-xs">{selectedItem.photo.pos}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Instruction */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/50 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 15a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
          <span>Click outside or press ESC to close</span>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

export default ExpandedGallery;