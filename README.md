# Plushify - Transform Photos into Adorable Plushies

A modern SaaS application that uses AI to transform photos into adorable plushie-style images. Built with Next.js 15, React 19, TypeScript, and shadcn/ui.

## 🧸 About This Project

This is a **UI-only implementation** showcasing the complete frontend experience of the Plushify SaaS application. All features use mock data and simulate the user experience without backend integration.

## ✨ Features

- **🎨 Modern UI**: Beautiful, responsive design with shadcn/ui components
- **🌓 Dark Mode**: Full dark mode support across all pages
- **📸 Generation Wizard**: Step-by-step plushie creation flow
- **🖼️ Gallery Management**: View, filter, and manage your creations
- **💳 Credit System**: Credit-based pricing display
- **📱 Fully Responsive**: Mobile-first design approach
- **⚡ Modern Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0 or higher (<a href="https://nodejs.org/" target="_blank">Download here</a>)
- **npm**: Comes with Node.js

## 🛠️ Quick Setup

**1. Install Dependencies**

```bash
npm install
```

**2. Environment Setup**

Copy the example environment file:

```bash
cp env.example .env
```

Fill in the required environment variables in the `.env` file:

```env
# Database
POSTGRES_URL="postgresql://username:password@localhost:5432/your_database_name"

# Authentication - Better Auth
BETTER_AUTH_SECRET="your-random-32-character-secret-key-here"

# Google OAuth (Get from Google Cloud Console)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Note**: While the app requires authentication setup, all user data is mocked for the UI demonstration.

**3. Database Setup**

Generate and run database migrations:

```bash
npm run db:generate
npm run db:migrate
```

**4. Start the Development Server**

```bash
npm run dev
```

Your application will be available at [http://localhost:3000](http://localhost:3000)

## 📄 Pages

The application includes 14 fully functional pages:

### Main Pages
- **Landing Page** (`/`): Hero section with before/after showcase
- **Dashboard** (`/dashboard`): User dashboard with stats and recent generations
- **Gallery** (`/gallery`): Full gallery with filtering and management
- **Generate** (`/generate`): Step-by-step wizard for creating plushies
- **Profile** (`/profile`): User profile with plan and credit information

### Information Pages
- **Pricing** (`/pricing`): Credit-based pricing tiers
- **About** (`/about`): How Plushify works
- **FAQ** (`/faq`): Frequently asked questions
- **Contact** (`/contact`): Contact form

### Legal Pages
- **Privacy Policy** (`/privacy`)
- **Terms of Service** (`/terms`)
- **Cookie Policy** (`/cookies`)
- **Refund Policy** (`/refund`)

### Error Pages
- **404 Page** (`/not-found`): Custom 404 error page

## 🗂️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── api/auth/          # Authentication endpoints
│   ├── contact/           # Contact page
│   ├── cookies/           # Cookie policy
│   ├── dashboard/         # User dashboard
│   ├── faq/               # FAQ page
│   ├── gallery/           # Gallery page
│   ├── generate/          # Generation wizard
│   ├── pricing/           # Pricing page
│   ├── privacy/           # Privacy policy
│   ├── profile/           # User profile
│   ├── refund/            # Refund policy
│   ├── terms/             # Terms of service
│   ├── not-found.tsx      # 404 page
│   └── page.tsx           # Landing page
├── components/
│   ├── plushify/          # Custom Plushify components
│   │   ├── before-after-slider.tsx
│   │   ├── credit-display.tsx
│   │   ├── filter-bar.tsx
│   │   ├── gallery-grid.tsx
│   │   ├── gallery-item.tsx
│   │   ├── generation-status.tsx
│   │   ├── generation-wizard.tsx
│   │   ├── image-uploader.tsx
│   │   ├── pricing-card.tsx
│   │   └── user-menu.tsx
│   ├── ui/                # shadcn/ui components
│   ├── legal-page-layout.tsx
│   ├── site-footer.tsx
│   └── site-header.tsx
└── lib/
    ├── mock-data/         # Mock data for UI
    │   ├── faq-data.ts
    │   ├── mock-purchases.ts
    │   ├── mock-user.ts
    │   ├── pricing-plans.ts
    │   ├── sample-befores-afters.ts
    │   └── sample-generations.ts
    ├── auth.ts            # Better Auth configuration
    ├── auth-client.ts     # Client-side auth utilities
    ├── db.ts              # Database connection
    ├── schema.ts          # Database schema
    └── utils.ts           # Utility functions
```

## 🔧 Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking
npm run db:generate  # Generate database migrations
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Drizzle Studio (database GUI)
```

## 🎨 Components

### Custom Plushify Components
- **BeforeAfterSlider**: Interactive image comparison slider
- **CreditDisplay**: Shows user's credit balance
- **FilterBar**: Gallery filtering and sorting controls
- **GalleryGrid**: Responsive grid layout for generations
- **GalleryItem**: Individual gallery item with actions
- **GenerationStatus**: Status badge for generations
- **GenerationWizard**: Multi-step plushie creation flow
- **ImageUploader**: Drag-and-drop image upload
- **PricingCard**: Pricing tier display card
- **UserMenu**: User dropdown menu

### shadcn/ui Components
All standard shadcn/ui components are available including Button, Card, Input, Select, Accordion, Alert, Progress, Skeleton, Tabs, and more.

## 🚧 Known Limitations

This is a **UI-only implementation**. The following features are simulated with mock data:

- ❌ No actual file upload or image processing
- ❌ No real AI generation (mock results shown)
- ❌ No payment processing
- ❌ No data persistence (all changes reset on refresh)
- ❌ No email functionality
- ❌ User always appears signed in
- ❌ Search functionality is UI-only

## 🔮 Future Development

The following features are planned for backend integration:

1. **Backend API Development**
   - Real authentication system
   - Database integration
   - File upload and storage
   
2. **AI Integration**
   - Real image-to-plushie AI model
   - Processing queue system
   - Result caching

3. **Payment System**
   - Stripe integration
   - Credit purchase flow
   - Subscription management

4. **Additional Features**
   - Email notifications
   - User settings persistence
   - Advanced search and filtering
   - Social sharing

## 📝 Development Notes

- Built with Next.js 15 App Router
- Uses TypeScript for type safety
- Tailwind CSS for styling
- shadcn/ui for component library
- Mock data system for realistic UI demonstration
- Fully responsive design
- Complete dark mode support

## 🚀 Deployment

This project can be deployed to Vercel, Netlify, or any platform supporting Next.js:

```bash
npm run build
npm run start
```

Ensure environment variables are configured in your deployment platform.

---

**Built with ❤️ using Next.js and shadcn/ui**
