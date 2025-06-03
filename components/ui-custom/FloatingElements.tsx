
import React from "react";
import { motion } from "framer-motion";

// Create reusable floating element types
const elements = {
  blob1: (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M60.8 14.2C81.3 14.2 97.5 32.5 97.5 55.1C97.5 90.2 81.3 106.5 60.8 106.5C38.3 106.5 21 90.2 21 67.6C21 33.5 38.3 14.2 60.8 14.2Z" 
        fill="currentColor" 
      />
    </svg>
  ),
  blob2: (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M78.2 23.1C93.5 38.9 94.1 63.2 79.4 77.6C64.6 91.9 40.2 91.5 25 75.7C9.7 59.9 9.1 35.6 23.8 21.2C38.6 6.9 62.9 7.3 78.2 23.1Z" 
        fill="currentColor" 
      />
    </svg>
  ),
  illustrationFrame: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="34" height="34" rx="4" stroke="currentColor" strokeWidth="2"/>
      <path d="M3 22L14 14L24 21L37 12" stroke="currentColor" strokeWidth="2"/>
      <circle cx="28" cy="10" r="3" fill="currentColor"/>
    </svg>
  ),
  document: (
    <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 0C1.79086 0 0 1.79086 0 4V40C0 42.2091 1.79086 44 4 44H32C34.2091 44 36 42.2091 36 40V11L25 0H4Z" fill="currentColor"/>
      <path d="M8 16H28M8 24H28M8 32H20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  palette: (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="22" fill="currentColor"/>
      <circle cx="14" cy="18" r="4" fill="white"/>
      <circle cx="26" cy="13" r="3" fill="white"/>
      <circle cx="30" cy="24" r="3" fill="white"/>
      <circle cx="21" cy="31" r="3" fill="white"/>
    </svg>
  ),
  star: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill="currentColor"/>
    </svg>
  ),
  smallCircle: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="6" fill="currentColor"/>
    </svg>
  )
};

interface FloatingElementProps {
  element: keyof typeof elements;
  color: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size?: string;
  rotate?: number;
  delay?: number;
  duration?: number;
  opacity?: number;
  className?: string;
  zIndex?: number;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  element,
  color,
  top,
  left,
  right,
  bottom,
  size = "auto",
  rotate = 0,
  delay = 0,
  duration = 20,
  opacity = 0.8,
  className = "",
  zIndex = 0
}) => {
  // Animation variants
  const floatingAnimation = {
    initial: {
      y: 0,
      x: 0,
      rotate: rotate,
      opacity: 0,
      scale: 0.8,
    },
    animate: {
      y: [0, -10, 0, 10, 0],
      x: [0, 5, 0, -5, 0],
      rotate: [rotate, rotate + 5, rotate, rotate - 5, rotate],
      opacity: opacity,
      scale: 1,
      transition: {
        delay: delay,
        duration: duration,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className={`absolute ${className}`}
      style={{
        top,
        left,
        right,
        bottom,
        color,
        width: size,
        height: size,
        zIndex
      }}
      initial="initial"
      animate="animate"
      variants={floatingAnimation}
    >
      {elements[element]}
    </motion.div>
  );
};

export const UIElement: React.FC<{
  type: "action" | "gallery" | "browser";
  className?: string;
  style?: React.CSSProperties;
}> = ({ type, className = "", style = {} }) => {
  const uiElements = {
    action: (
      <svg width="120" height="72" viewBox="0 0 120 72" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
        <rect width="120" height="72" rx="8" fill="white" />
        <rect x="0.5" y="0.5" width="119" height="71" rx="7.5" stroke="#E0E0E0" strokeOpacity="0.5"/>
        <rect x="12" y="12" width="72" height="8" rx="2" fill="#E5F7F6" />
        <rect x="12" y="28" width="96" height="6" rx="2" fill="#F5F5F5" />
        <rect x="12" y="40" width="66" height="6" rx="2" fill="#F5F5F5" />
        <rect x="12" y="56" width="36" height="10" rx="4" fill="#00BCBC" />
        <rect x="55" y="56" width="36" height="10" rx="4" fill="#F5F5F5" />
      </svg>
    ),
    gallery: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
        <rect width="120" height="120" rx="8" fill="white" />
        <rect x="0.5" y="0.5" width="119" height="119" rx="7.5" stroke="#E0E0E0" strokeOpacity="0.5"/>
        <rect x="12" y="12" width="44" height="44" rx="4" fill="#E5F7F6" />
        <circle cx="23" cy="24" r="4" fill="#00BCBC" />
        <rect x="64" y="12" width="44" height="44" rx="4" fill="#FFF0ED" />
        <path d="M84 28L88 24M88 24L92 28M88 24V36M80 32L76 36M76 36L80 40M76 36H88" stroke="#FF5A43" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="12" y="64" width="44" height="44" rx="4" fill="#F5F5F5" />
        <path d="M28 88L30.5 85.5L33 88L35.5 85.5L38 88" stroke="#717182" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="64" y="64" width="44" height="44" rx="4" fill="#F5F5F5" />
        <circle cx="86" cy="86" r="8" stroke="#717182" strokeWidth="1.5" />
      </svg>
    ),
    browser: (
      <svg width="240" height="160" viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
        <rect width="240" height="160" rx="8" fill="white" />
        <rect x="0.5" y="0.5" width="239" height="159" rx="7.5" stroke="#E0E0E0" strokeOpacity="0.5"/>
        <rect y="28" width="240" height="1" fill="#E0E0E0" />
        <circle cx="16" cy="14" r="4" fill="#FF5A43" />
        <circle cx="32" cy="14" r="4" fill="#FFC107" />
        <circle cx="48" cy="14" r="4" fill="#00BCBC" />
        <rect x="16" y="44" width="80" height="80" rx="4" fill="#E5F7F6" />
        <path d="M56 76L56 92" stroke="#00BCBC" strokeWidth="2" strokeLinecap="round" />
        <path d="M48 84L64 84" stroke="#00BCBC" strokeWidth="2" strokeLinecap="round" />
        <rect x="112" y="44" width="112" height="8" rx="2" fill="#F5F5F5" />
        <rect x="112" y="60" width="96" height="6" rx="2" fill="#F5F5F5" />
        <rect x="112" y="74" width="80" height="6" rx="2" fill="#F5F5F5" />
        <rect x="112" y="88" width="112" height="6" rx="2" fill="#F5F5F5" />
        <rect x="112" y="102" width="72" height="6" rx="2" fill="#F5F5F5" />
        <rect x="112" y="116" width="36" height="8" rx="4" fill="#00BCBC" />
      </svg>
    ),
  };

  return uiElements[type];
};
