"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Zap } from "lucide-react";

const mockBadges = [
  {
    id: "1",
    title: "First Steps",
    description: "Completed Career DNA assessment",
    icon: "star",
    earned: true,
  },
  {
    id: "2",
    title: "Streak Master",
    description: "Maintained a 7-day streak",
    icon: "zap",
    earned: true,
  },
  {
    id: "3",
    title: "Opportunity Hunter",
    description: "Applied to 5 opportunities",
    icon: "trophy",
    earned: true,
  },
];

const iconMap: Record<string, React.ElementType> = {
  star: Star,
  zap: Zap,
  trophy: Trophy,
};

const gradients = [
  "from-cyan-500 to-blue-500",
  "from-amber-500 to-orange-500",
  "from-violet-500 to-purple-600",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function PassportBadges() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded-2xl border border-border bg-card p-6"
    >
      <h2 className="text-lg font-semibold mb-4">Badges</h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {mockBadges.map((badge, index) => {
          const Icon = iconMap[badge.icon] ?? Star;
          return (
            <motion.div
              key={badge.id}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              className="flex flex-col items-center text-center p-4 rounded-xl border border-border hover:border-brand-primary/20 transition-all cursor-default"
            >
              <div
                className={`h-12 w-12 rounded-xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center mb-3 shadow-lg`}
              >
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-sm font-semibold mb-1">{badge.title}</h3>
              <p className="text-xs text-muted-foreground">
                {badge.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
