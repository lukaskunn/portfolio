import { useState, useEffect } from 'react';

interface ScrollState {
  scrollY: number;
  hasScrolled: boolean;
  scrollDirection: 'up' | 'down' | 'none';
}

/**
 * Hook to track page scroll position
 * @param threshold - The number of pixels to scroll before hasScrolled becomes true (default: 50)
 * @returns ScrollState object containing scrollY position, hasScrolled boolean, and scroll direction
 */
export const useScroll = (threshold = 50): ScrollState => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    hasScrolled: false,
    scrollDirection: 'none',
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollPosition = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : 
                        currentScrollY < lastScrollY ? 'up' : 'none';
      
      setScrollState({
        scrollY: currentScrollY,
        hasScrolled: currentScrollY > threshold,
        scrollDirection: direction,
      });
      
      lastScrollY = currentScrollY;
    };

    // Initial check
    updateScrollPosition();

    // Add event listener
    window.addEventListener('scroll', updateScrollPosition, { passive: true });

    // Clean up
    return () => {
      window.removeEventListener('scroll', updateScrollPosition);
    };
  }, [threshold]);

  return scrollState;
};

export default useScroll;