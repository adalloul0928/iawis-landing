"use client";

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ShoppingCart, Check, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/types/product';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
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
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Product Image */}
              <div className="relative bg-gray-50 rounded-l-2xl md:rounded-r-none rounded-r-2xl overflow-hidden">
                <div className="aspect-square relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="p-8 flex flex-col justify-between">
                <div>
                  {/* Stock Status */}
                  <div className="flex items-center gap-2 mb-4">
                    {product.inStock ? (
                      <>
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600 font-medium">In Stock</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-500 font-medium">Out of Stock</span>
                      </>
                    )}
                  </div>

                  {/* Product Name */}
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h2>

                  {/* Price */}
                  <div className="text-4xl font-bold text-gray-900 mb-6">
                    {product.price}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3 text-gray-600">
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  disabled={!product.inStock}
                  className={`
                    w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200
                    ${product.inStock 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-[1.02] shadow-lg hover:shadow-xl' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  <ShoppingCart className="w-6 h-6" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};