// This file serves as the Vercel Edge Function entry point
// It re-exports the Hono app from the source directory

export { app as default } from '../src/api/index.ts';