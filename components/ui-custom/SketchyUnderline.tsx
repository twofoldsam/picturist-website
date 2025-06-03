import React from "react";
import { motion } from "framer-motion";

interface SketchyUnderlineProps {
  color?: string;
  height?: number;
  className?: string;
  animate?: boolean;
}

export const SketchyUnderline: React.FC<SketchyUnderlineProps> = ({
  color = "#B8860B", // Gold color as default
  height = 8, 
  className = "",
  animate = true
}) => {
  // SVG path for a sketchy, hand-drawn underline
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.2 }
      }
    }
  };

  return (
    <div className={`absolute bottom-0 left-0 w-full ${className}`} style={{ height: `${height}px` }}>
      {animate ? (
        <motion.svg
          viewBox="0 0 300 10"
          className="w-full h-full overflow-visible"
          initial="hidden"
          animate="visible"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,5 C20,7 40,3 60,5 C80,7 100,3 120,5 C140,7 160,3 180,5 C200,7 220,3 240,5 C260,7 280,3 300,5"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            variants={pathVariants}
          />
          <motion.path
            d="M8,8 C28,6 48,10 68,8 C88,6 108,10 128,8 C148,6 168,10 188,8 C208,6 228,10 248,8 C268,6 288,10 298,8"
            fill="none"
            stroke={color}
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="1,3"
            variants={pathVariants}
          />
        </motion.svg>
      ) : (
        <svg
          viewBox="0 0 300 10"
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <path
            d="M0,5 C20,7 40,3 60,5 C80,7 100,3 120,5 C140,7 160,3 180,5 C200,7 220,3 240,5 C260,7 280,3 300,5"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M8,8 C28,6 48,10 68,8 C88,6 108,10 128,8 C148,6 168,10 188,8 C208,6 228,10 248,8 C268,6 288,10 298,8"
            fill="none"
            stroke={color}
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="1,3"
          />
        </svg>
      )}
    </div>
  );
};