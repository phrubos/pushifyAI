# Plushify UI Transformation - Implementation Plan

**Project**: Plushify SaaS Application
**Phase**: UI/UX Implementation (Frontend Only)
**Version**: 1.0
**Last Updated**: 2025-01-12

---

## Overview

This implementation plan outlines the step-by-step process for transforming the Next.js boilerplate into the Plushify SaaS application UI. The plan is divided into **7 phases**, each containing actionable tasks with checkboxes for progress tracking.

**Important Notes:**
- Focus on UI/UX only - no backend logic
- Use mock data throughout
- Simulate signed-in user state
- No unit or E2E testing at this stage
- Run `npm run lint` and `npm run typecheck` after completing each phase

---

## Phase 1: Foundation & Cleanup

**Goal**: Remove boilerplate content, set up branding, and update global styles.

### 1.1 Delete Boilerplate Files

- [x] Delete `src/app/chat/page.tsx`
- [x] Delete `src/app/api/chat/route.ts`
- [x] Delete `src/components/setup-checklist.tsx`
- [x] Delete `src/components/starter-prompt-modal.tsx`
- [x] Delete `src/components/github-stars.tsx`
- [x] Delete `src/components/auth/sign-in-button.tsx`
- [x] Delete `src/components/auth/sign-out-button.tsx`
- [x] Delete `src/components/auth/user-profile.tsx`
- [ ] (Optional) Delete or archive `docs/` folder if not needed

### 1.2 Update Global Styles

- [x] Open `src/app/globals.css`
- [x] Update color palette to modern neutrals:
  - Define neutral grays for backgrounds
  - Define subtle accent color for CTAs
  - Ensure dark mode variables are updated
  - Maintain WCAG contrast ratios
- [x] Verify dark mode color tokens work correctly
- [x] Test colors in browser (light and dark mode)

### 1.3 Update Metadata

- [x] Open `src/app/layout.tsx`
- [x] Update site title to "Plushify - Transform Photos into Adorable Plushies"
- [x] Update meta description for SEO
- [x] Update og:title and og:description
- [x] Add og:image placeholder path
- [x] Update Twitter card metadata

### 1.4 Update Branding in Header

- [x] Open `src/components/site-header.tsx`
- [x] Replace Bot icon with Teddy Bear icon (from Lucide)
- [x] Update text from "Starter Kit" to "Plushify"
- [x] Remove or comment out GitHub stars component
- [x] Update logo link to navigate to `/` (home)

### 1.5 Update Footer

- [x] Open `src/components/site-footer.tsx`
- [x] Remove GitHub stars component
- [x] Remove Leon van Zyl credits
- [x] Update copyright text to "© 2025 Plushify. All rights reserved."
- [x] Prepare structure for new footer links (will populate later)

### 1.6 Verify Changes

- [x] Start dev server and check homepage renders
- [x] Verify header shows new Plushify branding
- [x] Verify footer shows updated copyright
- [x] Check both light and dark modes work
- [x] Run `npm run lint` - ensure no errors
- [x] Run `npm run typecheck` - ensure no errors

---

## Phase 2: Core Components

**Goal**: Add shadcn/ui components and create custom Plushify components.

### 2.1 Add shadcn/ui Components

Install/create the following shadcn/ui components:

- [x] `input.tsx` - Form input component
  ```bash
  npx shadcn@latest add input
  ```
- [x] `textarea.tsx` - Multi-line text input
  ```bash
  npx shadcn@latest add textarea
  ```
- [x] `tabs.tsx` - Tabbed navigation component
  ```bash
  npx shadcn@latest add tabs
  ```
- [x] `accordion.tsx` - Collapsible sections
  ```bash
  npx shadcn@latest add accordion
  ```
- [x] `alert.tsx` - Alert/notification component
  ```bash
  npx shadcn@latest add alert
  ```
- [x] `skeleton.tsx` - Loading skeleton
  ```bash
  npx shadcn@latest add skeleton
  ```
- [x] `select.tsx` - Dropdown select
  ```bash
  npx shadcn@latest add select
  ```
- [x] `progress.tsx` - Progress bar
  ```bash
  npx shadcn@latest add progress
  ```

### 2.2 Create Plushify Components Directory

- [x] Create directory: `src/components/plushify/`
- [x] Create `index.ts` for easy imports

### 2.3 Create Credit Display Component

**File**: `src/components/plushify/credit-display.tsx`

- [x] Create component file
- [x] Accept `credits` prop (number)
- [x] Display credits with icon (Coins from Lucide)
- [x] Show format: "42 credits" or "42"
- [x] Support different sizes (sm, md, lg)
- [x] Add hover effect with tooltip showing credit value
- [x] Export component

### 2.4 Create User Menu Component

**File**: `src/components/plushify/user-menu.tsx`

- [x] Create component file
- [x] Import mock user data
- [x] Display user avatar using Avatar component
- [x] Create dropdown menu with DropdownMenu component
- [x] Add menu items:
  - Dashboard (link to /dashboard)
  - Gallery (link to /gallery)
  - Profile (link to /profile)
  - Separator
  - Pricing (link to /pricing)
- [x] Show user name and email in menu header
- [x] Add client directive `"use client"`
- [x] Export component

### 2.5 Create Generation Status Component

**File**: `src/components/plushify/generation-status.tsx`

- [x] Create component file
- [x] Accept `status` prop: "pending" | "processing" | "completed" | "failed"
- [x] Use Badge component from shadcn/ui
- [x] Define color variants for each status:
  - pending: gray
  - processing: blue with animation
  - completed: green
  - failed: red
- [x] Add appropriate icons for each status
- [x] Export component

### 2.6 Create Pricing Card Component

**File**: `src/components/plushify/pricing-card.tsx`

- [x] Create component file
- [x] Accept props: plan name, price, credits, features[], badge, isPopular
- [x] Use Card component from shadcn/ui
- [x] Display plan name as CardTitle
- [x] Display price (large text)
- [x] Display credit amount
- [x] Calculate and show price per credit
- [x] List features with checkmark icons
- [x] Add "Choose Plan" button
- [x] Show badge if provided ("Popular", "Best Value")
- [x] Add hover effect
- [x] Export component

