// ============================================
// GROWVIA — Type Definitions
// ============================================

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar_url: string | null;
  talent_score: number;
  domain: string;
  streak_days: number;
}

export interface CareerDNA {
  builder_score: number;
  researcher_score: number;
  analytical_score: number;
  leader_score: number;
  designer_score: number;
  top_domain: string;
  recommended_domains: string[];
}

export interface Opportunity {
  id: string;
  title: string;
  type: "internship" | "fellowship" | "hackathon" | "competition";
  organization: string;
  domain: string;
  match_score: number;
  deadline: string;
  description: string;
  link?: string;
  apply_url?: string;
}

export interface Mission {
  id: string;
  task: string;
  xp: number;
  completed: boolean;
  category: "DSA" | "Opportunity" | "Learning" | "Profile";
}

export interface DNAOption {
  text: string;
  category: "Technical" | "Creative" | "Social" | "Analytical" | "Leadership";
  value: number;
}

export interface DNAQuestion {
  id: number;
  question: string;
  options: DNAOption[];
}

export interface DNATraitBar {
  label: string;
  score: number;
  color: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
}
