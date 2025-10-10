import { Order, OrderStatus } from '@/app/types/order';
import OrderStatusBadge from '@/components/OrderStatusBadge';
import { formatCurrency } from '@/utils/formatter';
import { notFound } from 'next/navigation';

export default async function OrderDetailPage({ params }: { params: Promise<{ id: number }> }) {
  // const { id } = await params
  // const orderResponse = await fetch('http://localhost:3001/get-order', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ id })
  // })
  // const order: Order = await orderResponse.json();

  const order: Order = {
    id: 1,
    createdAt: new Date().toDateString(),
    totalAmount: 1000000.00,
    status: 'Pending' as OrderStatus,
    orderItems: [
      {
        id: 1,
        order: { id: 1 },
        product: {
          id: 1,
          sellingPrice: 10000,
          name: 'aa aa'
        },
        unitPrice: 1000000,
        quantity: 1,
        lineAmount: 1000000
      }
    ]
  };

  if (!order) return notFound();

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">
        Order #{order.id} <OrderStatusBadge status={order.status} />
      </h1>
      <div className="bg-white border rounded-lg p-4 shadow-sm">
        <ul className="divide-y divide-gray-200">
          {order.orderItems.map((item, i) => (
            <li key={i} className="py-2 flex justify-between text-sm">
              <span>
                {item.product.name} × {item.quantity}
              </span>
              <span>{formatCurrency(item.lineAmount)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatCurrency(order.totalAmount)}</span>
        </div>
      </div>
    </div>
  );
}
