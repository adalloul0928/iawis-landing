interface ProductCarouselControlsProps {
  currentIndex: number;
  totalProducts: number;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (index: number) => void;
  isAutoRotating: boolean;
  onToggleAutoRotating: () => void;
}

export function ProductCarouselControls({
  currentIndex,
  totalProducts,
  onNext,
  onPrev,
  onGoTo,
  isAutoRotating,
  onToggleAutoRotating,
}: ProductCarouselControlsProps) {
  return (
    <div className="flex flex-col items-center gap-6 mt-8">
      {/* Navigation buttons */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onPrev}
          className="w-14 h-14 bg-white hover:bg-gray-50 border border-gray-300 rounded-full flex items-center justify-center text-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-lg"
          aria-label="Previous person"
        >
          <svg
            className="w-6 h-6"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={onToggleAutoRotating}
          className={`
            w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-lg
            ${
              isAutoRotating
                ? "bg-blue-500 hover:bg-blue-600 border border-blue-400"
                : "bg-gray-500 hover:bg-gray-600 border border-gray-400"
            }
          `}
          aria-label={
            isAutoRotating ? "Pause auto-rotation" : "Start auto-rotation"
          }
        >
          {isAutoRotating ? (
            <svg
              className="w-6 h-6"
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
                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
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
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </button>

        <button
          type="button"
          onClick={onNext}
          className="w-14 h-14 bg-white hover:bg-gray-50 border border-gray-300 rounded-full flex items-center justify-center text-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-lg"
          aria-label="Next person"
        >
          <svg
            className="w-6 h-6"
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Person indicators */}
      <div className="flex items-center gap-3">
        {Array.from({ length: totalProducts }, (_, index) => (
          <button
            key={`indicator-${index}`}
            type="button"
            onClick={() => onGoTo(index)}
            className={`
              w-4 h-4 rounded-full transition-all duration-300 hover:scale-125
              ${
                index === currentIndex
                  ? "bg-blue-500 shadow-lg shadow-blue-500/50"
                  : "bg-gray-300 hover:bg-gray-400"
              }
            `}
            aria-label={`Go to person ${index + 1}`}
            aria-current={index === currentIndex ? "true" : "false"}
          />
        ))}
      </div>

      {/* Product counter */}
      <div className="text-center text-gray-600">
        <span className="text-sm font-medium">
          {currentIndex + 1} of {totalProducts}
        </span>
      </div>
    </div>
  );
}
