
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FeatureCard from '@/components/FeatureCard';
import { motion } from 'framer-motion';
import { FileText, BrainCircuit, ShieldCheck, MessageSquare, UploadCloud, Zap } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Document Ingestion & OCR',
    description: 'Easily upload PDFs and scanned images. Our AI handles the rest, extracting text accurately.',
  },
  {
    icon: BrainCircuit,
    title: 'AI-Powered Clause Analysis',
    description: 'Deep learning models dissect your contracts, identifying and categorizing clauses with precision.',
  },
  {
    icon: Zap,
    title: 'Legal Term Simplification',
    description: 'Complex legal jargon translated into plain, understandable language. Know exactly what you\'re signing.',
  },
  {
    icon: ShieldCheck,
    title: 'Risk Scoring & Smart Alerts',
    description: 'Identify potentially risky clauses and get alerts for missing terms or unfair conditions.',
  },
  {
    icon: MessageSquare,
    title: 'Ask Your Contract (Chat)',
    description: 'Interact with your document through an intuitive chat interface. Get answers, not just data.',
  },
  {
    icon: UploadCloud,
    title: 'LangFlow Powered Pipelines',
    description: 'Visually understand and even customize the AI workflows analyzing your documents (conceptual).',
  },
];

const HomePage = () => {
  return (
    <div className="space-y-16">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-center py-16 md:py-24"
      >
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          <span className="block bg-gradient-to-r from-primary via-accent to-secondary text-transparent bg-clip-text">
            LegalMindAI
          </span>
          <span className="block text-4xl md:text-5xl text-foreground mt-2">
            Understand Legal Docs, Instantly.
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10">
          Stop guessing, start understanding. LegalMindAI uses cutting-edge AI to read, summarize, validate, and explain legal documents and contracts in simple terms.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-primary-foreground shadow-lg shadow-primary/50">
            <Link to="/dashboard">
              Analyze Your Document Now <UploadCloud className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
        <div className="mt-12">
          <img  class="mx-auto rounded-lg shadow-2xl w-full max-w-3xl h-auto object-cover" alt="Abstract representation of AI analyzing a legal document" src="https://images.unsplash.com/photo-1677442136019-21780ecad995" />
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.1 }}
        className="py-16"
      >
        <h2 className="text-4xl font-bold text-center mb-12">
          Why <span className="bg-gradient-to-r from-primary via-accent to-secondary text-transparent bg-clip-text">LegalMindAI</span>?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 text-center bg-card/50 rounded-lg p-8 md:p-12 glassmorphic"
      >
        <h2 className="text-4xl font-bold mb-6">Ready to Demystify Your Contracts?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Empower yourself with clarity. Whether you're a freelancer, startup, or just curious, LegalMindAI is your partner in navigating legal complexities.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
        <Button size="lg" asChild className="bg-gradient-to-r from-secondary to-accent hover:opacity-90 transition-opacity text-secondary-foreground shadow-lg shadow-secondary/50">
          <Link to="/dashboard">
            Start Analyzing for Free <Zap className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default HomePage;
  