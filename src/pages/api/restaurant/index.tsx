// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import MongoDb from '../../../lib/mongoDb';
import { TApiRes } from '../type';

export default async function handler(req: NextApiRequest, res: NextApiResponse<TApiRes>) {
  const database = await MongoDb.getDb();
  const restaurants = database?.collection('restaurant');
  if (req.method === 'POST') {
    //insert
    const date = new Date();
    const createDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
      .getDate()
      .toString()
      .padStart(2, '0')} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const result = await restaurants.insertOne({ ...req.body, createDate: createDate });
    if (result.acknowledged) {
      res.status(200).json({
        code: 0,
        data: { msg: '已成功新增' },
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
      code: 0,
      data: { restaurant },
    });
  }
}
