"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface MissionCardProps {
  mission: any;
  onComplete?: () => void;
}

export default function MissionCard({ mission, onComplete }: MissionCardProps) {
  const [completed, setCompleted] = useState(mission.is_completed || false);

  const categoryColors: Record<string, string> = {
    DSA: "bg-cyan-500/10 text-cyan-500",
    Opportunity: "bg-violet-500/10 text-violet-500",
    Learning: "bg-amber-500/10 text-amber-500",
    Profile: "bg-emerald-500/10 text-emerald-500",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`flex items-center gap-4 rounded-xl border border-border p-4 transition-all duration-200 ${
        completed
          ? "bg-brand-success/5 border-brand-success/20"
          : "bg-card hover:border-brand-primary/20"
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={async () => {
          if (completed) return; // Prevent unchecking if not desired, or toggle it
          const newStatus = !completed;
          setCompleted(newStatus);
          
          await supabase
            .from('missions')
            .update({ is_completed: newStatus })
            .eq('id', mission.id);
            
          if (onComplete) onComplete();
        }}
        className={`h-5 w-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
          completed
            ? "bg-brand-success border-brand-success"
            : "border-border hover:border-brand-primary"
        }`}
      >
        {completed && <Check className="h-3 w-3 text-white" />}
      </button>

      {/* Task */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium ${
            completed ? "line-through text-muted-foreground" : ""
          }`}
        >
          {mission.title || mission.task}
        </p>
        <span
          className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 font-medium ${
            categoryColors[mission.category || 'Learning'] ?? "bg-muted text-muted-foreground"
          }`}
        >
          {mission.category || 'Learning'}
        </span>
      </div>

      {/* XP Badge */}
      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-bold shrink-0">
        <Zap className="h-3 w-3" />
        {mission.points || mission.xp} XP
      </div>
    </motion.div>
  );
}
