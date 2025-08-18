import { ApolloServer } from '@apollo/server';
import fastifyApollo, {
  fastifyApolloDrainPlugin,
} from '@as-integrations/fastify';
import type { FastifyInstance } from 'fastify';
import { buildSchema } from 'type-graphql';

import { ValueOrArray } from 'drizzle-orm';
import { createContext } from './context';
import { AuthResolver } from './resolvers/AuthResolver';
import { UserResolver } from './resolvers/UserResolver';

export async function createApolloServer(fastify: FastifyInstance) {
  const schema = await buildSchema({
    resolvers: [UserResolver, AuthResolver],
    validate: false,
  });

  const server = new ApolloServer({
    schema,
    plugins: [fastifyApolloDrainPlugin(fastify)],
    introspection: process.env.NODE_ENV !== 'production',
  });

  await server.start();

  return {
    server,
    plugin: fastifyApollo(server),
    pluginOptions: {
      context: createContext,
      path: '/graphql',
      method: ['GET', 'POST', 'OPTIONS'] as ValueOrArray<
        'GET' | 'POST' | 'OPTIONS'
      >,
    },
  };
}
