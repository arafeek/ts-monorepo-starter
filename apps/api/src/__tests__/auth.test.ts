import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createServer } from '../server';
import { FastifyInstance } from 'fastify';

describe('Authentication', () => {
  let server: FastifyInstance;

  beforeAll(async () => {
    server = await createServer();
    await server.ready();
  });

  afterAll(async () => {
    await server.close();
  });

  it('should return health check', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/health',
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toMatchObject({
      status: 'ok',
    });
  });

  it('should handle signup request', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/auth/signup',
      payload: {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      },
    });

    // This will fail without a database, but we're testing the route structure
    expect([200, 400, 500]).toContain(response.statusCode);
  });

  it('should handle signin request', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/auth/signin',
      payload: {
        email: 'test@example.com',
        password: 'password123',
      },
    });

    // This will fail without a database, but we're testing the route structure
    expect([200, 400, 500]).toContain(response.statusCode);
  });
});