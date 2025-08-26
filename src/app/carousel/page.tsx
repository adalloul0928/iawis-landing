import { ProductCarousel } from "@/components/carousel/ProductCarousel";

export default function CarouselPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Product Showcase
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our innovative products in an immersive 3D experience
          </p>
        </div>

        <ProductCarousel />
      </div>
    </div>
  );
}



