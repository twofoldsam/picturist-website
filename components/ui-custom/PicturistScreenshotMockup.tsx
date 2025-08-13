import React, { useState } from "react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export const PicturistScreenshotMockup: React.FC<{
  className?: string;
  delay?: number;
  screenshotSrc?: string;
}> = ({
  className = "",
  delay = 0.4,
  screenshotSrc = "/picturist-screenshot.png", // Default path, can be overridden
}) => {
  const [imageError, setImageError] = useState(false);

  // If the actual screenshot is not available, we'll render a fallback mockup
  const renderFallbackMockup = () => {
    return (
      <div className="bg-white p-5">
        <div className="flex min-h-[500px] md:min-h-[600px]">
          {/* Left sidebar */}
          <div className="w-36 border-r border-slate-100 p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs text-slate-500">
                1 article
              </div>
              <div className="w-5 h-5 rounded-full bg-blue-50"></div>
            </div>

            {/* Document selector */}
            <div className="bg-blue-50 rounded-md p-2 mb-1">
              <div className="w-full h-4 bg-blue-100 mb-2 rounded"></div>
              <div className="pl-4">
                <div className="w-20 h-3 bg-slate-200 mb-2 rounded"></div>
                <div className="w-20 h-3 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col">
            {/* Toolbar */}
            <div className="h-12 border-b border-slate-100 flex items-center px-4 justify-between">
              <div></div>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-6 bg-slate-100 rounded"></div>
                <div className="w-16 h-6 bg-blue-500 rounded"></div>
              </div>
            </div>

            {/* Article content */}
            <div className="flex-1 p-6">
              <div className="max-w-3xl mx-auto">
                <div className="w-full h-4 bg-slate-200 mb-3 rounded"></div>
                <div className="w-4/5 h-4 bg-slate-200 mb-3 rounded"></div>
                <div className="w-3/5 h-4 bg-slate-200 mb-6 rounded"></div>

                {/* Illustration placeholder */}
                <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-teal-50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-teal-500 flex flex-col items-center">
                      <svg
                        className="w-10 h-10 mb-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 9V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="6"
                          rx="1"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M9 12L12 15L15 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 15V8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-sm font-medium">
                        Screenshot not found
                      </span>
                      <span className="text-xs">
                        Please add picturist-screenshot.png
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main Browser Mockup with the actual screenshot or fallback */}
      <motion.div
        className="relative overflow-hidden rounded-xl bg-white shadow-2xl border border-slate-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay,
        }}
      >
        {/* Browser Header */}
        <div className="h-12 bg-slate-50 border-b border-slate-200 flex items-center px-4">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-coral-400"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <div className="w-3 h-3 rounded-full bg-teal-400"></div>
          </div>
          <div className="flex-1 mx-auto max-w-md">
            <div className="bg-white rounded-md h-7 flex items-center px-3 text-xs text-slate-500 border border-slate-200">
              <span>article-ai.picturist.app</span>
            </div>
          </div>
        </div>

        {/* Screenshot or Fallback Content */}
        {imageError ? (
          renderFallbackMockup()
        ) : (
          <div className="relative">
            <ImageWithFallback
              src={screenshotSrc}
              alt="Picturist AI Article Illustration Tool"
              width={1200}
              height={800}
              className="w-full h-auto"
              onError={() => setImageError(true)}
            />
          </div>
        )}
      </motion.div>

      {/* Call to action button positioned at bottom right */
      }
      <motion.div
        className="absolute bottom-6 right-6 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.8, duration: 0.6 }}
      >
        <button onClick={() => window.location.href = 'https://app.picturist.ai/sign-up'} className="py-2 px-4 bg-[#1E4A52] text-white text-sm font-medium rounded-lg shadow-sm hover:bg-[#154145] transition-all flex items-center gap-1.5">
          <span>Sign up</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </motion.div>

      {/* Reflection Effect */}
      <div className="absolute left-0 right-0 -bottom-16 h-16 bg-gradient-to-b from-black/10 to-transparent blur-md mx-[10%] rounded-full opacity-40"></div>
    </div>
  );
};