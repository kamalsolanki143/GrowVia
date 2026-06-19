// middleware.ts
// WHY THIS FILE EXISTS:
// Runs before every request hits an API route or page.
// Protects dashboard pages — unauthenticated users are redirected to /login.
// Redirects logged-in users away from /login and /signup (they're already in).
//
// WHY MIDDLEWARE (not just checking session in each page):
// Centralized protection — you can't forget to add auth check to a new page.
// Middleware runs at the Edge — fast, no cold starts.
//
// IMPORTANT: Middleware also refreshes the Supabase session automatically.
// This prevents users from getting logged out when their JWT expires.

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: getUser() refreshes the session. Do not remove this.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Routes that require login
  const protectedRoutes = ['/dashboard', '/career-dna', '/opportunity-radar', '/talent-passport']
  // Routes that logged-in users shouldn't see
  const authRoutes = ['/login', '/signup']

  // Not logged in + trying to access protected route → send to login
  if (protectedRoutes.some((r) => pathname.startsWith(r)) && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Already logged in + trying to access login/signup → send to dashboard
  if (authRoutes.includes(pathname) && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return supabaseResponse
}

export const config = {
  // Run middleware on all routes EXCEPT Next.js internals and static files
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
