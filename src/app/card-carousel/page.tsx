"use client";

import { CardCarousel } from "@/components/ui/card-carousel";
import { cardCarouselProducts } from "@/types/product";

export default function CardCarouselReunoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-100 via-white to-neutral-200">
      <div className="w-full px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Always Wet</h1>
        </div>

        <div className="w-full">
          <CardCarousel
            products={cardCarouselProducts}
            autoplayDelay={4000}
            showPagination={true}
            showNavigation={true}
          />
        </div>
      </div>
    </div>
  );
}
