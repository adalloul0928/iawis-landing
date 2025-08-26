"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { SparklesIcon } from "lucide-react"
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules"

import { Badge } from "@/components/ui/badge"
import { ProductModal } from "@/components/ui/product-modal"
import { Product } from "@/types/product"

interface CarouselProps {
  products: Product[]
  autoplayDelay?: number
  showPagination?: boolean
  showNavigation?: boolean
}

export const CardCarousel: React.FC<CarouselProps> = ({
  products,
  autoplayDelay = 1500,
  showPagination = true,
  showNavigation = true,
}) => {
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
  const css = `
  .swiper {
    width: 100%;
    padding-bottom: 50px;
  }
  
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 600px;
    height: 600px;
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }
  `
  return (
    <section className="w-full">
      <style>{css}</style>
      <div className="w-full">
        <div className="relative w-full flex items-center justify-center">
          <div className="w-full max-w-7xl">
              <Swiper
                spaceBetween={50}
                autoplay={{
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                }}
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                }}
                pagination={showPagination}
                navigation={
                  showNavigation
                    ? {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      }
                    : undefined
                }
                modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
              >
                {products.map((product, index) => (
                  <SwiperSlide key={product.id}>
                    <div 
                      className="relative size-full rounded-3xl cursor-pointer group overflow-hidden"
                      onClick={() => handleProductClick(product)}
                    >
                      <Image
                        src={product.image}
                        width={500}
                        height={500}
                        className="size-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                        alt={product.name}
                      />
                      
                      {/* Product Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 rounded-b-xl">
                        <h3 className="text-white text-xl font-bold mb-1 line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-white/90 text-lg font-semibold">
                          {product.price}
                        </p>
                        <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white/80 text-sm">
                            Click to view details
                          </p>
                        </div>
                      </div>

                      {/* Stock Status Badge */}
                      {!product.inStock && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Out of Stock
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
          </div>
        </div>
      </div>
      
      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
}
