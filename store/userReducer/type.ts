export interface UserItem {
    _id: string;
    name: string;
    phone: number;
    address: string;
}

export interface ProductItem {
    name: string;
    image: string;
    price: number;
}

export interface CartProduct {
    productId: string;
    count: number
}

export interface CartItem {
    userId: string;
    products: CartProduct[];
    totalAmount: number
}