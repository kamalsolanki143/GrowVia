// lib/utils.ts
// WHY THIS FILE EXISTS:
// Small helper functions shared across API routes.
// generateUsername: converts "Muskan Sharma" → "muskansharma_k8x2" as default username.
// successResponse / errorResponse: ensures every API route returns consistent shape.

import { NextResponse } from 'next/server'
import type { ApiResponse } from '@/types'

// Converts full name to a clean username
// Example: "Kamal Solanki" → "kamalsolanki_k8x2"
// The unique suffix prevents collisions
export function generateUsername(name: string): string {
  const base = name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')
  const suffix = Math.random().toString(36).substring(2, 6)
  return `${base}_${suffix}`
}

// Consistent success response wrapper
export function successResponse<T>(data: T, status = 200) {
  const body: ApiResponse<T> = { data, error: null }
  return NextResponse.json(body, { status })
}

// Consistent error response wrapper
// Kamal's frontend can always check: if (res.error) { showToast(res.error) }
export function errorResponse(message: string, status = 400) {
  const body: ApiResponse<null> = { data: null, error: message }
  return NextResponse.json(body, { status })
}
