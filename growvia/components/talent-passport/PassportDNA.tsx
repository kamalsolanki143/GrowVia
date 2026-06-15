"use client";

import { motion } from "framer-motion";
import type { CareerDNA } from "@/types";

interface PassportDNAProps {
  dna: CareerDNA;
}

const traits = [
  { key: "builder_score" as const, label: "Builder", color: "from-cyan-500 to-blue-500" },
  { key: "researcher_score" as const, label: "Researcher", color: "from-violet-500 to-purple-600" },
  { key: "analytical_score" as const, label: "Analytical", color: "from-amber-500 to-orange-500" },
  { key: "leader_score" as const, label: "Leader", color: "from-emerald-500 to-green-500" },
  { key: "designer_score" as const, label: "Designer", color: "from-pink-500 to-rose-500" },
];

export default function PassportDNA({ dna }: PassportDNAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-2xl border border-border bg-card p-6"
    >
      <h2 className="text-lg font-semibold mb-5">Career DNA</h2>
      <div className="space-y-4">
        {traits.map((trait, index) => (
          <div key={trait.key}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium">{trait.label}</span>
              <span className="text-sm font-bold text-muted-foreground">
                {dna[trait.key]}%
              </span>
            </div>
            <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${trait.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${dna[trait.key]}%` }}
                transition={{
                  duration: 0.8,
                  delay: 0.3 + index * 0.1,
                  ease: "easeOut",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Top Domain:{" "}
          <span className="font-semibold text-foreground">{dna.top_domain}</span>
        </p>
      </div>
    </motion.div>
  );
}
