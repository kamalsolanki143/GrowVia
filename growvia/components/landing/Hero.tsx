"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const stats = [
  { value: "10,000+", label: "Students" },
  { value: "500+", label: "Opportunities" },
  { value: "95%", label: "Find Direction" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg dark:grid-bg grid-bg-light dark:!bg-none" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-20"
      >
        {/* Badge */}
        <motion.div variants={fadeUp} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-primary text-sm font-medium animate-pulse-glow">
            <Sparkles className="h-4 w-4" />
            <span>India&apos;s First Career OS</span>
          </div>
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          The Career{" "}
          <span className="text-gradient">Operating System</span>
          <br />
          for Students
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Stop being confused. Start having direction. Growvia gives you a
          personalized career roadmap, verified internships, and AI guidance —
          all in one place.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/signup"
            className="group inline-flex items-center justify-center h-12 px-8 rounded-xl bg-brand-primary text-white font-semibold text-base hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/25 hover:shadow-xl hover:shadow-brand-primary/30 hover:scale-105 duration-200"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center h-12 px-8 rounded-xl border border-border text-foreground font-semibold text-base hover:bg-muted transition-all duration-200"
          >
            See How It Works
          </a>
        </motion.div>

        {/* Floating stat cards */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg sm:max-w-2xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              whileHover={{ scale: 1.05, y: -4 }}
              className="glass dark:glass glass-light dark:!bg-white/5 rounded-2xl p-5 text-center cursor-default"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
