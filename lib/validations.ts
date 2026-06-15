// lib/validations.ts
// WHY THIS FILE EXISTS:
// Zod validates request bodies at runtime before we touch the database.
// Without this, a malformed request could crash our API route or insert garbage data.
// Each schema matches exactly what that API route expects in the request body.

import { z } from 'zod'

// Signup: name required (min 2), valid email, strong password
export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

// Login: just email + any non-empty password
export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
})

// Profile update: all fields optional (PATCH-style update)
export const profileSchema = z.object({
  name: z.string().min(2).optional(),
  bio: z.string().max(300, 'Bio cannot exceed 300 characters').optional(),
  skills: z.array(z.string()).optional(),
  domain: z.string().optional(),
})

// DNA analysis: exactly 10 answers, no more no less
export const dnaSchema = z.object({
  answers: z.array(z.string()).length(10, 'Exactly 10 answers required'),
})
