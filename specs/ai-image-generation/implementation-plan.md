# AI Image Generation - Implementation Plan

## Phase 1: Database Schema & Migrations

### Tasks
- [x] Add `credits` field to user table (integer, default 10, notNull)
- [x] Create `generations` table with all required fields
  - [x] id, userId (foreign key to user)
  - [x] originalImageUrl, generatedImageUrl (text, nullable for generated)
  - [x] status enum ('pending', 'processing', 'completed', 'failed')
  - [x] style enum ('cute', 'realistic', 'cartoon')
  - [x] size enum ('small', 'medium', 'large')
  - [x] isFavorite (boolean, default false)
  - [x] prompt (text, nullable)
  - [x] createdAt, updatedAt timestamps
- [x] Create `transactions` table for credit history
  - [x] id, userId (foreign key)
  - [x] amount (integer, can be negative)
  - [x] credits (integer, resulting balance)
  - [x] type enum ('purchase', 'bonus', 'admin', 'deduction', 'refund')
  - [x] status enum ('pending', 'completed', 'failed')
  - [x] metadata (jsonb, nullable)
  - [x] createdAt timestamp
- [x] Create `admin_users` table for role-based access
  - [x] userId (foreign key to user, primary key)
  - [x] role enum ('admin', 'super_admin')
  - [x] createdAt timestamp
- [x] Add indexes for performance (userId, createdAt, status on generations)
- [x] Generate migration: `npm run db:generate`
- [x] Run migration: `npm run db:migrate`
- [x] Backfill existing users with 10 default credits
- [x] Verify schema in Drizzle Studio: `npm run db:studio`

---

## Phase 2: Package Installation & Environment Setup

### Tasks
- [x] Install Vercel Blob SDK: `pnpm add @vercel/blob`
- [x] Install Google AI SDK: `pnpm add @ai-sdk/google`
- [x] Add `BLOB_READ_WRITE_TOKEN` to `.env` (get from Vercel dashboard)
- [x] Add `GOOGLE_GENERATIVE_AI_API_KEY` to `.env` (get from Google AI Studio)
- [x] Update `env.example` with new environment variables
- [x] Add `ADMIN_EMAILS` to `.env` (comma-separated list)
- [x] Verify Polar env vars are set: `POLAR_ACCESS_TOKEN`, `POLAR_WEBHOOK_SECRET`
- [x] Run `npm run typecheck` to ensure no errors

---

## Phase 3: Blob Storage Utilities

### Tasks
- [x] Create `src/lib/blob-storage.ts`
- [x] Implement `uploadOriginalImage(file: File, userId: string): Promise<string>`
  - [x] Generate unique filename with timestamp
  - [x] Upload to `Plushify/originals/{userId}/` folder
  - [x] Return public URL
- [x] Implement `uploadGeneratedImage(base64: string, userId: string): Promise<string>`
  - [x] Convert base64 to Buffer
  - [x] Generate unique filename
  - [x] Upload to `Plushify/generated/{userId}/` folder
  - [x] Return public URL
- [x] Implement `deleteImage(url: string): Promise<void>`
  - [x] Delete from Vercel Blob Storage using URL
  - [x] Handle errors gracefully
- [x] Implement `getPublicUrl(blobUrl: string): string`
  - [x] Return accessible public URL
- [x] Add error handling and logging to all functions
- [x] Export all functions from utilities file

---

## Phase 4: Credits Management System

### Tasks
- [x] Create `src/app/actions/credits.ts`
- [x] Implement `getUserCredits(): Promise<number>`
  - [x] Get authenticated user session
  - [x] Query user table for credits field
  - [x] Return credits or throw if not authenticated
- [x] Implement `hasEnoughCredits(required: number): Promise<boolean>`
  - [x] Get user credits
  - [x] Compare with required amount
  - [x] Return boolean
- [x] Implement `deductCredits(amount: number): Promise<void>`
  - [x] Get authenticated user
  - [x] Check sufficient credits
  - [x] Deduct credits in transaction
  - [x] Log to transactions table with type 'deduction'
  - [x] Throw error if insufficient
