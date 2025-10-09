import Link from "next/link"
import { Product } from "./types/product"

export default async function Home() {
  const data = await fetch('http://localhost:3001/get-products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const products: Product[] = await data.json()
  console.log('products', products)

  return (
    <ul>
      {products.map((product) => {
        return (
        <li key={product.id}>
            <br />
            <Link href={`product/${product.id}`}>{product.name}</Link>
            <p>Price: {product.sellingPrice}</p>
            <button>Add to cart</button>
            <br/>
        </li>
      )
      })}
    </ul>
  )
  
}
