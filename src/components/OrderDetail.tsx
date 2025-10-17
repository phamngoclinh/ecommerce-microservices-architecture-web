'use client';

import { Order } from "@/app/types/order";
import { useOrderStore } from "@/store/orderStore";
import { formatCurrency } from "@/utils/formatter";
import { use, useState } from "react";
import OrderStatusBadge from "./OrderStatusBadge";
import { PaymentProcess } from "./PaymentProcess";

export default function OrderDetail({ order }: { order: Promise<Order> }) {
  const [isPay, setIsPay] = useState(false);
  const orderData = use(order);
  const { confirm, ship, complete } = useOrderStore((s) => s);

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

      <br />
      {(orderData.status === 'PAID' || orderData.status === 'PENDING') && <span onClick={() => confirm(orderData.id, () => { orderData.status = 'CONFIRMED' }, () => {})} className="mr-5 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Confirm</span>}
      {orderData.status === 'CONFIRMED' && <span onClick={() => ship(orderData.id, () => {orderData.status = 'SHIPPED' }, () => {})} className="mr-5 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Shipped</span>}
      {orderData.status === 'SHIPPED' && <span onClick={() => complete(orderData.id, () => { orderData.status = 'COMPLETED' }, () => { })} className="mr-5 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Complete</span>}
      {orderData.status === 'PENDING' && <span onClick={() => setIsPay(true)} className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600">Try to pay</span>}
      <br />
      <br />
      <br />
      {orderData.status === 'PENDING' && isPay && <PaymentProcess orderId={orderData.id} totalAmount={orderData.totalAmount} paymentMethod={'VNPAY'} />}
    </div>
  );
}