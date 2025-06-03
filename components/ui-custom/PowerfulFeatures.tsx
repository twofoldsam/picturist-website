import React from "react";
import { motion } from "framer-motion";
import { MotionWrapper } from "./MotionWrapper";
import {
  FileText,
  Palette,
  Image,
  Layers,
  Target,
  Download,
} from "lucide-react";

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}

const Feature: React.FC<FeatureProps> = ({
  title,
  description,
  icon,
  color,
  delay = 0,
}) => {
  return (
    <motion.div
      className="flex flex-col items-start p-6 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
    >
      <div
        className={`w-12 h-12 rounded-lg ${color} text-white flex items-center justify-center mb-4`}
      >
        {icon}
      </div>
      <h3 className="font-semibold text-lg text-charcoal mb-2">
        {title}
      </h3>
      <p className="text-slate-600 text-sm">{description}</p>
    </motion.div>
  );
};

export const PowerfulFeatures: React.FC = () => {
  const features = [
    {
      title: "AI Text Analysis",
      description:
        "Aanalyze article content to suggest relevant illustrations.",
      icon: <FileText size={24} />,
      color: "bg-teal-500",
    },
    {
      title: "Styles",
      description:
        "Preset or custom styles to match your brand and content.",
      icon: <Palette size={24} />,
      color: "bg-coral-500",
    },
    {
      title: "Image Generation",
      description:
        "Create high-quality illustrations in seconds with our AI-powered engine.",
      icon: <Image size={24} />,
      color: "bg-teal-500",
    },
    {
      title: "Versions Control",
      description:
        "Generate several options with each prompt to find the perfect match.",
      icon: <Layers size={24} />,
      color: "bg-coral-500",
    },
    {
      title: "Style Matching",
      description:
        "Automatically match illustrations to your existing brand styles.",
      icon: <Target size={24} />,
      color: "bg-teal-500",
    },
    {
      title: "Smart Export",
      description:
        "Export in multiple formats optimized for web or print.",
      icon: <Download size={24} />,
      color: "bg-coral-500",
    },
  ];

  return (
    <div>
      <MotionWrapper variant="fadeInUp">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 bg-teal-50 text-teal-600 rounded-full text-sm mb-3">
            For Artists, by Artists
          </div>
          <h2 className="text-4xl font-bold text-charcoal mb-5">
            Everything You Need to Create
            <br />
            <span className="text-gradient bg-gradient-to-r from-teal-500 to-coral-500">
              Amazing Illustrations
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Picturist combines AI-powered analysis with stunning
            visuals to transform your content creation process
          </p>
        </div>
      </MotionWrapper>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Feature
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            color={feature.color}
            delay={0.2 + index * 0.1}
          />
        ))}
      </div>

      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
      >
        <button className="bg-gradient-to-r from-teal-500 to-coral-500 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
          Join the Waitlist
        </button>
        <p className="text-slate-500 mt-4">
          Start creating beautiful illustrations in seconds
        </p>
      </motion.div>
    </div>
  );
};