### 2.7 Create Before/After Slider Component

**File**: `src/components/plushify/before-after-slider.tsx`

- [x] Create component file
- [x] Add client directive `"use client"`
- [x] Accept props: beforeImage, afterImage, alt text
- [x] Create container with relative positioning
- [x] Overlay two images
- [x] Add draggable slider handle
- [x] Use useState to track slider position (0-100%)
- [x] Implement mouse drag functionality
- [x] Implement touch drag for mobile
- [x] Add visual slider line and handle
- [x] Clip images based on slider position
- [x] Add labels: "Before" and "After"
- [x] Export component

### 2.8 Create Image Uploader Component

**File**: `src/components/plushify/image-uploader.tsx`

- [x] Create component file
- [x] Add client directive `"use client"`
- [x] Accept props: onImageSelect callback
- [x] Create drag-and-drop zone
- [x] Handle dragover, dragleave, drop events
- [x] Add file input (hidden) with click trigger
- [x] Accept only JPG and PNG files
- [x] Use FileReader to create preview
- [x] Display upload icon and text when empty
- [x] Display image preview when file selected
- [x] Add "Change Image" button on preview
- [x] Show file size and type
- [x] Add validation for file type and size
- [x] Export component

### 2.9 Create Gallery Item Component

**File**: `src/components/plushify/gallery-item.tsx`

- [x] Create component file
- [x] Add client directive `"use client"`
- [x] Accept props: generation object (id, image, date, status, isFavorite)
- [x] Use Card component
- [x] Display generated plushie image
- [x] Show generation date (formatted)
- [x] Show status badge using GenerationStatus component
- [x] Create hover overlay with actions:
  - Download button
  - Delete button
  - Favorite toggle button
  - View original button/icon
- [x] Implement hover state showing overlay
- [x] Add onClick handler for actions
- [x] Show favorite star indicator if favorited
- [x] Export component

### 2.10 Create Gallery Grid Component

**File**: `src/components/plushify/gallery-grid.tsx`

- [x] Create component file
- [x] Accept props: generations array, onDelete, onFavorite, onDownload callbacks
- [x] Create responsive grid layout:
  - 1 column on mobile
  - 2 columns on tablet
  - 3-4 columns on desktop
- [x] Map over generations and render GalleryItem for each
- [x] Handle empty state (show message if no generations)
- [x] Add gap between items
- [x] Export component

### 2.11 Create Filter Bar Component

**File**: `src/components/plushify/filter-bar.tsx`

- [x] Create component file
- [x] Add client directive `"use client"`
- [x] Accept props: onSortChange, onFilterChange, onSearch callbacks
- [x] Create layout with three sections:
  - Sort dropdown (Newest, Oldest, Favorites)
  - Status filter dropdown (All, Completed, Processing)
  - Search input
- [x] Use Select component for dropdowns
- [x] Use Input component for search
- [x] Add icons for each control
- [x] Make responsive (stack on mobile)
- [x] Export component

### 2.12 Create Generation Wizard Component

**File**: `src/components/plushify/generation-wizard.tsx`

- [x] Create component file
- [x] Add client directive `"use client"`
- [x] Set up state for:
  - Current step (1-4)
  - Uploaded image
  - Selected style
  - Selected size
  - Processing progress
  - Generated result
- [x] **Step 1: Upload**
  - Use ImageUploader component
  - Store uploaded image in state
  - Show "Next" button when image selected
- [x] **Step 2: Preview & Options**
  - Display uploaded image preview
  - Create style radio buttons (Cute, Realistic, Cartoon)
  - Create size Select dropdown (Small, Medium, Large)
  - Add "Back" button
  - Add "Generate" button
- [x] **Step 3: Processing**
  - Show loading spinner
  - Display animated Progress component (0-100%)
  - Show rotating status messages
  - Simulate 3-4 second delay with setTimeout
  - Update progress incrementally
- [x] **Step 4: Result**
  - Use BeforeAfterSlider component
  - Show uploaded image vs mock generated result
  - Add "Download" button
  - Add "Generate Another" button (resets wizard)
  - Add "View Gallery" button
- [x] Add step indicator showing current step (1/4, 2/4, etc.)
- [x] Export component

### 2.13 Verify Components

- [x] Test each component in isolation if possible
- [x] Run `npm run lint`
- [x] Run `npm run typecheck`
- [x] Verify all exports work correctly

---

## Phase 3: Mock Data System

**Goal**: Create all mock data files for the application.

### 3.1 Create Mock Data Directory

- [x] Create directory: `src/lib/mock-data/`
- [x] Create `index.ts` for easy imports

### 3.2 Create Mock User Data

**File**: `src/lib/mock-data/mock-user.ts`

- [x] Create file
- [x] Define `MockUser` interface:
  - id: string
  - name: string
  - email: string
  - image: string (avatar URL)
  - plan: "basic" | "pro" | "elite"
  - credits: number
  - createdAt: Date
- [x] Export mock user object:
  - name: "Sarah Johnson"
  - email: "sarah@example.com"
  - image: use placeholder or avatar URL
  - plan: "pro"
  - credits: 42
  - createdAt: recent date
- [x] Export `mockUser` constant

### 3.3 Create Sample Generations Data

**File**: `src/lib/mock-data/sample-generations.ts`

- [x] Create file
- [x] Define `Generation` interface:
  - id: string
  - originalImage: string (URL)
  - generatedImage: string (URL)
  - status: "pending" | "processing" | "completed" | "failed"
  - style: "cute" | "realistic" | "cartoon"
  - size: "small" | "medium" | "large"
  - isFavorite: boolean
  - createdAt: Date
- [x] Create array of 12-15 mock generations
- [x] Use placeholder images from unsplash or similar:
  - Original: photos of people/pets
  - Generated: plushie-style images
- [x] Vary the dates (recent to older)
- [x] Mix of completed and processing statuses
- [x] Some marked as favorites
- [x] Export as `sampleGenerations` array

### 3.4 Create Pricing Plans Data

**File**: `src/lib/mock-data/pricing-plans.ts`

