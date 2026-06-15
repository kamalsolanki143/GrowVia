import type { User, CareerDNA } from "@/types";

export const mockUser: User = {
  id: "mock-user-1",
  name: "Kamal Solanki",
  username: "kamal",
  email: "kamal@example.com",
  avatar_url: null,
  talent_score: 72,
  domain: "AI/ML",
  streak_days: 12,
};

export const mockDNA: CareerDNA = {
  builder_score: 88,
  researcher_score: 91,
  analytical_score: 95,
  leader_score: 60,
  designer_score: 42,
  top_domain: "AI/ML",
  recommended_domains: ["AI Engineer", "Data Scientist", "Product Analyst"],
};
