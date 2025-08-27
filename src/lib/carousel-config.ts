import { useState, useEffect } from "react";

// Standard card dimensions for all carousels
export const CARD_DIMENSIONS = {
  desktop: { width: 600, height: 800 },
  tablet: { width: 450, height: 600 },
  mobile: { width: 300, height: 400 }
} as const;

// Breakpoints for responsive behavior
export const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
  desktop: 1280
} as const;

// Calculate responsive dimensions based on viewport width and height
export function getResponsiveCardDimensions(viewportWidth: number, viewportHeight?: number) {
  const vh = viewportHeight || (typeof window !== 'undefined' ? window.innerHeight : 900);
  
  // Apply breakpoint-specific adjustments
  if (viewportWidth <= BREAKPOINTS.mobile) {
    // Mobile: use smaller base and limit scaling
    const scale = Math.max(0.7, Math.min(viewportWidth / 640, 1.0));
    return {
      width: Math.round(CARD_DIMENSIONS.mobile.width * scale),
      height: Math.round(CARD_DIMENSIONS.mobile.height * scale)
    };
  } else if (viewportWidth <= BREAKPOINTS.tablet) {
    // Tablet: smooth transition between mobile and desktop
    const scale = Math.max(0.8, Math.min(viewportWidth / 1024, 1.1));
    return {
      width: Math.round(CARD_DIMENSIONS.tablet.width * scale),
      height: Math.round(CARD_DIMENSIONS.tablet.height * scale)
    };
  } else {
    // Desktop: consider both width AND height constraints
    // Calculate maximum dimensions that fit viewport
    const maxCardWidth = Math.min(
      viewportWidth * 0.4,  // Max 40% of viewport width (for 2-3 cards visible)
      (vh - 100) * 0.75     // Maintain aspect ratio based on height
    );
    const maxCardHeight = vh - 100; // Leave space for UI elements
    
    // Calculate scale to fit both constraints
    const widthScale = maxCardWidth / CARD_DIMENSIONS.desktop.width;
    const heightScale = maxCardHeight / CARD_DIMENSIONS.desktop.height;
    const scale = Math.min(widthScale, heightScale, 1.0); // Cap at 1.0
    
    return {
      width: Math.round(CARD_DIMENSIONS.desktop.width * scale),
      height: Math.round(CARD_DIMENSIONS.desktop.height * scale)
    };
  }
}

// Hook to get current responsive dimensions
export function useResponsiveCardDimensions() {
  const [dimensions, setDimensions] = useState(() => {
    // SSR-safe initialization with smaller defaults
    if (typeof window === 'undefined') {
      return { width: 400, height: 533 };
    }
    return getResponsiveCardDimensions(window.innerWidth, window.innerHeight);
  });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions(getResponsiveCardDimensions(window.innerWidth, window.innerHeight));
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return dimensions;
}

// Get spacing values that scale with card size
export function getResponsiveSpacing(cardWidth: number) {
  // Base spacing is proportional to card width
  const baseSpacing = Math.max(20, Math.min(cardWidth * 0.08, 60));
  
  return {
    small: Math.round(baseSpacing * 0.5),
    medium: Math.round(baseSpacing),
    large: Math.round(baseSpacing * 1.5)
  };
}

// Get specialized dimensions for circular gallery
export function getCircularGalleryCardDimensions(viewportWidth: number, viewportHeight?: number) {
  const vh = viewportHeight || (typeof window === 'undefined' ? window.innerHeight : 900);
  
  // Base dimensions specifically for circular gallery (smaller than standard)
  const baseDimensions = {
    desktop: { width: 300, height: 400 },  // Half of standard size
    tablet: { width: 250, height: 333 },
    mobile: { width: 200, height: 267 }
  };
  
  // Apply breakpoint-specific adjustments
  if (viewportWidth <= BREAKPOINTS.mobile) {
    const scale = Math.max(0.6, Math.min(viewportWidth / 640, 0.9));
    return {
      width: Math.round(baseDimensions.mobile.width * scale),
      height: Math.round(baseDimensions.mobile.height * scale)
    };
  } else if (viewportWidth <= BREAKPOINTS.tablet) {
    const scale = Math.max(0.7, Math.min(viewportWidth / 1024, 1.0));
    return {
      width: Math.round(baseDimensions.tablet.width * scale),
      height: Math.round(baseDimensions.tablet.height * scale)
    };
  } else {
    // Desktop: ensure cards fit in circular arrangement on screen
    const is13InchScreen = viewportWidth <= 1440 && vh <= 900;
    
    if (is13InchScreen) {
      // Further reduce for 13" screens
      const maxWidth = Math.min(200, viewportWidth * 0.14);  // Max 14% of viewport width
      const maxHeight = Math.min(267, vh * 0.3);             // Max 30% of viewport height
      const scale = Math.min(maxWidth / baseDimensions.desktop.width, maxHeight / baseDimensions.desktop.height);
      
      return {
        width: Math.round(baseDimensions.desktop.width * scale),
        height: Math.round(baseDimensions.desktop.height * scale)
      };
    } else {
      // Regular desktop - make cards 1.3x bigger
      const enlargedDimensions = {
        width: baseDimensions.desktop.width * 1.3,
        height: baseDimensions.desktop.height * 1.3
      };
      
      const maxWidth = Math.min(viewportWidth * 0.26, enlargedDimensions.width); // Increased from 0.2 to accommodate larger cards
      const maxHeight = Math.min(vh * 0.52, enlargedDimensions.height); // Increased from 0.4 to accommodate larger cards
      const scale = Math.min(maxWidth / enlargedDimensions.width, maxHeight / enlargedDimensions.height, 1.0);
      
      return {
        width: Math.round(enlargedDimensions.width * scale),
        height: Math.round(enlargedDimensions.height * scale)
      };
    }
  }
}

// Hook for circular gallery specific dimensions
export function useCircularGalleryCardDimensions() {
  const [dimensions, setDimensions] = useState(() => {
    // SSR-safe initialization with smaller defaults
    if (typeof window === 'undefined') {
      return { width: 200, height: 267 };
    }
    return getCircularGalleryCardDimensions(window.innerWidth, window.innerHeight);
  });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions(getCircularGalleryCardDimensions(window.innerWidth, window.innerHeight));
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return dimensions;
}

// Get container dimensions for different carousel types
export function getCarouselContainerDimensions(cardDimensions: { width: number; height: number }, type: 'coverflow' | 'carousel' | 'gallery' | 'selector' = 'coverflow') {
  const { width: cardWidth, height: cardHeight } = cardDimensions;
  
  switch (type) {
    case 'coverflow':
      return {
        width: cardWidth * 3, // Space for 3 cards side by side
        height: cardHeight * 1.2 // Extra space for perspective
      };
    case 'carousel':
      return {
        width: '100%', // Full width
        height: cardHeight * 1.1 // Slight padding
      };
    case 'gallery':
      return {
        width: cardWidth * 4, // Circular needs more space
        height: cardHeight * 3 // Account for circular arrangement
      };
    case 'selector':
      return {
        width: '90vw', // Responsive width
        height: Math.max(400, cardHeight * 0.8) // Proportional but with minimum
      };
    default:
      return {
        width: cardWidth * 2,
        height: cardHeight * 1.2
      };
  }
}