- [x] Implement `addCredits(userId: string, amount: number, reason: string): Promise<void>`
  - [x] Verify caller is admin (check session + admin_users table)
  - [x] Add credits to user in transaction
  - [x] Log to transactions table with type 'admin'
  - [x] Include reason in metadata
- [x] Implement `refundCredits(userId: string, amount: number): Promise<void>`
  - [x] Add credits back to user
  - [x] Log to transactions table with type 'refund'
- [x] Add error handling and validation to all functions
- [x] Export all functions as server actions

---

## Phase 5: Image Generation Server Action

### Tasks
- [x] Create `src/app/actions/generate-image.ts`
- [x] Import required dependencies: `google` from `@ai-sdk/google`, `generateText` from `ai`
- [x] Implement `generatePlushImage()` server action:
  - [x] Accept params: `originalImageFile: File`, `style`, `size`
  - [x] Verify user authentication (throw if not authenticated)
  - [x] Check sufficient credits using `hasEnoughCredits(1)`
  - [x] Throw `INSUFFICIENT_CREDITS` error if not enough
  - [x] Upload original image to blob storage
  - [x] Create generation record with status 'processing'
  - [x] Deduct 1 credit from user account
  - [x] Build prompt using `buildPlushifyPrompt()` helper
  - [x] Call `generateText()` with model `google('gemini-2.0-flash-exp')`
  - [x] Extract image from `result.experimental_output.files` array
  - [x] Upload generated image to blob storage
  - [x] Update generation record with generatedImageUrl and status 'completed'
  - [x] Return generation ID
- [x] Implement error handling:
  - [x] Catch any errors during generation
  - [x] Refund credit using `refundCredits()`
  - [x] Update generation status to 'failed'
  - [x] Re-throw error with user-friendly message
- [x] Implement `buildPlushifyPrompt(style: string, size: string): string` helper
  - [x] Map styles to descriptive prompts (cute → kawaii/chibi, etc.)
  - [x] Return formatted prompt for AI model
- [x] Implement `getGenerationById(id: string)` query function
  - [x] Query generations table by ID
  - [x] Return generation record
- [x] Export server action

---

## Phase 6: Generate Page Integration

### Tasks
- [x] Update `src/app/generate/page.tsx`
- [x] Remove mock data imports (`mockUser`)
- [x] Add server-side session and credits fetch:
  - [x] Import `auth` from `@/lib/auth`
  - [x] Get session using `auth.api.getSession()`
  - [x] Redirect to sign-in if no session
  - [x] Fetch user credits using `getUserCredits()`
- [x] Pass real credits to `CreditDisplay` component
- [x] Convert to Client Component for interactivity (keep data fetching in Server Component wrapper if needed)
- [x] Implement `handleGenerate()` function:
  - [x] Call `generatePlushImage()` server action
  - [x] Handle `INSUFFICIENT_CREDITS` error
  - [x] Show Sonner toast with link to pricing page
  - [x] Start polling for generation status
- [x] Implement `pollGenerationStatus(id: string)`:
  - [x] Use `setInterval` to poll every 2 seconds
  - [x] Call `getGenerationById(id)` server action
  - [x] Update wizard state based on status
  - [x] Clear interval when status is 'completed' or 'failed'
  - [x] Show error toast if status is 'failed'
- [x] Update `GenerationWizard` to use real data:
  - [x] Connect image upload to actual file selection
  - [x] Support real generation via props (backward compatible)
  - [x] Show real before/after images from generation record
- [x] Add loading states during generation
- [x] Add error boundary around wizard
- [x] Test full generation flow

---

## Phase 7: Gallery Page Integration

### Tasks
- [x] Update `src/app/gallery/page.tsx`
- [x] Remove mock data imports (`sampleGenerations`)
- [x] Add server-side session check and redirect if not authenticated
- [x] Create `getGenerations()` server action in `src/app/actions/generations.ts`:
  - [x] Query generations table for authenticated user
  - [x] Order by createdAt descending
  - [x] Add pagination support (limit 20, offset parameter)
  - [x] Return generations array
