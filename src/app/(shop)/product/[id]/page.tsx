import { Product } from "@/app/types/product"
import { Stock } from "@/app/types/stock"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params
  console.log('id', id)

  const productData = await fetch('http://localhost:3001/get-product', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id })
  })
  const product: Product = await productData.json()
  console.log('product', product)

  const stockData = await fetch('http://localhost:3001/get-stock', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId: id })
  })
  const stock: Stock = await stockData.json() 
  console.log('stock', stock)

  return (<div>
    <h5>{product.name}</h5>
    <h6>Price: {product.sellingPrice.toLocaleString()}</h6>
    <strong>Stock: {stock.status}</strong>
    <br/>
    Quantity: <input type="number" min="1" max={stock.quantity} defaultValue={1} />
    <br/>
    <button>Add to cart</button>
  </div>)
}