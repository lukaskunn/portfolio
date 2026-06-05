# Portfolio Project - AI Agent Instructions

## Architecture Overview

This is a **Next.js 14 App Router** portfolio website with a custom cursor system, i18n support, and SCSS styling. Key architectural patterns:

- **Local fonts only**: All fonts (Gloock, Akshar, Roboto, Roboto Mono) are self-hosted in `/public/assets/fonts/` and loaded via `next/font/local` in `layout.tsx`
- **Dual styling system**: SCSS source files in `src/styles/sass/` compile to CSS modules in `src/styles/css/` - always edit SCSS, never CSS directly
- **Context-heavy architecture**: 5 global contexts wrap the app (Language, Cursor, Page, Device, ProjectsModal) - check `src/app/layout.tsx` for provider hierarchy
- **Custom cursor interactions**: `CursorContext` + `CursorFollower` provide hover effects with size variants (big/medium/small/keep) and modal content via GSAP animations

## Development Workflow

### Starting Development
```bash
npm run dev          # Next.js dev server on :3000
npm run sass         # Watch SCSS → CSS compilation (run concurrently with dev)
```

**Critical**: Always run both commands simultaneously. SCSS changes won't reflect without the sass watcher.

### Styling Conventions
- **Always edit SCSS files** in `src/styles/sass/`, never touch generated CSS in `src/styles/css/`
- Import `_references.scss` for design tokens: `@use "references" as *;`
- Design system variables:
  - Colors: `$background-color-main` (#E5E5DD), `$primary-color`, `$secondary-color`
  - Fonts: `$title-font` (Gloock), `$primary-text-font` (Roboto Mono), `$secondary-text-font` (Roboto), `$gloock-font`
  - Breakpoints via `@include respond-to(mobile-375 | mobile-480 | mobile-768 | tablet-1024 | desktop-1440 | desktop-1920)`
- Use mixins: `@include title-style($size, $line-height, $spacing)` and `@include subtitle-style(...)`

### Context Usage Patterns

**Device detection** (`useDeviceContext`):
```tsx
const { isMobile, isTablet, isDesktop, isSmallDesktop, isUltraWide } = useDeviceContext();
// Breakpoints: ≤425px (mobile), ≤768px (smallTablet), ≤1024px (tablet), ≤1440px (smallDesktop), ≤1920px (desktop), >1920px (ultraWide)
```

**Cursor interactions** (`useCursor`):
```tsx
const { setIsHovering, setModalProps, handleModalPropsEnter, handleModalPropsLeave } = useCursor();

// On hover enter:
setIsHovering({ value: true, size: "medium" }); // Sizes: big (120px) | medium (80px) | small (40px) | keep (20px)
handleModalPropsEnter("View Project", true); // true = scramble text animation

// On hover leave:
setIsHovering({ value: false });
handleModalPropsLeave("View Project");
```

**Language/Content** (`useLanguage`):
```tsx
const { currentContent } = useLanguage();
// English-only implementation. i18n structure exists (pt.json) but translation not implemented - planned for future
```

## Project-Specific Patterns

### Content Management
- **All text content** lives in `src/content/en.json` as structured JSON (landing, header, projects, footer, etc.)
- Access via `currentContent.section.property` from `useLanguage()` hook
- **Projects data**: Currently hardcoded in `ProjectsModalContext` with full project details including galleries - planned migration to `en.json` in progress

### Component Conventions
- **Client components**: Most components use `'use client'` due to cursor/context interactions
- **Link handling**: Use `LinkHandler` component for smart internal/external link routing (checks for http:// prefix)
- **Metadata**: Generate with `generateMetadata(title?, description?, url?, image?)` helper in `utils/` for consistent SEO

### API Routes
- Contact form: `POST /api/contact` validates email/name/message and sends via Resend
- Email template uses inline styles matching portfolio design (#E5E5DD background, Courier New fallback)
- Environment: Requires `RESEND_API_KEY` for email functionality

## File Organization Rules

- **Route structure**: `/home`, `/projects`, `/about-me`, `/contact`, `/all-my-links`, `/project/[project-name]`
- **Module CSS**: Always use `styles["kebab-case-class"]` for CSS module imports (SCSS uses kebab-case)
- **Path aliases**: Use `@/*` for all `src/` imports (configured in tsconfig.json)
- **Animation libraries**: GSAP for cursor/scroll effects, Framer Motion for page transitions

## Common Pitfalls

1. **Don't edit generated CSS files** - changes will be overwritten by SCSS compilation
2. **Font references**: Use CSS variables (`var(--font-name)`) not string names in SCSS
3. **Cursor system**: Always pair `setIsHovering` with `handleModalPropsEnter/Leave` for consistent UX
4. **Device context**: Server-side renders as desktop, hydrates with client detection - design for this
5. **Projects modal**: Index-based system in `ProjectsModalContext` - project order matters for modal display

## Build & Deploy

```bash
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint + Prettier
```

- Configured for Vercel deployment with Speed Insights
- ESLint uses Next.js + Prettier flat config (eslint.config.mjs)
- TypeScript strict mode enabled
