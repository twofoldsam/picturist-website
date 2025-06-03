
import React from "react";
import { motion } from "framer-motion";
import { BrowserMockup } from "./DeviceMockup";

export const ArticleAiMockup: React.FC<{
  className?: string;
  delay?: number;
}> = ({ 
  className = "", 
  delay = 0.4 
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Main Browser Mockup - We'll simulate the UI inside rather than using an external image */}
      <motion.div
        className="relative overflow-hidden rounded-xl bg-white shadow-2xl border border-slate-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 20, 
          delay 
        }}
      >
        {/* Browser Header */}
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
        
        {/* App UI - Recreating the screenshot */}
        <div className="flex min-h-[500px] md:min-h-[600px]">
          {/* Left sidebar */}
          <div className="w-36 border-r border-slate-100 p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs text-slate-500">1 article</div>
              <button className="w-5 h-5 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                <span className="text-xs">+</span>
              </button>
            </div>
            
            {/* Document selector */}
            <div className="bg-blue-50 rounded-md p-2 mb-1">
              <button className="w-full text-left">
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-slate-400 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-xs text-blue-600">Nathan and the Frog</span>
                </div>
              </button>
              
              <div className="mt-2 pl-4">
                <div className="flex items-center py-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-xs text-slate-700">Version 1</span>
                </div>
                <div className="flex items-center py-1">
                  <div className="w-2 h-2 rounded-full bg-slate-300 mr-2"></div>
                  <span className="text-xs text-slate-500">Version 2</span>
                </div>
              </div>
            </div>
            
            <div className="mt-auto">
              <button className="text-xs text-slate-500 flex items-center">
                <span className="mr-1">+</span>
                Add version
              </button>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1 flex flex-col">
            {/* Toolbar */}
            <div className="h-12 border-b border-slate-100 flex items-center px-4 justify-between">
              <div></div>
              <div className="flex items-center space-x-2">
                <button className="px-2 py-1 bg-white border border-slate-200 rounded-md text-xs text-slate-600 flex items-center">
                  <span className="mr-1">No Style</span>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs">
                  Illustrate
                </button>
              </div>
            </div>
            
            {/* Article content */}
            <div className="flex-1 p-6">
              <div className="max-w-3xl mx-auto">
                <p className="text-slate-700 text-sm leading-relaxed mb-4">
                  Nathan was a quiet boy who preferred sketching spaceships in his notebook over playing soccer at recess. He lived on the edge of Willow Creek, where the air always smelled like moss and something mysterious. Every afternoon after school, he'd wander down the winding path behind his house and sit by the stream to draw.
                </p>
                
                {/* Illustration - watercolor style representation of the image shown */}
                <div className="relative aspect-[4/3] rounded overflow-hidden bg-white">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cdefs%3E%3Cpattern id='watercolor' patternUnits='userSpaceOnUse' width='600' height='450'%3E%3Crect width='600' height='450' fill='%23e6f2e6'/%3E%3Cpath d='M0,0 C100,50 200,0 300,50 C400,100 500,50 600,100 L600,450 L0,450 Z' fill='%2386c286' opacity='0.3'/%3E%3Cpath d='M0,150 C100,100 200,200 300,150 C400,100 500,150 600,100 L600,450 L0,450 Z' fill='%2379b8d9' opacity='0.4'/%3E%3Cpath d='M300,0 C350,50 400,0 450,50 C500,100 550,50 600,100 L600,450 L300,450 Z' fill='%2367a267' opacity='0.2'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23watercolor)'/%3E%3C/svg%3E")`,
                    backgroundSize: 'cover'
                  }}></div>
                  
                  <div className="absolute inset-0">
                    {/* Watercolor Illustration - stylized boy drawing by a stream */}
                    <svg className="w-full h-full" viewBox="0 0 600 450" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))" }}>
                      {/* Trees */}
                      <path d="M40,450 C40,350 120,280 180,280 C240,280 300,350 300,450" fill="#75B798" opacity="0.5" />
                      <path d="M70,450 C70,320 140,250 200,250 C260,250 330,320 330,450" fill="#67A267" opacity="0.5" />
                      <path d="M120,450 C120,380 160,320 200,320 C240,320 280,380 280,450" fill="#4A7A4A" opacity="0.4" />
                      
                      <path d="M400,450 C400,380 440,320 480,320 C520,320 560,380 560,450" fill="#75B798" opacity="0.5" />
                      <path d="M430,450 C430,360 460,300 500,300 C540,300 570,360 570,450" fill="#67A267" opacity="0.5" />
                      
                      {/* Tree trunks */}
                      <rect x="195" y="350" width="10" height="100" fill="#8B5A2B" opacity="0.7" />
                      <rect x="495" y="330" width="8" height="120" fill="#8B5A2B" opacity="0.7" />
                      
                      {/* Stream */}
                      <path d="M240,330 C240,330 300,350 340,330 C380,310 420,330 450,350 C480,370 520,350 520,350 L520,450 L240,450 Z" fill="#7EB6E6" opacity="0.6" />
                      
                      {/* Rocks */}
                      <ellipse cx="280" cy="370" rx="15" ry="10" fill="#A9A9A9" opacity="0.7" />
                      <ellipse cx="320" cy="390" rx="20" ry="15" fill="#A9A9A9" opacity="0.7" />
                      <ellipse cx="420" cy="380" rx="12" ry="8" fill="#A9A9A9" opacity="0.7" />
                      
                      {/* Boy */}
                      <g transform="translate(350, 350)">
                        {/* Hair */}
                        <path d="M25,35 C15,25 15,15 25,5 C35,-5 55,-5 65,5 C75,15 75,25 65,35" fill="#FFD700" opacity="0.9" />
                        
                        {/* Face */}
                        <ellipse cx="45" cy="30" rx="25" ry="30" fill="#FFE0BD" />
                        
                        {/* Eyes */}
                        <ellipse cx="35" cy="25" rx="3" ry="2" fill="#704214" />
                        <ellipse cx="55" cy="25" rx="3" ry="2" fill="#704214" />
                        
                        {/* Mouth */}
                        <path d="M40,40 Q45,45 50,40" stroke="#704214" strokeWidth="1.5" fill="none" />
                        
                        {/* Body */}
                        <rect x="30" y="60" width="30" height="40" fill="#63A3DD" />
                        
                        {/* Arms */}
                        <rect x="20" y="65" width="10" height="30" fill="#63A3DD" />
                        <rect x="60" y="65" width="10" height="20" fill="#63A3DD" />
                        
                        {/* Notebook */}
                        <rect x="70" y="70" width="30" height="25" fill="#FFFFFF" />
                        
                        {/* Drawing on notebook */}
                        <path d="M80,80 L85,75 L90,80 L95,75" stroke="#000000" strokeWidth="1" />
                        <ellipse cx="87" cy="85" rx="5" ry="2" fill="none" stroke="#000000" strokeWidth="1" />
                        
                        {/* Legs */}
                        <rect x="35" y="100" width="8" height="30" fill="#4682B4" />
                        <rect x="48" y="100" width="8" height="20" fill="#4682B4" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Floating UI Elements */}
      <motion.div
        className="absolute -top-8 -right-6 md:-right-10 w-48 md:w-56 rounded-lg overflow-hidden shadow-lg bg-white border border-slate-200"
        initial={{ opacity: 0, y: 20, rotate: 5 }}
        animate={{ opacity: 1, y: 0, rotate: 5 }}
        transition={{ delay: delay + 0.3, duration: 0.4 }}
      >
        <div className="p-3 bg-blue-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              A
            </div>
            <div>
              <p className="text-xs font-medium text-blue-900">Article AI</p>
              <p className="text-[10px] text-blue-700">Illustration generated</p>
            </div>
          </div>
        </div>
        <div className="p-3 bg-white">
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full w-full" />
          </div>
          <div className="mt-2 text-[10px] text-green-600 flex items-center">
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Story illustration complete
          </div>
        </div>
      </motion.div>
      
      {/* Floating Style Selection UI */}
      <motion.div
        className="absolute -bottom-6 -left-6 md:-left-10 w-40 md:w-48 rounded-lg overflow-hidden shadow-lg bg-white border border-slate-200"
        initial={{ opacity: 0, y: -20, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: -3 }}
        transition={{ delay: delay + 0.5, duration: 0.4 }}
      >
        <div className="p-2 border-b border-slate-100">
          <p className="text-[10px] text-center font-medium text-slate-500">Illustration Style</p>
        </div>
        <div className="p-2 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-blue-600 font-medium">Watercolor</span>
            <div className="w-4 h-4 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Digital Art</span>
            <div className="w-4 h-4 rounded-full border border-slate-300"></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Pencil Sketch</span>
            <div className="w-4 h-4 rounded-full border border-slate-300"></div>
          </div>
        </div>
      </motion.div>
      
      {/* Reflection Effect */}
      <div className="absolute left-0 right-0 -bottom-16 h-16 bg-gradient-to-b from-black/10 to-transparent blur-md mx-[10%] rounded-full opacity-40"></div>
    </div>
  );
};
