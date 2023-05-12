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
  credentialsRequired: false,//change to true in prod
  algorithms: ['HS256']
});

const schema = makeExecutableSchema(Schema);

const app = express();
app.use(auth);

const corsOptions = {
  origin: process.env.URL,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


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
app.use('/graphql', bodyParser.json(), expressMiddleware(server, {
    context: ({ req }) => {
    const { authorization } = req.headers || {};
    return { authorization };
  },
  }));

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`El servidor se está ejecutando en http://localhost:${PORT}/graphql`);
});
