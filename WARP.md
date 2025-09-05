# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server with hot reloading (uses tsx to run TypeScript server)
- `npm run build` - Build production version (builds both client and server for deployment)
- `npm run start` - Start production server (requires build first)
- `npm run check` - Run TypeScript type checking across the entire codebase

### Database Operations
- `npm run db:push` - Push database schema changes to PostgreSQL (uses --force flag)
- `npm run db:seed` - Seed database with initial data (runs tsx db/seed.ts)

### Development Notes
- The development server serves both API routes and frontend on port 5001
- In development mode, Vite handles the frontend with HMR
- In production, built static files are served from `dist/public`

## Architecture Overview

### Full-Stack Monorepo Structure
This is a portfolio website built as a full-stack TypeScript application with a unified build system:

**Frontend**: React + TypeScript + Vite
- Uses Wouter for client-side routing (lightweight alternative to React Router)
- Styled with Tailwind CSS and shadcn/ui components
- Animations powered by Framer Motion
- State management via React Context and TanStack Query

**Backend**: Express.js + TypeScript
- RESTful API serving contact form submissions
- Database operations handled via Drizzle ORM
- Email notifications via SendGrid integration
- Google Gemini AI integration for dynamic welcome messages

**Database**: PostgreSQL with Drizzle ORM
- Schema defined in `shared/schema.ts` and shared between client/server
- Contact messages stored with validation using Zod schemas

### Key Architectural Patterns

**Shared Code Pattern**: The `shared/` directory contains TypeScript definitions used by both client and server, particularly database schemas and types. This ensures type safety across the full stack.

**Path Aliases**: The project uses TypeScript path mapping:
- `@/` → `client/src/` (frontend code)  
- `@db` → `db/` (database operations)
- `@shared/` → `shared/` (shared types/schemas)

**API Layer**: All backend routes are in `server/routes.ts` with a clear separation between API logic and storage operations (handled in `server/storage.ts`).

**Component Architecture**: Frontend uses a flat component structure in `client/src/components/` with specialized sections for different portfolio areas (Hero, Experience, Skills, Projects, etc.).

## Content Management

### Static Content Location
Most portfolio content is managed in `client/src/lib/data.ts`:
- `experienceData` - Professional experience timeline
- `skillsData` - Technical skills with proficiency levels
- `projectsData` - Project portfolio with filtering metadata
- `testimonialsData` - Client testimonials
- `certificationsData` - Professional certifications

### Dynamic Features
The portfolio includes several dynamic elements beyond static content:
- **Contact Form**: Submissions saved to PostgreSQL and trigger email notifications
- **AI Welcome Messages**: Google Gemini integration generates personalized greetings
- **Section Tracking**: Custom React context tracks which section is currently in view
- **Theme System**: Dark/light mode toggle with persistent storage

## Environment Setup

### Required Environment Variables
```
DATABASE_URL=postgresql://username:password@host:port/database
SENDGRID_API_KEY=your_sendgrid_key (optional - for email notifications)
GOOGLE_AI_API_KEY=your_google_ai_key (optional - for AI welcome messages)
This is Test for me to commit
```

### Database Setup Flow
1. Ensure PostgreSQL is running and accessible
2. Set DATABASE_URL in environment
3. Run `npm run db:push` to create tables
4. Run `npm run db:seed` to populate initial data

## Special Considerations

### Development Plugins
The project includes development-specific plugins for enhanced developer experience.

### Asset Handling
Static assets are served from multiple locations:
- `/attached_assets/` route serves files from the `attached_assets/` directory (PDFs, images)
- `/public/` contains standard web assets (favicon, manifest, etc.)
- The build process outputs to `dist/public/` for production

### TypeScript Configuration
The project uses a unified `tsconfig.json` that includes client, server, and database code. Path mapping ensures clean imports across the entire codebase.

### Production Deployment
- Built files go to `dist/` directory
- Server serves static files in production mode
- Database migrations are not used - schema is pushed directly via Drizzle Kit
- The architecture supports deployment to platforms like Vercel, Netlify, or traditional hosting

## UI Component System

The project uses shadcn/ui components built on Radix UI primitives. Components are auto-imported and configured via `components.json`. The theme system supports both light and dark modes with CSS custom properties.
