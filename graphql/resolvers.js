import { RedisPubSub } from 'graphql-redis-subscriptions';
import dotenv from 'dotenv';
import * as models from "../models/index.js";

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

const resolvers = {
  Query: {
    async getMessages(parent, args, { authorization }) {
      return await models.Messages.getAll()
    }
  },
  Mutation: {
    async sendMessage(parent, { content }, { authorization }) {
      const timestamp = new Date().toISOString
      const [res,error] = await models.Messages.create({content, timestamp});
      if(!error){
        pubsub.publish(channelName, { newMessage: {content, timestamp} }); 
        return true;
      }else{
        console.log("error: ", res)
        return false
      }
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
