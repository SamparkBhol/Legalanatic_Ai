
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="border-t border-border/40 py-8"
    >
      <div className="container flex flex-col items-center justify-center text-center text-muted-foreground">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} LegalMindAI. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Disclaimer: LegalMindAI provides AI-powered analysis and is not a substitute for professional legal advice.
        </p>
        <div className="mt-4 flex space-x-4">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
  