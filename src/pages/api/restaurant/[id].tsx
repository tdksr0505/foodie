// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import MongoDb from '@/lib/mongoDb';
import { ObjectId } from 'mongodb';
import { TApiRes } from '../type';

export default async function handler(req: NextApiRequest, res: NextApiResponse<TApiRes>) {
  const { id } = req.query;
  const database = await MongoDb.getDb();
  const restaurants = database?.collection('restaurant');
  const o_id = new ObjectId(id as any);
  const query = { _id: o_id };

  if (req.method === 'POST') {
    // UPDATE 更新資料
    const result = await restaurants?.updateOne(query, {
      $set: req.body,
    });
    res.status(200).json({ code: 0, data: { msg: '已成功更新 ' } });
  }
  if (req.method === 'GET') {
    // GET 拿資料
    const result = await restaurants?.findOne(query);
    res.status(200).json({ code: 0, data: result });
  }
  if (req.method === 'DELETE') {
    // DELETE 刪除資料
    const result = await restaurants?.deleteOne(query);
    console.log(result);
    if (result.acknowledged) {
      res.status(200).json({
        code: 0,
        data: { msg: '刪除成功' },
      });
    }
  }
}