- [x] Create file
- [x] Define `PricingPlan` interface:
  - id: string
  - name: string
  - price: number
  - credits: number
  - pricePerCredit: number
  - features: string[]
  - badge?: string
  - isPopular?: boolean
- [x] Create array of 3 plans:
  - **Basic**: $9, 30 credits, features list
  - **Pro**: $19, 100 credits, features list, badge: "Popular"
  - **Elite**: $29, 200 credits, features list, badge: "Best Value"
- [x] Define common features:
  - "HD quality generations"
  - "Unlimited gallery storage"
  - "Download full resolution"
  - "All style options"
  - "Priority support" (Pro and Elite only)
- [x] Export as `pricingPlans` array

### 3.5 Create FAQ Data

**File**: `src/lib/mock-data/faq-data.ts`

- [x] Create file
- [x] Define `FAQItem` interface:
  - id: string
  - category: string
  - question: string
  - answer: string
- [x] Create array of 12-15 FAQ items
- [x] Categories:
  - "Getting Started" (4 questions)
  - "Credits & Pricing" (4 questions)
  - "Technical" (4 questions)
  - "Account & Privacy" (3-4 questions)
- [x] Write realistic questions and answers
- [x] Export as `faqData` array

### 3.6 Create Sample Before/After Data

**File**: `src/lib/mock-data/sample-befores-afters.ts`

- [x] Create file
- [x] Define `BeforeAfter` interface:
  - id: string
  - beforeImage: string (URL)
  - afterImage: string (URL)
  - description: string
- [x] Create array of 6-8 showcase examples
- [x] Use high-quality placeholder images
- [x] Vary subjects (person, pet, baby, group photo, etc.)
- [x] Write compelling descriptions
- [x] Export as `showcaseExamples` array

### 3.7 Create Mock Purchase History

**File**: `src/lib/mock-data/mock-purchases.ts`

- [x] Create file
- [x] Define `Purchase` interface:
  - id: string
  - date: Date
  - plan: string
  - amount: number
  - credits: number
  - status: "completed" | "pending" | "failed"
- [x] Create array of 2-3 mock purchases
- [x] Use realistic dates and amounts
- [x] Export as `mockPurchases` array

### 3.8 Create Index File

**File**: `src/lib/mock-data/index.ts`

- [x] Create file
- [x] Export all mock data:
  ```typescript
  export * from './mock-user'
  export * from './sample-generations'
  export * from './pricing-plans'
  export * from './faq-data'
  export * from './sample-befores-afters'
  export * from './mock-purchases'
  ```

### 3.9 Add Utility Functions

**File**: `src/lib/utils.ts` (update existing file)

- [x] Add `formatCredits(amount: number): string` function
  - Returns formatted string like "42 credits"
- [x] Add `calculatePricePerCredit(price: number, credits: number): string` function
  - Returns formatted string like "$0.19"
- [x] Add `formatDate(date: Date): string` function
  - Returns relative date like "2 days ago" or "Jan 15, 2025"
- [x] Add `getPlanBadgeColor(plan: string): string` function
  - Returns Tailwind classes for plan badges
- [x] Export all utility functions

### 3.10 Verify Mock Data

- [x] Import mock data in a test component to verify structure
- [x] Check all TypeScript types are correct
- [x] Run `npm run typecheck`
- [x] Run `npm run lint`

---

## Phase 4: Main Pages

**Goal**: Create and redesign the primary user-facing pages.

### 4.1 Redesign Landing Page

**File**: `src/app/page.tsx`

- [x] Open file (complete redesign)
- [x] Import required components:
  - Button from shadcn/ui
  - BeforeAfterSlider component
  - showcaseExamples from mock data
- [x] Delete all existing boilerplate content
- [x] Create Hero Section:
  - Large H1: "Transform Photos into Adorable Plushies"
  - Subtitle paragraph with value proposition
  - Primary CTA button "Start Creating" → /dashboard
  - Center aligned layout
  - Add plushie icon or emoji
- [x] Create Before/After Showcase Section:
  - Section heading: "See the Magic"
  - Responsive grid (1→2→3→4 columns)
  - Map over showcaseExamples
  - Render BeforeAfterSlider for each example
  - Add subtle descriptions
- [x] Create Final CTA Section:
  - Heading: "Ready to create your plushie?"
  - Subtitle: "Join thousands creating adorable plushies"
  - CTA button "Get Started" → /dashboard
- [x] Add spacing and padding for visual hierarchy
- [x] Ensure responsive on all breakpoints
- [x] Test light and dark modes

### 4.2 Verify Landing Page

- [x] Check page loads without errors
- [x] Verify all images load
- [x] Test before/after sliders work
- [x] Test CTA buttons navigate correctly
- [x] Check responsive design on mobile/tablet/desktop
- [x] Run `npm run lint`

### 4.3 Redesign Dashboard

**File**: `src/app/dashboard/page.tsx`

- [x] Open file (major redesign)
- [x] Keep auth check at top (use existing pattern)
- [x] Import required components:
  - Card components
  - Button
  - CreditDisplay
  - GalleryGrid (for preview)
  - mockUser, sampleGenerations
- [x] Delete existing generic content
- [x] Create Header Section:
  - H1: `Welcome back, ${mockUser.name}!`
  - CreditDisplay component showing mockUser.credits
  - Primary Button "Generate New Plushie" → /generate
- [x] Create Stats Section (3 cards in grid):
  - Total Generations: calculated from sampleGenerations.length
  - Credits Used: mockUser.plan shows credit usage
  - Favorites: count favorites from sampleGenerations
  - Use Card component for each stat
  - Add icons from Lucide
- [x] Create Recent Generations Section:
  - Heading: "Recent Creations"
  - Show first 6 items from sampleGenerations
  - Use GalleryGrid component with limited items
  - "View All" link → /gallery
- [x] Handle empty state (if no generations)
- [x] Add proper spacing and layout
- [x] Ensure responsive design

### 4.4 Verify Dashboard

- [x] Check page loads correctly
- [x] Verify mock user name displays
- [x] Verify credit display works
- [x] Check recent generations show
- [x] Test all navigation buttons
- [x] Check responsive layout
- [x] Run `npm run lint`

