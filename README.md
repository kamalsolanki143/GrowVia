# Growvia — AI-Powered Career Operating System

> **For Kamal (Frontend):** This README covers everything you need to connect your frontend pages to Muskan's backend API. Read this fully before starting integration.

---

## 🧑‍💻 Team Split

| Person | Role | Owns |
|---|---|---|
| **Muskan** | Backend / CTO | `app/api/`, `lib/`, `types/`, `middleware.ts`, Supabase, Gemini AI |
| **Kamal** | Frontend | All page files in `app/`, CSS, components, UI logic |

**Rule:** Kamal never touches `app/api/`. Muskan never touches frontend page files.

---

## 🚀 Getting Started (Kamal's Setup)

```bash
# 1. Clone the repo
git clone <repo-url>
cd Growvia

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the backend is already live.

> ⚠️ You do NOT need to touch `.env.local`. Muskan has already set up all the API keys. Just `npm install` and `npm run dev`.

---

## 📁 Folder Structure — What Kamal Owns

```
Growvia/
├── app/
│   ├── layout.tsx              ← ROOT LAYOUT — Kamal builds this (navbar, fonts, etc.)
│   ├── page.tsx                ← Landing page — Kamal builds this
│   ├── login/
│   │   └── page.tsx            ← Login page — Kamal builds this
│   ├── signup/
│   │   └── page.tsx            ← Signup page — Kamal builds this
│   ├── dashboard/
│   │   └── page.tsx            ← Dashboard — Kamal builds this
│   ├── career-dna/
│   │   └── page.tsx            ← DNA Quiz page — Kamal builds this
│   ├── opportunity-radar/
│   │   └── page.tsx            ← Opportunities page — Kamal builds this
│   └── talent-passport/
│       └── page.tsx            ← Public profile page — Kamal builds this
│
├── app/api/                    ← ❌ DO NOT TOUCH — Muskan's backend
├── lib/                        ← ❌ DO NOT TOUCH — Muskan's backend
├── middleware.ts               ← ❌ DO NOT TOUCH — handles auth redirects
│
└── types/index.ts              ← ✅ READ THIS — all TypeScript types to use in frontend
```

---

## 🔐 Authentication — How It Works

Supabase handles auth via **HTTP cookies** automatically. You don't manage tokens manually.

### Login Flow
```
User fills login form
    → Frontend calls POST /api/auth/login
    → Supabase sets session cookie automatically
    → Middleware detects cookie on every request
    → Protected pages just work
```

### Logout
```typescript
// In any client component:
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()
await supabase.auth.signOut()
// Then redirect to /login
```

### Check if user is logged in (Client Component)
```typescript
'use client'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

const supabase = createClient()
const { data: { user } } = await supabase.auth.getUser()
// user is null if not logged in
```

### Protected Pages
Middleware already protects these routes — if user isn't logged in, they're automatically redirected to `/login`. **You don't need to add any auth checks on these pages yourself:**
- `/dashboard`
- `/career-dna`
- `/opportunity-radar`
- `/talent-passport`

---

## 📡 API Reference — Complete Integration Guide

All API responses follow this exact shape:
```typescript
{ data: T | null, error: string | null }
```

**Always check `error` first:**
```typescript
const res = await fetch('/api/profile')
const json = await res.json()

if (json.error) {
  // Show error toast to user
  showToast(json.error)
  return
}

// Safe to use json.data here
const profile = json.data
```

---

### 1. 🔑 AUTH — Signup

**Page:** `app/signup/page.tsx`

```typescript
// Called when user submits the signup form
const handleSignup = async (name: string, email: string, password: string) => {
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })

  const json = await res.json()

  if (json.error) {
    // Show error: json.error (e.g. "Name must be at least 2 characters")
    return
  }

  // Success — redirect to dashboard
  router.push('/dashboard')
}
```

**Validation rules** (show these inline on the form):
- `name` → minimum 2 characters
- `email` → must be valid email
- `password` → minimum 8 characters

---

### 2. 🔑 AUTH — Login

**Page:** `app/login/page.tsx`

```typescript
const handleLogin = async (email: string, password: string) => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  const json = await res.json()

  if (json.error) {
    // Show: "Invalid email or password" (generic — intentional for security)
    return
  }

  // Success — cookie is set automatically
  router.push('/dashboard')
}
```

---

### 3. 👤 PROFILE — Load Own Profile

**Page:** `app/dashboard/page.tsx`

```typescript
// Fetch on page load to display user's name, domain, streak, etc.
const res = await fetch('/api/profile')
const json = await res.json()

