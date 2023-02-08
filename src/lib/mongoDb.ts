import { MongoClient } from 'mongodb';
import type { Db } from 'mongodb';

// let db: Db | null = null;
// export const connnectDB = async () => {
//   if (db) {
//     return db;
//   }
//   try {
//     console.log(`new db`);

//     const client = await MongoClient.connect(process.env.DB_URL!);
//     db = client.db(process.env.DB_NAME);
//   } catch (err) {
//     console.error(err);
//   }
//   return db;
// };

export default class MongoDb {
  private static _db: Db | null = null;
  private static async connect() {
    console.log(`connect`);

    const client = await MongoClient.connect(process.env.DB_URL!);
    MongoDb._db = client.db(process.env.DB_NAME);
    // console.log(MongoDb._db);

    return MongoDb._db;
  }
  static getDb() {
    if (MongoDb._db) return MongoDb._db;
    return MongoDb.connect();
  }
}
