// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import MongoDb from '../../lib/mongoDb';
import { exportDbFunc } from './hello';
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(exportDbFunc);

  const database = await MongoDb.getDb();
  const restaurants = database?.collection('restaurant');
  const restaurant = await restaurants?.find().toArray();
  res.status(200).json(restaurant);
}
