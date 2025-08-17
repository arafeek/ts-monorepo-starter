# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript monorepo starter using Turborepo with:
- **API**: Fastify server with GraphQL (Apollo Server), Better Auth, Drizzle ORM + PostgreSQL
- **Web**: React 18 + Vite with TanStack Query, TailwindCSS + Shadcn UI, Better Auth client
- **Packages**: Shared TypeScript configs, ESLint configs, types, and utilities

## Essential Commands

### Development
```bash
pnpm dev          # Start all development servers (API on :3001, Web on :3000)
pnpm build        # Build all packages and applications
pnpm test         # Run all tests across the monorepo
pnpm test:watch   # Run tests in watch mode
pnpm lint         # Lint all code
pnpm lint:fix     # Auto-fix linting issues
pnpm typecheck    # Type check all packages
```

### API-Specific (from apps/api/)
```bash
pnpm db:generate  # Generate Drizzle migrations
pnpm db:migrate   # Apply database migrations
pnpm db:studio    # Open Drizzle Studio
pnpm db:seed      # Seed database with initial data
```

### Testing Individual Packages
- API tests: `cd apps/api && pnpm test`
- Web tests: `cd apps/web && pnpm test`

## Architecture

### Monorepo Structure
- **apps/api/**: Fastify server with GraphQL resolvers in `src/graphql/resolvers/`
- **apps/web/**: React SPA with pages in `src/pages/` and components in `src/components/`
- **packages/**: Shared configs and utilities across apps

### Key Architectural Patterns
- **GraphQL API**: Type-GraphQL with resolvers in `apps/api/src/graphql/resolvers/`
- **Authentication**: Better Auth handles sessions for both API and web client
- **Database**: Drizzle ORM with schema in `apps/api/src/db/schema.ts`
- **State Management**: TanStack Query for server state, React Context for client state
- **Styling**: TailwindCSS + Shadcn UI components in `apps/web/src/components/ui/`

### Database Workflow
1. Modify schema in `apps/api/src/db/schema.ts`
2. Generate migration: `pnpm db:generate`
3. Apply migration: `pnpm db:migrate`
4. Start PostgreSQL: `docker-compose up -d`

### Authentication Flow
- API uses Better Auth with sessions stored in database
- Web app uses Better Auth client with React Context provider in `apps/web/src/lib/auth.tsx`
- Protected routes use `ProtectedRoute` component

## Environment Variables

### API (.env in apps/api/)
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/monorepo_starter
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3001
```

### Web (.env in apps/web/)
```
VITE_API_URL=http://localhost:3001
```

## Testing Strategy
- **API**: Vitest with integration tests for GraphQL resolvers and auth
- **Web**: Vitest + React Testing Library for component and integration tests
- Test setup files in `__tests__/setup.ts` for each app

## Development Guidelines
- Never add dependencies directly to the package.json file. Use `pnpm install <package_name>` with the appropriate flags
- Look up documentation with context7 when working with third party libraries and dependencies
- If after 3-4 attempts at fixing a bug or failing test you cannot get tests and typecheck passing, briefly summarize the issue and stop working so that I can intervene.

### After Making Changes
1. **Always validate types**: Run `pnpm typecheck` to ensure no type errors
2. **Ensure code passes linting**: Run `pnpm lint` to check for linting issues
3. **Format code consistently**: Run `pnpm format` (Prettier) after creating or modifying files
