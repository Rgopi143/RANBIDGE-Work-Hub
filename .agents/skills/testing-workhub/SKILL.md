---
name: testing-ranbidge-workhub
description: Test the RANBIDGE Work Hub app end-to-end. Use when verifying UI changes, landing page, or workspace features.
---

# Testing RANBIDGE Work Hub

## Dev Server Setup

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev` (runs on port 3000)
3. The server uses `tsx server.ts` which starts both Vite and Express
4. No API key is needed for most UI testing — `GEMINI_API_KEY` is only required for AI assistant features
5. If port 3000 is already in use: `fuser -k 3000/tcp` then restart

## Lint & Build

- Lint (TypeScript check): `npm run lint` (runs `tsc --noEmit`)
- Production build: `npm run build`

## App Architecture

- React + TypeScript + Tailwind CSS v4 + Vite
- Entry point: `src/main.tsx` → `src/App.tsx`
- State management: `src/context/WorkspaceContext.tsx` (React Context with localStorage persistence)
- Components: `src/components/` (DashboardView, Sidebar, Header, LandingPage, etc.)
- Animation library: `motion` (framer-motion) — already a dependency
- Icons: `lucide-react`

## Landing Page Testing

- The landing page is the default view when the app loads (controlled by `isLoggedIn` state in `WorkspaceLayout`)
- Refreshing the page resets to the landing page (state is in-memory, not persisted)
- Login buttons exist in 3 places: navbar, hero "Get Started", and CTA section
- All login buttons call `onLogin()` which sets `isLoggedIn=true` and shows the workspace
- The landing page uses a dark theme (`bg-[#0a0a1a]`) independent of workspace themes

## Workspace Testing

- After login, the workspace shows: Sidebar + Header + main content area
- Default view is the Dashboard with welcome message, stats, charts
- Sidebar has navigation: Dashboard, Employees, Teams & Chat, Projects, Task Console, Attendance, Leave Requests, Payroll & Slips, Performance & AI, Doc Vault, Announcements, Settings
- Theme can be changed via the header dropdown (Minimal Warm, Slate Dark, Vintage Sepia, Industrial Mono)
- Role can be changed via header dropdown (Super Admin, HR, Manager, Team Lead, Employee, Intern)

## Devin Secrets Needed

- `GEMINI_API_KEY` — only needed if testing AI assistant/co-pilot features (optional for most UI testing)
