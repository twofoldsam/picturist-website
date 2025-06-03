
import React from "react";
import { motion } from "framer-motion";

interface ShapeProps {
  className?: string;
  delay?: number;
  duration?: number;
}

export const CircleShape: React.FC<ShapeProps> = ({ 
  className = "", 
  delay = 0, 
  duration = 20 
}) => {
  return (
    <motion.div 
      className={`rounded-full ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: [0.8, 1, 0.8],
        opacity: [0, 1, 0],
      }}
      transition={{ 
        repeat: Infinity,
        duration,
        delay,
        ease: "easeInOut"
      }}
    />
  );
};

export const SquareShape: React.FC<ShapeProps> = ({ 
  className = "", 
  delay = 0, 
  duration = 20 
}) => {
  return (
    <motion.div 
      className={`${className}`}
      initial={{ rotate: 0, opacity: 0 }}
      animate={{ 
        rotate: [0, 180, 360],
        opacity: [0, 1, 0],
      }}
      transition={{ 
        repeat: Infinity,
        duration,
        delay,
        ease: "easeInOut"
      }}
    />
  );
};

export const PlusShape: React.FC<ShapeProps> = ({ 
  className = "", 
  delay = 0, 
  duration = 15 
}) => {
  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ rotate: 0, opacity: 0 }}
      animate={{ 
        rotate: [0, 90, 0],
        opacity: [0, 1, 0],
      }}
      transition={{ 
        repeat: Infinity,
        duration,
        delay,
        ease: "easeInOut"
      }}
    >
      <div className="absolute top-1/2 left-1/2 w-full h-[20%] bg-current -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
      <div className="absolute top-1/2 left-1/2 w-[20%] h-full bg-current -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
    </motion.div>
  );
};

export const TriangleShape: React.FC<ShapeProps> = ({ 
  className = "", 
  delay = 0, 
  duration = 18 
}) => {
  return (
    <motion.div 
      className={`${className}`}
      style={{
        width: 0,
        height: 0,
        borderLeft: '12px solid transparent',
        borderRight: '12px solid transparent',
        borderBottom: '24px solid currentColor',
      }}
      initial={{ rotate: 0, opacity: 0 }}
      animate={{ 
        rotate: [0, 360],
        opacity: [0, 1, 0],
      }}
      transition={{ 
        repeat: Infinity,
        duration,
        delay,
        ease: "easeInOut"
      }}
    />
  );
};

export const WaveShape: React.FC<ShapeProps> = ({ 
  className = "", 
  delay = 0, 
  duration = 24 
}) => {
  return (
    <motion.div 
      className={`overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0, 1, 0],
      }}
      transition={{ 
        repeat: Infinity,
        duration,
        delay,
        ease: "easeInOut"
      }}
    >
      <motion.svg 
        width="48" 
        height="12" 
        viewBox="0 0 48 12"
        initial={{ x: -48 }}
        animate={{ x: 48 }}
        transition={{ 
          repeat: Infinity,
          duration: 3,
          ease: "linear"
        }}
      >
        <path 
          d="M0,0 C8,0 8,12 16,12 C24,12 24,0 32,0 C40,0 40,12 48,12" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        />
      </motion.svg>
    </motion.div>
  );
};

export const DotsGrid: React.FC<ShapeProps & {size?: number, gap?: number}> = ({ 
  className = "", 
  delay = 0, 
  duration = 20,
  size = 3,
  gap = 6
}) => {
  const rows = 3;
  const cols = 3;
  
  return (
    <motion.div 
      className={`grid ${className}`}
      style={{ 
        gridTemplateRows: `repeat(${rows}, ${size}px)`,
        gridTemplateColumns: `repeat(${cols}, ${size}px)`,
        gap: `${gap}px`,
      }}
      initial={{ rotate: 0, opacity: 0 }}
      animate={{ 
        rotate: [0, 45, 0],
        opacity: [0, 1, 0],
      }}
      transition={{ 
        repeat: Infinity,
        duration,
        delay,
        ease: "easeInOut"
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <div key={i} className="rounded-full bg-current" />
      ))}
    </motion.div>
  );
};

export const GeometricPattern: React.FC<{
  className?: string;
}> = ({ className = "" }) => {
  return (
    <div className={`absolute pointer-events-none overflow-hidden ${className}`}>
      <CircleShape 
        className="absolute w-6 h-6 text-teal-400/30 top-[15%] left-[10%]" 
        delay={0.5}
        duration={18}
      />
      <SquareShape 
        className="absolute w-10 h-10 rounded-md text-coral-400/20 top-[25%] right-[15%]" 
        delay={2.5}
        duration={20}
      />
      <PlusShape 
        className="absolute w-8 h-8 text-teal-500/30 bottom-[30%] left-[20%]" 
        delay={1.2}
        duration={15}
      />
      <TriangleShape 
        className="absolute text-coral-500/30 bottom-[20%] right-[25%]" 
        delay={3}
        duration={22}
      />
      <DotsGrid 
        className="absolute text-teal-400/40 top-[40%] left-[25%]" 
        delay={0.8}
        duration={24}
        size={2}
        gap={5}
      />
      <DotsGrid 
        className="absolute text-coral-400/30 top-[60%] right-[10%]" 
        delay={1.6}
        duration={19}
        size={3}
        gap={4}
      />
      <CircleShape 
        className="absolute w-4 h-4 text-teal-300/20 top-[70%] left-[15%]" 
        delay={4}
        duration={16}
      />
      <WaveShape 
        className="absolute w-14 h-6 text-coral-300/20 top-[85%] right-[20%]" 
        delay={2}
        duration={28}
      />
    </div>
  );
};
