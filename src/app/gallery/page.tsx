import CircularGallery from "@/components/ui/circular-gallery";
import { galleryData } from "@/components/ui/circular-gallery-data";

export default function GalleryPage() {
  return (
    <main className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Wildlife Gallery
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Explore the beauty of nature through this interactive circular
            gallery. Scroll to rotate the collection and hover over images to
            learn more.
          </p>
        </div>

        <CircularGallery
          items={galleryData}
          radius={300}
          autoRotateSpeed={0.01}
          className="mt-8"
        />
      </div>

      {/* Additional content to enable scrolling */}
      <div className="h-screen bg-gradient-to-t from-slate-900 to-transparent">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Scroll to Experience
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            The circular gallery above rotates as you scroll through this page.
            Each rotation reveals new perspectives of these beautiful creatures
            in their natural habitats.
          </p>
        </div>
      </div>

      <div className="h-screen bg-gradient-to-t from-purple-900 to-transparent">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Interactive Experience
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Hover over any image in the gallery to discover fascinating details
            about each species, including their scientific names and unique
            characteristics.
          </p>
        </div>
      </div>
    </main>
  );
}
