# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

- `bun dev` - Start both API and UI development servers
- `bun dev:server` - Start only the API server
- `bun dev:client` - Start only the UI server

### Code Quality

- `bun lint` - Run ESLint on all files
- `bun lint:fix` - Auto-fix ESLint issues
- `bun format` - Format all files with Prettier
- `bun format:check` - Check formatting without modifying

### Build

- In `/api`: `bun build index.ts --outdir=dist` - Build API for production
- In `/ui`: `bun run build` - Build UI for production

## Architecture

This is a monorepo with two main workspaces:

- **`/api`** - Hono-based backend API

  - Entry point: `index.ts`
  - Routes defined in `routes.ts`
  - Runs on port from `$SERVER_PORT` env var
  - CORS enabled in development

- **`/ui`** - React frontend with Vite
  - Entry point: `src/index.tsx`
  - Main app component: `src/application.tsx`
  - API client: `src/api.ts`
  - Uses Tailwind CSS v4
  - Proxies `/api` requests to backend in development

## Key Technologies

- **Runtime**: Bun (>= 1.13.0)
- **Backend**: Hono web framework
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM
- **Validation**: Zod
- **Code Quality**: ESLint + Prettier with pre-commit hooks
