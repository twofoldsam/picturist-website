import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Info, MessageSquare, Wand2, RefreshCcw } from "lucide-react";
import { MotionWrapper } from "./ui-custom/MotionWrapper";
import { Button } from "./ui-custom/Button";
import { ImageWithFallback } from './figma/ImageWithFallback';

export const InteractiveDemoSection = () => {
  // Track the current state of the demo
  const [demoState, setDemoState] = useState<'initial' | 'loading' | 'results' | 'generating' | 'generated'>('initial');
  
  // Handle the "Illustrate" button click
  const handleIllustrate = () => {
    // Set to loading state
    setDemoState('loading');
    
    // After 3 seconds, transition to results state
    setTimeout(() => {
      setDemoState('results');
    }, 3000);
  };
  
  // Handle the "Generate" button click
  const handleGenerate = () => {
    // Set to generating state
    setDemoState('generating');
    
    // After 3 seconds, transition to generated state
    setTimeout(() => {
      setDemoState('generated');
    }, 3000);
  };

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4">
        <MotionWrapper>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#292D31] mb-12">
            Experience the Picturist <span className="text-[#1E4A52]">Workflow</span>
          </h2>
        </MotionWrapper>

        <MotionWrapper delay={0.2}>
          <div className="max-w-5xl mx-auto">
            {/* Hero Demo Container */}
            <div className="flex flex-col md:flex-row bg-[#FEFCF8] rounded-xl overflow-hidden border border-[#F7F6F4] shadow-xl">
              {/* Left Panel - Document Editor */}
              <div className="flex-1 bg-white p-6 border-r border-[#F7F6F4] relative">
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#F7F6F4]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-[#1E4A52] rounded flex items-center justify-center">
                      <Star size={14} className="text-white" />
                    </div>
                    <span className="font-medium text-[#292D31]">Picturist</span>
                  </div>
                </div>
                
                <div className="font-serif space-y-6">
                  {/* First paragraph with conditional shimmer effect during loading and highlight in results */}
                  <div className="relative">
                    {/* In results state, show the paragraph with the highlighted part */}
                    {demoState === 'results' || demoState === 'generating' || demoState === 'generated' ? (
                      <p className="text-[#292D31] leading-relaxed">
                        <span>One stormy night, </span>
                        <span className={`relative inline`}>
                          <span className="relative z-10">a soaked and shivering girl named Luma knocked on Elior's door.</span>
                        </span>
                        <span> She had no family, only a small pouch of gears and springs—remnants of her father's broken timepiece. Seeing something rare in her eyes, Elior took her in and began teaching her the secrets of mechanical magic.</span>
                      </p>
                    ) : (
                      <p 
                        className={`text-[#292D31] leading-relaxed ${
                          demoState === 'loading' 
                            ? 'bg-gradient-to-r from-[#FEFCF8] via-[#E6F2F3] to-[#FEFCF8] animate-shimmer' 
                            : ''
                        }`}
                      >
                        One stormy night, a soaked and shivering girl named Luma knocked on Elior's door. She had no family, only a small pouch of gears and springs—remnants of her father's broken timepiece. Seeing something rare in her eyes, Elior took her in and began teaching her the secrets of mechanical magic.
                      </p>
                    )}
                    
                    {/* Analysis highlight animation only shows when transitioning from loading to results */}
                    {demoState === 'results' && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E6F2F3]/30 to-transparent"
                        initial={{ opacity: 0, x: "-100%" }}
                        animate={{ 
                          opacity: [0, 0.3, 0], 
                          x: ["100%", "0%", "-100%"] 
                        }}
                        transition={{ 
                          duration: 2,
                        }}
                      />
                    )}
                    
                    {/* Cursor blink */}
                    <motion.span 
                      className="inline-block w-[2px] h-[20px] bg-[#1E4A52] ml-[2px]"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 1,
                      }}
                    />
                  </div>
                  
                  {/* Second paragraph with lower opacity */}
                  <p className="text-[#292D31] opacity-40 leading-relaxed">
                    Luma learned quickly. Her fingers danced like music over cogs and coils. But one day, she discovered a locked drawer in the back of the workshop. Inside was a blueprint for <em>The Eternal Clock</em>—a design said to bend time itself. Elior had abandoned the project, fearing the cost of tampering with time.
                  </p>
                </div>

                {/* Illustrate button - only shown in initial state */}
                {demoState === 'initial' && (
                  <div className="mt-8 flex justify-end">
                    <Button 
                      variant="primary"
                      size="lg"
                      className="group"
                      onClick={handleIllustrate}
                    >
                      <Wand2 size={18} className="mr-2" />
                      <span>Illustrate</span>
                    </Button>
                  </div>
                )}

                {/* Loading indicator - only shown during loading state */}
                {demoState === 'loading' && (
                  <div className="mt-8 flex justify-end">
                    <Button 
                      variant="secondary"
                      size="lg"
                      disabled
                    >
                      <div className="w-5 h-5 border-2 border-[#1E4A52] border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span>Analyzing...</span>
                    </Button>
                  </div>
                )}
              </div>

              {/* Right Panel - Based on different states */}
              {(demoState === 'results' || demoState === 'generating') && (
                <div className="flex-none w-full md:w-[400px] bg-[#F7F6F4] p-6 relative">
                  <motion.div 
                    className="mb-5"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-sm font-semibold text-[#292D31]">AI Suggestions</h3>
                    <p className="text-xs text-[#6B7280]">Intelligent illustration recommendations</p>
                  </motion.div>

                  {/* Suggestion Card */}
                  <motion.div 
                    className="bg-[#FEFCF8] border border-[#1E4A52] rounded-lg shadow-md overflow-hidden"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={demoState === 'results' ? { y: -2, boxShadow: "0 8px 12px -3px rgba(0, 0, 0, 0.1)" } : {}}
                  >
                    <div className="bg-[#E6F2F3]/50 p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-[#1E4A52] flex items-center justify-center">
                          <Star size={10} className="text-white" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Info size={14} className="text-[#6B7280] hover:text-[#292D31] cursor-pointer" />
                        <MessageSquare size={14} className="text-[#6B7280] hover:text-[#292D31] cursor-pointer" />
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <p className="text-sm font-medium text-[#1E4A52]">
                        Illustration of Luma knocking on Elior's door during the storm
                      </p>
                    </div>
                    
                    <div className="bg-white p-3 border-t border-[#F7F6F4]">
                      <div className="mb-2">
                        <h4 className="text-[10px] uppercase font-semibold text-[#6B7280]">Why This Location</h4>
                        <p className="text-xs text-[#292D31]">
                          This opening scene establishes the story's tone and introduces the main character in a visually compelling moment.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-[10px] uppercase font-semibold text-[#6B7280]">Illustration Goal</h4>
                        <p className="text-xs text-[#292D31]">
                          Create an atmospheric scene that draws readers into the story's world and establishes the relationship between characters.
                        </p>
                      </div>
                    </div>
                    
                    {demoState === 'results' ? (
                      <button 
                        className="m-3 py-2 px-4 bg-[#1E4A52] text-white text-xs font-medium rounded hover:bg-[#154145] transition-all animate-pulse-slow"
                        onClick={handleGenerate}
                      >
                        Generate
                      </button>
                    ) : (
                      <button 
                        className="m-3 py-2 px-4 bg-[#1E4A52] text-white text-xs font-medium rounded flex items-center justify-center"
                        disabled
                      >
                        <RefreshCcw size={14} className="mr-2 animate-spin" />
                        <span>Generating...</span>
                      </button>
                    )}
                  </motion.div>
                </div>
              )}
              
              {/* Generated Image Panel */}
              {demoState === 'generated' && (
                <div className="flex-none w-full md:w-[400px] bg-[#F7F6F4] p-6 relative">
                  <motion.div 
                    className="mb-5"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-sm font-semibold text-[#292D31]">Generated Illustration</h3>
                    <p className="text-xs text-[#6B7280]">AI-powered illustration from your text</p>
                  </motion.div>

                  {/* Generated Image */}
                  <motion.div
                    className="rounded-lg overflow-hidden shadow-md border border-[#1E4A52]"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
                  >
                    <div className="bg-[#E6F2F3]/50 p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-[#1E4A52] flex items-center justify-center">
                          <Star size={10} className="text-white" />
                        </div>
                        <span className="text-xs font-medium">Luma at the door</span>
                      </div>
                    </div>
                    
                    {/* The image - Updated to use a webp file */}
                    <div className="aspect-square w-full relative">
                      <ImageWithFallback
                        src="/images/luma-illustration.webp"
                        alt="Illustration of Luma knocking on Elior's door during a storm"
                        className="w-full h-full object-cover"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%'
                        }}
                      />
                    </div>
                    
                    <div className="bg-white p-3 border-t border-[#F7F6F4] flex justify-between items-center">
                      <span className="text-xs text-[#1E4A52]">Generated by Picturist</span>
                      <button className="text-xs text-[#1E4A52] hover:text-[#154145] flex items-center gap-1">
                        <RefreshCcw size={12} />
                        <span>Regenerate</span>
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Caption below */}
            <p className="text-center text-sm text-[#6B7280] mt-4">
              {demoState === 'initial' && "Click 'Illustrate' to generate AI-powered illustration suggestions"}
              {demoState === 'loading' && "Analyzing text to determine optimal illustration opportunities..."}
              {demoState === 'results' && "Picturist analyzes your text and suggests ideal illustration placement and style"}
              {demoState === 'generating' && "Creating illustration based on your story context..."}
              {demoState === 'generated' && "Picturist generates beautiful illustrations that match your story's mood and narrative"}
            </p>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
};