"use client";

import { motion } from "framer-motion";
import { Sparkles, RotateCcw, Save, ArrowRight } from "lucide-react";
import type { CareerDNA } from "@/types";

interface DNAResultProps {
  dna: CareerDNA;
  onRetake: () => void;
}

const traits = [
  { key: "builder_score" as const, label: "Builder", color: "from-cyan-500 to-blue-500", bg: "bg-cyan-500" },
  { key: "researcher_score" as const, label: "Researcher", color: "from-violet-500 to-purple-600", bg: "bg-violet-500" },
  { key: "analytical_score" as const, label: "Analytical", color: "from-amber-500 to-orange-500", bg: "bg-amber-500" },
  { key: "leader_score" as const, label: "Leader", color: "from-emerald-500 to-green-500", bg: "bg-emerald-500" },
  { key: "designer_score" as const, label: "Designer", color: "from-pink-500 to-rose-500", bg: "bg-pink-500" },
];

const careerPaths = [
  {
    title: "AI Engineer",
    match: 92,
    description:
      "Design and build intelligent systems using machine learning, deep learning, and data pipelines.",
  },
  {
    title: "Data Scientist",
    match: 87,
    description:
      "Extract insights from complex data through statistical analysis, visualization, and predictive modeling.",
  },
  {
    title: "Product Analyst",
    match: 81,
    description:
      "Combine analytical skills with product sense to drive data-informed decisions in tech companies.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function DNAResult({ dna, onRetake }: DNAResultProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-3xl mx-auto py-8"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-primary text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" />
          Analysis Complete
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold">
          Your <span className="text-gradient">Career DNA</span>
        </h1>
      </motion.div>

      {/* Trait bars */}
      <motion.div
        variants={fadeUp}
        className="rounded-2xl border border-border bg-card p-6 sm:p-8 mb-6"
      >
        <h2 className="text-lg font-semibold mb-6">Trait Breakdown</h2>
        <div className="space-y-5">
          {traits.map((trait, index) => (
            <div key={trait.key}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{trait.label}</span>
                <span className="text-sm font-bold">{dna[trait.key]}%</span>
              </div>
              <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${trait.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${dna[trait.key]}%` }}
                  transition={{
                    duration: 1,
                    delay: 0.2 + index * 0.15,
                    ease: "easeOut",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Top Recommendation */}
      <motion.div
        variants={fadeUp}
        className="rounded-2xl border-2 border-brand-primary/30 bg-gradient-to-r from-brand-primary/10 via-violet-600/5 to-transparent p-6 sm:p-8 mb-6"
      >
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-brand-primary" />
          <span className="text-sm font-medium text-brand-primary">
            Top Recommendation
          </span>
        </div>
        <h2 className="text-2xl font-bold mb-1">AI Engineer</h2>
        <p className="text-lg text-gradient font-semibold">92% Match</p>
      </motion.div>

      {/* Career paths */}
      <motion.div variants={fadeUp} className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Recommended Career Paths</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {careerPaths.map((path) => (
            <motion.div
              key={path.title}
              whileHover={{ scale: 1.02 }}
              className="rounded-xl border border-border bg-card p-5 hover:border-brand-primary/20 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">{path.title}</h3>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    path.match >= 90
                      ? "bg-brand-success/10 text-brand-success"
                      : "bg-brand-primary/10 text-brand-primary"
                  }`}
                >
                  {path.match}%
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {path.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => {
            // TODO: Connect to API endpoint — save DNA results
            console.log("Saving DNA results:", dna);
          }}
          className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-brand-primary text-white font-semibold text-sm hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/25"
        >
          <Save className="h-4 w-4" />
          Save Results
        </button>
        <button
          onClick={onRetake}
          className="inline-flex items-center gap-2 h-11 px-6 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          Retake Test
        </button>
      </motion.div>
    </motion.div>
  );
}
