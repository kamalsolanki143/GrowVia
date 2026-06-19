// types/index.ts
// Why: Single source of truth for all TypeScript interfaces.
// Both backend (API routes) and frontend (Kamal) import from here.
// This eliminates type mismatches between the two sides.

export interface Profile {
  id: string
  name: string
  username: string
  email: string
  avatar_url: string | null
  talent_score: number
  domain: string
  streak_days: number
  bio: string | null
  skills: string[]
  created_at: string
  updated_at: string
}

export interface DNAResult {
  id: string
  user_id: string
  builder_score: number       // How much this person likes building products
  researcher_score: number    // How much this person likes researching/reading
  analytical_score: number    // How much this person likes data/logic problems
  leader_score: number        // How much this person likes leading teams
  designer_score: number      // How much this person likes design/visuals
  top_domain: DomainType
  recommended_domains: DomainType[]
  raw_answers: string[] | null
  created_at: string
}

// Why enum-like type: restricts domain to only valid values across entire codebase
export type DomainType =
  | 'AI/ML'
  | 'Web Development'
  | 'Data Science'
  | 'Cybersecurity'
  | 'Product Management'
  | 'UI/UX Design'

export type OpportunityType = 'internship' | 'hackathon' | 'fellowship' | 'scholarship' | 'competition'

export interface Opportunity {
  id: string
  title: string
  type: OpportunityType
  organization: string
  domain: string
  match_score: number
  deadline: string
  description: string | null
  apply_url: string | null
  is_active: boolean
  created_at: string
}

export interface Badge {
  id: string
  user_id: string
  badge_name: string
  badge_icon: string
  badge_description: string | null
  earned_at: string
}

export interface Mission {
  id: string
  user_id: string
  task: string
  xp: number
  completed: boolean
  category: string | null
  created_at: string
}

// Why ApiResponse wrapper: every route returns { data, error } consistently.
// Frontend can always do: if (response.error) { showError() } else { use(response.data) }
export interface ApiResponse<T> {
  data: T | null
  error: string | null
}
