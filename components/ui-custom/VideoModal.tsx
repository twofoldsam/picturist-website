import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX } from 'lucide-react';

interface VideoModalContextType {
  openVideo: (videoSrc: string, title?: string, description?: string) => void;
  closeVideo: () => void;
  isOpen: boolean;
}

const VideoModalContext = createContext<VideoModalContextType | undefined>(undefined);

export const useVideoModal = () => {
  const context = useContext(VideoModalContext);
  if (!context) {
    throw new Error('useVideoModal must be used within a VideoModalProvider');
  }
  return context;
};

interface VideoModalProviderProps {
  children: ReactNode;
}

export const VideoModalProvider: React.FC<VideoModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const openVideo = (src: string, videoTitle = 'Watch Picturist in Action', videoDescription = 'See how AI transforms your content into stunning illustrations') => {
    setVideoSrc(src);
    setTitle(videoTitle);
    setDescription(videoDescription);
    setIsOpen(true);
  };

  const closeVideo = () => {
    setIsOpen(false);
    // Pause video when modal closes
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <VideoModalContext.Provider value={{ openVideo, closeVideo, isOpen }}>
      {children}
      
      {/* Video Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={closeVideo}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="relative w-full max-w-4xl">
                {/* Close Button */}
                <button
                  onClick={closeVideo}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                >
                  <X className="w-8 h-8" />
                </button>
                
                {/* Video Container */}
                <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
                  {/* Title Bar */}
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-4 z-10">
                    <h3 className="text-white font-serif font-semibold text-lg mb-1">
                      {title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {description}
                    </p>
                  </div>
                  
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    className="w-full h-auto"
                    controls
                    autoPlay
                    muted={isMuted}
                    playsInline
                  />
                  
                  {/* Custom Mute Toggle */}
                  <button
                    onClick={toggleMute}
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-20"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </VideoModalContext.Provider>
  );
}; 