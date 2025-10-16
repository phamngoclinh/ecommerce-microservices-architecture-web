import { Product } from "./product";

export type Order = {
    id: number;
    status: OrderStatus
    orderItems: OrderItem[]
    subAmount?: number;
    discount?: number;
    vat?: number;
    amount?: number;
    totalAmount: number;
    createdDate: string
}

export type OrderStatus = 'PENDING' | 'PAID' | 'CONFIRMED' | 'SHIPPED' | 'COMPLETED';

export type OrderItem = {
    id: number;
    orderId: number;
    productId: number;
    productName: string;
    unitPrice: number;
    quantity: number;
    lineAmount: number;
}