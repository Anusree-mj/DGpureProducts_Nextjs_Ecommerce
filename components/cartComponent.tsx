import { useEffect } from 'react';
import { UseDispatch, useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function ProductsComponent() {
    
    const dispatch = useDispatch();
    useEffect(() => {

    }, [])
    return (
        <Box sx={{
            minHeight: '100vh', backgroundColor: 'white',
            display: 'flex', flexWrap: 'wrap', gap: 5,
            justifyContent: 'center', alignItems: 'center', mt: 2,
            '@media (max-width: 600px)': {
                gap: 2,
            }
        }}>
            <Card
                // key={index}
                sx={{
                    p: 0,
                    mt: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center',
                    justifyContent: 'center', borderRadius: '1rem',
                    width: '15rem', maxWidth: '80%',
                    '@media (max-width: 600px)': {
                        width: '45%', // Ensure two cards in a row for small screens
                    },
                }}
            >
                <CardActionArea>
                    <CardContent
                        sx={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="50"
                            // image={item.image}
                            alt="Therapist"
                        />
                        <Typography
                            sx={{
                                color: '#325343', fontSize: '1rem', fontWeight: 600, mt: 1,
                                alignSelf: 'flex-start',
                            }}
                        >
                            {/* {item.name} */}name
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions sx={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', width: '100%'
                }}>
                    <Typography
                        sx={{
                            color: '#325343', fontSize: '1rem', fontWeight: 600,
                            alignSelf: 'flex-start',
                        }}
                    >
                        {/* {item.name} */}price
                    </Typography>
                    <AddShoppingCartIcon />
                </CardActions>
            </Card>
        </Box>
    );
}
