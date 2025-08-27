"use client";

import { useState } from "react";
import { CircularGallery, GalleryItem } from "@/components/ui/circular-gallery";
import { AnimalModal } from "@/components/ui/animal-modal";

const galleryData: GalleryItem[] = [
  {
    common: "Oversized Hoodie",
    binomial: "Premium Streetwear",
    photo: {
      url: "/product-images/image1.jpeg",
      text: "ultra-soft oversized hoodie ",
      pos: "50% 50%",
      by: "",
    },
  },
  {
    common: "Knit Beanie",
    binomial: "Winter Accessories",
    photo: {
      url: "/product-images/image2.jpeg",
      text: "cozy knit beanie with classic ribbed design",
      pos: "50% 50%",
      by: "",
    },
  },
  {
    common: "Cargo Sweatpants",
    binomial: "Comfort Wear",
    photo: {
      url: "/product-images/image3.jpeg",
      text: "relaxed fit cargo sweatpants with utility pockets",
      pos: "50% 50%",
      by: "",
    },
  },
  {
    common: "Denim Jacket",
    binomial: "Classic Outerwear",
    photo: {
      url: "/product-images/image4.jpeg",
      text: "vintage-inspired denim jacket with distressed details",
      pos: "50% 50%",
      by: "",
    },
  },
  {
    common: "Graphic Tee",
    binomial: "Statement Wear",
    photo: {
      url: "/product-images/image5.jpeg",
      text: "bold graphic t-shirt with artistic print design",
      pos: "50% 50%",
      by: "",
    },
  },
  {
    common: "Track Pants",
    binomial: "Athletic Wear",
    photo: {
      url: "/product-images/image6.jpeg",
      text: "performance track pants with moisture-wicking fabric",
      pos: "50% 50%",
      by: "",
    },
  },
  {
    common: "Bucket Hat",
    binomial: "Summer Accessories",
    photo: {
      url: "/product-images/image7.jpg",
      text: "trendy bucket hat with UV protection",
      pos: "50% 50%",
      by: "",
    },
  },
  {
    common: "Bomber Jacket",
    binomial: "Urban Outerwear",
    photo: {
      url: "/product-images/image8.jpg",
      text: "sleek bomber jacket with premium satin finish",
      pos: "50% 50%",
      by: "",
    },
  },
  {
    common: "Crew Neck Sweater",
    binomial: "Knitwear",
    photo: {
      url: "/product-images/image9.jpg",
      text: "luxurious crew neck sweater in merino wool",
      pos: "50% 50%",
      by: "",
    },
  },
  {
    common: "Jogger Shorts",
    binomial: "Casual Wear",
    photo: {
      url: "/product-images/image10.jpg",
      text: "comfortable jogger shorts perfect for any season",
      pos: "50% 50%",
      by: "",
    },
  },
];

const CircularGalleryDemo = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<GalleryItem | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAnimalClick = (animal: GalleryItem) => {
    setSelectedAnimal(animal);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAnimal(null);
  };

  return (
    // This outer container provides the scrollable height
    <div className="w-full bg-black text-white" style={{ height: "500vh" }}>
      {/* This inner container sticks to the top while scrolling */}
      <div className="w-full h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden">
        <div className="text-center mb-8 absolute top-16 z-10">
          <h1 className="text-4xl font-bold">Always Wet</h1>
        </div>
        <div className="w-full h-full">
          <CircularGallery
            items={galleryData}
            onItemClick={handleAnimalClick}
          />
        </div>
      </div>

      {/* Animal Modal */}
      <AnimalModal
        animal={selectedAnimal}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default CircularGalleryDemo;