// json.data shape:
{
  id: string
  name: string
  username: string           // e.g. "kamalsolanki_ab12" — used for Talent Passport URL
  email: string
  avatar_url: string | null
  talent_score: number       // Show in dashboard header
  domain: string             // e.g. "AI/ML" — auto-updated after DNA quiz
  streak_days: number        // Show streak counter
  bio: string | null
  skills: string[]           // Array like ["React", "Python"]
  created_at: string
  updated_at: string
}
```

---

### 4. 👤 PROFILE — Update Profile

**Page:** Profile settings section

```typescript
const handleSave = async () => {
  const res = await fetch('/api/profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Kamal Solanki',           // optional
      bio: '2nd year CSE @ IEM',       // optional, max 300 chars
      skills: ['React', 'Node.js'],    // optional, array of strings
      domain: 'Web Development',       // optional
    }),
  })

  const json = await res.json()
  // json.data = updated profile object
}
```

All fields are **optional** — only send what changed.

---

### 5. 🌐 TALENT PASSPORT — Public Profile

**Page:** `app/talent-passport/page.tsx`

```typescript
// URL: /talent-passport/kamalsolanki_ab12
// Fetch by username — no auth needed
const res = await fetch(`/api/profile/${username}`)
const json = await res.json()

// json.data shape:
{
  profile: Profile,           // Full profile object (see above)
  dna: DNAResult | null,      // null if user hasn't taken quiz yet
  badges: Badge[]             // Array of earned badges (may be empty)
}
```

---

### 6. 🧬 CAREER DNA — Submit Quiz

**Page:** `app/career-dna/page.tsx`

```typescript
// Called after user completes all 10 questions
// answers = array of exactly 10 strings (the user's text responses)
const handleSubmit = async (answers: string[]) => {
  const res = await fetch('/api/dna/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }), // must be exactly 10 items
  })

  const json = await res.json()

  // json.data shape (show this as the result chart):
  {
    id: string
    builder_score: number      // 0-100 — "Product Builder" trait
    researcher_score: number   // 0-100 — "Deep Researcher" trait
    analytical_score: number   // 0-100 — "Analytical Thinker" trait
    leader_score: number       // 0-100 — "Natural Leader" trait
    designer_score: number     // 0-100 — "Creative Designer" trait
    top_domain: string         // e.g. "AI/ML" — primary career path
    recommended_domains: string[]  // Array of 3 domain suggestions
    explanation: string        // 1-2 sentence AI explanation to show user
    created_at: string
  }
}
```

> ⚠️ This calls the Gemini AI API — may take 2-4 seconds. Show a loading spinner.

---

### 7. 🧬 CAREER DNA — Load Saved Result

**Page:** `app/dashboard/page.tsx` (DNA status card)

```typescript
const res = await fetch('/api/dna/result')
const json = await res.json()

if (json.data === null) {
  // User hasn't taken the quiz yet
  // Show CTA: "Discover Your Career DNA →" button linking to /career-dna
} else {
  // Show DNA scores as a radar/bar chart
  const dna = json.data // same shape as analyze result above
}
```

---

### 8. 🎯 OPPORTUNITIES — Load & Filter

**Page:** `app/opportunity-radar/page.tsx`

```typescript
// Load all opportunities (on page mount)
const res = await fetch('/api/opportunities')

