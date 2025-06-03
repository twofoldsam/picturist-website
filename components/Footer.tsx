import React from "react";
import { Twitter, Linkedin, Youtube } from "lucide-react";
import { MotionWrapper } from "./ui-custom/MotionWrapper";
import { PicturistLogo } from "./ui-custom/PicturistLogo";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: "Twitter",
      icon: <Twitter size={20} />,
      href: "#"
    },
    {
      name: "LinkedIn", 
      icon: <Linkedin size={20} />,
      href: "#"
    },
    {
      name: "YouTube",
      icon: <Youtube size={20} />,
      href: "#"
    }
  ];

  return (
    <footer className="bg-[var(--picturist-warm-white)] border-t border-[var(--picturist-soft-gray)] py-12">
      <div className="container mx-auto px-4">
        <MotionWrapper viewport={true}>
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Logo */}
            <a href="#" className="flex items-center">
              <PicturistLogo height={48} className="hover:opacity-90 transition-opacity" />
            </a>
            
            {/* Tagline */}
            <p className="text-[var(--picturist-charcoal)]/70 text-lg max-w-md">
              Transform your words into stunning visuals with AI-powered illustration
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-12 h-12 rounded-full bg-[var(--picturist-soft-gray)] flex items-center justify-center text-[var(--picturist-charcoal)]/70 hover:bg-[var(--picturist-teal)] hover:text-[var(--picturist-warm-white)] transition-all duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            {/* Copyright */}
            <div className="pt-6 border-t border-[var(--picturist-soft-gray)] w-full">
              <p className="text-[var(--picturist-charcoal)]/50 text-sm">
                © {currentYear} Picturist. All rights reserved.
              </p>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </footer>
  );
};
