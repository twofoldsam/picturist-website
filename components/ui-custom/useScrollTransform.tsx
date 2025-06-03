
import { useState, useEffect } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

interface ScrollTransformOptions {
  threshold?: number;
  maxScroll?: number;
  initialValue?: number;
  maxValue?: number;
  minValue?: number;
  reverse?: boolean;
}

export const useScrollTransform = (
  options: ScrollTransformOptions = {}
) => {
  const {
    threshold = 0,
    maxScroll = 100,
    initialValue = 0,
    maxValue = 1,
    minValue = 0,
    reverse = false,
  } = options;
  
  const [isOverThreshold, setIsOverThreshold] = useState(false);
  const { scrollY } = useScroll();
  
  // Create transform values based on scroll position
  const transformValue = useTransform(
    scrollY,
    [threshold, maxScroll],
    reverse ? [maxValue, minValue] : [minValue, maxValue]
  );

  // Track if we've scrolled past the threshold
  useEffect(() => {
    const checkThreshold = () => {
      setIsOverThreshold(window.scrollY > threshold);
    };
    
    window.addEventListener("scroll", checkThreshold);
    checkThreshold(); // Check initial state
    
    return () => window.removeEventListener("scroll", checkThreshold);
  }, [threshold]);

  return {
    isOverThreshold,
    transformValue,
    scrollY,
  };
};
