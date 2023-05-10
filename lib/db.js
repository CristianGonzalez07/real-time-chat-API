import dotenv from 'dotenv';
import { MongoClient } from "mongodb";

dotenv.config();

const USER = encodeURIComponent(process.env.DB_USER);
const PASSWORD = encodeURIComponent(process.env.DB_PASS);
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const mongoURL = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(mongoURL, { useUnifiedTopology: true });
    this.dbName = DB_NAME;
  }

  async connect() {
    return await this.client.connect()
    .then(() => this.client.db(this.dbName))
    .catch(err => console.log({err}))
  }

  get(collection, query) {
    return this.connect().then((db) => {
      return db.collection(collection).findOne(query);
    });
  }

  getAll(collection, query) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).aggregate(query)
      })
      .then((result) => {
        return result.toArray();
      })
      .catch(error => console.log(error))
  }

  async create(collection, data) {
    try {
      const db = await this.connect();
      const result = await db.collection(collection).insertOne(data)
      .then(res => [res,false])
      .catch(err => [err,true]);
      await this.client.close();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default MongoLib;