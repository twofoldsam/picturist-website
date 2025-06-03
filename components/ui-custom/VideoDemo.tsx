import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
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

  const handlePlayClick = () => {
    openVideo(videoSrc, title, description);
  };

  return (
    <motion.div
      className={`relative group cursor-pointer rounded-xl overflow-hidden shadow-lg ${className}`}
      onClick={handlePlayClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Poster Image */}
      <div className="relative aspect-video bg-[var(--picturist-soft-gray)]">
        <img
          src={posterSrc}
          alt="Picturist Demo Preview"
          className="w-full h-full object-cover"
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:bg-white transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play 
              className="w-6 h-6 text-[var(--picturist-teal)] ml-1" 
              fill="currentColor"
            />
          </motion.div>
        </div>
        
        {/* Title overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-serif font-semibold text-lg mb-1 drop-shadow-sm">
            {title}
          </h3>
          <p className="text-white/90 text-sm drop-shadow-sm">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}; 