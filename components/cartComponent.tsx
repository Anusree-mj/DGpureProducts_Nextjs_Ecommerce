import { useEffect } from "react";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { getCartListAction, userCartStateType } from "@/store/userReducer/userCartReducer";
import { Box, Button, Typography } from "@mui/material"
import Image from 'next/image';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MinimizeOutlinedIcon from '@mui/icons-material/MinimizeOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { apiCall } from '@/services/api';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import OrderSummaryComponent from "./orderSummaryComponent";
import ProductsComponent from "./productsComponent";

const CartComponent = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const cartListDetails = useSelector((state: { userCart: userCartStateType }) => state.userCart.cartList);

    useEffect(() => {
        dispatch(getCartListAction())
    }, [dispatch])

    useEffect(() => {
        if (cartListDetails.products.length === 0) {
            router.push('/')
        }
    }, [cartListDetails])

    const editCount = async (count: number, productId: string, cartId: string) => {
        try {
            const response = await apiCall({
                method: 'PUT',
                endpoint: `cart`,
                body: { productId, cartId, count }
            });
            if (response.status === 'ok') {
                dispatch(getCartListAction())
            } else {
                toast.error(`Can't update count. Try again!`)
            }
        }
        catch (err) {
            console.log('Err found', err)
        }
    }
    const removeProduct = async (productId: string, cartId: string) => {
        try {
            const response = await apiCall({
                method: 'DELETE',
                endpoint: `cart`,
                body: { productId, cartId }
            });
            if (response.status === 'ok') {
                dispatch(getCartListAction())
            } else {
                toast.error(`Can't remove product. Try again!`)
            }
        }
        catch (err) {
            console.log('Err found', err)
        }
    }
    return (
        <Box sx={{
            display: 'flex', alignItems: 'center',
            flexDirection: 'column', justifyContent: 'center'
        }}>
            <Typography sx={{
                mt: 3, width: '80rem', maxWidth: '90%',
                fontSize: '1.2rem', fontWeight: 800, color: '#3d3c3c'
            }}>
                My Cart
            </Typography>
            <Box sx={{
                mt: 1,
                display: 'flex', flexWrap: 'wrap',
                alignItems: 'center', justifyContent: 'space-between',
                width: '80rem', maxWidth: '90%'
            }}>
                {/* cart items */}
                <Box sx={{
                    mt: 1,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'flex-start', justifyContent: 'flex-start',
                    width: '30rem', maxWidth: '100%', minHeight: '75vh',
                }}>
                    {cartListDetails.products.map((product, index) => (
                        <Box sx={{
                            p: 3, mt: index === 0 ? 0 : 3,
                            width: '30rem', maxWidth: '90%', boxShadow: '1px 4px 10px rgba(0, 0, 0, 0.1)'
                        }}>
                            <Box key={index} sx={{
                                display: 'flex', justifyContent: 'space-around',
                                alignItems: 'center',
                            }}>
                                <Image
                                    src={product.productId.image}
                                    alt="logo"
                                    width={120}
                                    height={120}
                                    style={{ marginRight: '8px' }}
                                />
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column', alignSelf: 'center',
                                }}>
                                    <Typography sx={{
                                        fontSize: '0.9rem', fontWeight: 600, color: '#3d3c3c'
                                    }}>
                                        {product.productId.name}
                                    </Typography>
                                    <Typography sx={{
                                        color: '#3d3c3c',
                                        fontSize: '0.9rem', fontWeight: 600,
                                    }}>
                                        ₹ {product.productId.price}/-
                                    </Typography>

                                    <Typography sx={{
                                        mt: 1, color: '#3d3c3c',
                                        fontSize: '0.8rem',
                                    }}>
                                        Qty: {product.count}
                                    </Typography>
                                    <Typography sx={{
                                        color: '#3d3c3c',
                                        fontSize: '0.8rem', fontWeight: 600
                                    }}>
                                        Total: ₹ {product.amount}/-
                                    </Typography>
                                    <Box sx={{
                                        mt: 2, p: 0, height: '1.5rem',
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        border:'0.5px solid #918080'
                                    }}>
                                        <MinimizeOutlinedIcon sx={{
                                            color: product.count === 1 ? '#ccc' : '#3d3c3c',
                                            mb: 2,
                                            alignSelf: 'center',
                                            cursor: product.count === 1 ? 'not-allowed' : 'pointer',  // Change cursor style when disabled

                                        }}
                                            onClick={() => {
                                                if (product.count > 1) {
                                                    editCount(product.count - 1, product.productId._id, cartListDetails._id);
                                                }
                                            }}
                                        />
                                        <Typography
                                            sx={{
                                                color: '#3d3c3c',
                                                textAlign: 'center'
                                            }}
                                        >
                                            {product.count}
                                        </Typography>
                                        <AddOutlinedIcon sx={{ alignSelf: 'center', color: '#3d3c3c', }}
                                            onClick={() => editCount(product.count + 1,
                                                product.productId._id, cartListDetails._id
                                            )}
                                        />
                                    </Box>
                                </Box>
                                < ClearOutlinedIcon sx={{
                                    alignSelf: 'flex-start',
                                    color: '#3d3c3c',
                                }}
                                    onClick={() => {
                                        removeProduct(product.productId._id, cartListDetails._id);
                                    }} />
                            </Box>
                        </Box>
                    ))}
                </Box>
                <OrderSummaryComponent />
            </Box>
        </Box >
    )
}

export default CartComponent