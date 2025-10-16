'use client';

import { Order } from "@/app/types/order";
import { use } from "react";
import OrderStatusBadge from "./OrderStatusBadge";
import { formatCurrency } from "@/utils/formatter";
import { useOrderStore } from "@/store/orderStore";

export default function OrderDetail({ order }: { order: Promise<Order> }) {
  const orderData = use(order);
  const { confirm, ship, complete } = useOrderStore((s) => s);
  console.log('orderData', orderData)

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">
        Order #{orderData.id} <OrderStatusBadge status={orderData.status} />
      </h1>
      {(orderData.status === 'PAID' || orderData.status === 'PENDING') && <button onClick={() => confirm(orderData.id, () => { orderData.status = 'CONFIRMED' }, () => {})} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Confirm</button>}
      {orderData.status === 'CONFIRMED' && <button onClick={() => ship(orderData.id, () => {orderData.status = 'SHIPPED' }, () => {})} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Shipped</button>}
      {orderData.status === 'SHIPPED' && <button onClick={() => complete(orderData.id, () => {orderData.status = 'COMPLETED' }, () => {})} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Complete</button>}
      <div className="bg-white border rounded-lg p-4 shadow-sm">
        <ul className="divide-y divide-gray-200">
          {orderData.orderItems.map((item, i) => (
            <li key={i} className="py-2 flex justify-between text-sm">
              <span>
                {item.productName} × {item.quantity}
              </span>
              <span>{formatCurrency(item.lineAmount)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatCurrency(orderData.totalAmount)}</span>
        </div>
      </div>
    </div>
  );
}