- [x] Fetch real generations data in page component
- [x] Implement `handleDelete(id: string)` server action:
  - [x] Get generation by ID
  - [x] Verify ownership (userId matches session)
  - [x] Delete original image from blob storage
  - [x] Delete generated image from blob storage
  - [x] Delete generation record from database
  - [x] Revalidate gallery page
- [x] Implement `toggleFavorite(id: string)` server action:
  - [x] Get generation by ID
  - [x] Verify ownership
  - [x] Toggle `isFavorite` field in database
  - [x] Revalidate gallery page
- [x] Implement `handleDownload(imageUrl: string)` client-side function:
  - [x] Fetch image from blob URL
  - [x] Create blob and download link
  - [x] Trigger download
- [x] Implement search functionality:
  - [x] Add client-side filtering by search term
  - [x] Filter by matching prompt or generation ID
- [x] Implement filter functionality:
  - [x] Filter by status (client-side)
  - [x] Sort by newest/oldest/favorites (client-side)
- [x] Add pagination controls:
  - [x] Track current page in state
  - [x] Load more button or infinite scroll
- [x] Add empty states for no generations
- [x] Add loading skeletons during data fetch
- [x] Test all gallery operations (delete, favorite, download, filter)

---

## Phase 8: Credit Purchase System (Polar Integration)

### Tasks
- [x] Create `src/app/actions/polar.ts` for Polar-related actions
- [x] Implement `createCheckoutSession(creditsPackage: string)` server action:
  - [x] Get authenticated user
  - [x] Map package to Polar product ID and price
  - [x] Create Polar checkout session
  - [x] Add user ID to checkout metadata
  - [x] Return checkout URL
- [x] Update `src/app/pricing/page.tsx`:
  - [x] Define credit packages (50/$4.99, 200/$14.99, 500/$29.99)
  - [x] Add "Buy Now" buttons for each package
  - [x] Call `createCheckoutSession()` on button click
  - [x] Redirect to Polar checkout URL
- [x] Create/Update `src/app/api/webhooks/polar/route.ts`:
  - [x] Verify Polar webhook signature
  - [x] Handle `checkout.completed` event
  - [x] Extract user ID from metadata
  - [x] Extract credits amount from product
  - [x] Add credits to user account
  - [x] Create transaction record with type 'purchase'
  - [x] Return 200 response
- [x] Add purchase history to user profile/dashboard:
  - [x] Create `getTransactionHistory(userId: string)` action
  - [x] Filter by type 'purchase'
  - [x] Display in table format with date, amount, credits
- [ ] Test checkout flow end-to-end:
  - [ ] Create test checkout
  - [ ] Verify webhook receives event
  - [ ] Verify credits added to account
  - [ ] Verify transaction logged

---

## Phase 9: Admin Credit Management

### Tasks
- [x] Create `src/middleware/admin.ts`:
  - [x] Check if authenticated user exists in admin_users table
  - [x] Export `requireAdmin()` function for server actions
- [x] Create `src/app/admin/credits/page.tsx`:
  - [x] Add authentication check (redirect if not signed in)
  - [x] Add admin authorization check (show 403 if not admin)
  - [x] Create search form for finding users by email
  - [x] Display user credit balance when found
  - [x] Add form to add/remove credits with reason field
  - [x] Display transaction history for selected user
