"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import type { Opportunity } from "@/types";

interface OpportunityPreviewProps {
  opportunity: Opportunity;
}

const typeColors: Record<string, string> = {
  internship: "bg-cyan-500/10 text-cyan-500",
  fellowship: "bg-amber-500/10 text-amber-500",
  hackathon: "bg-violet-500/10 text-violet-500",
  competition: "bg-emerald-500/10 text-emerald-500",
};

export default function OpportunityPreview({
  opportunity,
}: OpportunityPreviewProps) {
  const organization = opportunity.organization || opportunity.company || "Organization";
  const daysLeft = Math.max(
    0,
    Math.ceil(
      (new Date(opportunity.deadline).getTime() - Date.now()) /
        (1000 * 60 * 60 * 24)
    )
  );

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:border-brand-primary/20 transition-all duration-200"
    >
      {/* Match score */}
      <div
        className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
          opportunity.match_score >= 80
            ? "bg-brand-success/10 text-brand-success"
            : opportunity.match_score >= 60
            ? "bg-amber-500/10 text-amber-500"
            : "bg-red-500/10 text-red-500"
        }`}
      >
        {opportunity.match_score}%
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{opportunity.title}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-muted-foreground">
            {organization}
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              typeColors[opportunity.type] ?? "bg-muted text-muted-foreground"
            }`}
          >
            {opportunity.type}
          </span>
        </div>
      </div>

      {/* Deadline */}
      <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground shrink-0">
        <Calendar className="h-3 w-3" />
        {daysLeft}d left
      </div>

      <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
    </motion.div>
  );
}
