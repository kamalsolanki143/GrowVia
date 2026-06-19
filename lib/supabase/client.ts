// lib/supabase/client.ts
// WHY THIS FILE EXISTS:
// Used in React client components (anything with 'use client').
// Uses NEXT_PUBLIC_ keys because this code runs in the browser.
// DO NOT use this in API routes — it won't have the user's session cookies.

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}
