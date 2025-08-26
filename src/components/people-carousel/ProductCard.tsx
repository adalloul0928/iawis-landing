import { useState } from "react";

interface Product {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

interface ProductCardProps {
  product: Product;
  isActive: boolean;
  isNext: boolean;
  isPrev: boolean;
}

export function ProductCard({
  product,
  isActive,
  isNext,
  isPrev,
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`
        relative w-96 h-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden
        transition-all duration-700 ease-out cursor-pointer
        ${isActive ? "ring-2 ring-gray-300 shadow-xl" : ""}
        ${isNext || isPrev ? "shadow-lg" : "shadow-md"}
      `}
    >
      {/* Product Image */}
      <div className="relative h-80 w-full overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            className={`
              w-full h-full object-cover transition-all duration-700
              ${imageLoaded ? "scale-100" : "scale-110"}
            `}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="w-20 h-20 mx-auto mb-3 bg-gray-400 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="img"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <p className="text-sm font-medium">Photo not available</p>
            </div>
          </div>
        )}

        {/* Interactive dot indicator */}
        <div className="absolute top-4 left-4">
          <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Product Information Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-white p-6 rounded-t-2xl shadow-lg">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {product.name}
          </h3>
          <p className="text-gray-600 font-medium">{product.role}</p>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Social Links */}
        {product.socialLinks && (
          <div className="flex items-center gap-3">
            {product.socialLinks.twitter && (
              <a
                href={product.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label={`${product.name}'s Twitter`}
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="img"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </a>
            )}

            {product.socialLinks.linkedin && (
              <a
                href={product.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label={`${product.name}'s LinkedIn`}
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="img"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.852-3.047-1.853 0-2.136 1.445-2.136 2.939v5.677H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </a>
            )}

            {product.socialLinks.github && (
              <a
                href={product.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label={`${product.name}'s GitHub`}
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="img"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="sr-only">GitHub</span>
              </a>
            )}
          </div>
        )}
      </div>

      {/* Hover overlay for interaction feedback */}
      <div className="absolute inset-0 bg-black opacity-0 hover:opacity-5 transition-opacity duration-300 pointer-events-none rounded-2xl" />
    </div>
  );
}
