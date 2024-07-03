import { useEffect } from 'react';
import { UseDispatch, useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {
    getUserDetailsAction, getProductDetailsAction, userStateType
} from '@/store/userReducer/userReducer';
import { addProductToCartAction } from '@/store/userReducer/userCartReducer';
import { toast } from 'react-toastify';

export default function ProductsComponent() {
    const dispatch = useDispatch();
    const productDetails = useSelector((state: { user: userStateType }) => state.user.products);
    const userId = useSelector((state: { user: userStateType }) => state.user.user._id);
    useEffect(() => {
        dispatch(getProductDetailsAction())
    }, [])

    const handleAddToCart = (productId: string) => {
        dispatch(addProductToCartAction({ userId, productId, handleAddToCartSuccess }))
    }

    const handleAddToCartSuccess = () => {
        toast.success('Product added to cart!');
        dispatch(getUserDetailsAction())
    }
    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center',
        }}>
            <Box sx={{
                display: 'flex', flexWrap: 'wrap', gap: { md: 5, xs: 2 }, pt: 2,
                justifyContent: 'center', alignItems: 'center', width: '80rem', maxWidth: '90%', pb: 3
            }}>
                {productDetails && productDetails.map((item, index) => (
                    <Card
                        key={index}
                        sx={{
                            p: 0, boxShadow: '1px 4px 10px rgba(0, 0, 0, 1.1)',
                            mt: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center',
                            justifyContent: 'center', borderRadius: '1rem',
                            width: { xs: '8rem', sm: '12rem' }, maxWidth: '100%',
                        }}
                    >
                        <CardActionArea>
                            <CardContent
                                sx={{
                                    pb: 1,
                                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    width="100%"
                                    image={item.image}
                                    alt="Therapist"
                                />
                                <Typography
                                    sx={{
                                        color: '#325343', fontSize: '1rem', fontWeight: 600, mt: 1,
                                        alignSelf: 'flex-start',
                                    }}
                                >
                                    {item.name}name
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions sx={{
                            p: '0 1.5rem 1rem 1.5rem',
                            display: 'flex', justifyContent: 'space-between',
                            alignItems: 'center', width: '100%',
                        }}>
                            <Typography
                                sx={{
                                    color: '#325343', fontSize: '1rem', fontWeight: 800,
                                    alignSelf: 'flex-start',
                                }}
                            >
                                ₹ {item.price} /-
                            </Typography>
                            <AddShoppingCartIcon sx={{ color: '#325343', fontSize: '1.5rem', cursor: 'pointer' }}
                                onClick={() => { handleAddToCart(item._id) }} />
                        </CardActions>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}
