import React from "react";
import { Play, ArrowRight } from "lucide-react";
import { MotionWrapper } from "./ui-custom/MotionWrapper";
import { motion } from "framer-motion";
import { Button } from "./ui-custom/Button";

export const Demo = () => {
  const goToSignUp = () => {
    window.location.href = 'https://app.picturist.ai/sign-up';
  };
  
  return (
    <section className="py-16 md:py-24 bg-white" id="demo">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <MotionWrapper>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1680582253150-fa056e077f2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button 
                  className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center text-teal-500 shadow-lg hover:bg-white transition-colors"
                  aria-label="Play demo video"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                >
                  <Play size={32} fill="currentColor" className="ml-1" />
                </motion.button>
              </div>
              
              {/* Demo Label */}
              <div className="absolute top-4 left-4">
                <div className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                  <p className="text-sm text-white">2 min demo</p>
                </div>
              </div>
            </div>
          </MotionWrapper>
          
          <MotionWrapper delay={0.3}>
            <div className="mt-8 text-center flex flex-col items-center">
              <h3 className="text-xl md:text-2xl font-semibold text-charcoal mb-3">
                See how Picturist transforms your content
              </h3>
              <p className="text-slate-600 mb-6 max-w-2xl">
                Watch our quick demo to see how Picturist analyzes your text and generates custom illustrations that perfectly match your content's tone and context.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  className="group"
                  onClick={goToSignUp}
                >
                  <span>Sign up</span>
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <div className="py-2 px-3 rounded-full bg-[#E6F2F3] border border-[#1E4A52]/20 text-sm text-[#1E4A52]">
                  Only {new Date('August 31, 2025').getTime() > new Date().getTime() 
                    ? Math.floor((new Date('August 31, 2025').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) 
                    : 0} days until beta launch!
                </div>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
};