"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Edit2, Check, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface PassportHeaderProps {
  user: any;
  isPublic?: boolean;
  editable?: boolean;
  onUpdate?: (updates: any) => void;
}

export default function PassportHeader({
  user,
  isPublic = false,
  editable = false,
  onUpdate
}: PassportHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    college: user?.college || "",
    location: user?.location || "",
    degree: user?.degree || "",
  });

  const handleSave = async () => {
    setIsEditing(false);
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (authUser && onUpdate) {
      await supabase.from('profiles').update(editForm).eq('id', authUser.id);
      onUpdate(editForm);
    }
  };
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
          {user?.full_name ? user.full_name.charAt(0).toUpperCase() : "G"}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 text-center sm:text-left relative">
        {editable && !isEditing && (
          <button onClick={() => setIsEditing(true)} className="absolute right-0 top-0 p-2 text-muted-foreground hover:text-brand-primary transition-colors">
            <Edit2 className="h-4 w-4" />
          </button>
        )}
        
        {isEditing ? (
          <div className="space-y-3 pr-10">
            <input 
              type="text" 
              placeholder="College/University"
              value={editForm.college}
              onChange={e => setEditForm({...editForm, college: e.target.value})}
              className="w-full h-9 px-3 rounded-md border border-border bg-background text-sm"
            />
            <input 
              type="text" 
              placeholder="Degree / Course"
              value={editForm.degree}
              onChange={e => setEditForm({...editForm, degree: e.target.value})}
              className="w-full h-9 px-3 rounded-md border border-border bg-background text-sm"
            />
            <input 
              type="text" 
              placeholder="Location"
              value={editForm.location}
              onChange={e => setEditForm({...editForm, location: e.target.value})}
              className="w-full h-9 px-3 rounded-md border border-border bg-background text-sm"
            />
            <div className="flex gap-2 mt-2">
              <button onClick={handleSave} className="flex items-center gap-1 bg-brand-success text-white px-3 py-1.5 rounded-md text-xs font-medium">
                <Check className="h-3 w-3" /> Save
              </button>
              <button onClick={() => setIsEditing(false)} className="flex items-center gap-1 bg-muted px-3 py-1.5 rounded-md text-xs font-medium">
                <X className="h-3 w-3" /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold">{user?.full_name || "Explorer"}</h1>
            <p className="text-muted-foreground">@{user?.username || "user"}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary">
                {user?.college || "Add College"}
              </span>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-violet-500/10 text-violet-500">
                {user?.degree || "Add Degree"}
              </span>
              {user?.location && (
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500">
                  {user.location}
                </span>
              )}
            </div>
          </>
        )}
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
                strokeDashoffset: 175.9 - ((user?.talent_score || 85) / 100) * 175.9,
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
            <span className="text-lg font-bold">{user?.talent_score || 85}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Talent Score</p>
      </div>
    </motion.div>
  );
}
