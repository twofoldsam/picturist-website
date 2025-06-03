import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Button } from "./ui-custom/Button";
import { MotionWrapper } from "./ui-custom/MotionWrapper";
import { CheckCircle, ArrowRight, Loader2, AlertCircle, CloudOff, Feather } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CountdownTimer } from "./ui-custom/CountdownTimer";
import { useWaitlist } from "../context/WaitlistContext";

export const WaitlistSignup = () => {
  const [email, setEmail] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  const {
    isSubmitting,
    hasJoined,
    setHasJoined,
    submitEmail,
    submissionError,
    setSubmissionError
  } = useWaitlist();
  
  // Monitor online status
  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await submitEmail(email, "main-form");
    
    if (success) {
      // Keep the success state - don't reset it automatically
      // User can refresh the page if they want to submit another email
    }
  };

  return (
    <section
      id="waitlist"
      className="relative py-24 md:py-32 bg-white overflow-hidden"
    >
      {/* Background elements - subtle pattern only, no circles */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMxLjIzIDAgMi4xOTguOTY5IDIuMTk4IDIuMTk4djE5LjYwNGEyLjE5OCAyLjE5OCAwIDAgMS0yLjE5OCAyLjE5OEgxNmEyLjE5OCAyLjE5OCAwIDAgMS0yLjE5OC0yLjE5OFYyMC4xOThBMi4xOTggMi4xOTggMCAwIDEgMTYgMThoMjB6IiBzdHJva2U9InJnYmEoMzAsIDc0LCA4MiwgMC4wNSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-5" />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10">
        <MotionWrapper
          variant="fadeInUp"
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4 text-[var(--picturist-charcoal)]">
            Join the Waitlist
          </h2>
          <p className="text-lg md:text-xl text-[var(--picturist-text-muted)] max-w-2xl mx-auto">
            Be among the first to experience Picturist when it launches. 
            Early access members will receive special benefits and priority support.
          </p>
        </MotionWrapper>

        <MotionWrapper variant="fadeInUp" delay={0.2}>
          <div className="max-w-xl mx-auto">
            {/* Countdown Timer - Redesigned without circular backgrounds */}
            <motion.div 
              className="mb-8 py-6 px-8 bg-white rounded-xl border border-[var(--picturist-soft-gray)] shadow-md relative overflow-hidden elegant-card"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <div className="relative">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-6 h-6 bg-[var(--picturist-light-teal)] rounded-full flex items-center justify-center mr-2">
                    <Feather className="h-3.5 w-3.5 text-[var(--picturist-teal)]" />
                  </div>
                  <span className="text-sm font-medium text-[var(--picturist-teal)]">Beta Launch</span>
                </div>
                <CountdownTimer 
                  targetDate={new Date('June 26, 2025 00:00:00')}
                />
              </div>
            </motion.div>

            {/* Form Card */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-[var(--picturist-soft-gray)] elegant-card">
              {hasJoined ? (
                <div className="py-8">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-[var(--picturist-light-teal)] flex items-center justify-center mb-4 border border-[var(--picturist-teal)]/20">
                      <CheckCircle className="h-8 w-8 text-[var(--picturist-teal)]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--picturist-charcoal)] mb-2">
                      Welcome to the waitlist! 🎉
                    </h3>
                    <p className="text-[var(--picturist-text-muted)] text-center leading-relaxed">
                      You're all set! We'll send you an email when Picturist launches on <span className="font-medium text-[var(--picturist-charcoal)]">June 26, 2025</span>. Early access members get priority support and exclusive benefits.
                    </p>
                  </motion.div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Show offline mode notice if applicable */}
                  {!isOnline && (
                    <div className="flex items-center gap-2 py-2 px-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <CloudOff className="text-amber-500 h-4 w-4 flex-shrink-0" />
                      <p className="text-sm text-amber-700">
                        You're currently offline. Your submission will be saved and synchronized when you're back online.
                      </p>
                    </div>
                  )}
                  
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[var(--picturist-charcoal)] mb-1"
                    >
                      Email address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (submissionError) setSubmissionError(null);
                      }}
                      className={`h-12 bg-[var(--picturist-soft-gray)] border ${
                        submissionError
                          ? "border-red-300"
                          : "border-[var(--picturist-soft-gray)]"
                      } rounded-xl px-4 w-full focus:ring-2 focus:ring-[var(--picturist-teal)]/30 focus:border-[var(--picturist-teal)] elegant-input`}
                      required
                    />
                    {submissionError && (
                      <div className="mt-1 flex items-start gap-1">
                        <AlertCircle className="text-red-500 h-4 w-4 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-red-500">
                          {submissionError}
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full h-12 flex items-center justify-center gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Joining waitlist...</span>
                        </>
                      ) : (
                        <>
                          <span>Get Early Access</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>

                  <p className="text-xs text-center text-[var(--picturist-text-muted)] pt-4">
                    By joining, you agree to receive updates
                    about Picturist. We'll never spam or share
                    your email.
                  </p>
                </form>
              )}
            </div>

            {/* Waitlist counter */}
            <div className="mt-8 flex items-center justify-center">
              <div className="px-6 py-2 bg-white rounded-full shadow-sm border border-[var(--picturist-soft-gray)] flex items-center gap-2">
                <div className="flex -space-x-2">
                  {/* First avatar with text "SW" */}
                  <div
                    className="w-7 h-7 rounded-full bg-[var(--picturist-light-teal)] border-2 border-white flex items-center justify-center text-xs text-[var(--picturist-teal)]"
                  >
                    SW
                  </div>
                  
                  {/* Second avatar with image */}
                  <div
                    className="w-7 h-7 rounded-full border-2 border-white overflow-hidden"
                  >
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=60&h=60&auto=format&fit=crop"
                      alt="Profile image"
                      width={28}
                      height={28}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  
                  {/* Third avatar with image */}
                  <div
                    className="w-7 h-7 rounded-full border-2 border-white overflow-hidden"
                  >
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=60&h=60&auto=format&fit=crop"
                      alt="Profile image"
                      width={28}
                      height={28}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  
                  {/* Fourth avatar with text "JK" */}
                  <div
                    className="w-7 h-7 rounded-full bg-[var(--picturist-gold)]/20 border-2 border-white flex items-center justify-center text-xs text-[var(--picturist-gold)]"
                  >
                    JK
                  </div>
                </div>
                <div className="ml-1 text-sm text-[var(--picturist-text-muted)]">
                  <span className="font-medium text-[var(--picturist-charcoal)]">543+</span>{" "}
                  people waiting
                </div>
              </div>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
};