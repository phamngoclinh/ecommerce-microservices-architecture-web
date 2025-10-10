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
    createdAt: string
}

export type OrderStatus = 'Pending' | 'Paid' | 'Shipped' | 'Completed';

export type OrderItem = {
    id: number;
    order: { id: number; };
    product: Product;
    unitPrice: number;
    quantity: number;
    lineAmount: number;
}