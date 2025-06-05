import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Loader2 } from 'lucide-react';
import { useVideoModal } from './VideoModal';

interface VideoDemoProps {
  videoSrc: string;
  posterSrc: string;
  title?: string;
  description?: string;
  className?: string;
}

export const VideoDemo: React.FC<VideoDemoProps> = ({
  videoSrc,
  posterSrc,
  title = "Watch Picturist in Action",
  description = "See how AI transforms your content into stunning illustrations",
  className = ""
}) => {
  const { openVideo } = useVideoModal();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handlePlayClick = () => {
    openVideo(videoSrc, title, description);
  };

  return (
    <motion.div
      className={`relative group cursor-pointer rounded-xl overflow-hidden shadow-lg ${className}`}
      onClick={handlePlayClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Poster Image */}
      <div className="relative aspect-video bg-[var(--picturist-soft-gray)]">
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--picturist-soft-gray)] via-gray-200 to-[var(--picturist-soft-gray)] animate-pulse" />
        )}
        
        <img
          src={posterSrc}
          alt="Picturist Demo Preview"
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Gradient overlay - animated */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"
          animate={{ 
            opacity: isHovered ? 0.8 : 0.5 
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Play Button - enhanced with loading state */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative"
            animate={{ 
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-full blur-xl"
              animate={{ 
                scale: isHovered ? 1.2 : 0.8,
                opacity: isHovered ? 1 : 0.5 
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Main button */}
            <motion.div
              className="relative w-16 h-16 md:w-20 md:h-20 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/50"
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.1 }}
            >
              <Play 
                className="w-6 h-6 md:w-8 md:h-8 text-[var(--picturist-teal)] ml-1" 
                fill="currentColor"
              />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Title overlay - improved mobile visibility */}
        <motion.div 
          className="absolute bottom-4 left-4 right-4"
          animate={{ 
            y: isHovered ? 0 : 8,
            opacity: isHovered ? 1 : 0.9 
          }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-white font-serif font-semibold text-lg md:text-xl mb-1 drop-shadow-lg">
            {title}
          </h3>
          <p className="text-white/90 text-sm md:text-base drop-shadow-md">
            {description}
          </p>
        </motion.div>
        
        {/* Ripple effect on click */}
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-xl"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ 
            scale: 1.5, 
            opacity: [0, 0.3, 0],
            transition: { duration: 0.6 }
          }}
        />
      </div>
    </motion.div>
  );
}; 