### 4.5 Create Gallery Page

**File**: `src/app/gallery/page.tsx` (NEW FILE)

- [x] Create new file
- [x] Add auth check at top (copy pattern from dashboard)
- [x] Mark as client component `"use client"`
- [x] Import required components:
  - FilterBar
  - GalleryGrid
  - CreditDisplay
  - Button
  - Alert (for delete confirmation)
  - sampleGenerations, mockUser
- [x] Set up state:
  - generations (initialized with sampleGenerations)
  - sortBy
  - filterBy
  - searchQuery
- [x] Create Header Section:
  - H1: "My Gallery"
  - CreditDisplay component
  - Button "Generate New" → /generate
- [x] Add FilterBar component:
  - Pass sort, filter, search handlers
- [x] Implement sorting logic:
  - Newest first (sort by date desc)
  - Oldest first (sort by date asc)
  - Favorites first (filter isFavorite)
- [x] Implement filtering logic:
  - All (no filter)
  - Completed (status === "completed")
  - Processing (status === "processing")
- [x] Add GalleryGrid component:
  - Pass filtered/sorted generations
  - Pass onDelete, onFavorite, onDownload handlers
- [x] Implement action handlers:
  - onDelete: show confirmation, remove from state
  - onFavorite: toggle isFavorite in state
  - onDownload: mock download (alert or console.log)
- [x] Add Empty State:
  - Show when no generations match filters
  - Message: "No plushies found"
  - Button "Create Your First Plushie" → /generate
- [x] Add pagination placeholder (commented out for future)
- [x] Ensure responsive layout

### 4.6 Verify Gallery Page

- [x] Check page loads correctly
- [x] Test filtering works
- [x] Test sorting works
- [x] Test hover actions on gallery items
- [x] Test delete with confirmation
- [x] Test favorite toggle
- [x] Test download action
- [x] Check empty state displays correctly
- [x] Verify responsive design
- [x] Run `npm run lint` and `npm run typecheck`

### 4.7 Create Generate Page

**File**: `src/app/generate/page.tsx` (NEW FILE)

- [x] Create new file
- [x] Add auth check at top
- [x] Mark as client component `"use client"`
- [x] Import GenerationWizard component
- [x] Import CreditDisplay, mockUser
- [x] Create page layout:
  - Header with page title
  - CreditDisplay showing current credits
  - Back button → /dashboard
- [x] Add GenerationWizard component (main content)
- [x] Add container with max-width for better UX
- [x] Ensure proper spacing and centering

### 4.8 Verify Generate Page

- [x] Check page loads correctly
- [x] Test Step 1: Upload image
- [x] Test Step 2: Select options
- [x] Test Step 3: Processing animation
- [x] Test Step 4: View result
- [x] Test navigation between steps
- [x] Test "Generate Another" resets wizard
- [x] Verify all buttons work
- [x] Check responsive design
- [x] Run `npm run lint`

---

## Phase 5: Additional Pages

**Goal**: Create pricing, about, FAQ, and contact pages.

### 5.1 Create Pricing Page

**File**: `src/app/pricing/page.tsx` (NEW FILE)

- [ ] Create new file
- [ ] Import required components:
  - PricingCard component
  - Accordion for FAQ section
  - pricingPlans from mock data
  - faqData (filter pricing-related questions)
- [ ] Create Header Section:
  - H1: "Simple, Credit-Based Pricing"
  - Subtitle: "One credit = one plushie generation"
  - Supporting text about credit system
- [ ] Create Pricing Cards Section:
  - Use CSS Grid with 3 columns (1 on mobile, 3 on desktop)
  - Map over pricingPlans
  - Render PricingCard for each plan
  - Highlight Pro plan (most popular)
- [ ] Create Features Comparison (optional):
  - Table showing feature differences
  - Or list of included features
- [ ] Create FAQ Mini-Section:
  - Heading: "Common Questions"
  - Show 3-4 pricing-related FAQs from faqData
  - Use Accordion component
  - Link to full FAQ page
- [ ] Add Final CTA:
  - Button "Get Started" → /dashboard
- [ ] Ensure responsive layout
- [ ] Add proper spacing

### 5.2 Verify Pricing Page

- [ ] Check page loads correctly
- [ ] Verify all 3 plans display
- [ ] Check prices and credits are correct
- [ ] Verify badges show on correct plans
- [ ] Test accordion FAQs work
- [ ] Check responsive design
- [ ] Run `npm run lint`

### 5.3 Create About Page

**File**: `src/app/about/page.tsx` (NEW FILE)

- [ ] Create new file
- [ ] Import required components:
  - Card component
  - Button
  - Icons from Lucide (Upload, Sparkles, Download)
- [ ] Create Hero Section:
  - H1: "How Plushify Works"
  - Subtitle with mission statement
  - Brief description of service
- [ ] Create Process Steps Section:
  - Heading: "Three Simple Steps"
  - 3-column grid (1 on mobile, 3 on desktop)
  - **Step 1: Upload Your Photo**
    - Upload icon
    - Title
    - Description
  - **Step 2: AI Transforms It**
    - Sparkles/Magic icon
    - Title
    - Description
  - **Step 3: Download Your Plushie**
    - Download icon
    - Title
    - Description
  - Use Card component for each step
- [ ] Create Technology Section:
  - Heading: "Powered by AI"
  - Brief, accessible explanation of AI technology
  - Focus on benefits, not technical jargon
  - Keep it inspiring and simple
- [ ] Add CTA Section:
  - Heading: "Ready to get started?"
  - Button "Try It Now" → /generate
- [ ] Ensure responsive layout
- [ ] Add proper spacing

### 5.4 Verify About Page

- [ ] Check page loads correctly
- [ ] Verify all 3 steps display with icons
- [ ] Check text is readable and inspiring
- [ ] Test CTA button navigates to /generate
- [ ] Check responsive design
- [ ] Run `npm run lint`

### 5.5 Create FAQ Page

**File**: `src/app/faq/page.tsx` (NEW FILE)

