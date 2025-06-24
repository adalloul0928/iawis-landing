# IAWIS Landing Page Implementation Plan

## Project Overview

Creating a "coming soon" landing page for a young hip clothing brand with a modern, streetwear-influenced aesthetic.

## Current Project Status

- **Framework**: Next.js 15.3.4 with App Router
- **React**: v19.0.0
- **TypeScript**: Configured
- **Styling**: Tailwind CSS v4 (already installed)
- **Project Structure**: Basic Next.js app with src/app directory

## Tech Stack Requirements

### Core Framework ✅

- [x] Next.js 15+ with App Router and TypeScript
- [x] React 19+ with Server Components
- [x] TypeScript configuration

### Development Tools ✅

- [x] **Biome** - Linting and formatting (v2.0.5)
- [x] **Vitest** - Unit testing framework (v3.2.4)
- [x] **Playwright** - E2E testing (v1.53.1)
- [x] **Husky** - Git hooks for code quality (v9.1.7)

### UI & Styling (PARTIALLY COMPLETE)

- [x] Tailwind CSS v4
- [x] **shadcn/ui** components
- [ ] **Framer Motion** for animations

### Data Management (TO BE INSTALLED)

- [x] **TanStack Query** for server state management
- [x] **React Hook Form** for form handling

### Backend & Database (TO BE SETUP)

- [ ] **Supabase** integration for email collection

## Feature Implementation Plan

### 1. Hero Section

- Full-screen video background
- Animated brand logo
- "Coming Soon" message with typography
- Countdown timer to launch date
- Glassmorphism effects

### 2. Email Waitlist

- Prominent signup form with React Hook Form
- Real-time validation
- Incentive messaging ("Get 20% off + early access")
- Real-time subscriber counter (TanStack Query + Supabase)
- Success animation with Framer Motion

### 3. Footer

- Social media links
- Contact information
- Newsletter signup confirmation
- Glassmorphism card effects

### 4. Design System

- Dark theme with gradient accents
- Custom Tailwind design tokens
- Mobile-first responsive design
- Social sharing optimization
- Streetwear-influenced aesthetic

## Development Phases

### Phase 1: Development Environment Setup ✅

1. ✅ Install and configure Biome
2. Setup shadcn/ui
3. Install Framer Motion
4. ✅ Configure Vitest
5. ✅ Setup Playwright
6. ✅ Configure Husky git hooks

### Phase 2: Design System & Components

1. Create custom Tailwind design tokens
2. Implement glassmorphism utilities
3. Build reusable UI components with shadcn/ui
4. Setup dark theme configuration

### Phase 3: Core Features

1. Hero section with video background
2. Countdown timer component
3. Email signup form with React Hook Form
4. Supabase integration
5. TanStack Query setup

### Phase 4: Animations & Polish

1. Framer Motion animations
2. Micro-interactions
3. Loading states
4. Success animations
5. Mobile optimization

### Phase 5: Testing & Quality

1. Unit tests with Vitest
2. E2E tests with Playwright
3. Performance optimization
4. Social sharing meta tags

## File Structure (Planned)

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── hero/         # Hero section components
│   ├── forms/        # Form components
│   └── animations/   # Animation components
├── lib/
│   ├── supabase.ts   # Supabase client
│   ├── utils.ts      # Utility functions
│   └── validations.ts # Form schemas
├── styles/
│   └── globals.css   # Global styles & design tokens
└── types/
    └── index.ts      # TypeScript definitions
```

## Dependencies to Install

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.x",
    "@tanstack/react-query": "^5.x",
    "react-hook-form": "^7.x",
    "@hookform/resolvers": "^3.x",
    "zod": "^3.x",
    "framer-motion": "^11.x",
    "lucide-react": "^0.x"
  },
  "devDependencies": {
    "@biomejs/biome": "^1.x",
    "vitest": "^2.x",
    "@vitejs/plugin-react": "^4.x",
    "playwright": "^1.x",
    "husky": "^9.x",
    "lint-staged": "^15.x"
  }
}
```

## Environment Variables Needed

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_LAUNCH_DATE=
```

## Success Metrics

- [ ] Mobile-first responsive design
- [ ] Fast loading times (< 3s)
- [ ] Accessible form handling
- [ ] Real-time subscriber tracking
- [ ] Social sharing optimization
- [ ] 100% test coverage for critical paths
