"use client";

import { motion } from "framer-motion";
import { Calendar, ExternalLink, Building2, CheckCircle2 } from "lucide-react";
import type { Opportunity } from "@/types";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const typeStyles: Record<string, { bg: string; text: string }> = {
  internship: { bg: "bg-cyan-500/10", text: "text-cyan-500" },
  fellowship: { bg: "bg-amber-500/10", text: "text-amber-500" },
  hackathon: { bg: "bg-violet-500/10", text: "text-violet-500" },
  competition: { bg: "bg-emerald-500/10", text: "text-emerald-500" },
};

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const [applied, setApplied] = useState(false);
  const organization = opportunity.organization || opportunity.company || "Organization";
  const applyUrl = opportunity.apply_url || opportunity.link;

  const daysLeft = Math.max(
    0,
    Math.ceil(
      (new Date(opportunity.deadline).getTime() - Date.now()) /
        (1000 * 60 * 60 * 24)
    )
  );

  const handleApply = async () => {
    if (applied) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      // Avoid duplicate insert by checking if already saved (optional) but for hackathon insert is fine if PK is not composite
      await supabase.from('user_saved_opportunities').insert({
        user_id: user.id,
        opportunity_id: opportunity.id,
        status: 'applied'
      });
    }
    setApplied(true);
    if (applyUrl) {
      window.open(applyUrl, '_blank');
    }
  };

  const typeStyle = typeStyles[opportunity.type] ?? {
    bg: "bg-muted",
    text: "text-muted-foreground",
  };

  const matchColor =
    opportunity.match_score >= 80
      ? "bg-brand-success/10 text-brand-success border-brand-success/20"
      : opportunity.match_score >= 60
      ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
      : "bg-red-500/10 text-red-500 border-red-500/20";

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className="group rounded-2xl border border-border bg-card p-6 hover:border-brand-primary/20 transition-all duration-300 overflow-hidden relative"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-brand-primary/5 to-transparent pointer-events-none" />

      <div className="relative">
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4" />
            {organization}
          </div>
          <div
            className={`px-2.5 py-1 rounded-full text-xs font-bold border ${matchColor}`}
          >
            {opportunity.match_score || 85}% Match
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold mb-3 group-hover:text-brand-primary transition-colors">
          {opportunity.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {opportunity.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${typeStyle.bg} ${typeStyle.text}`}
          >
            {opportunity.type}
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
            {opportunity.domain}
          </span>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>
              {daysLeft > 0 ? `${daysLeft} days left` : "Deadline passed"}
            </span>
          </div>
          <button 
            onClick={handleApply}
            className={`inline-flex items-center gap-1.5 h-8 px-4 rounded-lg text-white text-xs font-semibold transition-all shadow-md ${
              applied 
                ? 'bg-brand-success shadow-brand-success/20 cursor-default' 
                : 'bg-brand-primary hover:bg-brand-primary/90 shadow-brand-primary/20'
            }`}
          >
            {applied ? "Applied" : "Apply Now"}
            {applied ? <CheckCircle2 className="h-3 w-3" /> : <ExternalLink className="h-3 w-3" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
