// app/api/auth/login/route.ts
// TODO: Frontend calls POST /api/auth/login with { email, password }
// TODO: On success, session cookie is set automatically — redirect to /dashboard

import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { loginSchema } from '@/lib/validations'
import { successResponse, errorResponse } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = loginSchema.safeParse(body)

    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0].message, 400)
    }

    const { email, password } = parsed.data

    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      // Don't expose whether email exists or not (security best practice)
      return errorResponse('Invalid email or password', 401)
    }

    // Supabase automatically sets the session cookie via @supabase/ssr
    return successResponse({ user: data.user, session: data.session })
  } catch {
    return errorResponse('Internal server error', 500)
  }
}
