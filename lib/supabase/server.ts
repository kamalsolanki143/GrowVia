// lib/supabase/server.ts
// WHY THIS FILE EXISTS:
// Used in API routes and Server Components.
// Reads the session from HTTP cookies — this is how we identify the logged-in user.
// The @supabase/ssr package handles cookie parsing for Next.js App Router correctly.
// Without this, auth.getUser() would always return null in API routes.

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // setAll called from a Server Component where cookies are read-only.
            // Safe to ignore — session refresh happens in middleware.
          }
        },
      },
    }
  )
}
