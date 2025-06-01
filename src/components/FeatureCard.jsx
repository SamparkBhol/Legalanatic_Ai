
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(var(--primary-rgb), 0.2)" }}
      className="h-full"
    >
      <Card className="h-full glassmorphic hover:border-primary transition-all duration-300">
        <CardHeader className="items-center text-center">
          <motion.div 
            className="mb-4 rounded-full bg-primary/10 p-3 text-primary animate-pulse-glow shadow-primary"
            whileHover={{ scale: 1.1 }}
          >
            <Icon className="h-10 w-10" />
          </motion.div>
          <CardTitle className="text-xl bg-gradient-to-r from-primary via-accent to-secondary text-transparent bg-clip-text">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-center text-muted-foreground">{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
  