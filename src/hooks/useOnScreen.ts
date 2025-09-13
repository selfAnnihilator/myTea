import { useState, useEffect } from 'react';
import type { RefObject } from 'react';

export const useOnScreen = <T extends Element,>(ref: RefObject<T>, options: IntersectionObserverInit = { threshold: 0.1 }): boolean => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Set state based on whether the element is intersecting or not.
      // This will trigger the animation on scroll up and down.
      setIntersecting(entry.isIntersecting);
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return isIntersecting;
};
