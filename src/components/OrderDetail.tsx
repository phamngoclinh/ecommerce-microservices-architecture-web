'use client';

import { Order } from "@/app/types/order";
import { use } from "react";
import OrderStatusBadge from "./OrderStatusBadge";
import { formatCurrency } from "@/utils/formatter";

export default function OrderDetail({ order }: { order: Promise<Order> }) {
  const orderData = use(order);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">
        Order #{orderData.id} <OrderStatusBadge status={orderData.status} />
      </h1>
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