// With filters (when user changes dropdowns):
const res = await fetch('/api/opportunities?type=internship&domain=AI%2FML&search=google')
```

**Query params (all optional):**
| Param | Values | Example |
|---|---|---|
| `type` | `internship` / `hackathon` / `fellowship` / `scholarship` / `competition` | `?type=internship` |
| `domain` | `AI/ML` / `Web Dev` / `All` / etc. | `?domain=AI%2FML` |
| `search` | Any string | `?search=google` |

```typescript
// json.data shape (array):
[
  {
    id: string
    title: string              // "Smart India Hackathon"
    type: string               // "hackathon"
    organization: string       // "Govt of India"
    domain: string             // "All"
    match_score: number        // 0-100 — use for sorting/badge display
    deadline: string           // "2026-08-01"
    description: string | null
    apply_url: string | null   // Link for "Apply Now" button
    is_active: boolean
  }
]
```

---

### 9. 🏅 BADGES — Load User Badges

**Page:** Dashboard achievements section

```typescript
const res = await fetch('/api/badges')
const json = await res.json()

// json.data shape (array, may be empty []):
[
  {
    id: string
    badge_name: string         // e.g. "DNA Pioneer"
    badge_icon: string         // emoji or icon name e.g. "🧬"
    badge_description: string | null
    earned_at: string          // ISO date string
  }
]
```

---

## 🗺️ Page → API Mapping (Quick Reference)

| Page | API Calls to Make |
|---|---|
| `app/signup/page.tsx` | `POST /api/auth/signup` |
| `app/login/page.tsx` | `POST /api/auth/login` |
| `app/dashboard/page.tsx` | `GET /api/profile` + `GET /api/dna/result` + `GET /api/badges` |
| `app/career-dna/page.tsx` | `POST /api/dna/analyze` (on submit) + `GET /api/dna/result` (on load) |
| `app/opportunity-radar/page.tsx` | `GET /api/opportunities` (with optional filters) |
| `app/talent-passport/page.tsx` | `GET /api/profile/:username` |

---

## 🎨 Frontend Routes & Pages to Build

| Route | Page | Auth Required? |
|---|---|---|
| `/` | Landing page | No |
| `/login` | Login form | No (redirects to `/dashboard` if logged in) |
| `/signup` | Signup form | No (redirects to `/dashboard` if logged in) |
| `/dashboard` | Main dashboard | ✅ Yes (auto-redirects to `/login` if not) |
| `/career-dna` | DNA quiz + result | ✅ Yes |
| `/opportunity-radar` | Opportunity cards + filters | ✅ Yes |
| `/talent-passport/[username]` | Public profile card | No |

---

## 📦 TypeScript Types (Import These)

All types live in `types/index.ts`. Import them in your frontend pages:

```typescript
import type { Profile, DNAResult, Opportunity, Badge, Mission, ApiResponse } from '@/types'
```

---

## ⚙️ Using Supabase Client in Frontend

For any Supabase operations directly in client components (e.g., logout, real-time):

```typescript
'use client'
import { createClient } from '@/lib/supabase/client'  // ✅ Use this in components
// NOT: import { createClient } from '@/lib/supabase/server'  ← server only
```

---

## ❓ FAQ

**Q: Do I need to handle redirects for protected pages?**
A: No. `middleware.ts` handles it. Just build the page — unauthenticated users are auto-redirected.

**Q: How do I get the logged-in user's info?**
A: Call `GET /api/profile` — it reads the session cookie and returns the user's profile.

**Q: The DNA quiz has 10 questions — what format should answers be?**
A: An array of 10 plain text strings. Example: `["I love building things", "I prefer backend work", ...]`

**Q: How do I show the username in the Talent Passport URL?**
A: Fetch the profile first (`GET /api/profile`), then use `profile.username` for the URL: `/talent-passport/${profile.username}`

**Q: What happens if Gemini AI is slow?**
A: The `/api/dna/analyze` call may take 2-5 seconds. Show a loading state while waiting.

**Q: Do I need to handle the session cookie manually?**
A: No. `fetch()` sends cookies automatically when calling same-origin API routes. No extra headers needed.

---

## 🧪 Quick Test in Browser

Test that the backend is working before starting frontend:

```
http://localhost:3000/api/opportunities
```

You should see 10 opportunities as JSON. If yes, backend is ready. ✅

---

## 📞 Contact

- **Backend issues / API questions** → Muskan
- **UI / component questions** → Kamal
- **Supabase Dashboard access** → Ask Muskan for invite link
