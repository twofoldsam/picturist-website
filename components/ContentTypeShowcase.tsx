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
          <div className="star-icon bg-[var(--picturist-teal)] rounded-full w-4 h-4 flex items-