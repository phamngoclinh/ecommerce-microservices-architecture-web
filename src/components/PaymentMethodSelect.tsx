'use client';
import { useState } from 'react';

type PaymentMethod = 'VNPAY' | 'ZALOPAY' | 'COD' | 'MOMO' | 'PAYPAL' | 'STRIPE';

interface Props {
  onChange: (method: PaymentMethod) => void;
}

export default function PaymentMethodSelect({ onChange }: Props) {
  const [selected, setSelected] = useState<PaymentMethod>('VNPAY');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as PaymentMethod;
    setSelected(value);
    onChange(value);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">Payment Method</label>
      <select
        value={selected}
        onChange={handleChange}
        className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option value="VNPAY">💳 VNPay</option>
        <option value="ZALOPAY">🏦 ZaloPay</option>
        <option value="COD">🚚 Cash on Delivery (COD)</option>
        <option value="PAYPAL">Paypal</option>
        <option value="STRIPE">Stripe</option>
        <option value="MOMO">Ví Momo</option>
      </select>
    </div>
  );
}
