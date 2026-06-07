"use client";

import { motion } from "framer-motion";

interface DNAProgressProps {
  current: number;
  total: number;
}

export default function DNAProgress({ current, total }: DNAProgressProps) {
  const percent = ((current + 1) / total) * 100;

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
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-primary to-violet-600"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
