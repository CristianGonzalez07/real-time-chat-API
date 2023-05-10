import MongoLib from "../lib/db.js";

class MongoService {
  constructor(collection) {
    this.collection = collection;
    this.mongoDB = new MongoLib();
  }

  async get(query) {
    const result = await this.mongoDB.get(this.collection, query);
    return result;
  }

  async getAll(query) {
    const result = await this.mongoDB.getAll(this.collection, query);
    return result;
  }

  async create(query) {
    return this.mongoDB.create(this.collection, query);
  }
}

export default MongoService;