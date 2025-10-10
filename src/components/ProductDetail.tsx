'use client';
import { Suspense, use, useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/app/types/product';
import { StockStatus } from './StockStatus';
import { formatCurrency } from '@/utils/formatter';

export default function ProductDetail({ product }: { product: Promise<Product> }) {
  const [qty, setQty] = useState(1);
  const productData = use(product);
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold">{productData.name}</h1>
      <p className="text-gray-600">
        {formatCurrency(productData.sellingPrice)}
      </p>
      <p>
        <input
          type="number"
          min={1}
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value))}
          className="border rounded w-16 text-center"
        />
      </p>
      <Suspense fallback={<p className="text-gray-400">Checking stock...</p>}>
        <StockStatus productId={productData.id} />
      </Suspense>
      <button
        onClick={() => addItem({ ...productData, quantity: qty })}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
