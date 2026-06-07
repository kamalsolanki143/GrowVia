"use client";

import { motion } from "framer-motion";
import { Dna, ArrowRight, Sparkles } from "lucide-react";

interface DNAIntroProps {
  onStart: () => void;
}

export default function DNAIntro({ onStart }: DNAIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto text-center py-12"
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        className="h-24 w-24 rounded-3xl bg-gradient-to-br from-brand-primary to-violet-600 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-brand-primary/30"
      >
        <Dna className="h-12 w-12 text-white" />
      </motion.div>

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-primary text-sm font-medium mb-6">
        <Sparkles className="h-4 w-4" />
        AI-Powered Assessment
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">
        Discover Your <span className="text-gradient">Career DNA</span>
      </h1>

      {/* Description */}
      <p className="text-lg text-muted-foreground mb-4 leading-relaxed max-w-xl mx-auto">
        Answer 10 quick questions to uncover your natural strengths, ideal career
        paths, and the domains where you&apos;ll thrive.
      </p>
      <p className="text-sm text-muted-foreground mb-8">
        ⏱ Takes about 3 minutes • 100% free • Instant results
      </p>

      {/* Start button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStart}
        className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-brand-primary text-white font-semibold text-base hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/25 gap-2"
      >
        Start Test
        <ArrowRight className="h-4 w-4" />
      </motion.button>
    </motion.div>
  );
}
