# AI Image Generation - Requirements

## Overview
Add AI-powered image generation capabilities to Plushify, allowing users to upload images and generate "plushified" versions using Google Gemini 2.5 Flash Image model.

## Business Requirements

### User Stories
1. As a user, I want to upload an image so that I can generate a plushified version
2. As a user, I want to select a style (cute/realistic/cartoon) and size for my generation
3. As a user, I want to use credits to generate images, with 1 credit per generation
4. As a user, I want to see my generation results with a before/after comparison
5. As a user, I want to view all my generated images in a gallery
6. As a user, I want to download, delete, and favorite my generated images
7. As a user, I want to purchase additional credits when I run out
8. As a user, I want to receive error notifications if I have insufficient credits
9. As an admin, I want to manually add/remove credits from users
10. As an admin, I want to view transaction history for credit management

## Functional Requirements

### Image Generation
- **Upload**: Support JPG/PNG files, max 10MB
- **Processing**: Use Google Gemini 2.5 Flash Image via Vercel AI SDK
- **Model**: `google/gemini-2.5-flash-image-preview`
- **Cost**: 1 credit per generation
- **Styles**: Cute (kawaii/chibi), Realistic (photorealistic), Cartoon (bold colors)
- **Sizes**: Small, Medium, Large
- **Storage**: Original and generated images stored in Vercel Blob Storage
- **Organization**: `Plushify/originals/{userId}/` and `Plushify/generated/{userId}/`

### Credit System
- **Initial Credits**: 10 free credits for all new users
- **Deduction**: 1 credit deducted when generation starts
- **Refund**: Credit refunded if generation fails
- **Purchase**: Integration with Polar payment system
- **Transaction Logging**: All credit changes logged to transactions table

### Gallery Features
- Display all user generations with pagination
- Filter by status (all/completed/processing/failed)
- Sort by (newest/oldest/favorites)
- Search functionality
- Delete images (removes from both database and blob storage)
- Favorite/unfavorite toggle
- Download generated images
- View before/after comparison

### Admin Features
- Search users by email
- View user credit balance
- Add/remove credits with reason
- View transaction history
- Role-based access control

### Error Handling
- Insufficient credits → Show Sonner toast with link to pricing page
- Generation failed → Refund credit, show error message
- Upload failed → Show error message
- Network errors → Retry logic with user feedback

## Non-Functional Requirements

### Performance
- Image generation: Target < 30 seconds
- Gallery loading: < 2 seconds for 20 items
- Status polling: Every 2 seconds during generation

### Security
- Authentication required for all generation operations
- Admin-only access for credit management
- Secure blob storage URLs with appropriate access controls
- Input validation for file uploads (type, size)

### Scalability
- Support concurrent generations per user
- Blob storage organized by user ID for efficient lookup
- Database indexes on userId, createdAt, status

### User Experience
- Loading states for all async operations
- Optimistic UI updates where appropriate
- Clear error messages with actionable next steps
- Responsive design (mobile-first)

## Technical Requirements

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **AI**: Vercel AI SDK 5 + `@ai-sdk/google`
- **Model**: `google/gemini-2.5-flash-image-preview`
- **Storage**: Vercel Blob Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth (already configured)
- **Payments**: Polar (already configured)
- **UI**: shadcn/ui with Tailwind CSS

### Environment Variables
```env
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
GOOGLE_GENERATIVE_AI_API_KEY=AIza...
POLAR_ACCESS_TOKEN=polar_...
POLAR_WEBHOOK_SECRET=whsec_...
ADMIN_EMAILS=admin@example.com
```

### Database Schema

#### User Table (existing - modify)
- Add `credits: integer` field (default: 10)

#### Generations Table (new)
```sql
- id: uuid (primary key)
- userId: uuid (foreign key)
- originalImageUrl: text
- generatedImageUrl: text (nullable)
- status: enum ('pending', 'processing', 'completed', 'failed')
- style: enum ('cute', 'realistic', 'cartoon')
- size: enum ('small', 'medium', 'large')
- isFavorite: boolean (default: false)
- prompt: text (nullable)
- createdAt: timestamp
- updatedAt: timestamp
```

#### Transactions Table (new)
```sql
- id: uuid (primary key)
- userId: uuid (foreign key)
- amount: integer (can be negative for deductions)
- credits: integer (resulting balance)
- type: enum ('purchase', 'bonus', 'admin', 'deduction', 'refund')
- status: enum ('pending', 'completed', 'failed')
- metadata: jsonb (nullable)
- createdAt: timestamp
```

#### Admin Users Table (new)
```sql
- userId: uuid (foreign key, primary key)
- role: enum ('admin', 'super_admin')
- createdAt: timestamp
```

## Integration Points

### Vercel AI SDK
- Use `generateText()` function (not `generateImage()`)
- Model: `google('gemini-2.5-flash-image-preview')`
- Extract images from `result.files` property
- Handle multi-modal language model outputs

### Vercel Blob Storage
- Upload original images before generation
- Upload generated images after completion
- Delete images when user removes from gallery
- Generate public URLs for display

### Polar Payments
- Webhook endpoint: `/api/webhooks/polar/route.ts`
- Handle successful payment events
- Add purchased credits to user account
- Create transaction records

## Pricing Tiers (Example)
- **Starter**: 50 credits - $4.99
- **Pro**: 200 credits - $14.99
- **Ultimate**: 500 credits - $29.99

## Success Metrics
- User can upload image and generate plushified version ✅
- Credit system works (deduction, refunds, purchases) ✅
- Gallery displays real generations with CRUD operations ✅
- Admin can manage user credits ✅
- All images stored in Vercel Blob ✅
- Error handling with user-friendly messages ✅
- Zero lint/typecheck errors ✅

## Out of Scope
- Unit testing
- E2E testing
- Real-time webhooks from AI provider (using polling instead)
- Image editing/regeneration with modifications
- Batch generation (multiple images at once)
- Social sharing features
- Public gallery
