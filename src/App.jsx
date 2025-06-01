
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import DashboardPage from '@/pages/DashboardPage';
import { TooltipProvider } from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  return (
    <TooltipProvider delayDuration={100}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={
              <PageTransitionWrapper>
                <HomePage />
              </PageTransitionWrapper>
            } />
            <Route path="dashboard" element={
              <PageTransitionWrapper>
                <DashboardPage />
              </PageTransitionWrapper>
            } />
            {/* You can add more routes here, e.g., for settings, profile, etc. */}
            <Route path="*" element={
              <PageTransitionWrapper>
                <div className="text-center py-20">
                  <h1 className="text-4xl font-bold text-destructive">404 - Page Not Found</h1>
                  <p className="text-muted-foreground mt-4">Oops! The page you're looking for doesn't exist.</p>
                </div>
              </PageTransitionWrapper>
            } />
          </Route>
        </Routes>
      </Router>
    </TooltipProvider>
  );
}

const PageTransitionWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

export default App;
  