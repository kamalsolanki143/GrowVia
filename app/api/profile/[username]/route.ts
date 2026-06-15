// app/api/profile/[username]/route.ts
// GET /api/profile/:username → Public profile (Talent Passport feature)
// No auth required — anyone can view a student's public talent passport
// TODO: Frontend talent-passport page calls GET /api/profile/[username]
// TODO: Kamal's frontend renders the public passport card using this data

import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { successResponse, errorResponse } from '@/lib/utils'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params
    const supabase = await createClient()

    // Fetch profile by username (public — no auth check)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single()

    if (profileError || !profile) {
      return errorResponse('User not found', 404)
    }

    // Fetch their latest DNA result (public display on passport)
    const { data: dna } = await supabase
      .from('dna_results')
      .select('*')
      .eq('user_id', profile.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    // Fetch their badges (public display on passport)
    const { data: badges } = await supabase
      .from('badges')
      .select('*')
      .eq('user_id', profile.id)

    return successResponse({ profile, dna: dna ?? null, badges: badges ?? [] })
  } catch {
    return errorResponse('Internal server error', 500)
  }
}
