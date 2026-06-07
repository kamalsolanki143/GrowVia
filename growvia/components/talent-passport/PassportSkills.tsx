"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Plus } from "lucide-react";

interface PassportSkillsProps {
  editable?: boolean;
}

const defaultSkills = [
  "React",
  "Python",
  "Machine Learning",
  "TypeScript",
  "Next.js",
  "TensorFlow",
  "Data Analysis",
  "Git",
];

export default function PassportSkills({
  editable = false,
}: PassportSkillsProps) {
  const [skills, setSkills] = useState<string[]>(defaultSkills);
  const [inputValue, setInputValue] = useState("");

  const addSkill = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setInputValue("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-2xl border border-border bg-card p-6"
    >
      <h2 className="text-lg font-semibold mb-4">Skills</h2>

      {/* Tag input (edit mode only) */}
      {editable && (
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a skill..."
            className="flex-1 h-9 px-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
          />
          <button
            onClick={addSkill}
            className="h-9 w-9 rounded-lg bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary/90 transition-colors shrink-0"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted text-sm font-medium"
          >
            {skill}
            {editable && (
              <button
                onClick={() => removeSkill(skill)}
                className="text-muted-foreground hover:text-red-500 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
