import React, { useState, useEffect } from "react";
import { Button } from "./ui-custom/Button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Play, ArrowRight, Check, Clock, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MotionWrapper } from "./ui-custom/MotionWrapper";
import {
  FloatingElement,
  UIElement,
} from "./ui-custom/FloatingElements";
import { MetricsGroup } from "./ui-custom/MetricCounter";
import { FeatureIconGroup } from "./ui-custom/FeatureIcons";
import { RotatingFramesGroup } from "./ui-custom/RotatingFrame";
import { PicturistScreenshotMockup } from "./ui-custom/PicturistScreenshotMockup";
import { PicturistSuggestionCard } from "./ui-custom/PicturistSuggestionCard";
import { SketchyUnderline } from "./ui-custom/SketchyUnderline";
import { VideoDemo } from "./ui-custom/VideoDemo";
import { useVideoModal } from "./ui-custom/VideoModal";

export const Hero = () => {
  // Calculate days until beta launch
  const [daysUntilLaunch, setDaysUntilLaunch] = useState(0);
  const [showSuggestion, setShowSuggestion] = useState(true);
  const { openVideo } = useVideoModal();
  
  useEffect(() => {
    const calculateDays = () => {
      const launchDate = new Date('August 31, 2025 00:00:00');
      const today = new Date();
      const timeDiff = launchDate.getTime() - today.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      setDaysUntilLaunch(daysDiff > 0 ? daysDiff : 0);
    };
    
    calculateDays();
  }, []);

  // Parallax scroll effect
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -30]);
  const y2 = useTransform(scrollY, [0, 300], [0, -15]);
  const y3 = useTransform(scrollY, [0, 300], [0, -60]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  const goToSignUp = () => {
    window.location.href = 'https://app.picturist.ai/sign-up';
  };
  const goToSignIn = () => {
    window.location.href = 'https://app.picturist.ai/auth/signin';
  };

  // Handle watch demo click
  const handleWatchDemo = () => {
    openVideo(
      "/videos/picturist-demo.mp4",
      "Watch Picturist in Action",
      "See how AI transforms your content into stunning illustrations"
    );
  };

  // Story excerpt for the background
  const clockmakerStory = `
    In a small village nestled between whispering woods and a silver lake, there lived an old clockmaker named Elior. His tiny shop, Timely Wonders, was filled with clocks that didn't just tell time—they told stories. Some ticked with the rhythm of ancient poems, while others chimed with lullabies from forgotten kingdoms.

    One stormy night, a soaked and shivering girl named Luma knocked on Elior's door. She had no family, only a small pouch of gears and springs—remnants of her father's broken timepiece. Seeing something rare in her eyes, Elior took her in and began teaching her the secrets of mechanical magic.

    Luma learned quickly. Her fingers danced like music over cogs and coils. But one day, she discovered a locked drawer in the back of the workshop. Inside was a blueprint for The Eternal Clock—a design said to bend time itself. Elior had abandoned the project, fearing the cost of tampering with time.

    But Luma, curious and headstrong, rebuilt it in secret.
  `;

  // Suggestion card data - updated for the clockmaker story
  const suggestionCardSections = [
    {
      title: "WHY THIS LOCATION",
      content: "The discovery of the Eternal Clock blueprint represents a pivotal moment in the story, establishing both mystery and the main conflict that will drive the narrative forward."
    },
    {
      title: "ILLUSTRATION GOAL",
      content: "Visualize Luma finding the ancient blueprint in the workshop's hidden drawer, capturing her curiosity and the magical, antiqued quality of the clockmaker's mysterious design."
    },
    {
      title: "VISUAL APPROACH",
      content: "A workshop scene bathed in warm, golden light with Luma illuminated by a single ray as she examines the glowing blueprint with mechanical elements that seem to move on the page."
    }
  ];

  const metrics = [
    { value: 5000, label: "Articles illustrated", suffix: "+" },
    { value: 98, label: "Satisfaction rate", suffix: "%" },
    { value: 99, label: "Faster than manual", suffix: "%" },
  ];

  return (
    <section className="relative pt-8 md:pt-12 pb-24 md:pb-32 bg-white overflow-hidden">
      {/* Elegant background texture/pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gold accent element - top right */}
        <motion.div
          style={{ y: y1, opacity }}
          className="absolute top-20 right-0 w-[25vw] h-[25vw] max-w-xl max-h-xl bg-[var(--picturist-gold)]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl"
        />
        
        {/* Teal accent element - bottom left */}
        <motion.div
          style={{ y: y2, opacity }}
          className="absolute bottom-20 left-0 w-[25vw] h-[25vw] max-w-xl max-h-xl bg-[var(--picturist-teal)]/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"
        />
        
        {/* Elegant paper texture overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmZmZmIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiNGN0Y2RjQiIHN0cm9rZS13aWR0aD0iMC41Ij48L3BhdGg+Cjwvc3ZnPg==')] opacity-30"/>
        
        {/* Subtle diagonal lines */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTU0LjUgNi41TDYgNTUiIHN0cm9rZT0iIzI5MkQzMSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWRhc2hhcnJheT0iMSA4Ii8+Cjwvc3ZnPg==')]"/>
      </div>

      {/* Main content container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
          {/* Headline and CTA - spans 7 columns on medium screens */}
          <div className="col-span-1 md:col-span-7 flex flex-col mb-10 md:mb-0">
            {/* Social proof indicator */}
            <MotionWrapper
              variant="fadeInUp"
              delay={0.05}
              className="mb-6"
            >
              <div className="inline-flex items-center px-3 py-1.5 bg-[var(--picturist-light-teal)] border border-[var(--picturist-teal)]/20 rounded-full mb-4 text-[var(--picturist-teal)] text-sm gap-1.5">
                <Check size={14} />
                <span>
                  <span className="font-medium">5,000+</span> illustrations created
                </span>
              </div>
            </MotionWrapper>

            <MotionWrapper
              variant="fadeInUp"
              delay={0.1}
              className="mb-6 md:mb-8"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-[var(--picturist-charcoal)] mb-5 leading-tight pt-[0px] pr-[24px] pb-[0px] pl-[0px] font-serif">
                Watch your words{" "}
                <span className="relative inline-block">
                  come to life
                  <SketchyUnderline color="#B8860B" height={10} />
                </span>{" "}
                instantly
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-[var(--picturist-text-muted)] max-w-3xl">
                From code tutorials to creative fiction,
                Picturist's AI delivers ready-to-publish visuals
                that match your text's tone.
              </p>
            </MotionWrapper>

            {/* CTA Buttons */}
            <MotionWrapper variant="fadeInUp" delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  weight="bold"
                  className="group shadow-md"
                  onClick={goToSignIn}
                >
                  <span>Start Illustrating</span>
                  <ArrowRight
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  weight="bold"
                  className="inline-flex items-center gap-2 shadow-sm"
                  onClick={handleWatchDemo}
                >
                  <Play size={18} />
                  Watch Demo
                </Button>
              </div>
            </MotionWrapper>

            {/* Enhanced social proof indicators */}
            <MotionWrapper variant="fadeInUp" delay={0.5}>
              <div className="mt-6 mb-4 flex flex-col space-y-3">
                <div className="text-sm text-[var(--picturist-text-muted)] flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <Check size={14} className="text-[var(--picturist-teal)]" />
                    <span>5,000+ illustrations created</span>
                  </div>
                  <span className="hidden sm:inline-block">
                    •
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Check size={14} className="text-[var(--picturist-teal)]" />
                    <span>1,000+ moments brought to life</span>
                  </div>
                </div>

                {/* Social proof avatars */}
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex -space-x-1.5">
                    <div className="w-6 h-6 rounded-full bg-[var(--picturist-light-teal)] border-2 border-white flex items-center justify-center text-xs text-[var(--picturist-teal)]">
                      SW
                    </div>
                    <div className="w-6 h-6 rounded-full border-2 border-white bg-[var(--picturist-soft-gray)] flex items-center justify-center text-xs text-[var(--picturist-text-muted)]">
                      JK
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[var(--picturist-soft-gray)] border-2 border-white flex items-center justify-center text-xs text-[var(--picturist-text-muted)]">
                      +
                    </div>
                  </div>
                  <span className="text-[var(--picturist-text-muted)]">
                    <span className="font-medium text-[var(--picturist-teal)]">
                      543+
                    </span>{" "}
                    creators already illustrating
                  </span>
                </div>
              </div>
            </MotionWrapper>
          </div>

          {/* Feature Cards Section - spans 5 columns on medium screens */}
          <div className="hidden md:flex md:col-span-5 items-center justify-center md:items-start md:justify-start">
            {/* Manuscript with Suggestion Card */}
            <MotionWrapper variant="fadeInUp" delay={0.4}>
              <div className="relative max-w-lg mx-auto">
                {/* Manuscript background - larger and more prominent */}
                <div className="relative bg-[#FEFCF8] p-6 pb-8 rounded-lg border border-[#F7F6F4] shadow-md max-w-full">
                  {/* Page curl effect */}
                  <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-[#F7F6F4] rounded-bl-lg shadow-md transform rotate-3"></div>
                  
                  {/* Header analysis indicators */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#B8860B]"></div>
                      <div className="text-xs text-[#6B7280]">Analysis complete</div>
                    </div>
                    <div className="text-xs text-[#6B7280]">Story: 641 words</div>
                  </div>
                  
                  {/* Story text with stylized first letter and interactive highlight */}
                  <div className="max-h-[350px] overflow-hidden text-[#292D31] leading-relaxed font-serif relative">
                    <p className="mb-6">
                      <span className="text-4xl font-bold float-left mr-2 mt-1">I</span>n a small village nestled between whispering woods and a silver lake, there lived an old clockmaker named Elior. His tiny shop, Timely Wonders, was filled with clocks that didn't just tell time—they told stories. Some ticked with the rhythm of ancient poems, while others chimed with lullabies from forgotten kingdoms.
                    </p>
                    
                    <p className="mb-6">
                      One stormy night, a soaked and shivering girl named Luma knocked on Elior's door. She had no family, only a small pouch of gears and springs—remnants of her father's broken timepiece. Seeing something rare in her eyes, Elior took her in and began teaching her the secrets of mechanical magic.
                    </p>
                    
                    <div className="relative">
                      <p className="mb-6">
                        Luma learned quickly. Her fingers danced like music over cogs and coils. But one day, she discovered a locked drawer in the back of the workshop. Inside was a blueprint for 
                        <span className="relative inline-block">
                          <span className="relative z-20"> The Eternal Clock</span>
                          <span className="absolute -inset-1 bg-[#E6F2F3] rounded z-10"></span>
                          {/* Suggestion trigger button */}
                          {!showSuggestion && (
                            <button 
                              className="absolute -right-6 top-0 w-5 h-5 bg-[#1E4A52] text-white rounded-full flex items-center justify-center z-30"
                              onClick={() => setShowSuggestion(true)}
                            >
                              +
                            </button>
                          )}
                        </span>
                        —a design said to bend time itself. Elior had abandoned the project, fearing the cost of tampering with time.
                      </p>
                    </div>
                    
                    <p className="mb-6">
                      But Luma, curious and headstrong, rebuilt it in secret.
                    </p>
                    
                    {/* Fade out effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#FEFCF8] to-transparent"></div>
                  </div>
                </div>
                
                {/* Suggestion popup card - moved further right and rotated */}
                {showSuggestion && (
                  <div className="absolute w-[60%] min-w-[280px] right-0 top-1/3 transform translate-x-[40%] rotate-12 z-30">
                    <motion.div 
                      className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden elegant-shadow"
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Header */}
                      <div className="bg-[#F7F6F4] p-3 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#1E4A52] flex items-center justify-center">
                          <Star size={12} className="text-white" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-[#292D31]">Picturist</span>
                          <span className="text-[10px] text-[#6B7280]">Suggestion overview</span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-4">
                        {suggestionCardSections.map((section, index) => (
                          <div key={index} className="mb-3 last:mb-0">
                            <h4 className="text-xs font-bold text-[#6B7280] mb-1">{section.title}</h4>
                            <p className="text-xs text-[#292D31]">{section.content}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            </MotionWrapper>
          </div>
        </div>

        {/* Visual divider/separator with animation */}
        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-[var(--picturist-soft-gray)] to-transparent my-16 md:my-20"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        />

        {/* Product Visualization - with significantly increased top margin */}
        <div className="relative max-w-6xl mx-auto mt-24 md:mt-32 lg:mt-36">
          {/* Main product visualization */}
          <motion.div
            style={{ y: y3 }}
            className="relative z-10"
          >
            {/* Using our video demo component */}
            <VideoDemo 
              videoSrc="/videos/picturist-demo.mp4"
              posterSrc="/images/picturist-demo-poster.png"
              title="Watch Picturist in Action"
              description="See how AI transforms your content into stunning illustrations"
            />

            {/* Call to action button positioned at bottom right - Removed as it's now part of PicturistScreenshotMockup */}
          </motion.div>

          {/* Feature Icons - directly below product screenshot with minimal separation */}
          <MotionWrapper 
            className="mt-8 md:mt-10 bg-[var(--picturist-warm-white)]/90 backdrop-blur-sm py-6 px-4 rounded-lg border-t border-[var(--picturist-soft-gray)]"
            delay={0.6}
          >
            <FeatureIconGroup />
          </MotionWrapper>
        </div>

            {/* Mid-page CTA */}
        <MotionWrapper
          variant="fadeInUp"
          delay={0.2}
        >
          <div className="mt-16 md:mt-24 text-center">
            <Button
              variant="primary"
              size="lg"
              weight="bold"
              className="group shadow-md"
                  onClick={goToSignIn}
            >
                  <span>Start Illustrating</span>
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-sm text-[var(--picturist-text-muted)] mt-3">
                  Create your account to get started
            </p>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
};