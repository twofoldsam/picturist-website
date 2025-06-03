import React from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { WaitlistSignup } from "./components/WaitlistSignup";
import { Footer } from "./components/Footer";
import { AnimatePresence } from "framer-motion";
import { FloatingCTA } from "./components/ui-custom/FloatingCTA";
import { WaitlistProvider } from "./context/WaitlistContext";
import { VideoModalProvider } from "./components/ui-custom/VideoModal";
import { Toaster } from "sonner";
import { ContentTypeShowcase } from "./components/ContentTypeShowcase";

export default function App() {
  return (
    <AnimatePresence>
      <VideoModalProvider>
        <WaitlistProvider>
          <div className="min-h-screen bg-[var(--picturist-warm-white)] relative">
            <Navbar />
            <main>
              <Hero />
              {/* Content Type Showcase appears directly after the hero */}
              <ContentTypeShowcase />
              {/* Waitlist signup remains the final conversion point */}
              <WaitlistSignup />
            </main>
            <Footer />
            {/* Floating CTA provides persistent conversion opportunity */}
            <FloatingCTA />
            <Toaster 
              position="top-center"
              toastOptions={{
                style: {
                  background: 'var(--picturist-warm-white)',
                  color: 'var(--picturist-charcoal)',
                  border: '1px solid var(--picturist-soft-gray)',
                  borderRadius: 'var(--radius)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }
              }}
            />
          </div>
        </WaitlistProvider>
      </VideoModalProvider>
    </AnimatePresence>
  );
}