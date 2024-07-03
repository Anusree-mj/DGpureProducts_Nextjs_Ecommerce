import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { apiCall } from "@/services/api";
import { getCartListAction, userCartStateType } from "@/store/userReducer/userCartReducer";
import { userStateType } from "@/store/userReducer/userReducer";
import { UserItem } from "@/store/userReducer/type";
import { Box, Button, Divider, Typography } from "@mui/material";
import { saveOrderDetails } from '@/store/userReducer/userCartReducer';
import { useRouter } from "next/navigation";

interface RazorpayPaymentResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

const OrderSummaryComponent = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const userDetails = useSelector((state: { user: userStateType }) => state.user.user);
    const totalAmount = useSelector((state: { userCart: userCartStateType }) => state.userCart.cartList.totalAmount);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePurchase = async () => {
        try {
            const response = await apiCall({
                method: 'POST',
                endpoint: `checkout`,
                body: { userId: userDetails._id, totalAmount }
            });

            if (response.status === 'ok' && response.order) {
                razorpayPayment(response.order, userDetails);
            } else {
                toast.error(`Failed to make purchase. Please try again!`);
            }
        } catch (err) {
            console.log('Err found', err);
        }
    };

    const razorpayPayment = (order: { id: string; amount: number }, user: UserItem) => {
        const options: any = {
            key_id: 'rzp_test_mj8FaMjD2VYPW4',
            amount: order.amount,
            currency: "INR",
            name: "DGPure",
            description: "Test Transaction",
            image: "#",
            order_id: order.id,
            handler: function (response: RazorpayPaymentResponse) {
                verifyPayment(response, order);
            },
            prefill: {
                name: user.name,
                contact: user.phone,
            },
            notes: {
                address: user.address,
            },
            theme: {
                color: "#3399cc",
            },
        };

        const Razorpay = (window as any).Razorpay;
        const rzp1 = new Razorpay(options);
        rzp1.open();
    };

    const verifyPayment = async (payment: RazorpayPaymentResponse, order: { id: string; amount: number }) => {
        try {
            const response = await apiCall({
                method: 'PUT',
                endpoint: `checkout`,
                body: { payment, order, userId: userDetails._id }
            });

            if (response.status === 'ok' && response.order) {
                console.log('order details', response.order)
                dispatch(saveOrderDetails(response.order))
                dispatch(getCartListAction());
                router.push('/orderSuccess')
            } else {
                toast.error(`Failed to make purchase. Please try again!`);
            }
        } catch (err) {
            console.log('Err found', err)
        }
    };

    return (
        <Box sx={{
            mt: { md: 1, xs: 4 },
            display: 'flex', flexDirection: 'column',
            alignItems: 'flex-start', justifyContent: 'flex-start',
            width: '30rem', maxWidth: '100%', minHeight: '75vh',backgroundColor:'#f0f0f0',
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
                    sx={{ width: '100%', mt: 3 }} onClick={handlePurchase}
                >Buy Now</Button>

            </Box>
        </Box>
    )
}

export default OrderSummaryComponent