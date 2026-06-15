// app/api/dna/analyze/route.ts
// POST /api/dna/analyze — Takes 10 quiz answers, calls Gemini, saves result
// TODO: Frontend Career DNA quiz page calls this after student completes all 10 questions
// TODO: Frontend receives result and shows the DNA breakdown chart

import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { dnaSchema } from '@/lib/validations'
import { analyzeDNA } from '@/lib/gemini'
import { successResponse, errorResponse } from '@/lib/utils'

export async function POST(request: NextRequest) {
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
    const parsed = dnaSchema.safeParse(body)

    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0].message, 400)
    }

    const { answers } = parsed.data

    // Call Gemini API to analyze answers
    // This is the most expensive operation — Gemini API call
    const geminiResult = await analyzeDNA(answers)

    // Save result to database
    const { data: savedResult, error: insertError } = await supabase
      .from('dna_results')
      .insert({
        user_id: user.id,
        builder_score: geminiResult.builder_score,
        researcher_score: geminiResult.researcher_score,
        analytical_score: geminiResult.analytical_score,
        leader_score: geminiResult.leader_score,
        designer_score: geminiResult.designer_score,
        top_domain: geminiResult.top_domain,
        recommended_domains: geminiResult.recommended_domains,
        raw_answers: answers, // Store original answers for future re-analysis
      })
      .select()
      .single()

    if (insertError) {
      return errorResponse('Failed to save DNA result', 500)
    }

    // Update profile's domain to match top DNA domain
    await supabase
      .from('profiles')
      .update({ domain: geminiResult.top_domain })
      .eq('id', user.id)

    return successResponse(
      {
        ...savedResult,
        explanation: geminiResult.explanation,
      },
      201
    )
  } catch (error) {
    // Gemini can fail — give a user-friendly error
    if (error instanceof SyntaxError) {
      return errorResponse('AI returned invalid response. Please try again.', 500)
    }
    return errorResponse('Internal server error', 500)
  }
}
