'use client';
import { useState } from 'react';

type PaymentMethod = 'credit_card' | 'bank_transfer' | 'cod' | 'momo';

interface Props {
  onChange: (method: PaymentMethod) => void;
}

export default function PaymentMethodSelect({ onChange }: Props) {
  const [selected, setSelected] = useState<PaymentMethod>('credit_card');

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
        <option value="credit_card">💳 Credit Card</option>
        <option value="bank_transfer">🏦 Bank Transfer</option>
        <option value="cod">🚚 Cash on Delivery (COD)</option>
        <option value="momo">Ví Momo</option>
      </select>
    </div>
  );
}
