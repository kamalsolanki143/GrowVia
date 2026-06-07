"use client";

import { motion } from "framer-motion";
import {
  Dna,
  Radar,
  Target,
  TrendingUp,
  Bot,
  BadgeCheck,
} from "lucide-react";

const features = [
  {
    icon: Dna,
    title: "Career DNA",
    description: "Discover your strengths and best-fit career path",
    gradient: "from-[var(--grad-1)] to-[var(--grad-2)]",
  },
  {
    icon: Radar,
    title: "Opportunity Radar",
    description: "Find internships, hackathons, fellowships that match you",
    gradient: "from-[var(--grad-1)] to-[var(--grad-2)]",
  },
  {
    icon: Target,
    title: "Daily Missions",
    description: "Know exactly what to do every single day",
    gradient: "from-[var(--grad-1)] to-[var(--grad-2)]",
  },
  {
    icon: TrendingUp,
    title: "Talent Score",
    description: "Track your employability in real time",
    gradient: "from-[var(--grad-1)] to-[var(--grad-2)]",
  },
  {
    icon: Bot,
    title: "AI Career Coach",
    description: "24/7 personalized guidance",
    gradient: "from-[var(--grad-1)] to-[var(--grad-2)]",
  },
  {
    icon: BadgeCheck,
    title: "Talent Passport",
    description: "One link that replaces your resume",
    gradient: "from-[var(--grad-1)] to-[var(--grad-2)]",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Features() {
  return (
    <section id="features" className="py-32 sm:py-40 relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            Everything You Need to{" "}
            <span className="text-brand-primary">Succeed</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            All the tools you need to discover, build, and prove your career
            potential — powered by AI.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="group relative rounded-2xl border border-border dark:border-[#2a2a35] bg-card dark:bg-[#141418] p-7 cursor-default overflow-hidden hover-lift shadow-sm dark:shadow-none transition-all duration-300 dark:hover:border-brand-primary dark:hover:shadow-[0_0_20px_rgba(232,101,10,0.15)] hover:border-brand-primary hover:shadow-[0_0_20px_rgba(232,101,10,0.15)]"
            >
              {/* Hover glow effect (subtle background tint) */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-brand-primary/5 to-transparent pointer-events-none" />

              {/* Icon */}
              <div
                className={`relative h-12 w-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="relative text-lg font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="relative text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
