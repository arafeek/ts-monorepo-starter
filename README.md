# TypeScript Monorepo Starter

A modern, production-ready monorepo template built with TypeScript, featuring a Fastify API with GraphQL and a React web application with comprehensive authentication, testing, and development tooling.

## ✨ Features

### 🏗️ **Monorepo Architecture**
- **Turborepo** for build system and task orchestration
- **pnpm** workspaces for efficient package management
- Shared configurations and utilities across projects

### 🚀 **API (Fastify + GraphQL)**
- **Fastify** web server with TypeScript
- **Apollo Server** for GraphQL API
- **Drizzle ORM** with PostgreSQL for type-safe database operations
- **Better Auth** for authentication and authorization
- **Vitest** for testing with comprehensive test setup

### 🌐 **Web Application (React + Vite)**
- **Vite** + **React 18** for fast development and builds
- **TypeScript** for type safety
- **TailwindCSS** + **Shadcn UI** for beautiful, accessible components
- **React Router** for client-side routing
- **TanStack Query** for server state management
- **Better Auth** client integration
- **Vitest** + **React Testing Library** for component testing

### 🛠️ **Developer Experience**
- **ESLint** + **Prettier** for code quality and formatting
- **Husky** + **lint-staged** for pre-commit hooks
- **VS Code** workspace configuration with recommended extensions
- **Docker Compose** for local PostgreSQL setup
- Comprehensive utility scripts for common tasks

### 🔐 **Authentication System**
- Complete authentication flow with login/register
- Protected routes and middleware
- Session management
- Type-safe user management

## 📦 Project Structure

```
ts-monorepo-starter/
├── apps/
│   ├── api/                    # Fastify API with GraphQL
│   │   ├── src/
│   │   │   ├── auth/          # Authentication logic
│   │   │   ├── db/            # Database schema and migrations
│   │   │   ├── graphql/       # GraphQL resolvers and types
│   │   │   └── server.ts      # Main server file
│   │   └── package.json
│   └── web/                   # React web application
│       ├── src/
│       │   ├── components/    # Reusable UI components
│       │   ├── pages/         # Application pages
│       │   ├── lib/           # Utilities and configurations
│       │   └── main.tsx       # Application entry point
│       └── package.json
├── packages/
│   ├── eslint-config/         # Shared ESLint configurations
│   ├── typescript-config/     # Shared TypeScript configurations
│   ├── types/                 # Shared TypeScript types
│   └── utils/                 # Shared utilities and constants
├── scripts/                   # Utility scripts
│   ├── setup.sh              # Initial setup script
│   ├── clean.sh              # Cleanup script
│   └── create-migration.sh    # Database migration helper
├── .vscode/                   # VS Code workspace configuration
├── docker-compose.yml         # Local development services
└── turbo.json                # Turborepo configuration
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 22+ (LTS recommended)
- **pnpm** 9+ (will be installed automatically if missing)
- **Docker** (optional, for local PostgreSQL)

### Setup

1. **Clone and setup the repository:**
   ```bash
   git clone <your-repo-url> my-project
   cd my-project
   ./scripts/setup.sh
   ```

2. **Configure environment variables:**
   ```bash
   # API environment variables (apps/api/.env)
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/monorepo_starter"
   BETTER_AUTH_SECRET="your-super-secret-key"
   BETTER_AUTH_URL="http://localhost:3001"
   
   # Web app environment variables (apps/web/.env)
   VITE_API_URL="http://localhost:3001"
   ```

3. **Start the development servers:**
   ```bash
   pnpm dev
   ```

4. **Access the applications:**
   - 🌐 **Web App**: http://localhost:3000
   - 🔌 **API**: http://localhost:3001
   - 📊 **GraphQL Playground**: http://localhost:3001/graphql

## 📝 Available Commands

### Root Level Commands

```bash
# Development
pnpm dev          # Start all development servers
pnpm build        # Build all packages and applications
pnpm test         # Run all tests
pnpm lint         # Lint all code
pnpm typecheck    # Type check all packages

# Utilities
pnpm clean        # Clean all build artifacts and dependencies
pnpm format       # Format all code with Prettier
```

### Package-Specific Commands

```bash
# API (from apps/api/)
pnpm dev          # Start API development server
pnpm build        # Build API
pnpm test         # Run API tests
pnpm db:generate  # Generate database migrations
pnpm db:migrate   # Apply database migrations
pnpm db:studio    # Open Drizzle Studio

# Web App (from apps/web/)
pnpm dev          # Start web development server
pnpm build        # Build web application
pnpm test         # Run web app tests
pnpm preview      # Preview production build
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests for specific package
cd apps/api && pnpm test
cd apps/web && pnpm test
```

### Test Structure

- **API Tests**: Located in `apps/api/src/__tests__/`
  - Unit tests for authentication
  - Integration tests for GraphQL resolvers
  - Database integration tests

- **Web App Tests**: Located in `apps/web/src/__tests__/`
  - Component tests with React Testing Library
  - Authentication flow tests
  - User interaction tests

## 🗄️ Database

### Local Development

The project includes a Docker Compose configuration for local PostgreSQL:

```bash
# Start PostgreSQL
docker-compose up -d

# Stop PostgreSQL
docker-compose down
```

### Migrations

```bash
# Generate a new migration
./scripts/create-migration.sh add-new-feature

# Apply migrations
cd apps/api && pnpm db:migrate

# Seed database
./scripts/seed-db.sh
```

## 🔧 Configuration

### TypeScript

Shared TypeScript configurations are in `packages/typescript-config/`:
- `base.json` - Common settings
- `node.json` - Node.js specific settings
- `react-library.json` - React library settings

### ESLint

Shared ESLint configurations are in `packages/eslint-config/`:
- `base.js` - Common rules
- `node.js` - Node.js specific rules  
- `react.js` - React specific rules

### VS Code

The project includes VS Code workspace configuration with:
- Recommended extensions
- Debug configurations
- Task definitions
- Optimized settings for monorepo development

## 🚢 Deployment

### Build for Production

```bash
# Build all packages and applications
pnpm build

# The built files will be in:
# - apps/api/dist/ (API server)
# - apps/web/dist/ (Static web files)
```

### Environment Variables

Ensure these environment variables are set in production:

**API Environment Variables:**
```bash
NODE_ENV=production
DATABASE_URL=your-production-database-url
BETTER_AUTH_SECRET=your-production-secret
BETTER_AUTH_URL=https://your-api-domain.com
JWT_SECRET=your-jwt-secret
```

**Web App Environment Variables:**
```bash
VITE_API_URL=https://your-api-domain.com
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Run tests**: `pnpm test`
5. **Run linting**: `pnpm lint`
6. **Commit your changes**: `git commit -m 'Add amazing feature'`
7. **Push to the branch**: `git push origin feature/amazing-feature`
8. **Open a Pull Request**

### Code Style

- Use TypeScript for all new code
- Follow the existing code style enforced by ESLint and Prettier
- Write tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Turborepo](https://turbo.build/) for the monorepo build system
- [Fastify](https://fastify.dev/) for the web framework
- [Better Auth](https://better-auth.com/) for authentication
- [Drizzle ORM](https://orm.drizzle.team/) for database management
- [TanStack Query](https://tanstack.com/query) for data fetching
- [Shadcn UI](https://ui.shadcn.com/) for UI components

## 📞 Support

If you have any questions or need help getting started:

1. Check the [documentation](./docs/)
2. Search [existing issues](../../issues)
3. Create a [new issue](../../issues/new)

---

**Happy coding!** 🎉