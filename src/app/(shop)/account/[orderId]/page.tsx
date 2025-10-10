import OrderDetail from '@/components/OrderDetail';
import { Suspense } from 'react';

export default async function OrderDetailPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params
  const order = fetch('http://localhost:3001/get-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id })
  })
    .then(res => res.json())

  return (
    <Suspense fallback='Loading...'>
      <OrderDetail order={order} />
    </Suspense>
  )
}
