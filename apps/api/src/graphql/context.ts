import { fromNodeHeaders } from 'better-auth/node';
import { FastifyReply, FastifyRequest } from 'fastify';

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
      headers: fromNodeHeaders(request.headers),
    });

    if (result?.user && result.session) {
      context.user = result.user;
      context.session = result.session;
    }
  } catch (error) {
    // Ignore auth errors in context creation
  }

  return context;
}
