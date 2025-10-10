'use client';
import { formatCurrency } from '@/utils/formatter';
import Link from 'next/link';
import OrderStatusBadge from './OrderStatusBadge';
import { OrderStatus } from '@/app/types/order';

interface OrderCardProps  {
  id: number;
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;
}

export default function OrderCard({ id, createdAt, totalAmount, status }: OrderCardProps) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg">Order #{id}</h3>
        <OrderStatusBadge status={status} />
      </div>
      <p className="text-sm text-gray-600 mb-1">Date: {createdAt}</p>
      <p className="text-sm text-gray-600 mb-3">Total: {formatCurrency(totalAmount)}</p>
      <Link
        href={`/account/${id}`}
        className="text-blue-600 hover:underline text-sm font-medium"
      >
        View Details →
      </Link>
    </div>
  );
}