- [x] Create `src/app/actions/admin.ts`:
  - [x] Implement `searchUsers(email: string)` (admin only)
    - [x] Verify admin using `requireAdmin()`
    - [x] Query users table by email (case-insensitive partial match)
    - [x] Return users array with id, email, credits
  - [x] Implement `adminAddCredits(userId, amount, reason)` (admin only)
    - [x] Verify admin
    - [x] Call `addCredits()` from credits actions
    - [x] Return success/error
  - [x] Implement `adminRemoveCredits(userId, amount, reason)` (admin only)
    - [x] Verify admin
    - [x] Call `deductCredits()` but allow admin to deduct even if insufficient
    - [x] Log with type 'admin' and reason in metadata
  - [x] Implement `getTransactionHistory(userId: string)` (admin only)
    - [x] Verify admin
    - [x] Query transactions table for user
    - [x] Order by createdAt descending
    - [x] Return transactions array
- [x] Seed admin user:
  - [x] Get your user ID from database
  - [x] Insert into admin_users table with role 'admin'
  - [x] Verify admin access works
- [x] Style admin panel with Tailwind + shadcn/ui components
- [x] Add error handling and validation
- [ ] Test all admin operations

---

## Phase 10: Error Handling, Polish & Quality Assurance

### Tasks
- [x] Add loading states:
  - [x] Generate page: Show spinner during generation
  - [x] Gallery page: Show skeletons while loading
  - [x] Admin page: Show loading on search/updates
- [x] Implement error boundaries:
  - [x] Wrap GenerationWizard in error boundary
  - [x] Wrap Gallery grid in error boundary
  - [x] Show user-friendly error fallbacks
- [x] Add Sonner toast notifications:
  - [x] Success: "Image generated successfully! 🎉"
  - [x] Error: "Insufficient credits" with action button → /pricing
  - [x] Error: "Generation failed, credit refunded"
  - [x] Success: "Credits purchased!"
  - [x] Success: "Image deleted"
  - [x] Success: "Favorited!"
- [x] Implement optimistic UI updates:
  - [x] Gallery: Update UI immediately on favorite toggle
  - [x] Credits: Show deducted amount before server confirms
- [ ] Add retry logic:
  - [ ] Retry failed blob storage uploads
  - [ ] Handle rate limits gracefully
- [x] Add input validation:
  - [x] File type validation (JPG/PNG only)
  - [x] File size validation (max 10MB)
  - [x] Form validation for admin panel
- [x] Run quality checks:
  - [x] `npm run lint` - fix all linting errors
  - [x] `npm run typecheck` - fix all TypeScript errors
  - [ ] Manual testing of all user flows
  - [ ] Test on mobile devices (responsive design)
- [ ] Update documentation:
  - [ ] Add comments to complex functions
  - [ ] Update README with new features
  - [ ] Document environment variables
- [x] Security review:
  - [x] Verify all server actions check authentication
  - [x] Verify admin actions check authorization
  - [x] Review blob storage access controls
  - [x] Verify webhook signature validation
- [ ] Performance optimization:
  - [ ] Add database indexes if slow
  - [ ] Optimize image loading (Next.js Image component)
  - [ ] Add caching where appropriate
- [ ] Final testing checklist:
  - [ ] User can upload image ✓
  - [ ] Generation works with all styles ✓
  - [ ] Credit deduction works ✓
  - [ ] Credit refund on failure works ✓
  - [ ] Gallery CRUD operations work ✓
  - [ ] Credit purchase works ✓
  - [ ] Admin panel works ✓
  - [ ] Error messages are clear ✓
  - [ ] Mobile responsive ✓

---

## Success Criteria

All tasks completed across all phases:
- ✅ Database schema created and migrated
- ✅ Blob storage configured and working
- ✅ Credits system functional (deduction, refunds, purchases)
- ✅ Image generation working end-to-end
- ✅ Gallery fully functional with CRUD operations
- ✅ Admin panel operational
- ✅ Error handling comprehensive
- ✅ Zero lint/typecheck errors
- ✅ All user flows tested and working

## Notes

- This implementation uses `generateText()` with Google Gemini 2.5 Flash Image, extracting images from `result.files`, NOT `experimental_generateImage()`
- Processing is synchronous with client-side polling (no webhooks needed)
- All images stored in Vercel Blob Storage with organized folder structure
- Credits system integrated with Polar for payments
- Admin features protected by role-based access control
