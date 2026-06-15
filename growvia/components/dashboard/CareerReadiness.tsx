"use client";

import { motion } from "framer-motion";

interface CareerReadinessProps {
  score: number;
}

export default function CareerReadiness({ score }: CareerReadinessProps) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const offset = circumference - progress;

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">
        Career Readiness
      </h3>
      <div className="flex items-center justify-center">
        <div className="relative h-32 w-32">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted/50"
            />
            {/* Progress circle */}
            <motion.circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="url(#readiness-gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            />
            <defs>
              <linearGradient id="readiness-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00c8e0" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-3xl font-bold text-gradient"
            >
              {score}%
            </motion.span>
            <span className="text-xs text-muted-foreground">Score</span>
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-muted-foreground mt-4">
        {score >= 80
          ? "Excellent! You're career-ready."
          : score >= 60
          ? "Good progress! Keep building."
          : "Just getting started. Keep going!"}
      </p>
    </div>
  );
}
