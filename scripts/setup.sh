#!/bin/bash

# Script to set up the monorepo for new developers
# Usage: ./scripts/setup.sh

set -e

echo "🚀 Setting up TypeScript Monorepo Starter..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "❌ Error: Node.js is not installed"
  echo "Please install Node.js 22+ from https://nodejs.org/"
  exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 22 ]; then
  echo "❌ Error: Node.js version 22+ is required"
  echo "Current version: $(node -v)"
  exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
  echo "📦 Installing pnpm..."
  npm install -g pnpm
fi

echo "📦 Installing dependencies..."
pnpm install

echo "🔧 Setting up environment files..."

# Copy environment files if they don't exist
if [ ! -f "apps/api/.env" ]; then
  cp apps/api/.env.example apps/api/.env
  echo "✅ Created apps/api/.env from .env.example"
  echo "⚠️  Please update the environment variables in apps/api/.env"
fi

if [ ! -f "apps/web/.env" ]; then
  cp apps/web/.env.example apps/web/.env
  echo "✅ Created apps/web/.env from .env.example"
fi

echo "🏗️  Building packages..."
pnpm build

echo "🐳 Setting up Docker services..."
if command -v docker &> /dev/null; then
  docker-compose up -d
  echo "✅ PostgreSQL is running in Docker"
else
  echo "⚠️  Docker not found. Please install Docker to run PostgreSQL"
  echo "Or set up PostgreSQL manually and update DATABASE_URL in apps/api/.env"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update environment variables in apps/api/.env"
echo "2. Run 'pnpm dev' to start development servers"
echo "3. Visit http://localhost:3000 for the web app"
echo "4. Visit http://localhost:3001/graphql for the GraphQL playground"
echo ""
echo "Available commands:"
echo "  pnpm dev     - Start all development servers"
echo "  pnpm build   - Build all packages and apps"
echo "  pnpm test    - Run all tests"
echo "  pnpm lint    - Lint all code"