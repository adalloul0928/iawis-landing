"use client";

import { useState } from "react";
import { CoverflowFramer } from "@/components/ui/coverflow-framer";
import { ProductModal } from "@/components/ui/product-modal";
import { framerProducts, Product } from "@/types/product";

export default function CoverflowFramerPage() {
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
      <CoverflowFramer 
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