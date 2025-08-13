import React from "react";
import { Hero } from "./Hero";
import { Footer } from "./Footer";
import { FloatingCTA } from "./ui-custom/FloatingCTA";
import { ContentTypeShowcase } from "./ContentTypeShowcase";

export const HomePage = () => {
  return (
    <>
      <main>
        <Hero />
        {/* Content Type Showcase appears directly after the hero */}
        <ContentTypeShowcase />
      </main>
      <Footer />
      {/* Floating CTA provides persistent conversion opportunity */}
      <FloatingCTA />
    </>
  );
}; 