import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "./ui-custom/Button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Interface for the content type image configuration
interface ContentTypeImageConfig {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
}

// Define the content images with configurable properties
const contentImages: Record<string, ContentTypeImageConfig> = {
  story: {
    src: "/images/placeholder-story-illustration.png", // REPLACE with actual image path
    width: 180, // Customizable width
    alt: "Lighthouse during a storm with lightning",
  },
  technical: {
    src: "/images/placeholder-technical-illustration.png", // REPLACE with actual image path
    width: 180,
    alt: "OAuth flow diagram showing authentication process",
  },
  comic: {
    src: "/images/placeholder-comic-illustration.png", // REPLACE with actual image path
    width: 180,
    alt: "Comic panel showing Sarah with her phone",
  },
  blog: {
    src: "/images/placeholder-blog-illustration.png", // REPLACE with actual image path
    width: 180,
    alt: "Infographic showing productivity statistics",
  },
};

// Define the content types with expanded example copy
const contentTypes = [
  {
    id: "story",
    label: "Short Story",
    icon: "📖",
    description: "FICTION & CREATIVE WRITING",
    audience: "Authors & Storytellers",
    sampleText:
      "The old lighthouse keeper had seen many storms, but tonight felt different. As lightning illuminated the churning sea, he noticed something impossible—a ship with black sails approaching through the tempest, its crew moving with an otherworldly grace.\n\nEthan had tended to Blackrock Lighthouse for forty-three years, his weathered hands knowing every crevice of the stone tower. The isolation suited him; after Margaret's passing, the company of seabirds and the rhythmic sweep of the beacon across the water became his only companions.\n\nBut this night, as wind howled through the cracks in the mortar and rain lashed against the windows like tiny desperate fists, a chill ran through him that had nothing to do with the temperature. The ship shouldn't have been able to navigate the treacherous rocks that surrounded the lighthouse, especially in this gale. Yet it moved with deliberate purpose, neither fighting the waves nor yielding to them.",
    suggestions: [
      {
        id: 1,
        description:
          "Illustration of the lighthouse during the storm with lightning",
        locationRationale:
          "This opening scene establishes atmosphere and introduces supernatural elements",
        illustrationGoal:
          "Create dramatic tension and set the story's mysterious tone",
      },
    ],
    styleRecommendation: "Whimsical/Artistic",
  },
  {
    id: "technical",
    label: "Technical Article",
    icon: "⚙️",
    description: "DOCUMENTATION & TUTORIALS",
    audience: "Technical Writers",
    sampleText:
      "# Implementing OAuth 2.0 Authentication in Modern Web Applications\n\nTo implement OAuth 2.0 authentication, you'll need to establish a secure connection between your application and the authorization server. The flow begins when a user attempts to access a protected resource, triggering a redirect to the OAuth provider.\n\n## Understanding the OAuth 2.0 Flow\n\nThe OAuth 2.0 protocol follows a specific sequence of steps to authenticate users and authorize access to protected resources. Let's break down this process in detail:\n\n1. **Authorization Request**: When a user attempts to access a protected resource or feature, your application redirects them to the authorization server (e.g., Google, GitHub, or your custom OAuth provider).\n\n2. **User Authentication**: The authorization server authenticates the user, typically through a login page. This step is handled entirely by the OAuth provider, keeping credentials separate from your application.",
    suggestions: [
      {
        id: 1,
        description:
          "OAuth flow diagram showing user, app, and auth server interactions",
        locationRationale:
          "Complex authentication flow requires visual explanation",
        illustrationGoal:
          "Simplify technical concepts with clear, professional diagrams",
      },
    ],
    styleRecommendation: "Technical/Minimalist",
  },
  {
    id: "comic",
    label: "Comic",
    icon: "💭",
    description: "VISUAL STORYTELLING",
    audience: "Comic Creators",
    sampleText:
      '# DIGITAL GHOSTS - Issue #1\n\nPANEL 1: Wide establishing shot. Sarah (22, tech-savvy, nervous expression) sits in her apartment at night, surrounded by multiple screens showing security camera feeds, lines of code, and social media. A notification pops up on her phone.\n\nCAPTION: Sarah Murphy had locked down her digital life after the doxing incident last year. But tonight, technology would betray her again.\n\nPANEL 2: Close-up of Sarah\'s phone screen showing messages being sent from her account: "Meet me at midnight. Come alone. Harbinger Park. I know what you did."\n\nSARAH (thought bubble): "I didn\'t send this..."\n\nPANEL 3: Sarah\'s shocked expression in blue screen light, eyes wide with fear. Her hands are frozen above her keyboard.',
    suggestions: [
      {
        id: 1,
        description:
          "Panel layout showing Sarah looking at her phone in confusion",
        locationRationale:
          "Each panel needs distinct visual storytelling",
        illustrationGoal:
          "Build suspense through visual narrative progression",
      },
    ],
    styleRecommendation: "Artistic/Bold",
  },
  {
    id: "blog",
    label: "Blog Post",
    icon: "✍️",
    description: "BUSINESS & PERSONAL CONTENT",
    audience: "Content Creators",
    sampleText:
      "# 7 Science-Backed Strategies to Maximize Your Remote Work Productivity\n\nRemote work productivity depends on creating the right environment. Studies show that 73% of workers are more focused when they have a dedicated workspace, proper lighting, and minimal distractions. Here's how to optimize your home office setup for maximum efficiency and wellbeing.\n\n## The Science Behind Productive Spaces\n\nAccording to research published in the Journal of Environmental Psychology, your physical environment has a profound impact on cognitive function and work output. The Harvard Business Review reports that employees with optimized workspaces demonstrate up to 25% higher productivity compared to those working in suboptimal conditions.",
    suggestions: [
      {
        id: 1,
        description:
          "Infographic showing productivity statistics and workspace elements",
        locationRationale:
          "Statistics and advice benefit from visual reinforcement",
        illustrationGoal:
          "Make business content more engaging and shareable",
      },
    ],
    styleRecommendation: "Business/Professional",
  },
];