- [ ] Create new file
- [ ] Import required components:
  - Accordion components
  - Input (for search bar)
  - faqData from mock data
- [ ] Create page header:
  - H1: "Frequently Asked Questions"
  - Subtitle: "Find answers to common questions"
- [ ] Add Search Bar (UI only, no functionality):
  - Input with search icon
  - Placeholder: "Search questions..."
- [ ] Group FAQ items by category
- [ ] For each category:
  - Category heading
  - Accordion with all items in that category
  - Each AccordionItem:
    - Question as trigger
    - Answer as content
- [ ] Categories to display:
  - Getting Started
  - Credits & Pricing
  - Technical
  - Account & Privacy
- [ ] Add "Still have questions?" section:
  - Text: "Can't find what you're looking for?"
  - Link/Button to /contact
- [ ] Ensure responsive layout
- [ ] Test accordion animations

### 5.6 Verify FAQ Page

- [ ] Check page loads correctly
- [ ] Verify all FAQ items display
- [ ] Test accordion expand/collapse
- [ ] Check categories are grouped correctly
- [ ] Test search bar displays (no functionality needed)
- [ ] Check link to contact page works
- [ ] Verify responsive design
- [ ] Run `npm run lint`

### 5.7 Create Contact Page

**File**: `src/app/contact/page.tsx` (NEW FILE)

- [ ] Create new file
- [ ] Mark as client component `"use client"`
- [ ] Import required components:
  - Input, Textarea, Button
  - Alert (for success message)
  - Card
- [ ] Set up state:
  - form fields (name, email, subject, message)
  - showSuccess boolean
- [ ] Create page header:
  - H1: "Get in Touch"
  - Subtitle: "We'd love to hear from you"
- [ ] Create two-column layout (1 col mobile, 2 col desktop):
  - **Left: Contact Form**
    - Name input (required)
    - Email input (required, type="email")
    - Subject input
    - Message textarea (required, 4-5 rows)
    - Submit button "Send Message"
  - **Right: Contact Info**
    - Support email: support@plushify.com
    - Response time note: "We typically respond within 24 hours"
    - Optional: Business hours, location, or social links
- [ ] Implement form validation:
  - Check required fields
  - Validate email format
  - Show error states
- [ ] Implement form submission:
  - On submit, prevent default
  - Validate form
  - Show success Alert
  - Reset form fields
  - No actual email sending
- [ ] Use Card component for form and info sections
- [ ] Ensure responsive layout

### 5.8 Verify Contact Page

- [ ] Check page loads correctly
- [ ] Test form validation (required fields, email format)
- [ ] Test form submission shows success message
- [ ] Verify form resets after submission
- [ ] Check both columns display correctly
- [ ] Test responsive design
- [ ] Run `npm run lint` and `npm run typecheck`

---

## Phase 6: Legal Pages

**Goal**: Create all legal documentation pages.

### 6.1 Create Legal Page Template

First, create a reusable layout component for legal pages:

**File**: `src/components/legal-page-layout.tsx` (NEW FILE)

- [ ] Create component file
- [ ] Accept props: title, lastUpdated (Date), children
- [ ] Create layout with:
  - Page title (H1)
  - Last updated date (formatted)
  - Divider
  - Content area (children)
  - Max-width container
  - Proper typography styles
- [ ] Add table of contents generation (optional)
- [ ] Export component

### 6.2 Create Privacy Policy Page

**File**: `src/app/privacy/page.tsx` (NEW FILE)

- [ ] Create new file
- [ ] Import LegalPageLayout component (if created)
- [ ] Set page title: "Privacy Policy"
- [ ] Set last updated date: recent date
- [ ] Create content sections:
  - **Introduction**
    - Overview of privacy practices
  - **Information We Collect**
    - User account information
    - Uploaded images
    - Usage data
  - **How We Use Your Information**
    - Service provision
    - Improvement and analytics
    - Communication
  - **Data Storage and Security**
    - Where data is stored
    - Security measures
  - **Image Handling**
    - How uploaded images are processed
    - Storage duration
    - Deletion policy
  - **Third-Party Services**
    - AI processing partners
    - Analytics services
  - **Your Rights**
    - Access, modify, delete data
    - Export data
  - **Cookies**
    - Types used
    - Purpose
    - How to disable
  - **Changes to Privacy Policy**
    - Notification process
  - **Contact Us**
    - Privacy inquiries email
- [ ] Use proper heading hierarchy (H2, H3)
- [ ] Add professional, clear language
- [ ] Ensure readable typography

### 6.3 Verify Privacy Policy Page

- [ ] Check page loads correctly
- [ ] Verify all sections display
- [ ] Check heading hierarchy
- [ ] Test readability in light and dark mode
- [ ] Check link to /privacy works from footer
- [ ] Run `npm run lint`

### 6.4 Create Terms of Service Page

**File**: `src/app/terms/page.tsx` (NEW FILE)

- [ ] Create new file
- [ ] Import LegalPageLayout component
- [ ] Set page title: "Terms of Service"
- [ ] Set last updated date
- [ ] Create content sections:
  - **Introduction**
    - Agreement to terms
  - **Service Description**
    - What Plushify provides
  - **User Accounts**
    - Account creation
    - User responsibilities
    - Account security
  - **Acceptable Use**
    - Permitted uses
    - Prohibited activities
    - Content guidelines
  - **Intellectual Property**
    - Ownership of generated images
    - License to use service
    - User content rights
  - **Credits and Payments**
    - Credit purchase terms
    - Refund policy reference
    - Pricing changes
  - **Service Availability**
    - Uptime expectations
    - Maintenance windows
  - **Limitation of Liability**
    - Disclaimer of warranties
    - Liability limits
  - **Termination**
    - Account termination process
    - User and company rights
  - **Changes to Terms**
    - Update notification
  - **Governing Law**
    - Jurisdiction
  - **Contact Information**
    - Legal inquiries
- [ ] Use proper heading hierarchy
- [ ] Clear, professional language

### 6.5 Verify Terms of Service Page

- [ ] Check page loads correctly
- [ ] Verify all sections display
- [ ] Check heading hierarchy
- [ ] Test readability
- [ ] Check link from footer
- [ ] Run `npm run lint`

