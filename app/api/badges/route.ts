// app/api/badges/route.ts
// GET /api/badges — Returns all badges earned by the logged-in user
// TODO: Frontend dashboard achievement section calls this
// TODO: Badges are awarded manually for now — add badge-awarding logic later

import { createClient } from '@/lib/supabase/server'
import { successResponse, errorResponse } from '@/lib/utils'

export async function GET() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return errorResponse('Unauthorized', 401)
    }

    const { data: badges, error } = await supabase
      .from('badges')
      .select('*')
      .eq('user_id', user.id)
      .order('earned_at', { ascending: false })

    if (error) {
      return errorResponse('Failed to fetch badges', 500)
    }

    return successResponse(badges ?? [])
  } catch {
    return errorResponse('Internal server error', 500)
  }
}
