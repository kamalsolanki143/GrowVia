"use client";

import { motion } from "framer-motion";
import { Search, Map, Share2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover Yourself",
    description:
      "Take the Career DNA test to uncover your natural strengths, interests, and the career paths that align with who you truly are.",
    gradient: "from-[var(--grad-1)] to-[var(--grad-2)]",
  },
  {
    number: "02",
    icon: Map,
    title: "Build Yourself",
    description:
      "Follow your personalized roadmap with daily missions, skill-building challenges, and curated opportunities matched to your DNA.",
    gradient: "from-[var(--grad-1)] to-[var(--grad-2)]",
  },
  {
    number: "03",
    icon: Share2,
    title: "Prove Yourself",
    description:
      "Share your Talent Passport — a verified, living portfolio that showcases your skills, achievements, and career readiness to the world.",
    gradient: "from-[var(--grad-1)] to-[var(--grad-2)]",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 sm:py-40 relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            Three Steps to{" "}
            <span className="text-brand-primary">Career Clarity</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple, proven path from confusion to confidence.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative"
        >
          {/* Connecting animated line — desktop */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
            className="hidden lg:block absolute top-[40px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-[var(--grad-1)] to-[var(--grad-2)] opacity-60 origin-left z-0"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={stepVariants}
                className="relative flex flex-col items-center text-center hover-lift hover-scale z-10"
              >
                {/* Step number */}
                <div className="relative mb-6">
                  <div
                    className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-xl`}
                  >
                    <step.icon className="h-9 w-9 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-card border-2 border-border flex items-center justify-center text-xs font-bold text-foreground">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