### 6.6 Create Cookie Policy Page

**File**: `src/app/cookies/page.tsx` (NEW FILE)

- [ ] Create new file
- [ ] Import LegalPageLayout component
- [ ] Set page title: "Cookie Policy"
- [ ] Set last updated date
- [ ] Create content sections:
  - **What Are Cookies**
    - Definition and purpose
  - **How We Use Cookies**
    - Authentication
    - Preferences (dark mode, etc.)
    - Analytics
    - Performance
  - **Types of Cookies**
    - Essential cookies (table)
    - Functional cookies
    - Analytics cookies
  - **Third-Party Cookies**
    - Partners who may set cookies
    - Their purposes
  - **Managing Cookies**
    - Browser settings instructions
    - Opt-out options
  - **Cookie Consent**
    - How consent is obtained
  - **Changes to Cookie Policy**
    - Update process
  - **Contact Us**
    - Cookie-related questions
- [ ] Use table format for cookie list (optional)
- [ ] Clear explanations

### 6.7 Verify Cookie Policy Page

- [ ] Check page loads correctly
- [ ] Verify all sections display
- [ ] Check any tables format correctly
- [ ] Test readability
- [ ] Check link from footer
- [ ] Run `npm run lint`

### 6.8 Create Refund Policy Page

**File**: `src/app/refund/page.tsx` (NEW FILE)

- [ ] Create new file
- [ ] Import LegalPageLayout component
- [ ] Set page title: "Refund Policy"
- [ ] Set last updated date
- [ ] Create content sections:
  - **Overview**
    - General refund stance
  - **Eligibility for Refunds**
    - Unused credits
    - Technical issues
    - Service disruptions
  - **Non-Refundable Items**
    - Used credits
    - Completed generations
  - **Refund Request Process**
    - How to request
    - Required information
    - Processing time (e.g., 5-7 business days)
  - **Refund Method**
    - Original payment method
    - Credit alternatives
  - **Partial Refunds**
    - Prorated refunds for unused credits
  - **Service Cancellation**
    - Subscription cancellation process
    - Credit handling upon cancellation
  - **Exceptions**
    - Special circumstances
  - **Changes to Refund Policy**
    - Update notification
  - **Contact for Refunds**
    - Refund inquiries email: refunds@plushify.com
- [ ] Clear, customer-friendly language

### 6.9 Verify Refund Policy Page

- [ ] Check page loads correctly
- [ ] Verify all sections display
- [ ] Check language is clear and fair
- [ ] Test readability
- [ ] Check link from footer
- [ ] Run `npm run lint`

### 6.10 Update Footer with Legal Links

**File**: `src/components/site-footer.tsx`

- [ ] Open file
- [ ] Create Legal section in footer
- [ ] Add links:
  - Privacy Policy → /privacy
  - Terms of Service → /terms
  - Cookie Policy → /cookies
  - Refund Policy → /refund
- [ ] Organize in column layout
- [ ] Ensure links are accessible
- [ ] Test all links navigate correctly

---

## Phase 7: Final Polish & Navigation

**Goal**: Update navigation, profile page, ensure responsive design, and final QA.

### 7.1 Update Site Header Navigation

**File**: `src/components/site-header.tsx`

- [ ] Open file
- [ ] Update main navigation links:
  - "How It Works" → /about
  - "Pricing" → /pricing
  - "FAQ" → /faq
- [ ] Remove old boilerplate links
- [ ] Add credit display to header:
  - Import CreditDisplay component
  - Show mockUser credits
  - Only show when on protected pages
- [ ] Update user menu:
  - Remove old UserProfile component
  - Add new UserMenu component
  - Ensure dropdown works
- [ ] Ensure mode toggle is visible
- [ ] Make navigation responsive:
  - Hamburger menu on mobile
  - Drawer/sheet for mobile nav
- [ ] Test navigation on all breakpoints

### 7.2 Update Site Footer

**File**: `src/components/site-footer.tsx`

- [ ] Open file (may have been partially updated)
- [ ] Create 4-column layout:
  - **Column 1: Branding**
    - Plushify logo (icon + text)
    - Tagline: "Transform photos into adorable plushies"
  - **Column 2: Product**
    - Dashboard → /dashboard
    - Gallery → /gallery
    - Pricing → /pricing
    - How It Works → /about
  - **Column 3: Legal**
    - Privacy Policy → /privacy
    - Terms of Service → /terms
    - Cookie Policy → /cookies
    - Refund Policy → /refund
  - **Column 4: Support**
    - FAQ → /faq
    - Contact → /contact
    - (Optional) Social media icons
- [ ] Add footer bottom:
  - Copyright: "© 2025 Plushify. All rights reserved."
  - Mode toggle (optional)
- [ ] Make footer responsive:
  - Stack columns on mobile (1 column)
  - 2 columns on tablet
  - 4 columns on desktop
- [ ] Add proper spacing and dividers
- [ ] Test all footer links

### 7.3 Update Profile Page

**File**: `src/app/profile/page.tsx`

- [ ] Open file
- [ ] Import mockUser, mockPurchases
- [ ] Keep existing structure (user info section)
- [ ] Update user data to use mockUser
- [ ] Add Plan Information Section:
  - Current plan badge (mockUser.plan)
  - Plan name: "Pro Plan"
  - Plan benefits
  - "Upgrade Plan" button → /pricing (if not Elite)
  - "Change Plan" button → /pricing
- [ ] Add Credit Information Section:
  - Current balance: mockUser.credits
  - Credits used this month (mock calculation)
  - "Buy More Credits" button → /pricing
- [ ] Add Purchase History Section:
  - Heading: "Purchase History"
  - Table or list of mockPurchases
  - Columns: Date, Plan, Amount, Credits, Status
  - Show most recent 5 transactions
  - Link to view all (future feature)
- [ ] Keep Quick Actions section:
  - "Edit Profile" button (disabled with tooltip)
  - "Security Settings" button (disabled)
  - "Upgrade Plan" button → /pricing
- [ ] Ensure responsive layout

### 7.4 Verify Profile Page

