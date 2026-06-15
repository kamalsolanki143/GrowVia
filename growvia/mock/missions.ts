import type { Mission } from "@/types";

export const mockMissions: Mission[] = [
  {
    id: "1",
    task: "Solve 3 DSA Questions",
    xp: 30,
    completed: false,
    category: "DSA",
  },
  {
    id: "2",
    task: "Apply to 2 Internships",
    xp: 40,
    completed: false,
    category: "Opportunity",
  },
  {
    id: "3",
    task: "Complete React Module",
    xp: 50,
    completed: true,
    category: "Learning",
  },
  {
    id: "4",
    task: "Update your Talent Passport",
    xp: 20,
    completed: false,
    category: "Profile",
  },
];
