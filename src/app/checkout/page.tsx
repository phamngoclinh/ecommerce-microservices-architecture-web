'use client'
import PaymentMethodSelect from '@/components/PaymentMethodSelect';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/utils/formatter';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CheckoutPage() {
  const [paymentUrl, setPaymentUrl] = useState(null)
  const [orderId, setOrderId] = useState<number | null>(null)
  const [paymentMethod, setPaymentMethod] = useState('VNPAY')
  const { items, clearCart, checkout } = useCartStore();
  const router = useRouter();

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleCheckout = () => {
    checkout(paymentMethod, (data: { id: number, totalAmount: number }) => {
      console.log('Checkout data:', data);

      setOrderId(data.id)

      fetch('http://localhost:3004/payments/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: data.id,
          amount: data.totalAmount,
          method: paymentMethod,
        }),
      })
        .then(response => response.json())
        .then(result => {
          if (result.paymentUrl) {
            setPaymentUrl(result.paymentUrl);
          }
        })
        .catch(error => {
          console.error('Error initiating payment:', error);
          alert('Payment initiation failed!');
        })
        .finally(() => {
          clearCart(() => {
            // router.push('/');
          });
        });
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
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <p>Total: {formatCurrency(total)}</p>
      <PaymentMethodSelect onChange={(method) => setPaymentMethod(method)} />
      <button
        onClick={handleCheckout}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Pay Now
      </button>

      {paymentUrl && <div>
        <h2>Payment process here: {paymentUrl}</h2>
        <span onClick={trySuccess} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Try success</span>
        <span onClick={tryFailure} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Try failure</span>
      </div>}
    </div>
  );
}