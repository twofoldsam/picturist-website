import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { Button } from "./Button";

export const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [daysUntilLaunch, setDaysUntilLaunch] = useState(0);
  
  // Calculate days until beta launch
  useEffect(() => {
    const calculateDays = () => {
      const launchDate = new Date('August 31, 2025 00:00:00');
      const today = new Date();
      const timeDiff = launchDate.getTime() - today.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      setDaysUntilLaunch(daysDiff > 0 ? daysDiff : 0);
    };
    
    calculateDays();
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      if (isDismissed) return;
      
      // Show after scrolling past ~40% of viewport height
      const scrollThreshold = window.innerHeight * 0.4;
      
      if (window.scrollY > scrollThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);
  
  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };
  
  const goToSignUp = () => {
    window.location.href = 'https://app.picturist.ai/sign-up';
  };
  const goToSignIn = () => {
    window.location.href = 'https://app.picturist.ai/auth/signin';
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            className="fixed bottom-5 inset-x-0 z-50 flex justify-center px-4"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 25,
              duration: 0.3
            }}
          >
            <motion.div 
              className="bg-[#FEFCF8] border border-[#F7F6F4] rounded-xl shadow-lg overflow-hidden"
              initial={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
              whileHover={{ 
                boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)",
                y: -2
              }}
              transition={{ duration: 0.2 }}
            >
              {/* Top border gradient */}
              <div className="h-0.5 bg-gradient-to-r from-[#1E4A52] via-[#B8860B]/60 to-[#1E4A52] animate-shimmer" />
              <div className="flex items-center px-2 sm:px-4">
                {/* Days counter with teal highlight */}
                <div className="flex-shrink-0 py-3 px-3 sm:px-4">
                  <div className="flex items-center">
                    <span className="text-lg sm:text-xl font-serif font-bold text-[#1E4A52]">{daysUntilLaunch}</span>
                    <span className="ml-1.5 text-sm text-[#292D31] whitespace-nowrap">days until beta launch</span>
                  </div>
                </div>
                
                {/* Vertical separator */}
                <div className="h-8 w-px bg-[#F7F6F4] mx-1 sm:mx-2"></div>
                
                {/* Launch date - visible on larger screens */}
                <div className="hidden sm:block py-3 px-2">
                  <p className="text-xs text-[#6B7280]">
                    <span className="font-medium">Launch:</span> August 31, 2025
                  </p>
                </div>
                
                {/* CTA buttons */}
                <div className="py-2 px-2 sm:px-4 flex items-center gap-2">
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={goToSignUp}
                    className="whitespace-nowrap group"
                  >
                    <span>Sign up</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={goToSignIn}
                    className="whitespace-nowrap"
                  >
                    Sign in
                  </Button>
                </div>
                
                {/* Close button */}
                <button
                  onClick={handleDismiss}
                  className="p-2 text-[#6B7280] hover:text-[#292D31] transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Removed waitlist modal and form logic */}
    </>
  );
};