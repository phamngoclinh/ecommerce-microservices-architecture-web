'use client';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/utils/formatter';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, clearCart, changeQuantity } = useCartStore();

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {items.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b py-2 items-center"
            >
              <p>{item.name}</p>
              <p>{formatCurrency(item.price)} x {item.quantity}</p>
              <input
                type="number"
                defaultValue={item.quantity}
                min={1}
                onChange={(e) => changeQuantity(item.id, parseInt(e.target.value))}
                className="border rounded w-16 text-center"
                />
              <p>{formatCurrency(item.price * item.quantity)}</p>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-between mt-6 font-semibold">
            <p>Total:</p>
            <p>{formatCurrency(total)}</p>
          </div>
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => clearCart()}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Clear Cart
            </button>
            <Link
              href="/checkout"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}