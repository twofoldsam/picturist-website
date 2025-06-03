import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "./ui-custom/Button";
import { PicturistLogo } from "./ui-custom/PicturistLogo";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: string[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navLinks,
}) => {
  // Animation variants
  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
  };

  const linkVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
      },
    }),
  };

  // Scroll to waitlist section
  const scrollToWaitlist = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    setTimeout(() => {
      const waitlistSection = document.getElementById('waitlist');
      if (waitlistSection) {
        waitlistSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300); // Allow time for mobile menu to close
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Enhanced backdrop with stronger blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-md z-40"
            onClick={onClose}
          />
          
          {/* Menu panel with glass morphism effect */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-0 right-0 bottom-0 w-[280px] bg-[#FEFCF8]/90 backdrop-blur-xl z-50 shadow-xl flex flex-col"
            style={{
              boxShadow: "0 0 25px rgba(0, 0, 0, 0.08)",
              borderLeft: "1px solid rgba(30, 74, 82, 0.08)"
            }}
          >
            <div className="flex justify-between items-center p-5 border-b border-[#F7F6F4]">
              <PicturistLogo height={36} />
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#6B7280] hover:bg-[#F7F6F4]/80 backdrop-blur-sm"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Only render navigation if there are navLinks */}
            {navLinks.length > 0 && (
              <div className="flex-1 overflow-y-auto py-6 px-5">
                <nav className="space-y-6">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={linkVariants}
                      href={`#${link.toLowerCase()}`}
                      className="block text-lg py-2 font-serif text-[#292D31] hover:text-[#1E4A52] transition-colors"
                      onClick={onClose}
                    >
                      {link}
                    </motion.a>
                  ))}
                </nav>
              </div>
            )}
            
            <div className={`p-5 border-t border-[#F7F6F4] ${navLinks.length === 0 ? 'mt-auto' : ''}`}>
              <Button 
                variant="primary" 
                size="default" 
                className="w-full"
                onClick={scrollToWaitlist}
              >
                Join Waitlist
              </Button>
              <a 
                href="#login" 
                className="block text-center mt-4 text-[#292D31] hover:text-[#1E4A52] transition-colors"
                onClick={onClose}
              >
                Log in
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};