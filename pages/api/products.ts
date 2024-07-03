import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDB } from '@/libs/connectDB';
import Product from '@/models/productsModels';

const getProducts = async (req: NextApiRequest, res: NextApiResponse) =>{
    await connectToMongoDB();

    try {
        console.log('entered in api')
        const products = await Product.find();
        if (products.length > 0) {
            res.status(200).json({ status: 'ok', products });
        } else {
            res.status(404).json({ status: 'nok', message: 'Products not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'nok', message: error });
    }
}

export default getProducts;