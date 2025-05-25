# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a full-stack React application template with Bun runtime. The codebase is organized as follows:

```
src/
├── api/        # Backend API using Hono framework
│   ├── index.ts       # Main server entry point
│   ├── routes.ts      # API route definitions
│   ├── middleware/    # Authentication and other middleware
│   └── utilities/     # Shared backend utilities
└── ui/         # Frontend React application
    ├── index.tsx      # React app entry point
    ├── application.tsx # Main app component
    ├── components/    # Reusable UI components
    ├── hooks/        # Custom React hooks
    └── utilities/    # Frontend utilities and Supabase client
```

## Common Development Commands

### Development
- `bun run dev` - Run both API and UI concurrently
- `bun run dev:client` - Run Vite dev server only
- `bun run dev:server` - Run API server with watch mode

### Code Quality
- `bun run lint` - Run ESLint
- `bun run lint:fix` - Auto-fix ESLint issues
- `bun run format` - Format code with Prettier
- `bun run format:check` - Check formatting without changes
- `bun run types:all` - Type check entire project
- `bun run types:api` - Type check API only
- `bun run types:ui` - Type check UI only

### Build & Deployment
- `bun run build` - Build frontend for production
- `bun run build:api` - Build API for production
- `bun run preview` - Preview production build locally

### Infrastructure
- `bun run setup:supabase` - Start local Supabase instance

## Deployment on Vercel

This application is configured for deployment on Vercel with the following setup:

1. **Frontend**: Built with Vite and served from the `dist` directory
2. **API**: Deployed as an Edge Function at `/api/*` routes
3. **Configuration**: `vercel.json` handles routing and function setup

The deployment process:
- Vercel runs `bun install && bun run build` to build the frontend
- The API is served from `api/index.js` which re-exports the Hono app
- All `/api/*` requests are routed to the Edge Function
- All other requests serve the React SPA

## Architecture Overview

### Path Aliases
- `@api/*` - References to API code (src/api/*)
- `@ui/*` - References to UI code (src/ui/*)
- `$supabase` - Supabase utilities (src/ui/supabase)

### Authentication Flow
The application uses Supabase for authentication:
- Frontend authentication hooks in `src/ui/hooks/use-current-user.ts`
- Protected API routes use authentication middleware in `src/api/middleware/authenticated.ts`
- Tokens are passed via Authorization header or cookies

### Component Architecture
UI components use class-variance-authority (CVA) for variant-based styling:
- Components like Button, Input, and Tabs use CVA for style variants
- Tailwind CSS v4 for styling with the `cn` utility for class merging
- All components are TypeScript-first with proper type definitions

### API Architecture
- Hono framework for lightweight, edge-compatible API
- Zod for request/response validation
- Error handling middleware for consistent error responses
- CORS configuration for frontend integration

### Development Workflow
1. The Vite dev server proxies `/api` requests to the backend server on port 3000
2. Hot module replacement is enabled for both frontend and backend
3. TypeScript path aliases work across the monorepo structure
4. Git hooks via Husky ensure code quality before commits and pushes

### Key Technologies
- **Runtime**: Bun (JavaScript runtime and package manager)
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4
- **Backend**: Hono framework with edge runtime support
- **Database/Auth**: Supabase
- **Code Quality**: ESLint, Prettier, Husky, lint-staged