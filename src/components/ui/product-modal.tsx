"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check, AlertCircle } from "lucide-react";
import Image from "next/image";
import { Product } from "@/types/product";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110 border border-white/30"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>

            <div className="grid md:grid-cols-2 gap-0 h-full">
              {/* Product Image */}
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <div className="aspect-square relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              </div>

              {/* Product Details */}
              <div className="p-10 flex flex-col justify-between bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm">
                <div>
                  {/* Product Name */}
                  <h2 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                    {product.name}
                  </h2>

                  {/* Price */}
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
                    {product.price}
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 text-xl leading-relaxed mb-10 font-light">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="mb-0">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Key Features
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {product.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-3 bg-white/60 rounded-xl backdrop-blur-sm border border-white/40"
                        >
                          <div className="w-3 h-3 rounded-full flex-shrink-0 bg-black" />
                          <span className="text-gray-700 font-medium">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
