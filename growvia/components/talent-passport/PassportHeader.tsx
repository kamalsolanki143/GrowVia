"use client";

import { motion } from "framer-motion";
import type { User } from "@/types";

interface PassportHeaderProps {
  user: User;
  isPublic?: boolean;
}

export default function PassportHeader({
  user,
  isPublic = false,
}: PassportHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      {/* Avatar */}
      <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-brand-primary to-violet-600 flex items-center justify-center shadow-xl shadow-brand-primary/20 shrink-0">
        <span className="text-white text-3xl font-bold">
          {user.name.charAt(0)}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 text-center sm:text-left">
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-muted-foreground">@{user.username}</p>
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary">
            {user.domain}
          </span>
          {!isPublic && (
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-amber-500/10 text-amber-500">
              🔥 {user.streak_days} day streak
            </span>
          )}
        </div>
      </div>

      {/* Talent Score */}
      <div className="text-center shrink-0">
        <div className="relative h-16 w-16 mx-auto">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-muted/50"
            />
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="url(#passport-gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={175.9}
              initial={{ strokeDashoffset: 175.9 }}
              animate={{
                strokeDashoffset: 175.9 - (user.talent_score / 100) * 175.9,
              }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            />
            <defs>
              <linearGradient id="passport-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00c8e0" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold">{user.talent_score}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Talent Score</p>
      </div>
    </motion.div>
  );
}
