import { RedisPubSub } from 'graphql-redis-subscriptions';
import dotenv from 'dotenv';

dotenv.config();

// Configuración de conexión a Redis
const options = {
  host: process.env.REDIS_LABS_HOST,
  port: process.env.REDIS_LABS_PORT,
  password: process.env.REDIS_LABS_PASSWORD,
};

// Crear una instancia de RedisPubSub utilizando la configuración de conexión
const pubsub = new RedisPubSub({
  connection: options,
});

// Nombre del canal de suscripción
const channelName = 'POST_CREATED';

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    createPost(parent, args, { authorization }) {
      console.log("CREATE_POST")
      // Publicar un evento en el canal de suscripción
      pubsub.publish(channelName, { postCreated: args }); 
      return { ...args };
    },
  },
  Subscription: {
    postCreated: {
      // Suscribirse al canal de suscripción para recibir eventos
      subscribe: () => pubsub.asyncIterator([channelName]),
    },
  },  
};

export { resolvers };
