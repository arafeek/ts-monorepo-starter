import { beforeAll, afterAll } from 'vitest';

beforeAll(async () => {
  // Set up test environment variables
  process.env.NODE_ENV = 'test';
  process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';
  process.env.BETTER_AUTH_SECRET = 'test-secret';
  process.env.BETTER_AUTH_URL = 'http://localhost:3001';
  process.env.JWT_SECRET = 'test-jwt-secret';
});

afterAll(async () => {
  // Clean up after tests
});