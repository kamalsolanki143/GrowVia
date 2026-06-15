"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  gradient: string;
}

export default function StatsCard({
  icon: Icon,
  label,
  value,
  trend,
  gradient,
}: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="relative rounded-2xl border border-border bg-card p-5 group hover:border-brand-primary/20 transition-all duration-300 overflow-hidden"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-brand-primary/5 to-transparent pointer-events-none" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-2xl sm:text-3xl font-bold">{value}</p>
          {trend && (
            <p className="text-xs text-brand-success mt-1 font-medium">
              {trend}
            </p>
          )}
        </div>
        <div
          className={`h-10 w-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
    </motion.div>
  );
}
