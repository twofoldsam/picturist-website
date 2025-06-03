import React from "react";
import { Check, Settings, Download, RefreshCw, Trash } from "lucide-react";

export const IllustrationShowcase: React.FC = () => {
  return (
    <div className="illustration-showcase max-w-[600px] mx-auto bg-white rounded-xl overflow-hidden shadow-lg">
      <div className="illustration-container relative overflow-hidden cursor-pointer">
        {/* Generated Illustration - using a styled div for the placeholder */}
        <div className="illustration-placeholder w-full h-[400px] relative overflow-hidden bg-gradient-to-br from-[#4a90e2] via-[#357abd] to-[#1e6091]">
          {/* Animated rain effect */}
          <div className="rain-effect absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(100,149,237,0.1)]">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="rain-drop absolute w-[2px] h-[20px] bg-white/60"
                style={{
                  left: `${10 + (i * 15)}%`,
                  animation: `rainfall 1.5s linear infinite`,
                  animationDelay: `${(i * 0.2) % 1.2}s`
                }}
              />
            ))}
          </div>

          {/* Door/character representation using pseudo-elements */}
          <div className="absolute top-[20%] left-[15%] w-[80px] h-[120px] bg-white/90 rounded-lg shadow-md" />
          <div className="absolute bottom-[20px] left-[20px] text-white text-lg font-medium drop-shadow-md">
            Luma at the Workshop Door
          </div>
        </div>
        
        {/* Success Indicator */}
        <div className="success-indicator absolute top-4 right-4 w-8 h-8 bg-[#1E4A52] rounded-full flex items-center justify-center animate-successPulse">
          <Check className="w-4 h-4 text-white" />
        </div>
        
        {/* Hover Controls - not interactive but showing the UI */}
        <div className="hover-controls absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="controls-group flex gap-3">
            <button className="control-btn w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:translate-y-[-2px] hover:scale-110 transition-all">
              <Settings className="w-5 h-5 text-[#292D31]" />
            </button>
            <button className="control-btn w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:translate-y-[-2px] hover:scale-110 transition-all">
              <Download className="w-5 h-5 text-[#292D31]" />
            </button>
            <button className="control-btn regenerate w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:translate-y-[-2px] hover:scale-110 transition-all">
              <RefreshCw className="w-5 h-5 text-[#1E4A52]" />
            </button>
            <button className="control-btn delete w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:translate-y-[-2px] hover:scale-110 transition-all">
              <Trash className="w-5 h-5 text-[#dc2626]" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Caption */}
      <div className="illustration-caption p-4 bg-[#F7F6F4] border-t border-[#F7F6F4]">
        <p className="caption-text text-sm text-[#292D31] text-center m-0 italic">
          "Luma knocking on Elior's workshop door during the storm"
        </p>
        <div className="caption-metadata flex justify-between items-center mt-2 text-xs text-[#6B7280]">
          <span className="style-tag bg-[#E6F2F3] text-[#1E4A52] px-2 py-0.5 rounded-full text-[10px] font-medium">
            Atmospheric
          </span>
          <span className="generation-time text-[10px] text-[#6B7280]">
            Generated in 12s
          </span>
        </div>
      </div>
    </div>
  );
};