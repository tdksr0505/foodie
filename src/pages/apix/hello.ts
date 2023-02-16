// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import MongoDb from '../../lib/mongoDb';
type Data = {
  name: string;
};

let exportDb;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const database = await MongoDb.getDb();
  exportDb = database;
  const restaurants = database?.collection('restaurant');
  const restaurant = await restaurants?.find().toArray();
  res.status(200).json(restaurant);
}

export function exportDbFunc(): any {
  return exportDb;
}
