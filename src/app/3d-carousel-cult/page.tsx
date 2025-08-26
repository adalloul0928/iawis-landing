"use client";

import { useState } from "react";
import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel";
import { ProductModal } from "@/components/ui/product-modal";
import { products, Product } from "@/types/product";

export default function ThreeDPhotoCarouselDemo() {
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
    <div className="fixed inset-0 w-screen h-screen bg-black">
      <ThreeDPhotoCarousel 
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
