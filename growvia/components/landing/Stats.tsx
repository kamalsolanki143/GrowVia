"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Stats() {
  return (
    <section id="stats" className="py-32 sm:py-40 relative bg-[#faf0e6] dark:bg-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-card dark:bg-[#141418] border border-border dark:border-[#2a2a35] rounded-3xl p-10 sm:p-16 shadow-lg dark:shadow-none transition-all duration-300 relative overflow-hidden group hover:border-brand-primary hover:shadow-[0_0_20px_rgba(232,101,10,0.15)]"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-brand-primary/5 to-transparent pointer-events-none" />
          
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 relative z-10">
            Real Numbers <span className="text-brand-primary">Coming Soon</span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto relative z-10">
            We&apos;re just getting started. Join early and be part of the founding community.
          </p>
          
          <div className="relative z-10 flex justify-center">
            <Link 
              href="/signup"
              className="inline-flex h-12 items-center justify-center rounded-full bg-brand-primary px-8 text-sm font-medium text-white shadow-lg shadow-brand-primary/25 hover:bg-brand-primary/90 hover:scale-105 transition-all"
            >
              Join Waitlist
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
