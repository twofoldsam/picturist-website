import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Check, Loader2, AlertCircle } from "lucide-react";
import { Button } from "./Button";
import { Input } from "../ui/input";
import { useWaitlist } from "../../context/WaitlistContext";

export const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [daysUntilLaunch, setDaysUntilLaunch] = useState(0);
  
  const { 
    isSubmitting, 
    hasJoined, 
    setHasJoined,
    submitEmail,
    submissionError,
    setSubmissionError
  } = useWaitlist();
  
  // Calculate days until beta launch
  useEffect(() => {
    const calculateDays = () => {
      const launchDate = new Date('June 26, 2025 00:00:00');
      const today = new Date();
      const timeDiff = launchDate.getTime() - today.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      setDaysUntilLaunch(daysDiff > 0 ? daysDiff : 0);
    };
    
    calculateDays();
  }, []);
  
  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
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
  
  // Reset success state when modal closes
  useEffect(() => {
    if (!showModal) {
      setTimeout(() => {
        if (hasJoined) {
          setEmail("");
          setHasJoined(false);
        }
        if (submissionError) {
          setSubmissionError(null);
        }
      }, 300);
    }
  }, [showModal, hasJoined, submissionError, setHasJoined, setSubmissionError]);
  
  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };
  
  const handleJoinClick = () => {
    // Open the modal
    setShowModal(true);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitEmail(email, "floating-cta");
    
    if (success) {
      // Keep the modal open to show success state
      // Don't auto-close - let user decide when to close
    }
  };
  
  const scrollToWaitlist = () => {
    setShowModal(false);
    setTimeout(() => {
      document.getElementById('waitlist')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }, 100);
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
                    <span className="font-medium">Launch:</span> June 26, 2025
                  </p>
                </div>
                
                {/* CTA buttons */}
                <div className="py-2 px-2 sm:px-4 flex gap-2">
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => window.location.href = 'https://app.picturist.ai'}
                    className="whitespace-nowrap group"
                  >
                    <span>Launch App</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={handleJoinClick}
                    className="whitespace-nowrap group"
                  >
                    <span>Join Waitlist</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
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
      
      {/* Modal for email collection */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => !isSubmitting && setShowModal(false)}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-[#FEFCF8] p-6 rounded-xl shadow-[0_4px_20px_-5px_rgba(0,0,0,0.15),_0_10px_10px_-5px_rgba(0,0,0,0.04)] border border-[#F7F6F4] relative overflow-hidden w-full max-w-md mx-auto">
                {/* Top accent border */}
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-[#1E4A52] via-[#B8860B]/60 to-[#1E4A52]" />
                
                {/* Close button */}
                {!isSubmitting && (
                  <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 p-1 rounded-full hover:bg-[#F7F6F4] text-[#6B7280] hover:text-[#292D31]"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                
                <div className="mb-6">
                  <h3 className="text-xl font-serif font-bold text-[#292D31] mb-2">
                    Join the Picturist Waitlist
                  </h3>
                  <p className="text-sm text-[#6B7280]">
                    Be among the first to experience Picturist when we launch on June 26, 2025.
                  </p>
                </div>
                
                {hasJoined ? (
                  <div className="py-8">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#E6F2F3] flex items-center justify-center mb-4">
                        <Check className="h-8 w-8 text-[#1E4A52]" />
                      </div>
                      <h3 className="text-xl font-serif font-bold text-[#292D31] mb-2">
                        Welcome to the waitlist! 🎉
                      </h3>
                      <p className="text-[#6B7280] text-center leading-relaxed">
                        You're all set! We'll send you an email when Picturist launches on <span className="font-medium text-[#292D31]">June 26, 2025</span>. Early access members get priority support and exclusive benefits.
                      </p>
                    </motion.div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Show offline mode notice if applicable */}
                    {!isOnline && (
                      <div className="flex items-start gap-2 py-2 px-3 bg-[#FEF9E7] border border-[#B8860B] rounded-lg">
                        <AlertCircle className="text-[#B8860B] h-4 w-4 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-[#B8860B]">
                          You're currently offline. Your submission will be saved and synchronized when you're back online.
                        </p>
                      </div>
                    )}
                    
                    <div>
                      <label
                        htmlFor="floating-cta-email"
                        className="block text-sm font-medium text-[#292D31] mb-1"
                      >
                        Email address
                      </label>
                      <Input
                        id="floating-cta-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (submissionError) setSubmissionError(null);
                        }}
                        className={`h-11 bg-[#F7F6F4] border ${
                          submissionError ? "border-[#DC2626]" : "border-[#F7F6F4]"
                        } rounded-xl px-4 w-full focus-visible:ring-2 focus-visible:ring-[#1E4A52]/50 focus-visible:border-[#1E4A52]`}
                        required
                        disabled={isSubmitting}
                      />
                      {submissionError && (
                        <div className="mt-1 flex items-start gap-1">
                          <AlertCircle className="text-[#DC2626] h-4 w-4 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-[#DC2626]">
                            {submissionError}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <Button
                        type="submit"
                        variant="primary"
                        className="w-full h-11 group"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Joining waitlist...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-1">
                            <span>Join Waitlist</span>
                            <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        )}
                      </Button>
                      
                      <div className="mt-3 text-center">
                        <button
                          type="button"
                          onClick={scrollToWaitlist}
                          className="text-sm text-[#6B7280] hover:text-[#1E4A52] transition-all duration-200"
                          disabled={isSubmitting}
                        >
                          View detailed waitlist information
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-xs text-center text-[#6B7280] pt-2">
                      By joining, you agree to receive updates about Picturist.
                      We'll never spam or share your email.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};