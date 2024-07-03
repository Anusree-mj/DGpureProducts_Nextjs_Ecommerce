export interface UserItem {
    _id: string;
    name: string;
    phone: number;
    address: string;
}

export interface ProductItem {
    _id: string;
    name: string;
    image: string;
    price: number;
}

export interface CartProduct {
    productId: {
        _id: string;
        name: string;
        image: string;
        price: number;
    };
    count: number;
    amount: number;
}

export interface CartItem {
    _id: string;
    userId: string;
    products: CartProduct[];
    totalAmount: number
}

export interface OrderItem {
    _id: string;
    userId: string;
    products: CartProduct[];
    totalAmount: number,
    orderStatus: string
}