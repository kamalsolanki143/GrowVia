// app/api/profile/route.ts
// GET  /api/profile      → Returns the logged-in user's own profile
// PUT  /api/profile      → Updates the logged-in user's profile
// TODO: Frontend profile settings page calls PUT /api/profile to save changes

import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { profileSchema } from '@/lib/validations'
import { successResponse, errorResponse } from '@/lib/utils'

export async function GET() {
  try {
    const supabase = await createClient()

    // Get the currently logged-in user from session cookie
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return errorResponse('Unauthorized', 401)
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) {
      return errorResponse('Profile not found', 404)
    }

    return successResponse(profile)
  } catch {
    return errorResponse('Internal server error', 500)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return errorResponse('Unauthorized', 401)
    }

    const body = await request.json()
    const parsed = profileSchema.safeParse(body)

    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0].message, 400)
    }

    const { data: updatedProfile, error } = await supabase
      .from('profiles')
      .update({
        ...parsed.data,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)
      .select()
      .single()

    if (error) {
      return errorResponse('Failed to update profile: ' + error.message, 500)
    }

    return successResponse(updatedProfile)
  } catch {
    return errorResponse('Internal server error', 500)
  }
}
