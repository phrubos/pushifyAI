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
- [ ] Update `src/app/gallery/page.tsx`
- [ ] Remove mock data imports (`sampleGenerations`)
- [ ] Add server-side session check and redirect if not authenticated
- [ ] Create `getGenerations()` server action in `src/app/actions/generations.ts`:
  - [ ] Query generations table for authenticated user
  - [ ] Order by createdAt descending
  - [ ] Add pagination support (limit 20, offset parameter)
  - [ ] Return generations array
- [ ] Fetch real generations data in page component
- [ ] Implement `handleDelete(id: string)` server action:
  - [ ] Get generation by ID
  - [ ] Verify ownership (userId matches session)
  - [ ] Delete original image from blob storage
  - [ ] Delete generated image from blob storage
  - [ ] Delete generation record from database
  - [ ] Revalidate gallery page
- [ ] Implement `toggleFavorite(id: string)` server action:
  - [ ] Get generation by ID
  - [ ] Verify ownership
  - [ ] Toggle `isFavorite` field in database
  - [ ] Revalidate gallery page
- [ ] Implement `handleDownload(imageUrl: string)` client-side function:
  - [ ] Fetch image from blob URL
  - [ ] Create blob and download link
  - [ ] Trigger download
- [ ] Implement search functionality:
  - [ ] Add client-side filtering by search term
  - [ ] Filter by matching prompt or generation ID
- [ ] Implement filter functionality:
  - [ ] Filter by status (client-side)
  - [ ] Sort by newest/oldest/favorites (client-side)
- [ ] Add pagination controls:
  - [ ] Track current page in state
  - [ ] Load more button or infinite scroll
- [ ] Add empty states for no generations
- [ ] Add loading skeletons during data fetch
- [ ] Test all gallery operations (delete, favorite, download, filter)

---

## Phase 8: Credit Purchase System (Polar Integration)

### Tasks
- [ ] Create `src/app/actions/polar.ts` for Polar-related actions
- [ ] Implement `createCheckoutSession(creditsPackage: string)` server action:
  - [ ] Get authenticated user
  - [ ] Map package to Polar product ID and price
  - [ ] Create Polar checkout session
  - [ ] Add user ID to checkout metadata
  - [ ] Return checkout URL
- [ ] Update `src/app/pricing/page.tsx`:
  - [ ] Define credit packages (50/$4.99, 200/$14.99, 500/$29.99)
  - [ ] Add "Buy Now" buttons for each package
  - [ ] Call `createCheckoutSession()` on button click
  - [ ] Redirect to Polar checkout URL
- [ ] Create/Update `src/app/api/webhooks/polar/route.ts`:
  - [ ] Verify Polar webhook signature
  - [ ] Handle `checkout.completed` event
  - [ ] Extract user ID from metadata
  - [ ] Extract credits amount from product
  - [ ] Add credits to user account
  - [ ] Create transaction record with type 'purchase'
  - [ ] Return 200 response
- [ ] Add purchase history to user profile/dashboard:
  - [ ] Create `getTransactionHistory(userId: string)` action
  - [ ] Filter by type 'purchase'
  - [ ] Display in table format with date, amount, credits
- [ ] Test checkout flow end-to-end:
  - [ ] Create test checkout
  - [ ] Verify webhook receives event
  - [ ] Verify credits added to account
  - [ ] Verify transaction logged

---

## Phase 9: Admin Credit Management

### Tasks
- [ ] Create `src/middleware/admin.ts`:
  - [ ] Check if authenticated user exists in admin_users table
  - [ ] Export `requireAdmin()` function for server actions
- [ ] Create `src/app/admin/credits/page.tsx`:
  - [ ] Add authentication check (redirect if not signed in)
  - [ ] Add admin authorization check (show 403 if not admin)
  - [ ] Create search form for finding users by email
  - [ ] Display user credit balance when found
  - [ ] Add form to add/remove credits with reason field
  - [ ] Display transaction history for selected user
- [ ] Create `src/app/actions/admin.ts`:
  - [ ] Implement `searchUsers(email: string)` (admin only)
    - [ ] Verify admin using `requireAdmin()`
    - [ ] Query users table by email (case-insensitive partial match)
    - [ ] Return users array with id, email, credits
  - [ ] Implement `adminAddCredits(userId, amount, reason)` (admin only)
    - [ ] Verify admin
    - [ ] Call `addCredits()` from credits actions
    - [ ] Return success/error
  - [ ] Implement `adminRemoveCredits(userId, amount, reason)` (admin only)
    - [ ] Verify admin
    - [ ] Call `deductCredits()` but allow admin to deduct even if insufficient
    - [ ] Log with type 'admin' and reason in metadata
  - [ ] Implement `getTransactionHistory(userId: string)` (admin only)
    - [ ] Verify admin
    - [ ] Query transactions table for user
    - [ ] Order by createdAt descending
    - [ ] Return transactions array
- [ ] Seed admin user:
  - [ ] Get your user ID from database
  - [ ] Insert into admin_users table with role 'admin'
  - [ ] Verify admin access works
- [ ] Style admin panel with Tailwind + shadcn/ui components
- [ ] Add error handling and validation
- [ ] Test all admin operations

---

## Phase 10: Error Handling, Polish & Quality Assurance

### Tasks
- [ ] Add loading states:
  - [ ] Generate page: Show spinner during generation
  - [ ] Gallery page: Show skeletons while loading
  - [ ] Admin page: Show loading on search/updates
- [ ] Implement error boundaries:
  - [ ] Wrap GenerationWizard in error boundary
  - [ ] Wrap Gallery grid in error boundary
  - [ ] Show user-friendly error fallbacks
- [ ] Add Sonner toast notifications:
  - [ ] Success: "Image generated successfully! 🎉"
  - [ ] Error: "Insufficient credits" with action button → /pricing
  - [ ] Error: "Generation failed, credit refunded"
  - [ ] Success: "Credits purchased!"
  - [ ] Success: "Image deleted"
  - [ ] Success: "Favorited!"
- [ ] Implement optimistic UI updates:
  - [ ] Gallery: Update UI immediately on favorite toggle
  - [ ] Credits: Show deducted amount before server confirms
- [ ] Add retry logic:
  - [ ] Retry failed blob storage uploads
  - [ ] Handle rate limits gracefully
- [ ] Add input validation:
  - [ ] File type validation (JPG/PNG only)
  - [ ] File size validation (max 10MB)
  - [ ] Form validation for admin panel
- [ ] Run quality checks:
  - [ ] `npm run lint` - fix all linting errors
  - [ ] `npm run typecheck` - fix all TypeScript errors
  - [ ] Manual testing of all user flows
  - [ ] Test on mobile devices (responsive design)
- [ ] Update documentation:
  - [ ] Add comments to complex functions
  - [ ] Update README with new features
  - [ ] Document environment variables
- [ ] Security review:
  - [ ] Verify all server actions check authentication
  - [ ] Verify admin actions check authorization
  - [ ] Review blob storage access controls
  - [ ] Verify webhook signature validation
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
