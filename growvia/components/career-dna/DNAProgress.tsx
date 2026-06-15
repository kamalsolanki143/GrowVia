"use client";

import { motion } from "framer-motion";

import type { DNAQuestion } from "@/types";

interface DNAProgressProps {
  current: number;
  total: number;
  answers: (number | null)[];
  questions: DNAQuestion[];
}

export default function DNAProgress({ current, total, answers, questions }: DNAProgressProps) {
  const percent = ((current + 1) / total) * 100;

  const getCategoryCounts = () => {
    const counts = { Technical: 0, Creative: 0, Social: 0, Analytical: 0, Leadership: 0 };
    answers.forEach((ansIndex, qIndex) => {
      if (ansIndex !== null && questions[qIndex]) {
        const cat = questions[qIndex].options[ansIndex].category;
        counts[cat]++;
      }
    });
    return counts;
  };

  const counts = getCategoryCounts();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          Progress
        </span>
        <span className="text-sm font-bold text-brand-primary">
          {current + 1}/{total}
        </span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-primary to-violet-600"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <div className="flex gap-2 flex-wrap text-xs text-muted-foreground">
        {Object.entries(counts).map(([cat, count]) => (
          <div key={cat} className="flex items-center gap-1 bg-muted px-2 py-1 rounded">
            <span>{cat.substring(0, 4)}:</span>
            <span className="font-semibold text-foreground">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
