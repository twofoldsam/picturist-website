import React from "react";
import { motion } from "framer-motion";
import { MotionWrapper } from "./ui-custom/MotionWrapper";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Defining some sample logos for the social proof section
const logos = [
  { name: "TechCrunch", width: "120px" },
  { name: "Wired", width: "80px" },
  { name: "Forbes", width: "100px" },
  { name: "Product Hunt", width: "130px" },
  { name: "The Verge", width: "110px" },
];

// Mini testimonials
const testimonials = [
  {
    quote: "Picturist transformed our content strategy. The illustrations perfectly match our brand voice every time.",
    author: "Sarah Williams",
    role: "Content Director",
    initials: "SW"
  },
  {
    quote: "We reduced our illustration time by 90%. Now our writers can focus on writing, not hunting for visuals.",
    author: "Jason Kim",
    role: "Editor-in-Chief",
    initials: "JK"
  }
];

export const SocialProof = () => {
  // Return null to completely remove this component from rendering
  return null;
  
  /* Original commented out content preserved for reference:
  return (
    <section className="py-12 bg-white border-t border-slate-50">
      <div className="container mx-auto px-4">
        {/* 
        Commented out as requested:
        
        Featured in logos section
        <MotionWrapper variant="fadeIn">
          <div className="text-center mb-2">
            <p className="text-sm text-slate-500">Featured in</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 py-4 mb-6">
            {logos.map((logo, index) => (
              <motion.div
                key={index}
                className="opacity-60 hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div 
                  style={{ width: logo.width }} 
                  className="h-6 bg-slate-300 rounded"
                >
                  <span className="sr-only">{logo.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </MotionWrapper>
        
        Metrics section
        <div className="flex justify-center mb-8">
          <MotionWrapper variant="fadeInUp">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 py-2">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-teal-600">543+</div>
                <div className="text-sm text-slate-600">Waitlist Sign-ups</div>
              </div>
              
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-coral-600">32 days</div>
                <div className="text-sm text-slate-600">Until Beta Launch</div>
              </div>
              
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-teal-600">87%</div>
                <div className="text-sm text-slate-600">Time Saved</div>
              </div>
            </div>
          </MotionWrapper>
        </div>
        
        Mini testimonials section
        <MotionWrapper variant="fadeInUp" delay={0.2}>
          <div className="flex flex-col md:flex-row gap-4 justify-center max-w-3xl mx-auto">
            {testimonials.map((item, index) => (
              <div 
                key={index} 
                className="flex-1 bg-slate-50 p-4 rounded-lg border border-slate-100 relative"
              >
                <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full flex items-center justify-center bg-white border border-slate-100 shadow-sm">
                  <div className={`w-4 h-4 rounded-full ${index === 0 ? 'bg-teal-100 text-teal-600' : 'bg-coral-100 text-coral-600'} flex items-center justify-center text-[10px]`}>
                    {item.initials}
                  </div>
                </div>
                <p className="text-sm italic text-slate-600 mb-2">{item.quote}</p>
                <div className="text-xs text-right">
                  <p className="font-medium text-charcoal">{item.author}</p>
                  <p className="text-slate-500">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </MotionWrapper>
        */}
      </div>
    </section>
  );
  */
};