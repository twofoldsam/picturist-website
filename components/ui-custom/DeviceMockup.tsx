
import React from "react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface DeviceMockupProps {
  imageSrc: string;
  altText?: string;
  className?: string;
  type?: "browser" | "app" | "mobile";
  delay?: number;
  showShadow?: boolean;
  showReflection?: boolean;
}

export const DeviceMockup: React.FC<DeviceMockupProps> = ({
  imageSrc,
  altText = "Product screenshot",
  className = "",
  type = "browser",
  delay = 0.2,
  showShadow = true,
  showReflection = true
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20, 
        delay 
      }}
    >
      {/* Device Frame */}
      <div className={`
        relative overflow-hidden rounded-xl bg-white
        ${showShadow ? "shadow-2xl" : ""}
        border border-slate-200
      `}>
        {/* Browser Header */}
        {type === "browser" && (
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
        )}
        
        {/* App Header */}
        {type === "app" && (
          <div className="h-10 bg-white border-b border-slate-100 flex items-center justify-center">
            <div className="font-medium text-sm text-teal-600">Picturist</div>
          </div>
        )}

        {/* Screenshot Content */}
        <div className="relative">
          <ImageWithFallback 
            src={imageSrc} 
            alt={altText}
            width={1200}
            height={800}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Reflection Effect */}
      {showReflection && (
        <div className="absolute left-0 right-0 -bottom-16 h-16 bg-gradient-to-b from-black/10 to-transparent blur-md mx-[10%] rounded-full opacity-40"></div>
      )}
    </motion.div>
  );
};

export const BrowserMockup: React.FC<Omit<DeviceMockupProps, "type">> = (props) => {
  return <DeviceMockup {...props} type="browser" />;
};

export const AppMockup: React.FC<Omit<DeviceMockupProps, "type">> = (props) => {
  return <DeviceMockup {...props} type="app" />;
};
