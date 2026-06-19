// app/api/opportunities/route.ts
// GET /api/opportunities?type=internship&domain=AI/ML&search=google
// All query params are optional — returns all if no filters provided
// No auth required — public endpoint
// TODO: Frontend Opportunity Radar page calls this with filter values from dropdowns
// TODO: Replace mock opportunity data in frontend with this endpoint

import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { successResponse, errorResponse } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const domain = searchParams.get('domain')
    const search = searchParams.get('search')

    const supabase = await createClient()

    // Start building the query
    let query = supabase
      .from('opportunities')
      .select('*')
      .eq('is_active', true)
      .order('match_score', { ascending: false })

    // Apply filters only if provided
    if (type) {
      query = query.eq('type', type)
    }

    if (domain && domain !== 'All') {
      // Match exact domain OR opportunities marked for 'All' domains
      query = query.or(`domain.eq.${domain},domain.eq.All`)
    }

    if (search) {
      // Case-insensitive search in title and organization
      query = query.or(`title.ilike.%${search}%,organization.ilike.%${search}%`)
    }

    const { data: opportunities, error } = await query

    if (error) {
      return errorResponse('Failed to fetch opportunities', 500)
    }

    return successResponse(opportunities)
  } catch {
    return errorResponse('Internal server error', 500)
  }
}
