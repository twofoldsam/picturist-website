
import React from "react";
import { motion } from "framer-motion";
import { BrowserMockup } from "./DeviceMockup";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export const PicturistMockup: React.FC<{
  className?: string;
  delay?: number;
}> = ({ 
  className = "", 
  delay = 0.4 
}) => {
  // We'll create a product screenshot URL that I can add later
  const productScreenshotUrl = "/picturist-article-ai-screenshot.png";
  
  return (
    <div className={`relative ${className}`}>
      {/* Main Browser Mockup */}
      <BrowserMockup
        imageSrc={productScreenshotUrl}
        altText="Picturist AI Article Illustration Tool"
        delay={delay}
      />
      
      {/* Floating UI Elements */}
      <motion.div
        className="absolute -top-8 -right-6 md:-right-8 w-48 max-w-[200px] rounded-lg overflow-hidden shadow-lg bg-white border border-slate-200"
        initial={{ opacity: 0, y: 20, rotate: 5 }}
        animate={{ opacity: 1, y: 0, rotate: 5 }}
        transition={{ delay: delay + 0.3, duration: 0.4 }}
      >
        <div className="p-3 bg-teal-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-medium">
              A
            </div>
            <div>
              <p className="text-xs font-medium text-teal-900">Article AI</p>
              <p className="text-[10px] text-teal-600">Generating illustration...</p>
            </div>
          </div>
        </div>
        <div className="p-3 bg-white">
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-teal-500 rounded-full" 
              initial={{ width: "20%" }}
              animate={{ width: "70%" }}
              transition={{ 
                delay: delay + 0.5, 
                duration: 2,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
      </motion.div>
      
      {/* Floating Result Preview */}
      <motion.div
        className="absolute -bottom-6 -left-6 md:-left-8 w-40 md:w-48 rounded-lg overflow-hidden shadow-lg bg-white border border-slate-200"
        initial={{ opacity: 0, y: -20, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: -3 }}
        transition={{ delay: delay + 0.5, duration: 0.4 }}
      >
        <div className="p-2 border-b border-slate-100">
          <p className="text-[10px] text-center font-medium text-slate-500">Generated Illustration</p>
        </div>
        <div className="p-1">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1623944889288-3f60eacce3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
            alt="AI generated illustration"
            width={300}
            height={200}
            className="w-full h-auto rounded"
          />
        </div>
      </motion.div>
    </div>
  );
};
