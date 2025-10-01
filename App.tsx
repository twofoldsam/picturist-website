import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./components/HomePage";
import { AnimatePresence } from "framer-motion";
import { VideoModalProvider } from "./components/ui-custom/VideoModal";
import { Toaster } from "sonner";

export default function App() {
  return (
    <Router>
      <AnimatePresence>
        <VideoModalProvider>
            <div className="min-h-screen bg-[var(--picturist-warm-white)] relative">
              <style jsx global>{`
                .cta-bounce {
                  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                .cta-bounce:hover {
                  transform: scale(1.05) translateY(-2px);
                  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                }
                .cta-subtle-bounce {
                  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                .cta-subtle-bounce:hover {
                  transform: scale(1.02) translateY(-1px);
                  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                }
                .cta-medium-bounce {
                  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                .cta-medium-bounce:hover {
                  transform: scale(1.08) translateY(-3px);
                  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
                }
                .cta-scale-bounce {
                  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                .cta-scale-bounce:hover {
                  transform: scale(1.1);
                  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
                }
              `}</style>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
              </Routes>
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
        </VideoModalProvider>
      </AnimatePresence>
    </Router>
  );
}