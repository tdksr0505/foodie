// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import database from '../../lib/mongoDb';
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const restaurants = database.collection('restaurant');
  const restaurant = await restaurants.find().toArray();
  res.status(200).json(restaurant);
}
