"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import type { DNAQuestion } from "@/types";

interface DNAQuestionProps {
  question: DNAQuestion;
  selectedOption: number | null;
  onSelect: (optionIndex: number) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  currentIndex: number;
  total: number;
}

export default function DNAQuestionCard({
  question,
  selectedOption,
  onSelect,
  onNext,
  onPrev,
  isFirst,
  isLast,
  currentIndex,
  total,
}: DNAQuestionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="max-w-2xl mx-auto"
      >
        {/* Question number */}
        <p className="text-sm text-muted-foreground mb-3">
          Question {currentIndex + 1} of {total}
        </p>

        {/* Question text */}
        <h2 className="text-xl sm:text-2xl font-bold mb-8">
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelect(index)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedOption === index
                  ? "border-brand-primary bg-brand-primary/10 shadow-lg shadow-brand-primary/10"
                  : "border-border bg-card hover:border-brand-primary/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    selectedOption === index
                      ? "border-brand-primary bg-brand-primary"
                      : "border-border"
                  }`}
                >
                  {selectedOption === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-2 w-2 rounded-full bg-white"
                    />
                  )}
                </div>
                <span
                  className={`text-sm font-medium ${
                    selectedOption === index
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {option.text}
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={onPrev}
            disabled={isFirst}
            className="inline-flex items-center gap-2 h-10 px-5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <button
            onClick={onNext}
            disabled={selectedOption === null}
            className="inline-flex items-center gap-2 h-10 px-6 rounded-lg bg-brand-primary text-white text-sm font-semibold hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/25 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {isLast ? "See Results" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
