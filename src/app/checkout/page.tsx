'use client'
import PaymentMethodSelect from '@/components/PaymentMethodSelect';
import { PaymentProcess } from '@/components/PaymentProcess';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/utils/formatter';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Order } from '../types/order';

export default function CheckoutPage() {
  const [paymentUrl, setPaymentUrl] = useState(null)
  const [doneCheckout, setDoneCheckout] = useState<Order | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('VNPAY')
  const { loading, items, clearCart, checkout } = useCartStore();
  const router = useRouter();

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleCheckout = () => {
    checkout(paymentMethod, (data: { id: number, totalAmount: number }) => {
      console.log('Checkout data:', data);

      setTimeout(() => {
        setDoneCheckout(data)
        clearCart();
      }, 2000)
    }, () => {
      alert('Payment failed!');
    })
  };

  const trySuccess = () => {
    fetch(`http://localhost:3004/payment-gateway-simulator/pay/success/${orderId}`)
  }

  const tryFailure = () => {
    fetch(`http://localhost:3004/payment-gateway-simulator/pay/failed/${orderId}`)
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      {doneCheckout ? (
        <div>
            <PaymentProcess orderId={doneCheckout.id} totalAmount={doneCheckout.totalAmount} paymentMethod={paymentMethod} />
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>
          <p>Total: {formatCurrency(total)}</p>
          <PaymentMethodSelect onChange={(method) => setPaymentMethod(method)} />
          <button
            onClick={handleCheckout}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            {loading ? 'Processing to pay' : 'Pay Now'}
          </button>
        </div>
      )}
    </div>
  );
}