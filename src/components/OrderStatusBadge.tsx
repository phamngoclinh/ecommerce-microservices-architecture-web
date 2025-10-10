import { OrderStatus } from "@/app/types/order";

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const statusColor = {
    Pending: 'text-yellow-600 bg-yellow-100',
    Paid: 'text-blue-600 bg-blue-100',
    Shipped: 'text-purple-600 bg-purple-100',
    Completed: 'text-green-600 bg-green-100',
  }[status];

  return <span className={`text-xs font-semibold px-2 py-1 rounded ${statusColor}`}>
    {status}
  </span>
}