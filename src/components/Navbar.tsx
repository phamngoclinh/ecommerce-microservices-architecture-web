'use client';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

export default function Navbar() {
  const count = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0)
  );

  return (
    <nav className="bg-gray-800 text-white px-8 py-4 flex justify-between">
      <Link href="/" className="font-bold">E-Shop</Link>
      <p className='flex gap-5'>
        <Link href="/cart">Cart ({count})</Link>
        <Link href="/account">Account</Link>
      </p>
    </nav>
  );
}