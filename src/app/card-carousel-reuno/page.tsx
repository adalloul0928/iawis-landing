"use client";

import { CardCarousel } from "@/components/ui/card-carousel";
import { products } from "@/types/product";

export default function CardCarouselReunoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-100 via-white to-neutral-200">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Card Carousel
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Elegant Swiper-based carousel with coverflow effect and smooth
            autoplay
          </p>
        </div>

        <div className="relative">
          <CardCarousel
            products={products}
            autoplayDelay={2000}
            showPagination={true}
            showNavigation={true}
          />
        </div>
      </div>
    </div>
  );
}
