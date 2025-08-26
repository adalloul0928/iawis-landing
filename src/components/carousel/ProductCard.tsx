import { useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  isActive: boolean;
}

export function ProductCard({ product, isActive }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Fallback image if the product image fails to load
  const fallbackImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='system-ui' font-size='16'%3E%3Ctspan x='50%25' dy='-0.5em'%3E%3C/tspan%3E%3Ctspan x='50%25' dy='1.2em'%3E%3C/tspan%3E%3C/text%3E%3C/svg%3E";

  return (
    <div
      className={`
        relative w-80 h-96 bg-gradient-to-br from-slate-800 to-slate-900 
        rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden
        transition-all duration-500 ease-out cursor-pointer
        hover:scale-105 hover:shadow-cyan-500/20
        ${isActive ? "ring-2 ring-cyan-400/50 shadow-cyan-400/30" : ""}
      `}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />

      {/* Image container */}
      <div className="relative h-48 w-full overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            className={`
              w-full h-full object-cover transition-all duration-700
              ${imageLoaded ? "scale-100" : "scale-110 blur-sm"}
            `}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-slate-700 flex items-center justify-center">
            <div className="text-center text-slate-400">
              <div className="w-16 h-16 mx-auto mb-2 bg-slate-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="img"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-sm">Image not available</p>
            </div>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-cyan-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
            {product.category}
          </span>
        </div>

        {/* Price badge */}
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 bg-emerald-500/90 text-white text-sm font-bold rounded-full backdrop-blur-sm">
            {product.price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
          {product.description}
        </p>

        {/* Action button */}
        <button
          type="button"
          className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          Learn More
        </button>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}
