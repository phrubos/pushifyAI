# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Plushify is a SaaS application that transforms photos into plushie-style images using AI. Built with Next.js 15 App Router, React 19, TypeScript, and shadcn/ui.

## Commands

```bash
# Development
npm run dev          # Start dev server with Turbopack (ask user to run)
npm run lint         # Run ESLint - ALWAYS run after changes
npm run typecheck    # TypeScript check - ALWAYS run after changes

# Database
npm run db:generate  # Generate Drizzle migrations
npm run db:migrate   # Run migrations
npm run db:push      # Push schema directly (dev only)
npm run db:studio    # Open Drizzle Studio GUI

# Build
npm run build        # Production build
npm run build:with-db # Build with migrations
```

## Critical Rules

1. **Always run lint and typecheck after changes**: `npm run lint && npm run typecheck`
2. **Never start the dev server yourself** - ask the user to provide terminal output if needed
3. **Use OpenRouter for AI** - import from `@openrouter/ai-sdk-provider`, not `@ai-sdk/openai`

## Architecture

### Core Patterns

**Authentication Flow**
- Server-side: `import { auth } from "@/lib/auth"` then `auth.api.getSession({ headers: await headers() })`
- Client-side: `import { useSession } from "@/lib/auth-client"`
- Protected routes check session in Server Components

**Database Access**
- ORM: Drizzle with PostgreSQL
- Schema: `src/lib/schema.ts`
- Connection: `import { db } from "@/lib/db"`
- Always run migrations after schema changes

**AI Integration**
- Provider: OpenRouter (access to 100+ models via unified API)
- Default model: `openai/gpt-4o-mini` (configurable via `OPENROUTER_MODEL`)
- Endpoint: `src/app/api/chat/route.ts`
- Image generation: `src/app/actions/generate-image.ts`

**Server Actions**
- Located in `src/app/actions/`
- `generate-image.ts` - AI image generation with credits
- `credits.ts` - Credit management
- `generations.ts` - Generation history
- `polar.ts` - Payment integration
- `admin.ts` - Admin operations

### Key Integrations

**Payments**
- Provider: Polar SDK
- Webhook: `src/app/api/webhooks/polar/route.ts`
- Actions: `src/app/actions/polar.ts`, `src/app/actions/transactions.ts`

**Storage**
- Provider: Vercel Blob
- Utility: `src/lib/blob-storage.ts`

**Styling**
- Use standard Tailwind CSS utilities
- Use shadcn/ui color tokens (`bg-background`, `text-foreground`)
- Support dark mode with appropriate Tailwind classes
- Avoid custom colors unless requested

### Component Organization

**Plushify Components** (`src/components/plushify/`)
- Domain-specific components for the plushie generation workflow
- `generation-wizard.tsx` - Multi-step creation flow
- `before-after-slider.tsx` - Image comparison
- `gallery-item.tsx` - Gallery display

**UI Components** (`src/components/ui/`)
- shadcn/ui base components
- Add new components with: `npx shadcn@latest add <component>`

**Dashboard** (`src/components/dashboard/`)
- `unified-dashboard-client.tsx` - Main dashboard experience
- `stats-cards.tsx` - Analytics display

### Data Layer

**Mock Data** (`src/lib/mock-data/`)
- Used for UI demonstration without backend
- Gradually being replaced with real database queries

**Validation**
- Schema: Zod (`zod` package)
- Utilities: `src/lib/validation.ts`

## Environment Variables

Required in `.env`:
- `POSTGRES_URL` - PostgreSQL connection
- `BETTER_AUTH_SECRET` - 32-char auth secret
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - OAuth
- `OPENROUTER_API_KEY` - AI access
- `NEXT_PUBLIC_APP_URL` - App URL

## Adding Features

**New Page**: Create in `src/app/[route]/page.tsx`, use Server Components by default

**New API Route**: Create in `src/app/api/[route]/route.ts`, export HTTP handlers

**New Server Action**: Add to `src/app/actions/`, use `"use server"` directive

**Auth to Page**:
```typescript
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
const session = await auth.api.getSession({ headers: await headers() })
```

**Database Change**: Update `src/lib/schema.ts` ’ `npm run db:generate` ’ `npm run db:migrate`
