#!/bin/bash

# Script to create a new database migration
# Usage: ./scripts/create-migration.sh [migration-name]

set -e

if [ -z "$1" ]; then
  echo "❌ Error: Migration name is required"
  echo "Usage: ./scripts/create-migration.sh [migration-name]"
  echo "Example: ./scripts/create-migration.sh add-user-table"
  exit 1
fi

MIGRATION_NAME=$1
API_DIR="apps/api"

if [ ! -d "$API_DIR" ]; then
  echo "❌ Error: API directory not found at $API_DIR"
  exit 1
fi

echo "🔄 Creating new migration: $MIGRATION_NAME"

cd $API_DIR

# Generate migration using Drizzle Kit
npx drizzle-kit generate --name="$MIGRATION_NAME"

echo "✅ Migration created successfully!"
echo "📝 Review the generated migration file in apps/api/src/db/migrations/"
echo "🚀 Run 'pnpm db:migrate' from the API directory to apply the migration"