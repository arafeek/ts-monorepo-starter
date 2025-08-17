#!/bin/bash

# Script to seed the database with initial data
# Usage: ./scripts/seed-db.sh

set -e

API_DIR="apps/api"

if [ ! -d "$API_DIR" ]; then
  echo "❌ Error: API directory not found at $API_DIR"
  exit 1
fi

echo "🌱 Seeding database..."

cd $API_DIR

# Check if .env file exists
if [ ! -f ".env" ]; then
  echo "⚠️  Warning: .env file not found. Please create one based on .env.example"
  exit 1
fi

# Run the seed script
npm run db:seed

echo "✅ Database seeded successfully!"