"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { GalleryItem } from "./circular-gallery-ravi";

interface AnimalModalProps {
  animal: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AnimalModal: React.FC<AnimalModalProps> = ({
  animal,
  isOpen,
  onClose,
}) => {
  if (!animal) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-[400px] md:h-[600px]">
                <Image
                  src={animal.photo.url}
                  alt={animal.photo.text}
                  fill
                  className="object-cover"
                  style={{ objectPosition: animal.photo.pos || "center" }}
                />
              </div>
              
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {animal.common}
                  </h2>
                  <p className="text-xl italic text-gray-600 dark:text-gray-400 mb-6">
                    {animal.binomial}
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Photo Details
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {animal.photo.text}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Photographer
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {animal.photo.by}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={onClose}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Close Gallery
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};