import OrderDetail from '@/components/OrderDetail';
import { Suspense } from 'react';

export default async function OrderDetailPage({ params }: { params: Promise<{ orderId: number }> }) {
  const { orderId } = await params
  const order = fetch('http://localhost:3002/order/get-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: orderId })
  })
    .then(res => res.json())

  return (
    <Suspense fallback='Loading...'>
      <OrderDetail order={order} />
    </Suspense>
  )
}
