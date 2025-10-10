'use client';
import { useEffect, useState } from 'react';

export function StockStatus({ productId }: { productId: number }) {
  const [stock, setStock] = useState<number | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/get-stock', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ productId })
    })
      .then((res) => res.json())
      .then((data) => setStock(data.quantity))
      .catch(() => setStock(null));
  }, [productId]);

  if (stock === null) return <p className="text-gray-400">Checking stock...</p>;
  if (stock <= 0) return <p className="text-red-500">Out of stock</p>;

  return <p className="text-green-600">In Stock: {stock}</p>;
}
