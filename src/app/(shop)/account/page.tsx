import { Order, OrderStatus } from "@/app/types/order";
import OrderList from "@/components/OrderList";
import { Suspense } from "react";

export default function AccountPage() {
  const user = {
    name: 'Linh Pham',
    email: 'linh.pham@example.com',
  };

  // const orders = fetch('http://localhost:3002/get-orders', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })
  //   .then(res => res.json());
  
  const orders: Promise<Order[]> = new Promise((resolve) => {
    const data = [
      {
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
      },
      {
        id: 2,
        createdAt: new Date().toDateString(),
        totalAmount: 1300000.00,
        status: 'Paid' as OrderStatus,
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
      },
      {
        id: 3,
        createdAt: new Date().toDateString(),
        totalAmount: 1300000.00,
        status: 'Shipped' as OrderStatus,
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
      },
      {
        id: 4,
        createdAt: new Date().toDateString(),
        totalAmount: 1300000.00,
        status: 'Completed' as OrderStatus,
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
      }
    ]
    resolve(data)
  })

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>

      {/* User Info */}
      <div className="border rounded-md bg-white p-4 mb-8 shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Profile</h2>
        <p className="text-sm text-gray-700">👤 {user.name}</p>
        <p className="text-sm text-gray-700">📧 {user.email}</p>
      </div>

      {/* Orders */}
      <div>
        <h2 className="text-xl font-semibold mb-4">My Orders</h2>
        <Suspense fallback='Loading...'>
          <OrderList orders={orders} />
        </Suspense>
      </div>
    </div>
  )
}