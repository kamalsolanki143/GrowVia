// lib/supabase/admin.ts
// WHY THIS FILE EXISTS:
// The SERVICE_ROLE_KEY bypasses ALL Row Level Security policies.
// Use ONLY for operations that must happen regardless of who the user is.
// Current use case: inserting into profiles table right after signup.
//   → At signup moment, the user session cookie isn't set yet, so RLS blocks the insert.
//   → Admin client bypasses this safely because we're in a server-side API route.
// ⚠️ NEVER import this in client-side code. NEVER expose SERVICE_ROLE_KEY to browser.

import { createClient } from '@supabase/supabase-js'

export const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
