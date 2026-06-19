// lib/gemini.ts
// WHY THIS FILE EXISTS:
// Isolates all Gemini AI logic in one place.
// The analyzeDNA function takes 10 student answers → returns structured career scores.
//
// WHY GEMINI 1.5 FLASH (not Pro):
// Flash is 10x cheaper and fast enough for this use case.
// We're not doing complex reasoning, just structured JSON extraction.
//
// WHY THE STRICT PROMPT FORMAT:
// Gemini sometimes wraps JSON in ```json ``` markdown blocks.
// We strip those with .replace() before JSON.parse() to avoid crashes.

import { GoogleGenerativeAI } from '@google/generative-ai'
import type { DNAResult } from '@/types'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function analyzeDNA(
  answers: string[]
): Promise<Omit<DNAResult, 'id' | 'user_id' | 'created_at' | 'raw_answers'> & { explanation: string }> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const prompt = `You are a career counselor AI for Indian CS students. Analyze these 10 career assessment answers and return ONLY valid JSON with no markdown, no code blocks, no explanation — just pure JSON:
{
  "builder_score": number between 0-100,
  "researcher_score": number between 0-100,
  "analytical_score": number between 0-100,
  "leader_score": number between 0-100,
  "designer_score": number between 0-100,
  "top_domain": one of exactly: "AI/ML" | "Web Development" | "Data Science" | "Cybersecurity" | "Product Management" | "UI/UX Design",
  "recommended_domains": array of 3 strings from the same list above,
  "explanation": string of maximum 2 sentences explaining the result
}

Student answers: ${JSON.stringify(answers)}`

  const result = await model.generateContent(prompt)
  const text = result.response.text()

  // Strip markdown code blocks if Gemini wraps the JSON
  const clean = text.replace(/```json|```/g, '').trim()

  return JSON.parse(clean)
}
