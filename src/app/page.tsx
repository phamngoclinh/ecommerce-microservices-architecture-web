import ProductList from "@/components/ProductList"
import { Suspense } from "react"

export default async function Home() {
  const products = fetch('http://localhost:3001/product/get-products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Product List</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductList products={products} />
      </Suspense>
    </div>
  )
  
}
