import ProductDetail from "@/components/ProductDetail"
import { Suspense } from "react";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params

  const productData = fetch('http://localhost:3001/get-product', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id })
  })
    .then(res => res.json());

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetail product={productData} />
    </Suspense>
  )
}