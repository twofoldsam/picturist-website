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
                .bounce-hover:not(button):hover {
                  animation: subtleBounce 0.2s ease-out;
                }
                
                @keyframes subtleBounce {
                  0% { transform: scale(1); }
                  50% { transform: scale(1.02); }
                  100% { transform: scale(1); }
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