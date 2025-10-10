'use client'
import { Product } from '@/app/types/product'
import { use } from 'react'
import ProductCard from './ProductCard'

export default function ProductList({
  products,
}: {
  products: Promise<Product[]>
}) {
  const allproducts = use(products)

  return (
    <div className="grid grid-cols-3 gap-6">
      {allproducts.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}