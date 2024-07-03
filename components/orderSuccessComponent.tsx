import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { useSelector } from 'react-redux';
import { userCartStateType } from '@/store/userReducer/userCartReducer';
import { useRouter } from "next/navigation";

const OrderSuccessComponent = () => {
    const router = useRouter()
    const orderDetails = useSelector((state: { userCart: userCartStateType }) => state.userCart.orderDetails);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '90vh' }}>
            <Box sx={{
                display: 'flex', flexDirection: 'column', width: '30rem', maxWidth: '90%', p: 4,
                alignItems: 'center', justifyContent: 'center', boxShadow: '1px 4px 10px rgba(0, 0, 0, 1.1)'
            }}>
                <CheckCircleOutlineRoundedIcon sx={{ color: 'green' }} />
                <Typography sx={{
                    color: '#3d3c3c',
                    fontSize: '1rem', fontWeight: 600
                }}>
                    Thankyou for ordering!
                </Typography>
                <Typography sx={{
                    color: '#3d3c3c',
                    fontSize: '0.8rem', fontWeight: 600
                }}>
                    Your order of amount: ₹ {orderDetails.totalAmount}/- has been placed successfully!
                </Typography>
                <Button variant="contained"
                    sx={{
                        width: '100%', mt: 3, backgroundColor: 'green',
                        '&:hover': {
                            backgroundColor: 'darkgreen',
                        },
                    }} onClick={() => { router.push('/') }}
                >Continue shoping</Button>
            </Box>
        </Box>
    )
}

export default OrderSuccessComponent