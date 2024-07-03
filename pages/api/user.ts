import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDB } from '@/libs/connectDB';
import User from '@/models/usersModels';
import Cart from '@/models/cartModels';

const getUserDetails = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToMongoDB();

  try {
    console.log('entered in api')
    const user = await User.findOne().exec();
    if (user) {
      const cartItems = await Cart.findOne({ userId: user._id })
      const totalCartItem = cartItems?.products.length || 0

      res.status(200).json({ status: 'ok', user, totalCartItem });
    } else {
      res.status(404).json({ status: 'nok', message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'nok', message: error });
  }
}

export default getUserDetails;