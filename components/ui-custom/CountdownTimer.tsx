import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export const CountdownTimer = ({ targetDate, className }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [prevSeconds, setPrevSeconds] = useState<number>(0);

  useEffect(() => {
    // Calculate time difference
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setPrevSeconds(timeLeft.seconds);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // If we've reached the target date
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();
    
    // Update every second
    const timerId = setInterval(calculateTimeLeft, 1000);
    
    // Clean up
    return () => clearInterval(timerId);
  }, [targetDate, timeLeft.seconds]);

  // Helper function to pad single digits with a leading zero
  const padWithZero = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  // Animation for number changes
  const variants = {
    initial: { opacity: 0, y: -5 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 5 }
  };

  // Check if a number has changed
  const hasChanged = (current: number, unit: 'days' | 'hours' | 'minutes' | 'seconds') => {
    if (unit === 'seconds') {
      return current !== prevSeconds;
    }
    // For other units, we only animate when they change (which happens less frequently)
    return current !== timeLeft[unit];
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <motion.div 
        className="text-center mb-4 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-sm text-[var(--picturist-text-muted)] mb-1">Beta Access Opens In</div>
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[var(--picturist-teal)]/20 to-transparent w-full"></div>
      </motion.div>
      
      <div className="flex items-center justify-center space-x-4 relative">
        {/* Days */}
        <div className="relative">
          <div className="flex flex-col items-center">
            <motion.div 
              className="px-4 py-2 bg-white rounded-lg border border-[var(--picturist-soft-gray)] shadow-md flex items-center justify-center relative overflow-hidden"
              whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(30, 74, 82, 0.1), 0 8px 10px -6px rgba(30, 74, 82, 0.05)" }}
            >
              {/* Glass effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--picturist-light-teal)]/30 to-transparent pointer-events-none"></div>
              
              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--picturist-teal)]/60 to-[var(--picturist-teal)]"></div>
              
              <AnimatePresence mode="popLayout">
                <motion.span 
                  key={timeLeft.days}
                  className="text-2xl font-bold text-[var(--picturist-charcoal)] relative z-10"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.2 }}
                >
                  {padWithZero(timeLeft.days)}
                </motion.span>
              </AnimatePresence>
            </motion.div>
            <motion.div 
              className="mt-1 flex items-center justify-center rounded-full px-2 py-0.5 bg-[var(--picturist-light-teal)] border border-[var(--picturist-teal)]/10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-xs text-[var(--picturist-teal)]">days</span>
            </motion.div>
          </div>
        </div>
        
        {/* Hours */}
        <div className="relative">
          <div className="flex flex-col items-center">
            <motion.div 
              className="px-4 py-2 bg-white rounded-lg border border-[var(--picturist-soft-gray)] shadow-md flex items-center justify-center relative overflow-hidden"
              whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(30, 74, 82, 0.1), 0 8px 10px -6px rgba(30, 74, 82, 0.05)" }}
            >
              {/* Glass effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--picturist-light-teal)]/20 to-transparent pointer-events-none"></div>
              
              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--picturist-teal)]/60 via-[var(--picturist-teal)]/80 to-[var(--picturist-teal)]/60"></div>
              
              <AnimatePresence mode="popLayout">
                <motion.span 
                  key={timeLeft.hours}
                  className="text-2xl font-bold text-[var(--picturist-charcoal)] relative z-10"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.2 }}
                >
                  {padWithZero(timeLeft.hours)}
                </motion.span>
              </AnimatePresence>
            </motion.div>
            <motion.div 
              className="mt-1 flex items-center justify-center rounded-full px-2 py-0.5 bg-[var(--picturist-light-teal)] border border-[var(--picturist-teal)]/10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-xs text-[var(--picturist-teal)]">hours</span>
            </motion.div>
          </div>
        </div>
        
        {/* Minutes */}
        <div className="relative">
          <div className="flex flex-col items-center">
            <motion.div 
              className="px-4 py-2 bg-white rounded-lg border border-[var(--picturist-soft-gray)] shadow-md flex items-center justify-center relative overflow-hidden"
              whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(184, 134, 11, 0.1), 0 8px 10px -6px rgba(184, 134, 11, 0.05)" }}
            >
              {/* Glass effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--picturist-gold)]/10 to-transparent pointer-events-none"></div>
              
              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--picturist-gold)]/50 via-[var(--picturist-gold)]/70 to-[var(--picturist-gold)]/50"></div>
              
              <AnimatePresence mode="popLayout">
                <motion.span 
                  key={timeLeft.minutes}
                  className="text-2xl font-bold text-[var(--picturist-charcoal)] relative z-10"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.2 }}
                >
                  {padWithZero(timeLeft.minutes)}
                </motion.span>
              </AnimatePresence>
            </motion.div>
            <motion.div 
              className="mt-1 flex items-center justify-center rounded-full px-2 py-0.5 bg-[var(--picturist-gold)]/10 border border-[var(--picturist-gold)]/20"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-xs text-[var(--picturist-gold)]/80">mins</span>
            </motion.div>
          </div>
        </div>
        
        {/* Seconds */}
        <div className="relative">
          <div className="flex flex-col items-center">
            <motion.div 
              className="px-4 py-2 bg-white rounded-lg border border-[var(--picturist-soft-gray)] shadow-md flex items-center justify-center relative overflow-hidden"
              whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(184, 134, 11, 0.1), 0 8px 10px -6px rgba(184, 134, 11, 0.05)" }}
            >
              {/* Pulsing background */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-[var(--picturist-gold)]/10 to-transparent pointer-events-none" 
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
              
              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--picturist-gold)] to-[var(--picturist-gold)]/60"></div>
              
              <AnimatePresence mode="popLayout">
                <motion.span 
                  key={timeLeft.seconds}
                  className="text-2xl font-bold text-[var(--picturist-charcoal)] relative z-10"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.2 }}
                >
                  {padWithZero(timeLeft.seconds)}
                </motion.span>
              </AnimatePresence>
            </motion.div>
            <motion.div 
              className="mt-1 flex items-center justify-center rounded-full px-2 py-0.5 bg-[var(--picturist-gold)]/10 border border-[var(--picturist-gold)]/20"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-xs text-[var(--picturist-gold)]/80">secs</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};