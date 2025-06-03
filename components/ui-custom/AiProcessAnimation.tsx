import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const AiProcessAnimation: React.FC<{
  className?: string;
  width?: number;
  height?: number;
  delay?: number;
}> = ({
  className = "",
  width = 320,
  height = 200,
  delay = 1,
}) => {
  const [stage, setStage] = useState(0);
  const maxStages = 3;

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage(1);

      const interval = setInterval(() => {
        setStage((prevStage) => {
          if (prevStage >= maxStages) {
            return 1; // Reset to stage 1 (skip initial stage 0)
          }
          return prevStage + 1;
        });
      }, 4000); // Change stage every 4 seconds

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: delay,
        ease: "easeOut",
      },
    },
  };

  // Text content that represents an article
  const articleText = [
    "Climate change is leading to more extreme weather events worldwide.",
    "Scientists warn that urgent action is needed to prevent irreversible damage.",
    "Renewable energy solutions continue to become more affordable and efficient.",
    "Communities are developing adaptation strategies to cope with new climate realities.",
  ];

  // Different illustration styles
  const illustrationStyles = [
    { name: "Minimalist", color: "#00BCBC" },
    { name: "Watercolor", color: "#FF5A43" },
    { name: "Digital Art", color: "#4dd3d3" },
  ];

  return (
    <motion.div
      className={`relative rounded-xl border border-slate-200 shadow-lg bg-white overflow-hidden ${className}`}
      style={{ maxWidth: "100%", height }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center justify-between px-3">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-coral-500"></div>
          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
          <div className="w-3 h-3 rounded-full bg-teal-500"></div>
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Picturist
        </div>
      </div>

      {/* Content area */}
      <div className="flex h-[calc(100%-40px)]">
        {/* Text input area - always visible */}
        <div className="w-1/2 p-3 border-r border-slate-100 flex flex-col">
          <div className="text-xs text-slate-500 mb-2 font-medium">
            Content
          </div>
          <motion.div
            className="flex-grow text-xs text-slate-700 space-y-2 overflow-hidden"
            animate={{ opacity: stage === 0 ? 0.3 : 1 }}
          >
            {articleText.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: delay + 0.2 + i * 0.15 },
                }}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
        </div>

        {/* Illustration output area - changes with stages */}
        <div className="w-1/2 p-3 flex flex-col relative">
          <div className="text-xs text-slate-500 mb-2 font-medium flex justify-between">
            <span>Generated Illustration</span>
            {stage > 0 && (
              <span className="text-teal-500">
                {
                  illustrationStyles[
                    (stage - 1) % illustrationStyles.length
                  ].name
                }
              </span>
            )}
          </div>

          <div className="flex-grow relative">
            {/* Loading/processing stage */}
            {stage === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-2 text-xs text-slate-500">
                  Processing...
                </span>
              </div>
            )}

            {/* Illustration stage 1 */}
            {stage === 1 && (
              <motion.div
                className="absolute inset-0 bg-teal-50 rounded-md flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 100 100"
                  fill="none"
                  className="text-teal-500"
                >
                  <circle
                    cx="50"
                    cy="60"
                    r="30"
                    fill="currentColor"
                    opacity="0.2"
                  />
                  <path
                    d="M30 30C40 15 60 15 70 30"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M20 50C20 30 80 30 80 50"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M50 20V30"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>
            )}

            {/* Illustration stage 2 */}
            {stage === 2 && (
              <motion.div
                className="absolute inset-0 bg-coral-50 rounded-md flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 100 100"
                  fill="none"
                  className="text-coral-500"
                >
                  <rect
                    x="20"
                    y="30"
                    width="60"
                    height="40"
                    rx="5"
                    fill="currentColor"
                    opacity="0.2"
                  />
                  <circle
                    cx="50"
                    cy="40"
                    r="10"
                    fill="currentColor"
                    opacity="0.6"
                  />
                  <path
                    d="M30 60L45 50L55 55L70 45"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>
            )}

            {/* Illustration stage 3 */}
            {stage === 3 && (
              <motion.div
                className="absolute inset-0 bg-indigo-50 rounded-md flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 100 100"
                  fill="none"
                  className="text-indigo-500"
                >
                  <path
                    d="M20 70C20 50 40 30 50 30C60 30 80 50 80 70"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="currentColor"
                    fillOpacity="0.1"
                  />
                  <circle
                    cx="35"
                    cy="40"
                    r="5"
                    fill="currentColor"
                  />
                  <circle
                    cx="65"
                    cy="40"
                    r="5"
                    fill="currentColor"
                  />
                  <path
                    d="M40 55H60"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>
            )}
          </div>

          {/* Style selector - only visible after initial load */}
          {stage > 0 && (
            <div className="flex space-x-1 mt-2">
              {illustrationStyles.map((style, i) => (
                <motion.div
                  key={i}
                  className={`h-2 flex-1 rounded-full ${(stage - 1) % illustrationStyles.length === i ? "opacity-100" : "opacity-30"}`}
                  style={{ backgroundColor: style.color }}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{
                    delay: delay + 0.1 * i,
                    duration: 0.4,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};