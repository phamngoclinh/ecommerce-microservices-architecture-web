'use client';

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";


export function PaymentProcess({ orderId, totalAmount, paymentMethod }: { orderId: number; totalAmount: number; paymentMethod: string}) {
  const [paymentUrl, setPaymentUrl] = useState(null)
  const router = useRouter();
  const [loadingSuccess, setLoadingSuccess] = useState(false);
  const [loadingFailure, setLoadingFailure] = useState(false);
  
  useEffect(() => {
    fetch('http://localhost:3004/payments/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId,
        amount: totalAmount,
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
      });
  }, [])

  const trySuccess = () => {
    setLoadingSuccess(true)
    fetch(`http://localhost:3004/payment-gateway-simulator/pay/success/${orderId}`).then(() => {
      router.push(`/account/${orderId}`)
    }).finally(() => setLoadingSuccess(false))
  }

  const tryFailure = () => {
    setLoadingFailure(true)
    fetch(`http://localhost:3004/payment-gateway-simulator/pay/failed/${orderId}`).then(() => {
      router.push(`/account/${orderId}`)
    }).finally(() => setLoadingFailure(false))
  }

  return (<>
    <main className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Giả lập thanh toán online</h1>
        <p className="mt-2 text-gray-600">Đây là đoạn mô tả cho phần payment — bạn có thể thử các hành động bên dưới.</p>
      </header>
      <p>{paymentUrl ? paymentUrl : 'Loading...'}</p>
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <p id="status" className="text-gray-700">
            {paymentUrl && <Image src='/qr.png' alt='qr code' width={200} height={200} />}
          </p>
        </div>
        {paymentUrl && <div className="flex gap-3">
          <button
            id="btn-fail"
            onClick={tryFailure}
            className="px-4 py-2 rounded-md border border-red-300 bg-red-50 hover:bg-red-100 text-red-700 focus:outline-none focus:ring-2 focus:ring-red-200"
          >
            {loadingFailure ? 'Process...' : 'Try to failed'}
          </button>
          <button
            id="btn-success"
            onClick={trySuccess}
            className="px-4 py-2 rounded-md border border-green-300 bg-green-50 hover:bg-green-100 text-green-700 focus:outline-none focus:ring-2 focus:ring-green-200"
          >
            {loadingSuccess ? 'Process...' : 'Try to success'}
          </button>
        </div>}
      </section>
      <hr className="my-6" />
    </main>
  </>)
}