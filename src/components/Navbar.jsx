
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Scale, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const navLinkClasses = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary' : 'text-muted-foreground'
    }`;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Scale className="h-8 w-8 text-primary animate-pulse-glow shadow-primary" />
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-secondary text-transparent bg-clip-text">
            LegalMindAI
          </span>
        </Link>
        <nav className="flex items-center space-x-6">
          <NavLink to="/" className={navLinkClasses}>
            Home
          </NavLink>
          <NavLink to="/dashboard" className={navLinkClasses}>
            Dashboard
          </NavLink>
          <Button asChild size="sm">
            <Link to="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" /> Get Started
            </Link>
          </Button>
        </nav>
      </div>
    </motion.header>
  );
};

export default Navbar;
  