import React from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface StyleCardProps {
  name: string;
  description: string;
  tags: string[];
  isSelected: boolean;
  styleClassName: string;
}

const StyleCard: React.FC<StyleCardProps> = ({ 
  name, 
  description, 
  tags, 
  isSelected, 
  styleClassName 
}) => {
  return (
    <div className={`style-card relative border p-1 rounded-lg cursor-pointer transition-all 
      ${isSelected 
        ? 'border-[#1E4A52] bg-[#E6F2F3] shadow-sm' 
        : 'border-[#F7F6F4] bg-[#FEFCF8] hover:border-[#1E4A52] hover:translate-y-[-1px]'}`}
    >
      <div className={`selected-indicator absolute top-1 right-1 w-4 h-4 bg-[#1E4A52] rounded-full 
        flex items-center justify-center transition-all ${isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
      >
        <Check className="w-2 h-2 text-white" />
      </div>
      
      <div className={`style-preview w-full h-[40px] rounded-md mb-1 overflow-hidden relative ${styleClassName}`}>
        {/* Each style's specific elements are rendered based on the styleClassName */}
        {styleClassName === 'style-technical' && (
          <>
            <div className="technical-grid absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:8px_8px]"></div>
            <div className="technical-node absolute w-1.5 h-1.5 bg-white rounded-full top-[14px] left-[10px]"></div>
            <div className="technical-node-line absolute top-[15px] left-[12px] w-[15px] h-[1px] bg-white"></div>
          </>
        )}
        {styleClassName === 'style-whimsical' && (
          <>
            <div className="whimsical-dot absolute top-[8px] left-[8px] w-[8px] h-[8px] bg-white/80 rounded-full animate-float"></div>
            <div className="whimsical-sparkle absolute top-[10px] right-[8px] text-[8px] animate-sparkle">✨</div>
          </>
        )}
        {styleClassName === 'style-minimalist' && (
          <div className="minimalist-shape absolute top-[10px] left-[10px] w-[20px] h-[20px] border border-white/70 rounded"></div>
        )}
        {styleClassName === 'style-artistic' && (
          <div className="artistic-brush absolute top-[15px] left-[8px] w-[20px] h-[3px] bg-white/60 rounded-full rotate-45"></div>
        )}
      </div>
      
      <h4 className="style-name text-[10px] font-semibold text-[#292D31] mb-0.5">{name}</h4>
      
      <div className="style-tags flex flex-wrap gap-1">
        {tags.slice(0, 1).map((tag, index) => (
          <span key={index} className="style-tag bg-[#E6F2F3] text-[#1E4A52] px-1 py-0.5 rounded-full text-[6px] font-medium">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export const StylePickerCard: React.FC<{
  compact?: boolean;
}> = ({ compact = false }) => {
  const styles = [
    {
      name: "Technical",
      description: "Clean diagrams and flowcharts for technical documentation",
      tags: ["Diagrams", "Professional"],
      styleClassName: "style-technical bg-gradient-to-br from-[#667eea] to-[#764ba2]",
      isSelected: true
    },
    {
      name: "Whimsical",
      description: "Playful watercolor style for fiction",
      tags: ["Fantasy", "Creative"],
      styleClassName: "style-whimsical bg-gradient-to-br from-[#ff9a9e] to-[#fecfef]",
      isSelected: false
    },
    {
      name: "Minimalist",
      description: "Simple, clean designs with essential elements",
      tags: ["Simple", "Modern"],
      styleClassName: "style-minimalist bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]",
      isSelected: false
    },
    {
      name: "Artistic",
      description: "Hand-painted aesthetic with rich textures",
      tags: ["Painterly", "Rich"],
      styleClassName: "style-artistic bg-gradient-to-br from-[#ffecd2] to-[#fcb69f]",
      isSelected: false
    }
  ];

  if (compact) {
    return (
      <motion.div 
        className="style-picker-card-compact w-full bg-white rounded-lg overflow-hidden shadow-md border border-[#F7F6F4]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="p-1.5 bg-[#E6F2F3]/30 border-b border-[#F7F6F4]">
          <h3 className="text-[10px] font-semibold text-[#292D31]">Illustration Style</h3>
        </div>
        
        <div className="p-1.5 grid grid-cols-2 gap-1.5">
          {styles.slice(0, 4).map((style, index) => (
            <StyleCard 
              key={index}
              name={style.name}
              description={style.description}
              tags={style.tags}
              isSelected={style.isSelected}
              styleClassName={style.styleClassName}
            />
          ))}
        </div>
        
        <div className="p-1.5 bg-[#F7F6F4]/50 border-t border-[#F7F6F4] flex justify-between items-center">
          <p className="text-[8px] text-[#292D31]">
            Selected: <span className="font-semibold text-[#1E4A52]">Technical</span>
          </p>
          <button className="py-1 px-2 bg-[#1E4A52] text-white text-[8px] font-medium rounded hover:bg-[#154145] transition-all">
            Apply
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="style-picker-card w-full bg-white rounded-lg overflow-hidden shadow-lg border border-[#F7F6F4]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-2 bg-[#E6F2F3]/30 border-b border-[#F7F6F4]">
        <h3 className="text-xs font-semibold text-[#292D31]">Choose Illustration Style</h3>
        <p className="text-[8px] text-[#6B7280]">Select the perfect style for your content</p>
      </div>
      
      <div className="p-2 grid grid-cols-2 gap-2">
        {styles.slice(0, 4).map((style, index) => (
          <StyleCard 
            key={index}
            name={style.name}
            description={style.description}
            tags={style.tags}
            isSelected={style.isSelected}
            styleClassName={style.styleClassName}
          />
        ))}
      </div>
      
      <div className="p-2 bg-[#F7F6F4]/50 border-t border-[#F7F6F4] flex flex-col items-center">
        <p className="text-[10px] text-[#292D31] mb-1.5">
          Current: <span className="font-semibold text-[#1E4A52]">Technical</span>
        </p>
        <button className="py-1.5 px-3 bg-[#1E4A52] text-white text-[10px] font-medium rounded hover:bg-[#154145] transition-all">
          Apply to All Illustrations
        </button>
      </div>
    </motion.div>
  );
};