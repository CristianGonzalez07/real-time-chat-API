import { RedisPubSub } from 'graphql-redis-subscriptions';
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import jsonwebtoken from "jsonwebtoken";
import MongoService from "../services/index.js";

const MessagesService = new MongoService("Messages");
const UsersService = new MongoService("Users");

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
const channelName = 'Messages';

const resolvers = {
  Query: {
    async getMessages(parent, args, { authorization }) {
      return await MessagesService.getAll()
    },
    async login(parent, { user }, { authorization }) {
      const storedUser = await UsersService.get({email:user.email});
      if(storedUser){
        let auth = null;
        await bcrypt.compare(user.password, storedUser.password) 
        .then(function(result) {
          if(result){
            var token = jsonwebtoken.sign({ name:user.name }, process.env.SECRET, { expiresIn: '1h' }, { algorithm: 'HS256',noTimestamp: true});
            auth = {
              name:storedUser.name,
              token
            }
          }
        });
        return auth ? JSON.stringify(auth) : "Error"
      }else{
        console.log(error)
        return "Error"
      }
    },
  },
  Mutation: {
    async sendMessage(parent, { user }, { authorization }) {
      const timestamp = new Date().toISOString()
      const [res,error] = await MessagesService.create({content, timestamp});
      if(!error){
        pubsub.publish(channelName, {messageSent:{content, timestamp}}); 
        return true;
      }else{
        console.log("error: ", res)
        return false
      }
    },
    async signUp(parent, { user }, { authorization }) {
      const created_at = new Date().toISOString();
      user.created_at = created_at;
      bcrypt.hash(user.password, 10).then(function(hash) {
        user.password = hash
    });
      const [res,error] = await UsersService.create(user);
      if(!error){
        return "Success"
      }else{
        console.log("error: ", res)
        return "Error"
      }
    },
  },
  Subscription: {
    messageSent: {
      // Suscribirse al canal de suscripción para recibir eventos
      subscribe: () => pubsub.asyncIterator([channelName]),
    },
  },  
};

export { resolvers };
