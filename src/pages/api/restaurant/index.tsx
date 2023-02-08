// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import MongoDb from '../../../lib/mongoDb';
import { TApiRes } from '../type';

export default async function handler(req: NextApiRequest, res: NextApiResponse<TApiRes>) {
  const database = await MongoDb.getDb();
  const restaurants = database?.collection('restaurant');
  if (req.method === 'POST') {
    //insert
    console.log(req);
    const result = await restaurants.insertOne(req.body);
    if (result.acknowledged) {
      res.status(200).json({
        code: 0,
        data: { msg: '新增成功' },
      });
    } else {
      res.status(200).json({
        code: 1,
        data: { msg: '新增失敗' },
      });
    }
  }
  if (req.method === 'GET') {
    //query
    const restaurant = await restaurants?.find().toArray();
    res.status(200).json({
      code: 1,
      data: { restaurant },
    });
  }
}
