# AI Image Generation - Implementation Plan

## Phase 1: Database Schema & Migrations

### Tasks
- [ ] Add `credits` field to user table (integer, default 10, notNull)
- [ ] Create `generations` table with all required fields
  - [ ] id, userId (foreign key to user)
  - [ ] originalImageUrl, generatedImageUrl (text, nullable for generated)
  - [ ] status enum ('pending', 'processing', 'completed', 'failed')
  - [ ] style enum ('cute', 'realistic', 'cartoon')
  - [ ] size enum ('small', 'medium', 'large')
  - [ ] isFavorite (boolean, default false)
  - [ ] prompt (text, nullable)
  - [ ] createdAt, updatedAt timestamps
- [ ] Create `transactions` table for credit history
  - [ ] id, userId (foreign key)
  - [ ] amount (integer, can be negative)
  - [ ] credits (integer, resulting balance)
  - [ ] type enum ('purchase', 'bonus', 'admin', 'deduction', 'refund')
  - [ ] status enum ('pending', 'completed', 'failed')
  - [ ] metadata (jsonb, nullable)
  - [ ] createdAt timestamp
- [ ] Create `admin_users` table for role-based access
  - [ ] userId (foreign key to user, primary key)
  - [ ] role enum ('admin', 'super_admin')
  - [ ] createdAt timestamp
- [ ] Add indexes for performance (userId, createdAt, status on generations)
- [ ] Generate migration: `npm run db:generate`
- [ ] Run migration: `npm run db:migrate`
- [ ] Backfill existing users with 10 default credits
- [ ] Verify schema in Drizzle Studio: `npm run db:studio`

---

## Phase 2: Package Installation & Environment Setup

### Tasks
- [ ] Install Vercel Blob SDK: `pnpm add @vercel/blob`
- [ ] Install Google AI SDK: `pnpm add @ai-sdk/google`
- [ ] Add `BLOB_READ_WRITE_TOKEN` to `.env` (get from Vercel dashboard)
- [ ] Add `GOOGLE_GENERATIVE_AI_API_KEY` to `.env` (get from Google AI Studio)
- [ ] Update `env.example` with new environment variables
- [ ] Add `ADMIN_EMAILS` to `.env` (comma-separated list)
- [ ] Verify Polar env vars are set: `POLAR_ACCESS_TOKEN`, `POLAR_WEBHOOK_SECRET`
- [ ] Run `npm run typecheck` to ensure no errors

---

## Phase 3: Blob Storage Utilities

### Tasks
- [ ] Create `src/lib/blob-storage.ts`
- [ ] Implement `uploadOriginalImage(file: File, userId: string): Promise<string>`
  - [ ] Generate unique filename with timestamp
  - [ ] Upload to `Plushify/originals/{userId}/` folder
  - [ ] Return public URL
- [ ] Implement `uploadGeneratedImage(base64: string, userId: string): Promise<string>`
  - [ ] Convert base64 to Buffer
  - [ ] Generate unique filename
  - [ ] Upload to `Plushify/generated/{userId}/` folder
  - [ ] Return public URL
- [ ] Implement `deleteImage(url: string): Promise<void>`
  - [ ] Delete from Vercel Blob Storage using URL
  - [ ] Handle errors gracefully
- [ ] Implement `getPublicUrl(blobUrl: string): string`
  - [ ] Return accessible public URL
- [ ] Add error handling and logging to all functions
- [ ] Export all functions from utilities file

---

## Phase 4: Credits Management System

### Tasks
- [ ] Create `src/app/actions/credits.ts`
- [ ] Implement `getUserCredits(): Promise<number>`
  - [ ] Get authenticated user session
  - [ ] Query user table for credits field
  - [ ] Return credits or throw if not authenticated
- [ ] Implement `hasEnoughCredits(required: number): Promise<boolean>`
  - [ ] Get user credits
  - [ ] Compare with required amount
  - [ ] Return boolean
