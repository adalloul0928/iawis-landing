"use client";

import { useState } from "react";
import { CoverflowSpring } from "@/components/ui/coverflow-spring";
import { ProductModal } from "@/components/ui/product-modal";
import { products, Product } from "@/types/product";

export default function CoverflowSpringPage() {
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
      <CoverflowSpring 
        products={products}
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