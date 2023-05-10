import MongoService from "../services/index.js";
const MessagesService = new MongoService("Messages");

const create = async (query) => {
  return await MessagesService.create(query);
};

const get = async (query) => {
  return await MessagesService.get(query);
};

const getAll = async (query) => {
  return await MessagesService.getAll(query);
};


export {
  create,
  get,
  getAll,
};