'use client';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { Product } from '@/app/types/product';
import { formatCurrency } from '@/utils/formatter';

export default function ProductCard({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="border rounded-xl p-4 shadow-md">
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p className="text-gray-600">
        {formatCurrency(product.sellingPrice)}
      </p>
      <div className="flex items-center gap-2 mt-2">
        <input
          type="number"
          min={1}
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value))}
          className="border rounded w-16 text-center"
        />
        <button
          onClick={() =>
            addItem({ ...product, quantity: qty })
          }
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
      <Link
        href={`/product/${product.id}`}
        className="block text-sm text-blue-500 mt-2"
      >
        View Details
      </Link>
    </div>
  );
}
