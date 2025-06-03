
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface RotatingFrameProps {
  imageSrc: string;
  altText: string;
  className?: string;
  delay?: number;
  borderColor?: string;
}

export const RotatingFrame: React.FC<RotatingFrameProps> = ({
  imageSrc,
  altText,
  className = "",
  delay = 0,
  borderColor = "border-slate-200"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className={`relative perspective-1000 ${className}`}
      initial={{ opacity: 0, rotateY: -15, rotateX: 5 }}
      animate={{ opacity: 1, rotateY: isHovered ? 0 : -15, rotateX: isHovered ? 0 : 5 }}
      transition={{ 
        delay: delay,
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Shadow */}
      <motion.div 
        className="absolute -bottom-6 inset-x-0 h-16 bg-black/10 blur-xl rounded-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isHovered ? 0.4 : 0.15,
          scale: isHovered ? 0.85 : 0.8,
          translateY: isHovered ? -5 : 0
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Frame */}
      <motion.div
        className={`rounded-xl overflow-hidden border ${borderColor} bg-white shadow-lg`}
        animate={{ 
          y: isHovered ? -10 : 0,
          scale: isHovered ? 1.02 : 1,
          transition: { 
            type: "spring",
            stiffness: 300,
            damping: 20
          }
        }}
      >
        <div className="h-10 bg-slate-50 border-b border-slate-100 flex items-center px-3">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-coral-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-teal-500"></div>
          </div>
        </div>
        <div className="relative overflow-hidden">
          <ImageWithFallback 
            src={imageSrc}
            alt={altText}
            width={600}
            height={400}
            className="w-full h-auto object-cover"
          />
          
          {/* Hover overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-start p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            <div className="text-white">
              <p className="text-sm font-medium">{altText}</p>
              <p className="text-xs opacity-80">Generated with Picturist</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const RotatingFramesGroup: React.FC<{
  className?: string;
}> = ({
  className = ""
}) => {
  const frames = [
    {
      src: "https://images.unsplash.com/photo-1681922518924-5c5b8ac1015b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Nature illustration",
      delay: 0.2,
      borderColor: "border-teal-100"
    },
    {
      src: "https://images.unsplash.com/photo-1702602508361-3f35fa93a04a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Abstract concept",
      delay: 0.4,
      borderColor: "border-coral-100"
    },
    {
      src: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Business visualization",
      delay: 0.6,
      borderColor: "border-slate-100"
    }
  ];
  
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      {frames.map((frame, index) => (
        <RotatingFrame
          key={index}
          imageSrc={frame.src}
          altText={frame.alt}
          delay={frame.delay}
          borderColor={frame.borderColor}
        />
      ))}
    </div>
  );
};
