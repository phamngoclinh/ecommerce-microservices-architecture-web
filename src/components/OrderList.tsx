'use client';
import { use } from 'react';
import OrderCard from './OrderCard';
import { Order } from '@/app/types/order';

export default function OrderList({ orders }: { orders: Promise<Order[]> }) {
  const allOrders = use(orders)

  return (
    <div className="grid gap-4">
      {allOrders.map((order) => (
        <OrderCard key={order.id} {...order} />
      ))}
    </div>
  );
}
