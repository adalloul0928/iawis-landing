"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { SparklesIcon } from "lucide-react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";

import { Badge } from "@/components/ui/badge";
import { ProductModal } from "@/components/ui/product-modal";
import { Product } from "@/types/product";

interface CarouselProps {
  products: Product[];
  autoplayDelay?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
}

export const CardCarousel: React.FC<CarouselProps> = ({
  products,
  autoplayDelay = 1500,
  showPagination = true,
  showNavigation = true,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [spaceBetween, setSpaceBetween] = useState(30);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  React.useEffect(() => {
    const updateSpacing = () => {
      setSpaceBetween(window.innerWidth < 640 ? 30 : 50);
    };

    updateSpacing();
    window.addEventListener('resize', updateSpacing);
    return () => window.removeEventListener('resize', updateSpacing);
  }, []);
  const css = `
  .swiper {
    width: 100%;
    padding-bottom: 50px;
  }
  
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 350px;
    height: 500px;
  }
  
  @media (min-width: 640px) {
    .swiper-slide {
      width: 600px;
      height: 900px;
    }
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
  `;
  return (
    <section className="w-full">
      <style>{css}</style>
      <div className="w-full">
        <div className="relative w-full flex items-center justify-center">
          <div className="w-full max-w-none px-4 sm:px-16">
            <Swiper
              onSwiper={setSwiperInstance}
              spaceBetween={spaceBetween}
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
                modifier: 1.5,
              }}
              pagination={showPagination}
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
                      width={350}
                      height={500}
                      sizes="(max-width: 640px) 350px, 600px"
                      className="size-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                      alt={product.name}
                    />

                    {/* Product Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-8 rounded-b-xl">
                      <div className="mb-2 sm:mb-8">
                        <h3 className="text-white text-sm sm:text-2xl font-bold mb-1 sm:mb-2 line-clamp-1 leading-tight">
                          {product.name}
                        </h3>
                        <p className="text-white/90 text-sm sm:text-xl font-semibold">
                          {product.price}
                        </p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                        <p className="text-white/80 text-sm">
                          Click to view details
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 p-2 sm:p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm border border-gray-200/50 z-30"
        onClick={() => swiperInstance?.slidePrev()}
        aria-label="Previous slide"
      >
        <svg
          className="w-4 h-4 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        type="button"
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 p-2 sm:p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm border border-gray-200/50 z-30"
        onClick={() => swiperInstance?.slideNext()}
        aria-label="Next slide"
      >
        <svg
          className="w-4 h-4 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};
