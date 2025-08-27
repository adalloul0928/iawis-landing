export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  features: string[];
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: "$299.99",
    image: "/product-images/image1.jpeg",
    description:
      "Premium wireless headphones with noise cancellation and superior sound quality.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium leather comfort",
      "Hi-Res Audio certified",
    ],
    inStock: true,
  },
  {
    id: "2",
    name: "Smart Watch",
    price: "$199.99",
    image: "/product-images/image2.jpeg",
    description:
      "Advanced fitness tracking and smart notifications in a sleek, modern design.",
    features: [
      "Heart rate monitoring",
      "GPS tracking",
      "Water resistant",
      "7-day battery life",
    ],
    inStock: true,
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    price: "$149.99",
    image: "/product-images/image3.jpeg",
    description:
      "Portable speaker with rich, room-filling sound and deep bass response.",
    features: [
      "360-degree sound",
      "Waterproof design",
      "12-hour playtime",
      "Voice assistant ready",
    ],
    inStock: true,
  },
  {
    id: "4",
    name: "Laptop Stand",
    price: "$79.99",
    image: "/product-images/image4.jpeg",
    description:
      "Ergonomic aluminum laptop stand for improved posture and better cooling.",
    features: [
      "Adjustable height",
      "Aluminum construction",
      "Universal compatibility",
      "Improved ventilation",
    ],
    inStock: false,
  },
  {
    id: "5",
    name: "Wireless Charger",
    price: "$49.99",
    image: "/product-images/image5.jpeg",
    description:
      "Fast wireless charging pad with sleek design and LED status indicator.",
    features: [
      "Fast charging",
      "LED indicator",
      "Anti-slip surface",
      "Universal Qi compatibility",
    ],
    inStock: true,
  },
  {
    id: "6",
    name: "Tablet Holder",
    price: "$34.99",
    image: "/product-images/image6.jpeg",
    description:
      "Adjustable tablet stand perfect for work, reading, and video calls.",
    features: [
      "Multi-angle adjustment",
      "Foldable design",
      "Non-slip base",
      "Supports tablets 7-13 inches",
    ],
    inStock: true,
  },
];

// Fashion products for Framer Motion coverflow (only 4 items)
export const framerProducts: Product[] = [
  {
    id: "1",
    name: "Oversized Hoodie",
    price: "$89.99",
    image: "/product-images/image1.jpeg",
    description: "ultra-soft oversized hoodie ",
    features: [
      "Premium cotton blend",
      "Oversized fit",
      "Soft interior lining",
      "Adjustable drawstring hood",
    ],
    inStock: true,
  },
  {
    id: "2",
    name: "Knit Beanie",
    price: "$24.99",
    image: "/product-images/image2.jpeg",
    description: "cozy knit beanie with ribbed design",
    features: [
      "Classic ribbed design",
      "Warm knit material",
      "One size fits all",
      "Multiple color options",
    ],
    inStock: true,
  },
  {
    id: "3",
    name: "Cargo Sweatpants",
    price: "$64.99",
    image: "/product-images/image3.jpeg",
    description: "relaxed fit cargo sweatpants",
    features: [
      "Relaxed fit",
      "Multiple utility pockets",
      "Elastic waistband",
      "Durable fabric",
    ],
    inStock: true,
  },
  {
    id: "4",
    name: "Denim Jacket",
    price: "$119.99",
    image: "/product-images/image4.jpeg",
    description: "vintage-inspired denim jacket ",
    features: [
      "Vintage-inspired design",
      "Distressed details",
      "Classic denim construction",
      "Multiple pockets",
    ],
    inStock: false,
  },
];

// Gallery-style fashion products for card-carousel-reuno
export const cardCarouselProducts: Product[] = [
  {
    id: "1",
    name: "Oversized Hoodie",
    price: "Premium Streetwear",
    image: "/product-images/image1.jpeg",
    description: "ultra-soft oversized hoodie with premium cotton blend",
    features: [
      "Premium cotton blend",
      "Oversized fit",
      "Soft interior lining",
      "Adjustable drawstring hood",
    ],
    inStock: true,
  },
  {
    id: "2",
    name: "Knit Beanie",
    price: "Winter Accessories",
    image: "/product-images/image2.jpeg",
    description: "cozy knit beanie with classic ribbed design",
    features: [
      "Classic ribbed design",
      "Warm knit material",
      "One size fits all",
      "Multiple color options",
    ],
    inStock: true,
  },
  {
    id: "3",
    name: "Cargo Sweatpants",
    price: "Comfort Wear",
    image: "/product-images/image3.jpeg",
    description: "relaxed fit cargo sweatpants with utility pockets",
    features: [
      "Relaxed fit",
      "Multiple utility pockets",
      "Elastic waistband",
      "Durable fabric",
    ],
    inStock: true,
  },
  {
    id: "4",
    name: "Denim Jacket",
    price: "Classic Outerwear",
    image: "/product-images/image4.jpeg",
    description: "vintage-inspired denim jacket with distressed details",
    features: [
      "Vintage-inspired design",
      "Distressed details",
      "Classic denim construction",
      "Multiple pockets",
    ],
    inStock: false,
  },
  {
    id: "5",
    name: "Graphic Tee",
    price: "Statement Wear",
    image: "/product-images/image5.jpeg",
    description: "bold graphic t-shirt with artistic print design",
    features: [
      "Bold graphic design",
      "Soft cotton fabric",
      "Regular fit",
      "Screen printed graphics",
    ],
    inStock: true,
  },
  {
    id: "6",
    name: "Track Pants",
    price: "Athletic Wear",
    image: "/product-images/image6.jpeg",
    description: "performance track pants with moisture-wicking fabric",
    features: [
      "Moisture-wicking fabric",
      "Elastic waistband",
      "Tapered fit",
      "Side pockets",
    ],
    inStock: true,
  },
  {
    id: "7",
    name: "Bucket Hat",
    price: "Summer Accessories",
    image: "/product-images/image1.jpeg",
    description: "trendy bucket hat with UV protection",
    features: [
      "UV protection",
      "Lightweight fabric",
      "Adjustable fit",
      "Trendy design",
    ],
    inStock: true,
  },
  {
    id: "8",
    name: "Bomber Jacket",
    price: "Urban Outerwear",
    image: "/product-images/image2.jpeg",
    description: "sleek bomber jacket with premium satin finish",
    features: [
      "Premium satin finish",
      "Ribbed cuffs and hem",
      "Front zip closure",
      "Multiple pockets",
    ],
    inStock: true,
  },
];
