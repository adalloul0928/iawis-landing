"use client";

import { useState } from "react";
import { CoverflowClean } from "@/components/ui/coverflow-clean";
import { ProductModal } from "@/components/ui/product-modal";
import { framerProducts, Product } from "@/types/product";

export default function CoverflowCleanPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="relative">
      <CoverflowClean 
        products={framerProducts}
        onProductClick={handleProductClick}
      />
      
      <ProductModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}