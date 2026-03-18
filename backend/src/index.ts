import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { createContext } from './context';
import dotenv from 'dotenv';
import { createComplexityLimitRule } from 'graphql-validation-complexity';

dotenv.config();

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  // Complexity rule to prevent DOS attacks via deeply nested queries
  const complexityRule = createComplexityLimitRule(1000, {
    onCost: (cost: number) => {
      console.log('Query cost:', cost);
    },
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    validationRules: [complexityRule],
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => createContext({ req }),
    }),
  );

  const PORT = process.env.PORT || 4000;
  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
}

startApolloServer().catch((err) => {
  console.error(err);
});
