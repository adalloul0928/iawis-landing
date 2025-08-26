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
    description: "Premium wireless headphones with noise cancellation and superior sound quality.",
    features: ["Active Noise Cancellation", "30-hour battery life", "Premium leather comfort", "Hi-Res Audio certified"],
    inStock: true
  },
  {
    id: "2", 
    name: "Smart Watch",
    price: "$199.99",
    image: "/product-images/image2.jpeg",
    description: "Advanced fitness tracking and smart notifications in a sleek, modern design.",
    features: ["Heart rate monitoring", "GPS tracking", "Water resistant", "7-day battery life"],
    inStock: true
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    price: "$149.99",
    image: "/product-images/image3.jpeg",
    description: "Portable speaker with rich, room-filling sound and deep bass response.",
    features: ["360-degree sound", "Waterproof design", "12-hour playtime", "Voice assistant ready"],
    inStock: true
  },
  {
    id: "4",
    name: "Laptop Stand",
    price: "$79.99",
    image: "/product-images/image4.jpeg", 
    description: "Ergonomic aluminum laptop stand for improved posture and better cooling.",
    features: ["Adjustable height", "Aluminum construction", "Universal compatibility", "Improved ventilation"],
    inStock: false
  },
  {
    id: "5",
    name: "Wireless Charger",
    price: "$49.99",
    image: "/product-images/image5.jpeg",
    description: "Fast wireless charging pad with sleek design and LED status indicator.",
    features: ["Fast charging", "LED indicator", "Anti-slip surface", "Universal Qi compatibility"],
    inStock: true
  },
  {
    id: "6",
    name: "Tablet Holder",
    price: "$34.99",
    image: "/product-images/image6.jpeg",
    description: "Adjustable tablet stand perfect for work, reading, and video calls.",
    features: ["Multi-angle adjustment", "Foldable design", "Non-slip base", "Supports tablets 7-13 inches"],
    inStock: true
  }
];

// Subset of products for Framer Motion coverflow (only 4 items)
export const framerProducts: Product[] = products.slice(0, 4);