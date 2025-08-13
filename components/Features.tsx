import React from "react";
import { Button } from "./ui-custom/Button";
import { ArrowRight, FileText, Palette, Image, Layers, Target, Download } from "lucide-react";
import { motion } from "framer-motion";
import { MotionWrapper } from "./ui-custom/MotionWrapper";

// Define the feature cards data
const features = [
  {
    icon: <FileText className="w-5 h-5" />,
    title: "Smart Content Analysis",
    description: "Our AI identifies key themes and topics in your content to create relevant illustrations"
  },
  {
    icon: <Palette className="w-5 h-5" />,
    title: "Multiple Style Options",
    description: "Choose from a variety of artistic styles to match your brand's unique voice and aesthetic"
  },
  {
    icon: <Image className="w-5 h-5" />,
    title: "Custom Illustrations",
    description: "Generate unique, high-quality illustrations that perfectly complement your written content"
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: "Seamless Integration",
    description: "Works with your favorite publishing platforms like WordPress, Medium, and Substack"
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: "Targeted Visual Storytelling",
    description: "Create illustrations that enhance your message and resonate with your audience"
  },
  {
    icon: <Download className="w-5 h-5" />,
    title: "Easy Export Options",
    description: "Download your illustrations in multiple formats for any digital or print use case"
  }
];

// Feature card component
const FeatureCard = ({ icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E6F2F3] to-[#1E4A52]/10 flex items-center justify-center text-[#1E4A52]">
          {icon}
        </div>
        <h3 className="font-serif font-bold text-[#292D31]">{title}</h3>
      </div>
      <p className="text-[#6B7280] pl-14">{description}</p>
    </motion.div>
  );
};

export const Features = () => {
  // Return null to completely remove this component from rendering
  return null;
  
  /* Original section removed as requested
  return (
    <section className="py-16 md:py-24 bg-[#FEFCF8] relative overflow-hidden">
      <!-- Decorative circles -->
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-[#E6F2F3]/30 blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#F7F6F4]/50 blur-3xl translate-y-1/3 translate-x-1/3"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <MotionWrapper variant="fadeInUp" className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-[#E6F2F3] text-[#1E4A52] rounded-full text-sm font-medium mb-4">
            For Artists, by Artists
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#292D31] mb-6">
            Everything You Need to Create<br />
            <span className="text-[#1E4A52]">Amazing Illustrations</span>
          </h2>
          
          <p className="text-[#6B7280] text-lg max-w-2xl mx-auto mb-3">
            Picturist combines AI-powered analysis with stunning visuals to transform your 
            content creation process
          </p>
        </MotionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.2 + index * 0.1}
            />
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <Button 
            variant="primary" 
            size="lg" 
            className="px-8 py-3 bg-[#1E4A52] hover:bg-[#154145] text-white rounded-full shadow-md transition-all"
            onClick={() => window.location.href = 'https://app.picturist.ai/sign-up'}
          >
            <span>Sign up</span>
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
  */
};