- [ ] Check page loads correctly
- [ ] Verify mock user data displays
- [ ] Check plan badge shows correctly
- [ ] Verify credit balance displays
- [ ] Check purchase history shows
- [ ] Test "Upgrade Plan" navigation
- [ ] Check responsive design
- [ ] Run `npm run lint`

### 7.5 Create 404 Page (Optional)

**File**: `src/app/not-found.tsx` (NEW FILE)

- [ ] Create new file
- [ ] Create custom 404 page layout:
  - Large "404" text
  - Heading: "Page Not Found"
  - Message: "The page you're looking for doesn't exist."
  - Button "Go Home" → /
  - Button "View Dashboard" → /dashboard
- [ ] Add illustration or icon (confused plushie)
- [ ] Ensure consistent styling with rest of site
- [ ] Test by navigating to non-existent route

### 7.6 Test Responsive Design

- [ ] Open browser dev tools
- [ ] Test each page at key breakpoints:
  - **Mobile**: 375px, 414px
  - **Tablet**: 768px, 1024px
  - **Desktop**: 1440px, 1920px
- [ ] Pages to test:
  - [ ] Landing page (/)
  - [ ] Dashboard (/dashboard)
  - [ ] Gallery (/gallery)
  - [ ] Generate (/generate)
  - [ ] Pricing (/pricing)
  - [ ] About (/about)
  - [ ] FAQ (/faq)
  - [ ] Contact (/contact)
  - [ ] Profile (/profile)
  - [ ] Legal pages (/privacy, /terms, /cookies, /refund)
- [ ] Check for:
  - No horizontal scroll
  - Readable text sizes
  - Proper image scaling
  - Touch target sizes (44x44px min)
  - Proper grid/column stacking
  - Navigation accessibility

### 7.7 Test Dark Mode

- [ ] Toggle dark mode in header
- [ ] Verify toggle works smoothly
- [ ] Test all pages in dark mode:
  - [ ] Landing page
  - [ ] Dashboard
  - [ ] Gallery
  - [ ] Generate
  - [ ] Pricing
  - [ ] About
  - [ ] FAQ
  - [ ] Contact
  - [ ] Profile
  - [ ] Legal pages
- [ ] Check for:
  - Proper color contrast (WCAG AA)
  - Readable text
  - Visible borders and dividers
  - Proper image/card backgrounds
  - Icon visibility
- [ ] Test that mode preference persists across pages

### 7.8 Test Navigation Flows

**Test User Flow 1: First-time visitor**
- [ ] Start at landing page (/)
- [ ] Click "Start Creating" CTA
- [ ] Should arrive at dashboard
- [ ] Click "Generate New Plushie"
- [ ] Should arrive at generate page
- [ ] Complete wizard flow
- [ ] Click "View Gallery"
- [ ] Should arrive at gallery

**Test User Flow 2: Returning user**
- [ ] Start at dashboard
- [ ] Click user menu
- [ ] Navigate to profile
- [ ] Click "Upgrade Plan"
- [ ] Should arrive at pricing page
- [ ] Navigate back using browser back button
- [ ] Click "Gallery" in user menu
- [ ] Should arrive at gallery

**Test User Flow 3: Learning about service**
- [ ] Start at landing page
- [ ] Click "How It Works" in header
- [ ] Should arrive at about page
- [ ] Click "FAQ" in header
- [ ] Should arrive at FAQ page
- [ ] Click "Contact" link in FAQ
- [ ] Should arrive at contact page

**Test Footer Navigation**
- [ ] From any page, scroll to footer
- [ ] Test Product links (Dashboard, Gallery, Pricing, About)
- [ ] Test Legal links (Privacy, Terms, Cookies, Refund)
- [ ] Test Support links (FAQ, Contact)
- [ ] Verify all links work correctly

### 7.9 Test All Interactive Elements

**Buttons:**
- [ ] All buttons have hover states
- [ ] All buttons have active/pressed states
- [ ] Disabled buttons are clearly indicated
- [ ] Loading buttons show spinner/loading state

**Forms:**
- [ ] Input focus states work
- [ ] Validation messages display
- [ ] Error states are clear
- [ ] Success states are visible
- [ ] Form submission provides feedback

**Dropdowns/Selects:**
- [ ] Open and close smoothly
- [ ] Selected value displays correctly
- [ ] Keyboard navigation works

**Accordions:**
- [ ] Expand/collapse smoothly
- [ ] Icon rotates appropriately
- [ ] Content is readable when expanded

**Modals/Dialogs:**
- [ ] Open with smooth animation
- [ ] Close button works
- [ ] Clicking outside closes (if applicable)
- [ ] Focus is trapped inside modal
- [ ] Background is overlaid

**Sliders (Before/After):**
- [ ] Drag handle works with mouse
- [ ] Touch gestures work on mobile
- [ ] Handle is visible and accessible
- [ ] Images clip correctly

### 7.10 Code Quality Check

- [ ] Run `npm run lint` for all files
- [ ] Fix any lint errors or warnings
- [ ] Run `npm run typecheck`
- [ ] Fix any TypeScript errors
- [ ] Check browser console for errors:
  - No console errors on any page
  - No unhandled promise rejections
  - No prop type warnings
- [ ] Review code for:
  - Unused imports
  - Unused variables
  - Console.log statements (remove or comment)
  - TODOs or FIXMEs (address or document)
- [ ] Verify all files use consistent formatting

### 7.11 Accessibility Check

- [ ] Test keyboard navigation:
  - Tab through all interactive elements
  - Ensure logical tab order
  - Ensure focus indicators are visible
  - Test Enter key on buttons/links
  - Test Escape key on modals
- [ ] Check ARIA labels:
  - Images have alt text
  - Buttons have descriptive labels
  - Form inputs have associated labels
  - Icons have aria-label or aria-hidden
- [ ] Test with screen reader (if possible):
  - Page landmarks are announced
  - Headings are properly nested
  - Links are descriptive
  - Form fields are properly labeled

### 7.12 Performance Check

- [ ] Run Lighthouse audit in Chrome DevTools
- [ ] Check metrics:
  - Performance score (target: >90)
  - Accessibility score (target: 100)
  - Best Practices score (target: 100)
  - SEO score (target: >90)
