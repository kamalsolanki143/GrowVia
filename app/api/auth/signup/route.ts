// app/api/auth/signup/route.ts
// TODO: Frontend calls POST /api/auth/signup with { name, email, password }
// TODO: On success, redirect user to /dashboard

import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { adminSupabase } from '@/lib/supabase/admin'
import { signupSchema } from '@/lib/validations'
import { generateUsername, successResponse, errorResponse } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    // Step 1: Parse and validate request body
    const body = await request.json()
    const parsed = signupSchema.safeParse(body)

    if (!parsed.success) {
      // Return first validation error message
      return errorResponse(parsed.error.issues[0].message, 400)
    }

    const { name, email, password } = parsed.data

    // Step 2: Create user in Supabase Auth
    // This creates a row in auth.users (internal Supabase table)
    const supabase = await createClient()
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) {
      return errorResponse(authError.message, 400)
    }

    if (!authData.user) {
      return errorResponse('Signup failed — no user returned', 500)
    }

    // Step 3: Insert into our profiles table
    // WHY adminSupabase here: The user just signed up, session cookie isn't set yet.
    // RLS policy "Users can view own profile" would block this insert.
    // Admin client bypasses RLS safely since we're on the server.
    const username = generateUsername(name)

    const { data: profile, error: profileError } = await adminSupabase
      .from('profiles')
      .insert({
        id: authData.user.id, // Must match auth.users id
        name,
        email,
        username,
      })
      .select()
      .single()

    if (profileError) {
      return errorResponse('Profile creation failed: ' + profileError.message, 500)
    }

    return successResponse({ user: authData.user, profile }, 201)
  } catch {
    return errorResponse('Internal server error', 500)
  }
}
