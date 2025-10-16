'use client'
import PaymentMethodSelect from '@/components/PaymentMethodSelect';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/utils/formatter';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('credit_card')
  const { items, clearCart, checkout } = useCartStore();
  const router = useRouter();

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleCheckout = () => {
    checkout(paymentMethod, () => {
      alert('Payment successful!');
      clearCart(() => {
        router.push('/');
      });
    }, () => {
      alert('Payment failed!');
    })
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <p>Total: {formatCurrency(total)}</p>
      <PaymentMethodSelect onChange={(method) => setPaymentMethod(method)} />
      <button
        onClick={handleCheckout}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Pay Now
      </button>
    </div>
  );
}