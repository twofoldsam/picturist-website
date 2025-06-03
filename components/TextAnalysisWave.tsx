import React from "react";
import { motion } from "framer-motion";

interface TextAnalysisWaveProps {
  isAnalyzing: boolean;
  text: string;
}

// This component is preserved but no longer used in the ContentTypeShowcase
export const TextAnalysisWave: React.FC<TextAnalysisWaveProps> = ({ isAnalyzing, text }) => {
  if (!isAnalyzing) return null;
  
  return (
    <motion.div 
      className="absolute inset-0 pointer-events-none overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Gradient overlay with subtle teal tint */}
      <div className="absolute inset-0 bg-[#E6F2F3]/10"></div>
      
      {/* Analysis wave animation */}
      <div 
        className="absolute inset-0 animate-analysis-wave"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(30, 74, 82, 0.15), transparent)',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
    </motion.div>
  );
};