#!/bin/bash

# Script to clean all build artifacts and dependencies
# Usage: ./scripts/clean.sh

set -e

echo "🧹 Cleaning monorepo..."

# Clean Turborepo cache
echo "🗑️  Cleaning Turborepo cache..."
rm -rf .turbo

# Clean all node_modules
echo "🗑️  Removing node_modules..."
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

# Clean all dist directories
echo "🗑️  Removing dist directories..."
find . -name "dist" -type d -prune -exec rm -rf '{}' +

# Clean all build directories
echo "🗑️  Removing build directories..."
find . -name "build" -type d -prune -exec rm -rf '{}' +

# Clean TypeScript build info
echo "🗑️  Removing TypeScript build info..."
find . -name "*.tsbuildinfo" -delete

# Clean coverage reports
echo "🗑️  Removing coverage reports..."
find . -name "coverage" -type d -prune -exec rm -rf '{}' +

echo "✅ Cleanup completed!"
echo "🚀 Run 'pnpm install' to reinstall dependencies"