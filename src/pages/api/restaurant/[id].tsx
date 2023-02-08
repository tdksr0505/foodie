// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import MongoDb from '@/lib/mongoDb';
import { ObjectId } from 'mongodb';

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query;
  console.log('xx');
  console.log(id);
  const database = await MongoDb.getDb();
  const restaurants = database?.collection('restaurant');
  const o_id = new ObjectId(id);
  const query = { _id: o_id };
  const data = await restaurants?.findOne(query);
  res.status(200).json(data);
}
