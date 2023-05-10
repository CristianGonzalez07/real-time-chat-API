import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServer } from '@apollo/server';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import cors from 'cors';
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import { expressjwt } from 'express-jwt';
import { makeExecutableSchema } from '@graphql-tools/schema';
import Schema from './graphql/Schema.js';
import { useServer } from 'graphql-ws/lib/use/ws';
import { WebSocketServer } from 'ws';

const auth = expressjwt({
  secret: process.env.SECRET || "jwt_secret",
  credentialsRequired: false,
  algorithms: ['HS256']
});

// Crear el esquema, que será utilizado por separado por ApolloServer y
// el servidor WebSocket.
const schema = makeExecutableSchema(Schema);

// Crear una aplicación Express y un servidor HTTP; adjuntaremos tanto el servidor WebSocket
// como ApolloServer a este servidor HTTP.
const app = express();
app.use(auth);
const httpServer = createServer(app);

// Crear nuestro servidor WebSocket utilizando el servidor HTTP que acabamos de configurar.
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

// Guardar la información devuelta por el servidor para poder apagarlo más tarde.
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  plugins: [
    // Apagado adecuado para el servidor HTTP.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Apagado adecuado para el servidor WebSocket.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await server.start();
app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server, {
    context: ({ req }) => {
    const { authorization } = req.headers || {};
    return { authorization: authorization.replace("Bearer ","") };
  },
  }));

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`El servidor se está ejecutando en http://localhost:${PORT}/graphql`);
});
