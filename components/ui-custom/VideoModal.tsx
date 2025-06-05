import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX, Play, Pause, Maximize2, Minimize2 } from 'lucide-react';

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<number>();

  // Check if we're on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const openVideo = (src: string, videoTitle = 'Watch Picturist in Action', videoDescription = 'See how AI transforms your content into stunning illustrations') => {
    setVideoSrc(src);
    setTitle(videoTitle);
    setDescription(videoDescription);
    setIsOpen(true);
    setIsLoading(true);
    
    // Auto-fullscreen on mobile
    if (isMobile) {
      setIsFullscreen(true);
    }
  };

  const closeVideo = () => {
    setIsOpen(false);
    setIsPlaying(false);
    setCurrentTime(0);
    setIsFullscreen(false);
    
    // Pause video when modal closes
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const showControlsWithTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoading(false);
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      showControlsWithTimeout();
    };

    const handlePause = () => {
      setIsPlaying(false);
      setShowControls(true);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setShowControls(true);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, [isOpen]);

  // Handle mouse movement for controls
  const handleMouseMove = () => {
    if (!isOpen) return;
    showControlsWithTimeout();
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

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
              className="fixed inset-0 bg-black z-50"
              onClick={closeVideo}
            />
            
            {/* Modal */}
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`fixed z-50 flex items-center justify-center ${
                isFullscreen ? 'inset-0' : 'inset-0 p-4'
              }`}
              onMouseMove={handleMouseMove}
            >
              <div className={`relative bg-black ${
                isFullscreen ? 'w-full h-full' : 'w-full max-w-5xl rounded-lg overflow-hidden'
              } shadow-2xl`}>
                
                {/* Video */}
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    className="w-full h-full object-contain"
                    autoPlay
                    muted={isMuted}
                    playsInline
                    onDoubleClick={toggleFullscreen}
                    onClick={togglePlay}
                  />
                  
                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                  )}
                  
                  {/* Title overlay */}
                  <AnimatePresence>
                    {showControls && !isFullscreen && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-4 md:p-6"
                      >
                        <h3 className="text-white font-serif font-semibold text-lg md:text-xl mb-1">
                          {title}
                        </h3>
                        <p className="text-white/80 text-sm md:text-base">
                          {description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Custom Controls */}
                  <AnimatePresence>
                    {showControls && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6"
                      >
                        {/* Progress bar */}
                        <div 
                          className="w-full h-2 bg-white/20 rounded-full mb-4 cursor-pointer"
                          onClick={handleSeek}
                        >
                          <div 
                            className="h-full bg-white rounded-full transition-all duration-150"
                            style={{ width: `${(currentTime / duration) * 100}%` }}
                          />
                        </div>
                        
                        {/* Control buttons */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {/* Play/Pause */}
                            <button
                              onClick={togglePlay}
                              className="text-white hover:text-gray-300 transition-colors"
                            >
                              {isPlaying ? (
                                <Pause className="w-6 h-6" />
                              ) : (
                                <Play className="w-6 h-6" fill="currentColor" />
                              )}
                            </button>
                            
                            {/* Mute/Unmute */}
                            <button
                              onClick={toggleMute}
                              className="text-white hover:text-gray-300 transition-colors"
                            >
                              {isMuted ? (
                                <VolumeX className="w-5 h-5" />
                              ) : (
                                <Volume2 className="w-5 h-5" />
                              )}
                            </button>
                            
                            {/* Time display */}
                            <span className="text-white text-sm">
                              {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            {/* Fullscreen toggle */}
                            <button
                              onClick={toggleFullscreen}
                              className="text-white hover:text-gray-300 transition-colors"
                            >
                              {isFullscreen ? (
                                <Minimize2 className="w-5 h-5" />
                              ) : (
                                <Maximize2 className="w-5 h-5" />
                              )}
                            </button>
                            
                            {/* Close button */}
                            <button
                              onClick={closeVideo}
                              className="text-white hover:text-gray-300 transition-colors"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </VideoModalContext.Provider>
  );
}; 