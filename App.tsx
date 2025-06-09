import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import { AnimatePresence } from "framer-motion";
import { WaitlistProvider } from "./context/WaitlistContext";
import { VideoModalProvider } from "./components/ui-custom/VideoModal";
import { Toaster } from "sonner";

export default function App() {
  return (
    <Router>
      <AnimatePresence>
        <VideoModalProvider>
          <WaitlistProvider>
            <div className="min-h-screen bg-[var(--picturist-warm-white)] relative">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
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
          </WaitlistProvider>
        </VideoModalProvider>
      </AnimatePresence>
    </Router>
  );
}