// app/api/dna/result/route.ts
// GET /api/dna/result — Returns the user's latest saved DNA result
// TODO: Frontend dashboard calls this to show DNA status
// TODO: If null is returned, show "Take the Career DNA quiz" CTA

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

    const { data: result } = await supabase
      .from('dna_results')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    // Return null data (not an error) if no DNA taken yet
    return successResponse(result ?? null)
  } catch {
    return errorResponse('Internal server error', 500)
  }
}