// Suggestion Card and Generated Image Component
const SuggestionWithImage = ({ suggestion, contentType }) => {
  // Get the image config for this content type
  const imageConfig = contentImages[contentType];

  return (
    <div className="suggestion-with-image-container relative w-full max-w-[330px] mx-auto pb-4 pr-4">
      {/* Main Suggestion Card */}
      <motion.div
        className="suggestion-card relative z-10 bg-[var(--picturist-light-teal)] rounded-xl p-4 shadow-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="card-header flex items-center gap-2 mb-2">
          <div className="star-icon bg-[var(--picturist-teal)] rounded-full w-4 h-4 flex items-center justify-center">
            <Star color="white" size={10} />
          </div>
          <span className="text-[var(--picturist-teal)] font-medium text-xs">
            Picturist Suggestion
          </span>
        </div>

        <p className="text-[#292D31] font-medium text-sm mb-2">
          {suggestion.description}
        </p>

        <div className="suggestion-details space-y-1.5 mb-3 text-xs">
          <div>
            <span className="text-[#6B7280] font-semibold text-[10px] uppercase tracking-wider block">
              WHY THIS LOCATION
            </span>
            <p className="text-[#292D31] text-xs">
              {suggestion.locationRationale}
            </p>
          </div>

          <div>
            <span className="text-[#6B7280] font-semibold text-[10px] uppercase tracking-wider block">
              ILLUSTRATION GOAL
            </span>
            <p className="text-[#292D31] text-xs">
              {suggestion.illustrationGoal}
            </p>
          </div>
        </div>

        <button className="generate-btn w-full bg-[var(--picturist-teal)] text-white border-none rounded-md py-1.5 px-3 text-xs font-medium">
          Generate
        </button>
      </motion.div>

      {/* Generated Image - positioned at bottom right corner with rotation */}
      <motion.div
        className="generated-image-container absolute -bottom-6 -right-6 bg-white rounded-lg shadow-md border border-[#E5E7EB] overflow-hidden z-20"
        initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
        animate={{ opacity: 1, scale: 1, rotate: 5 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        style={{
          transformOrigin: "bottom right",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          width: imageConfig.width
            ? `${imageConfig.width}px`
            : "180px",
        }}
      >
        <div
          className="relative"
        >
          <ImageWithFallback
            src={imageConfig.src}
            alt={
              imageConfig.alt ||
              `Generated illustration for ${contentType}`
            }
            className="object-cover w-full h-full"
          />
        </div>
      </motion.div>
    </div>
  );
};

export const ContentTypeShowcase = () => {
  const [activeType, setActiveType] = useState("story");

  // Get the active content type data
  const activeContent = contentTypes.find(
    (type) => type.id === activeType,
  );

  // Handle tab change
  const handleTabChange = (typeId) => {
    if (typeId === activeType) return;
    setActiveType(typeId);
  };

  const goToSignUp = () => {
    window.location.href = 'https://app.picturist.ai/sign-up';
  };

  // For the demo, we'll just use the first suggestion
  const primarySuggestion = activeContent.suggestions[0];

  return (
    <section className="py-24 md:py-32 bg-white" id="showcase">
      <div className="container mx-auto px-4">
        <div className="showcase-header text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif text-[var(--picturist-charcoal)] mb-4">
            Perfect Illustrations for Any Content
          </h2>
          <p className="text-lg md:text-xl text-[var(--picturist-text-muted)] max-w-2xl mx-auto">
            Whether you're writing fiction, technical
            documentation, comics, or blog posts, Picturist
            elevates your content with tailored illustrations.
          </p>
        </div>

        {/* Content Type Tabs - Enhanced Design */}
        <div className="tabs-container mb-10 overflow-x-auto">
          <div className="flex space-x-3 justify-center min-w-max md:flex-wrap md:min-w-0">
            {contentTypes.map((type) => (
              <motion.button
                key={type.id}
                className={`tab-button px-5 py-3 rounded-lg flex items-center gap-2.5 transition-all ${
                  activeType === type.id
                    ? "bg-[var(--picturist-teal)] text-white shadow-md"
                    : "bg-[var(--picturist-soft-gray)] text-[var(--picturist-text-muted)] hover:bg-[var(--picturist-light-teal)] hover:text-[var(--picturist-teal)]"
                }`}
                onClick={() => handleTabChange(type.id)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <span className="text-xl">{type.icon}</span>
                <span className="font-medium text-sm">
                  {type.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left Column - Text Content */}
          <div className="content-area">
            <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm relative overflow-hidden h-[300px]">
              <div className="mb-3">
                <span className="text-xs font-medium text-[var(--picturist-text-muted)] uppercase tracking-wider">
                  {activeContent.description}
                </span>
                <h3 className="text-lg font-serif font-bold text-[var(--picturist-teal)] mt-1">
                  {activeContent.label} Example
                </h3>
              </div>

              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeContent.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-xs text-[var(--picturist-charcoal)] leading-relaxed bg-[var(--picturist-soft-gray)]/40 p-3 rounded-lg relative h-[180px] overflow-hidden text-fade-out"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {activeContent.sampleText}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-auto flex justify-between items-center text-[10px] text-[var(--picturist-text-muted)] pt-2">
                <div>
                  Style:{" "}
                  <span className="text-[var(--picturist-teal)] font-medium">
                    {activeContent.styleRecommendation}
                  </span>
                </div>
                <div>
                  For:{" "}
                  <span className="font-medium">
                    {activeContent.audience}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - AI Suggestions with Generated Image */}
          <div className="suggestions-area h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeType}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <SuggestionWithImage
                  suggestion={primarySuggestion}
                  contentType={activeType}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* CTA Section - Updated with proper styling */}
        <div className="cta-section mt-12 text-center">
          <p className="text-lg text-[var(--picturist-charcoal)] mb-4">
            Ready to transform your{" "}
            {activeContent.label.toLowerCase()} with AI-powered
            illustrations?
          </p>
          <Button
            variant="primary"
            size="lg"
            weight="bold"
            className="px-8 py-3 min-w-[200px] shadow-md"
            onClick={goToSignUp}
          >
            <span>Sign up</span>
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};