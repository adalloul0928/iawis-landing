"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CircularGallery,
  type GalleryItem,
} from "@/components/ui/circular-gallery2";
import ExpandedGallery from "@/components/ui/circular-gallery-expand";

const galleryData: GalleryItem[] = [
  {
    common: "Full View 1",
    binomial: "Image #1",
    photo: {
      url: "/full/00D548B5-6138-406E-98AD-C7D0CC99F8C1.jpeg",
      text: "Full view photograph",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Close-up View 1",
    binomial: "Image #2",
    photo: {
      url: "/closeup/322F338C-8091-4284-A730-DB5503813C21.jpeg",
      text: "Close-up photograph",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Full View 2",
    binomial: "Image #3",
    photo: {
      url: "/full/399CC86C-055F-4E28-87C4-882F4BA47C17.jpeg",
      text: "Full view photograph",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Close-up View 2",
    binomial: "Image #4",
    photo: {
      url: "/closeup/3CE40DCD-98CB-4382-9774-17E8EA63637C.jpeg",
      text: "Close-up photograph",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Full View 3",
    binomial: "Image #5",
    photo: {
      url: "/full/423D6ADB-0510-491C-95EC-F853403AA04B.jpeg",
      text: "Full view photograph",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Close-up View 3",
    binomial: "Image #6",
    photo: {
      url: "/closeup/A11347CA-89CA-437D-85F8-32E984FA34C9.jpeg",
      text: "Close-up photograph",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Full View 4",
    binomial: "Image #7",
    photo: {
      url: "/full/59C35064-0CE6-4664-AD98-39DF4DCDA78F.jpeg",
      text: "Full view photograph",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Close-up View 4",
    binomial: "Image #8",
    photo: {
      url: "/closeup/DACCFE4A-9450-4255-B5A7-06E7BAEA2A41.jpeg",
      text: "Close-up photograph",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Full View 5",
    binomial: "Image #9",
    photo: {
      url: "/full/59E311A3-103A-4F1E-9BB5-6EC119CD2555.jpeg",
      text: "Full view photograph",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Close-up View 5",
    binomial: "Image #10",
    photo: {
      url: "/closeup/EB1E3784-7462-4A22-92C3-B17B3508EC3A.jpeg",
      text: "Close-up photograph",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Full View 6",
    binomial: "Image #11",
    photo: {
      url: "/full/79274065-27DC-448F-907B-FA195C43F190.jpeg",
      text: "Full view photograph",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Close-up View 6",
    binomial: "Image #12",
    photo: {
      url: "/closeup/F3C63B3E-785D-4993-A15E-EC658CCE07E1.jpeg",
      text: "Close-up photograph",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Full View 7",
    binomial: "Image #13",
    photo: {
      url: "/full/A420B97A-E5F2-43EC-A792-37C5E35F91BC.jpeg",
      text: "Full view photograph",
      pos: "center",
      by: "Photographer",
    },
  },
  {
    common: "Close-up View 7",
    binomial: "Image #14",
    photo: {
      url: "/closeup/F97E7E43-49FA-412A-A201-24EB3820B84D.jpeg",
      text: "Close-up photograph",
      pos: "center",
      by: "Photographer",
    },
  },
];

const CircularGalleryDemo = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const handleItemClick = (item: GalleryItem, _index: number) => {
    console.log("Item clicked:", item.common);
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  return (
    // This outer container provides the scrollable height
    <div
      className="w-full bg-black text-foreground relative"
      style={{ height: "500vh" }}
    >
      {/* This inner container sticks to the top while scrolling */}
      <div className="w-full h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10">
          <Link href="/" className="cursor-pointer hover:opacity-80 transition-opacity">
            <Image 
              src="/always-wet-logo.svg" 
              alt="Always Wet Logo" 
              width={600}
              height={144}
              className="h-36 w-auto"
            />
          </Link>
        </div>
        <div className="w-full h-full">
          <CircularGallery items={galleryData} onItemClick={handleItemClick} radius={800} />
        </div>
      </div>

      {/* Expanded Gallery Modal */}
      <ExpandedGallery selectedItem={selectedItem} onClose={handleClose} />
    </div>
  );
};

export default CircularGalleryDemo;
