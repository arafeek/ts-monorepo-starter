import { FastifyInstance } from 'fastify';

import { auth } from './config';

export async function authRoutes(fastify: FastifyInstance) {
  // Better Auth routes
  fastify.all('/api/auth/*', async (request, reply) => {
    return auth.handler(request.raw, reply.raw);
  });

  // Custom auth endpoints
  fastify.post('/signup', async (request, reply) => {
    const { email, password, name } = request.body as {
      email: string;
      password: string;
      name: string;
    };

    try {
      const result = await auth.api.signUpEmail({
        body: { email, password, name },
        headers: request.headers as HeadersInit,
      });

      if (result.error) {
        return reply.status(400).send({ error: result.error.message });
      }

      return reply.send({ user: result.data?.user, session: result.data?.session });
    } catch (error) {
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  fastify.post('/signin', async (request, reply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    try {
      const result = await auth.api.signInEmail({
        body: { email, password },
        headers: request.headers as HeadersInit,
      });

      if (result.error) {
        return reply.status(400).send({ error: result.error.message });
      }

      return reply.send({ user: result.data?.user, session: result.data?.session });
    } catch (error) {
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  fastify.post('/signout', async (request, reply) => {
    try {
      const result = await auth.api.signOut({
        headers: request.headers as HeadersInit,
      });

      if (result.error) {
        return reply.status(400).send({ error: result.error.message });
      }

      return reply.send({ success: true });
    } catch (error) {
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  fastify.get('/session', async (request, reply) => {
    try {
      const result = await auth.api.getSession({
        headers: request.headers as HeadersInit,
      });

      if (result.error) {
        return reply.status(401).send({ error: result.error.message });
      }

      return reply.send({ user: result.data?.user, session: result.data?.session });
    } catch (error) {
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });
}