- [ ] Address any Critical or High priority issues
- [ ] Verify images are optimized:
  - Using Next.js Image component
  - Lazy loading where appropriate
  - Appropriate sizes served

### 7.13 Browser Compatibility Check

Test in multiple browsers:
- [ ] Chrome (latest version)
- [ ] Firefox (latest version)
- [ ] Safari (latest version, if on Mac)
- [ ] Edge (latest version)

For each browser, check:
- [ ] All pages load correctly
- [ ] Styles render properly
- [ ] Interactions work
- [ ] No console errors

### 7.14 Create Placeholder Images (if needed)

If using local placeholder images:

- [ ] Create `public/placeholders/` directory
- [ ] Add before images (sample photos)
- [ ] Add after images (plushie results)
- [ ] Add avatar placeholder
- [ ] Add logo image (if not using icon)
- [ ] Update all image references in mock data
- [ ] Verify all images load correctly

Or use external placeholder services:
- [ ] Update mock data to use URLs from:
  - Unsplash (https://source.unsplash.com/)
  - Picsum (https://picsum.photos/)
  - Or other placeholder service

### 7.15 Documentation

- [ ] Update `README.md` if needed:
  - Update project description to Plushify
  - Remove boilerplate setup instructions
  - Add note about UI-only implementation
  - Document mock user state
- [ ] Review `CLAUDE.md`:
  - Ensure instructions are still accurate
  - Update any Plushify-specific guidance
- [ ] Create or update `specs/plushify-ui-transformation/PROGRESS.md`:
  - Document completed phases
  - Note any deviations from plan
  - Document any issues encountered
  - List any future considerations

### 7.16 Final Build Test

- [ ] Run production build:
  ```bash
  npm run build
  ```
- [ ] Check for build errors
- [ ] Check for build warnings
- [ ] Verify build completes successfully
- [ ] Run production server:
  ```bash
  npm run start
  ```
- [ ] Test production build in browser:
  - [ ] Check all pages load
  - [ ] Verify styles are correct
  - [ ] Test navigation
  - [ ] Verify images load
- [ ] Check bundle size (review .next output)

### 7.17 Git Commit

- [ ] Stage all changes:
  ```bash
  git add .
  ```
- [ ] Review staged changes:
  ```bash
  git status
  git diff --staged
  ```
- [ ] Create commit with descriptive message:
  ```bash
  git commit -m "feat: Transform boilerplate to Plushify SaaS UI

  - Redesigned landing page with before/after showcase
  - Created dashboard with credit display and recent generations
  - Built wizard-style generation flow
  - Added gallery with filtering and management
  - Created pricing, about, FAQ, and contact pages
  - Added all legal pages (privacy, terms, cookies, refund)
  - Updated navigation and footer
  - Implemented credit-based pricing display
  - Added mock data system for all features
  - Removed boilerplate components and pages
  - Full responsive design and dark mode support

  🤖 Generated with Claude Code

  Co-Authored-By: Claude <noreply@anthropic.com>"
  ```
- [ ] Verify commit was created successfully

### 7.18 Final Checklist Review

Review all acceptance criteria from requirements.md:

- [ ] All 14 pages accessible and functional
- [ ] Responsive design works on all breakpoints
- [ ] Dark mode works across all pages
- [ ] All navigation links work correctly
- [ ] No lint or typecheck errors
- [ ] No console errors in browser
- [ ] All interactive elements have proper states
- [ ] Mock data displays correctly
- [ ] Generation wizard flow is complete
- [ ] Gallery filtering and actions work
- [ ] Pricing page displays all tiers correctly
- [ ] FAQ accordions work
- [ ] Contact form validation works
- [ ] Legal pages are accessible and readable
- [ ] Profile page shows user data and credits

---

## Phase Completion Summary

After completing all phases, you should have:

✅ **14 Pages Total:**
- Landing (/)
- Dashboard (/dashboard)
- Gallery (/gallery)
- Generate (/generate)
- Pricing (/pricing)
- About (/about)
- FAQ (/faq)
- Contact (/contact)
- Profile (/profile)
- Privacy Policy (/privacy)
- Terms of Service (/terms)
- Cookie Policy (/cookies)
- Refund Policy (/refund)
- 404 Page (not-found)

✅ **18 New Components:**
- 8 shadcn/ui components
- 10 custom Plushify components

✅ **5 Mock Data Files:**
- Mock user
- Sample generations
- Pricing plans
- FAQ data
- Sample before/afters

✅ **Code Quality:**
- 0 ESLint errors
- 0 TypeScript errors
- Clean git history
- Production build successful

✅ **UX/UI:**
- Full responsive design
- Complete dark mode support
- Intuitive navigation
- Modern minimal aesthetic
- All interactive states implemented

---

## Post-Implementation Notes

### Next Steps (Not in Scope):
1. Backend integration planning
2. Real authentication system
3. Database schema implementation
4. API endpoint development
5. AI model integration
6. Payment processing integration
7. Unit and E2E testing
8. Production deployment

### Known Limitations:
- All data is mocked (no persistence)
- No real file upload or processing
- No actual payment processing
- No email functionality
- User always appears signed in
- Search functionality is UI-only

---

## Troubleshooting

### Common Issues:

**Issue**: shadcn/ui components not installing
- **Solution**: Ensure `components.json` exists, run `npx shadcn@latest init` if needed

**Issue**: TypeScript errors with mock data
- **Solution**: Verify all interfaces are properly exported and imported

**Issue**: Images not loading
- **Solution**: Check image paths, ensure using Next.js Image component, verify URLs

**Issue**: Dark mode not working
- **Solution**: Check ThemeProvider in layout.tsx, verify CSS variables in globals.css

**Issue**: Responsive design breaking
- **Solution**: Review Tailwind breakpoint classes, test in browser dev tools

---

**End of Implementation Plan**

**Total Estimated Tasks**: ~200 actionable items
**Estimated Time**: 3-5 days for experienced developer
**Complexity**: Medium (UI-focused, no complex backend logic)
