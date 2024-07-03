import { userCartStateType } from "@/store/userReducer/userCartReducer";
import { userStateType } from "@/store/userReducer/userReducer";
import { Box, Button, Divider, Typography } from "@mui/material"
import { useSelector } from "react-redux"

const OrderSummaryComponent = () => {
    const userDetails = useSelector((state: { user: userStateType }) => state.user.user);
    const totalAmount = useSelector((state: { userCart: userCartStateType }) => state.userCart.cartList.totalAmount);

    return (
        <Box sx={{mt:1,
            display: 'flex', flexDirection: 'column',
            alignItems: 'flex-start', justifyContent: 'flex-start',
            width: '30rem', maxWidth: '100%', minHeight: '75vh',
            p: 2, boxShadow: '1px 4px 10px rgba(0, 0, 0, 0.1)'
        }}>
            <Box sx={{ alignSelf: 'flex-start', maxWidth: '100%' }}>
                <Typography sx={{
                    alignSelf: 'flex-start',
                    fontSize: '1.1rem', fontWeight: 600, color: '#3d3c3c'
                }}>
                    Order summary
                </Typography>
                <Divider sx={{ width: '100%' }} />

                <Typography sx={{
                    mt: 1, alignSelf: 'flex-start', ml: 1,
                    fontSize: '0.9rem', fontWeight: 600, color: '#3d3c3c'
                }}>
                    Billing Address
                </Typography>

                <Box sx={{
                    mt: 1, ml: 1,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    width: '30rem', maxWidth: '95%'
                }}>
                    <Typography sx={{
                        color: '#3d3c3c',
                        fontSize: '0.8rem',
                    }}>
                        Name
                    </Typography>
                    <Typography sx={{
                        color: '#3d3c3c', fontWeight: 600,
                        fontSize: '0.8rem',
                    }}>
                        {userDetails.name}
                    </Typography>

                </Box>
                <Box sx={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    width: '30rem', maxWidth: '95%', mt: 1, ml: 1,
                }}>
                    <Typography sx={{
                        color: '#3d3c3c',
                        fontSize: '0.8rem',
                    }}>
                        Phone
                    </Typography>
                    <Typography sx={{
                        color: '#3d3c3c', fontWeight: 600,
                        fontSize: '0.8rem',
                    }}>
                        {userDetails.phone}
                    </Typography>
                </Box>
                <Box sx={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    width: '30rem', maxWidth: '95%', mt: 1, mb: 1, ml: 1
                }}>
                    <Typography sx={{
                        color: '#3d3c3c',
                        fontSize: '0.8rem',
                    }}>
                        Delivery address
                    </Typography>
                    <Typography sx={{
                        color: '#3d3c3c', fontWeight: 600,
                        fontSize: '0.8rem',
                    }}>
                        {userDetails.address}
                    </Typography>
                </Box>
                <Divider sx={{ width: '100%' }} />

                <Typography sx={{
                    mt: 1, alignSelf: 'flex-start', ml: 1,
                    fontSize: '0.9rem', fontWeight: 600, color: '#3d3c3c'
                }}>
                    Order Details
                </Typography>
                <Box sx={{
                    mt: 1, ml: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    width: '30rem', maxWidth: '95%'
                }}>
                    <Typography sx={{
                        color: '#3d3c3c',
                        fontSize: '0.8rem',
                    }}>
                        Order Value
                    </Typography>
                    <Typography sx={{
                        color: '#3d3c3c', fontWeight: 600,
                        fontSize: '0.8rem',
                    }}>
                        ₹ {totalAmount}/-
                    </Typography>
                </Box>

                <Box sx={{
                    mt: 1, ml: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    width: '30rem', maxWidth: '95%'
                }}>
                    <Typography sx={{
                        color: '#3d3c3c',
                        fontSize: '0.8rem',
                    }}>
                        Delivery Charge
                    </Typography>
                    <Typography sx={{
                        color: '#3d3c3c', fontWeight: 600,
                        fontSize: '0.8rem',
                    }}>
                        ₹ 0/-
                    </Typography>
                </Box>

                <Box sx={{
                    mt: 1, ml: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    width: '30rem', maxWidth: '95%', mb: 1
                }}>
                    <Typography sx={{
                        color: '#3d3c3c',
                        fontSize: '0.8rem',
                    }}>
                        Discount
                    </Typography>
                    <Typography sx={{
                        color: '#3d3c3c', fontWeight: 600,
                        fontSize: '0.8rem',
                    }}>
                        ₹ 0/-
                    </Typography>
                </Box>
                <Divider sx={{ width: '100%' }} />
                <Box sx={{
                    mt: 1, ml: 1,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    width: '30rem', maxWidth: '95%'
                }}>
                    <Typography sx={{
                        fontSize: '1rem', fontWeight: 800, color: '#3d3c3c'
                    }}>
                        Grant Total
                    </Typography>
                    <Typography sx={{
                        mt: 1, color: '#3d3c3c', fontWeight: 800,
                        fontSize: '0.9rem',
                    }}>
                        ₹ {totalAmount}/-
                    </Typography>
                </Box>
                <Button variant="contained"
                    sx={{ width: '100%', mt: 3 }}
                >Buy Now</Button>

            </Box>
        </Box>
    )
}

export default OrderSummaryComponent