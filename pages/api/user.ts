import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDB } from '@/libs/connectDB';
import User from '@/models/usersModels';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToMongoDB();

  try {
    console.log('entered in api')
    const user = await User.findOne().exec();
    if (user) {
      res.status(200).json({ status: 'ok', user });
    } else {
      res.status(404).json({  status: 'nok',message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'nok', message: error });
  }
}
