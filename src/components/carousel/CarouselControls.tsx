interface CarouselControlsProps {
  currentIndex: number;
  totalProducts: number;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (index: number) => void;
  isAutoRotating: boolean;
  onToggleAutoRotate: () => void;
}

export function CarouselControls({
  currentIndex,
  totalProducts,
  onNext,
  onPrev,
  onGoTo,
  isAutoRotating,
  onToggleAutoRotate,
}: CarouselControlsProps) {
  return (
    <div className="flex flex-col items-center gap-6 mt-8">
      {/* Navigation buttons */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onPrev}
          className="w-12 h-12 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/50 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/25"
          aria-label="Previous product"
        >
          <svg
            className="w-5 h-5"
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
          onClick={onToggleAutoRotate}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-lg
            ${
              isAutoRotating
                ? "bg-cyan-500/80 hover:bg-cyan-600/80 border border-cyan-400/50 hover:shadow-cyan-500/25"
                : "bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/50"
            }
          `}
          aria-label={
            isAutoRotating ? "Pause auto-rotation" : "Start auto-rotation"
          }
        >
          {isAutoRotating ? (
            <svg
              className="w-5 h-5"
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
              className="w-5 h-5"
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
          className="w-12 h-12 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/50 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/25"
          aria-label="Next product"
        >
          <svg
            className="w-5 h-5"
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

      {/* Product indicators */}
      <div className="flex items-center gap-3">
        {Array.from({ length: totalProducts }, (_, index) => (
          <button
            key={`indicator-${index}`}
            type="button"
            onClick={() => onGoTo(index)}
            className={`
              w-3 h-3 rounded-full transition-all duration-300 hover:scale-125
              ${
                index === currentIndex
                  ? "bg-cyan-400 shadow-lg shadow-cyan-400/50"
                  : "bg-slate-600 hover:bg-slate-500"
              }
            `}
            aria-label={`Go to product ${index + 1}`}
            aria-current={index === currentIndex ? "true" : "false"}
          />
        ))}
      </div>

      {/* Product counter */}
      <div className="text-center text-slate-400">
        <span className="text-sm font-medium">
          {currentIndex + 1} of {totalProducts}
        </span>
      </div>
    </div>
  );
}
