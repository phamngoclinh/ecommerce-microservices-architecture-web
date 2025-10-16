'use client';
import { useCartStore } from '@/store/cartStore';
import { useCallback, useEffect, useState } from 'react';

export function StockStatus({ productId }: { productId: number }) {
  const [stock, setStock] = useState<number | null>(null);
  const [inventoryItemId, setInventoryItemId] = useState(undefined);

  useEffect(() => {
    fetch('http://localhost:3003/inventory/check-product-stock', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ items: [{ productId }] })
    })
      .then((res) => res.json())
      .then((data) => {
        setStock(data?.details[0]?.available)
        setInventoryItemId(data?.details[0]?.inventoryItemId)
      })
      .catch(() => setStock(null));
  }, [productId]);

  if (stock === null) return <p className="text-gray-400">Checking stock...</p>;
  if (stock <= 0) return (<>
    <p className="text-red-500">Out of stock</p>
    <StockIn inventoryItemId={inventoryItemId}  />
  </>);

  return (<>
    <p className="text-green-600">In Stock: {stock}</p>
    <StockIn inventoryItemId={inventoryItemId} />
  </>);
}

function StockIn({ inventoryItemId }: { inventoryItemId?: number }) {
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);

  const stockIn = useCallback(() => {
    if (!inventoryItemId) return;
    setLoading(true);
    fetch('http://localhost:3003/inventory/stock-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: [{ inventoryItemId, quantity: qty }] })
    })
      .then((res) => res.json())
      .finally(() => {
        setLoading(false)
      })
  }, [inventoryItemId, qty])

  return (<div>
    <input type="number" min="1" value={qty} onChange={(e) => setQty(parseInt(e.target.value))} />
    {loading ? 'Stocking in...' : <button onClick={stockIn}>Stock in</button>}
  </div>)
}