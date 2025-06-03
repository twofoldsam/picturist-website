import React from "react";
import { FileText, Palette, Image, Layers, Target, Download } from "lucide-react";
import { motion } from "framer-motion";
import { MotionWrapper } from "./MotionWrapper";

interface FeatureIconProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  delay?: number;
}

const FeatureIcon: React.FC<FeatureIconProps> = ({ 
  icon, 
  label, 
  description, 
  delay = 0 
}) => {
  return (
    <motion.div 
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay, 
        duration: 0.3,
        ease: "easeOut"
      }}
    >
      <div className="w-10 h-10 md:w-12 md:h-12 bg-[var(--picturist-light-teal)] rounded-lg flex items-center justify-center mb-2 shadow-sm border border-[var(--picturist-teal)]/10">
        <div className="text-[var(--picturist-teal)]">{icon}</div>
      </div>
      <h4 className="font-medium text-xs md:text-sm text-[var(--picturist-charcoal)] mb-0.5">{label}</h4>
      {description && (
        <p className="text-[10px] md:text-xs text-[var(--picturist-text-muted)] max-w-[120px]">{description}</p>
      )}
    </motion.div>
  );
};

export const FeatureIconGroup: React.FC = () => {
  const features = [
    {
      icon: <FileText size={18} />,
      label: "Intelligent Analysis",
      description: "Understands your text content perfectly"
    },
    {
      icon: <Target size={18} />,
      label: "Perfect Placement",
      description: "Suggests the best spots for illustrations"
    },
    {
      icon: <Palette size={18} />,
      label: "Style Matching",
      description: "Adapts to your writing style and tone"
    },
    {
      icon: <Image size={18} />,
      label: "Custom Illustrations",
      description: "Creates visuals that fit your content"
    },
    {
      icon: <Download size={18} />,
      label: "Easy Export",
      description: "Download in multiple file formats"
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-wrap justify-center gap-5 md:gap-8 lg:gap-12">
        {features.map((feature, index) => (
          <FeatureIcon 
            key={index}
            icon={feature.icon}
            label={feature.label}
            description={feature.description}
            delay={0.1 * index}
          />
        ))}
      </div>
    </div>
  );
};