"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Dna } from "lucide-react";
import DNAIntro from "@/components/career-dna/DNAIntro";
import DNAQuestionCard from "@/components/career-dna/DNAQuestion";
import DNAProgress from "@/components/career-dna/DNAProgress";
import DNAResult from "@/components/career-dna/DNAResult";
import { dnaQuestions } from "@/mock/dna";
import { mockDNA } from "@/mock/user";

type Stage = "intro" | "questions" | "loading" | "results";

export default function CareerDNAPage() {
  const [stage, setStage] = useState<Stage>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(dnaQuestions.length).fill(null)
  );

  const handleStart = () => {
    setStage("questions");
    setCurrentQuestion(0);
    setAnswers(new Array(dnaQuestions.length).fill(null));
  };

  const handleSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < dnaQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Last question — show loading then results
      setStage("loading");
      // TODO: Replace mock data with real fetch — send answers to backend
      console.log("DNA answers:", answers);
      setTimeout(() => setStage("results"), 2000);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleRetake = () => {
    setStage("intro");
    setCurrentQuestion(0);
    setAnswers(new Array(dnaQuestions.length).fill(null));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {stage === "intro" && <DNAIntro onStart={handleStart} />}

      {stage === "questions" && (
        <div className="max-w-2xl mx-auto py-8">
          <DNAProgress current={currentQuestion} total={dnaQuestions.length} />
          <DNAQuestionCard
            question={dnaQuestions[currentQuestion]}
            selectedOption={answers[currentQuestion]}
            onSelect={handleSelect}
            onNext={handleNext}
            onPrev={handlePrev}
            isFirst={currentQuestion === 0}
            isLast={currentQuestion === dnaQuestions.length - 1}
            currentIndex={currentQuestion}
            total={dnaQuestions.length}
          />
        </div>
      )}

      {stage === "loading" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-32"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="h-16 w-16 rounded-2xl bg-gradient-to-br from-brand-primary to-violet-600 flex items-center justify-center mb-6 shadow-2xl shadow-brand-primary/30"
          >
            <Dna className="h-8 w-8 text-white" />
          </motion.div>
          <h2 className="text-xl font-bold mb-2">Analyzing your Career DNA...</h2>
          <p className="text-sm text-muted-foreground">
            Our AI is crunching your responses
          </p>
          {/* Shimmer bar */}
          <div className="w-48 h-1.5 bg-muted rounded-full overflow-hidden mt-6">
            <div className="h-full w-1/2 bg-gradient-to-r from-brand-primary to-violet-600 rounded-full animate-shimmer" />
          </div>
        </motion.div>
      )}

      {stage === "results" && (
        <DNAResult dna={mockDNA} onRetake={handleRetake} />
      )}
    </motion.div>
  );
}
