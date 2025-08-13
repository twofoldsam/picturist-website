import React from "react";
import { Button } from "./ui-custom/Button";
import { motion } from "framer-motion";
import { PicturistLogo } from "./ui-custom/PicturistLogo";

export const Navbar = () => {
  // Empty navLinks array since we're removing the navigation
  const navLinks: any[] = [];

  const goToSignUp = () => {
    window.location.href = 'https://app.picturist.ai/sign-up';
  };

  const goToSignIn = () => {
    window.location.href = 'https://app.picturist.ai/auth/signin';
  };

  return (
    <>
      <header className="relative top-0 left-0 right-0 z-50 h-20 bg-[var(--picturist-warm-white)] border-b border-[var(--picturist-soft-gray)]">
        {/* Content */}
        <div className="container mx-auto px-4 py-4 flex items-center justify-between relative z-10">
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <a href="#" className="flex items-center">
              {/* SVG Logo */}
              <PicturistLogo height={42} className="hover:opacity-90 transition-opacity" />
            </a>
          </motion.div>

          {/* Navigation menu removed as requested */}

          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Button
              variant="ghost"
              size="default"
              className="hidden md:inline-flex"
              onClick={goToSignIn}
            >
              Sign in
            </Button>
            <Button
              variant="primary"
              size="default"
              className="hidden md:inline-flex"
              onClick={goToSignUp}
            >
              Sign up
            </Button>
            <div className="md:hidden flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={goToSignIn}
              >
                Sign in
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={goToSignUp}
              >
                Sign up
              </Button>
            </div>
          </motion.div>
        </div>
      </header>
    </>
  );
};