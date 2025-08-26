import { PeopleCarousel } from "@/components/people-carousel/PeopleCarousel";

export default function PeopleCarouselPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Product Showcase
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our premium products in an elegant 3D carousel experience
          </p>
        </div>

        <PeopleCarousel />
      </div>
    </div>
  );
}
