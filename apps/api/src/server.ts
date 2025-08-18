import 'reflect-metadata';

import cors from '@fastify/cors';
import env from '@fastify/env';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import Fastify from 'fastify';

import { authRoutes } from './auth/routes';
import { config } from './config';
import { createApolloServer } from './graphql/server';

const envSchema = {
  type: 'object',
  required: ['DATABASE_URL', 'BETTER_AUTH_SECRET'],
  properties: {
    PORT: {
      type: 'string',
      default: '3001',
    },
    NODE_ENV: {
      type: 'string',
      default: 'development',
    },
    DATABASE_URL: {
      type: 'string',
    },
    BETTER_AUTH_SECRET: {
      type: 'string',
    },
    BETTER_AUTH_URL: {
      type: 'string',
      default: 'http://localhost:3001',
    },
    CORS_ORIGIN: {
      type: 'string',
      default: 'http://localhost:3000',
    },
    JWT_SECRET: {
      type: 'string',
    },
  },
};

async function createServer() {
  const server = Fastify({
    logger: {
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    },
  });

  // Register environment validation
  await server.register(env, {
    schema: envSchema,
    dotenv: true,
  });

  // Security plugins
  await server.register(helmet, {
    contentSecurityPolicy: false,
  });

  await server.register(cors, {
    origin: config.CORS_ORIGINS,
    credentials: true,
    methods: ['GET', 'HEAD', 'POST', 'PATCH', 'DELETE'],
  });

  await server.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  // Health check
  server.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  // Register auth routes
  await server.register(authRoutes, { prefix: '/auth' });

  // Register GraphQL server
  const { plugin, pluginOptions } = await createApolloServer(server);
  await server.register(plugin, {
    context: pluginOptions.context,
    path: pluginOptions.path,
    method: pluginOptions.method,
  });

  return server;
}

async function start() {
  try {
    const server = await createServer();
    const port = config.PORT;

    await server.listen({ port, host: '0.0.0.0' });

    server.log.info(`🚀 Server ready at http://localhost:${port}`);
    server.log.info(`🚀 GraphQL endpoint: http://localhost:${port}/graphql`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

if (require.main === module) {
  start();
}

export { createServer };
