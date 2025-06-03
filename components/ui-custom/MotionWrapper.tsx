
import React from "react";
import { motion, Variants } from "framer-motion";

// Animation variants for different types of animations
export const animationVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  },
  staggerChildren: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  },
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  }
};

interface MotionWrapperProps {
  children: React.ReactNode;
  variant?: keyof typeof animationVariants;
  className?: string;
  delay?: number;
  viewport?: boolean;
  once?: boolean;
}

export const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  variant = "fadeInUp",
  className = "",
  delay = 0,
  viewport = true,
  once = true,
}) => {
  const selectedVariant = animationVariants[variant];
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport ? { once, margin: "-100px" } : undefined}
      variants={selectedVariant}
      className={className}
      transition={{
        delay,
        duration: 0.5,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
};

export const MotionStaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  viewport?: boolean;
  once?: boolean;
}> = ({
  children,
  className = "",
  delay = 0,
  viewport = true,
  once = true
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport ? { once, margin: "-100px" } : undefined}
      variants={animationVariants.staggerChildren}
      className={className}
      transition={{
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export const MotionStaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({
  children,
  className = "",
  delay = 0
}) => {
  return (
    <motion.div
      variants={animationVariants.staggerItem}
      className={className}
      transition={{
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};