- [ ] Implement `deductCredits(amount: number): Promise<void>`
  - [ ] Get authenticated user
  - [ ] Check sufficient credits
  - [ ] Deduct credits in transaction
  - [ ] Log to transactions table with type 'deduction'
  - [ ] Throw error if insufficient
- [ ] Implement `addCredits(userId: string, amount: number, reason: string): Promise<void>`
  - [ ] Verify caller is admin (check session + admin_users table)
  - [ ] Add credits to user in transaction
  - [ ] Log to transactions table with type 'admin'
  - [ ] Include reason in metadata
- [ ] Implement `refundCredits(userId: string, amount: number): Promise<void>`
  - [ ] Add credits back to user
  - [ ] Log to transactions table with type 'refund'
- [ ] Add error handling and validation to all functions
- [ ] Export all functions as server actions

---

## Phase 5: Image Generation Server Action

### Tasks
- [ ] Create `src/app/actions/generate-image.ts`
- [ ] Import required dependencies: `google` from `@ai-sdk/google`, `generateText` from `ai`
- [ ] Implement `generatePlushImage()` server action:
  - [ ] Accept params: `originalImageFile: File`, `style`, `size`
  - [ ] Verify user authentication (throw if not authenticated)
  - [ ] Check sufficient credits using `hasEnoughCredits(1)`
  - [ ] Throw `INSUFFICIENT_CREDITS` error if not enough
  - [ ] Upload original image to blob storage
  - [ ] Create generation record with status 'processing'
  - [ ] Deduct 1 credit from user account
  - [ ] Build prompt using `buildPlushifyPrompt()` helper
  - [ ] Call `generateText()` with model `google('gemini-2.5-flash-image-preview')`
  - [ ] Extract image from `result.files` array
  - [ ] Upload generated image to blob storage
  - [ ] Update generation record with generatedImageUrl and status 'completed'
  - [ ] Return generation ID
- [ ] Implement error handling:
  - [ ] Catch any errors during generation
  - [ ] Refund credit using `refundCredits()`
  - [ ] Update generation status to 'failed'
  - [ ] Re-throw error with user-friendly message
- [ ] Implement `buildPlushifyPrompt(style: string, size: string): string` helper
  - [ ] Map styles to descriptive prompts (cute → kawaii/chibi, etc.)
  - [ ] Return formatted prompt for AI model
- [ ] Implement `getGenerationById(id: string)` query function
  - [ ] Query generations table by ID
  - [ ] Return generation record
- [ ] Export server action

---

## Phase 6: Generate Page Integration

### Tasks
- [ ] Update `src/app/generate/page.tsx`
- [ ] Remove mock data imports (`mockUser`)
- [ ] Add server-side session and credits fetch:
  - [ ] Import `auth` from `@/lib/auth`
  - [ ] Get session using `auth.api.getSession()`
  - [ ] Redirect to sign-in if no session
  - [ ] Fetch user credits using `getUserCredits()`
- [ ] Pass real credits to `CreditDisplay` component
- [ ] Convert to Client Component for interactivity (keep data fetching in Server Component wrapper if needed)
- [ ] Implement `handleGenerate()` function:
  - [ ] Call `generatePlushImage()` server action
  - [ ] Handle `INSUFFICIENT_CREDITS` error
  - [ ] Show Sonner toast with link to pricing page
  - [ ] Start polling for generation status
- [ ] Implement `pollGenerationStatus(id: string)`:
  - [ ] Use `setInterval` to poll every 2 seconds
  - [ ] Call `getGenerationById(id)` server action
  - [ ] Update wizard state based on status
  - [ ] Clear interval when status is 'completed' or 'failed'
  - [ ] Show error toast if status is 'failed'
- [ ] Update `GenerationWizard` to use real data:
  - [ ] Connect image upload to actual file selection
  - [ ] Remove mock processing simulation
  - [ ] Show real before/after images from generation record
- [ ] Add loading states during generation
- [ ] Add error boundary around wizard
- [ ] Test full generation flow

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
