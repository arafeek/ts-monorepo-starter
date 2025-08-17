import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import fastifyApollo, { 
  fastifyApolloDrainPlugin,
} from '@as-integrations/fastify';

import { UserResolver } from './resolvers/UserResolver';
import { AuthResolver } from './resolvers/AuthResolver';
import { createContext } from './context';

export async function createApolloServer() {
  const schema = await buildSchema({
    resolvers: [UserResolver, AuthResolver],
    validate: false,
  });

  const server = new ApolloServer({
    schema,
    plugins: [fastifyApolloDrainPlugin()],
    introspection: process.env.NODE_ENV !== 'production',
  });

  await server.start();

  return {
    createHandler: (options: { cors: boolean; path: string }) =>
      fastifyApollo(server, {
        context: createContext,
        ...options,
      }),
  };
}