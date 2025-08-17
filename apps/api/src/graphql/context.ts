import { FastifyRequest, FastifyReply } from 'fastify';

import { auth } from '../auth/config';
import { db } from '../db';

export interface Context {
  db: typeof db;
  user?: {
    id: string;
    email: string;
    name: string;
  };
  session?: {
    id: string;
    userId: string;
    expiresAt: Date;
  };
}

export async function createContext({
  request,
  reply,
}: {
  request: FastifyRequest;
  reply: FastifyReply;
}): Promise<Context> {
  const context: Context = { db };

  try {
    const result = await auth.api.getSession({
      headers: request.headers as HeadersInit,
    });

    if (result.data?.user && result.data?.session) {
      context.user = result.data.user;
      context.session = result.data.session;
    }
  } catch (error) {
    // Ignore auth errors in context creation
  }

  return context;
}