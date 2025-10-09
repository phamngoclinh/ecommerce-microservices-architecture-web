import { Product } from "./product"

export type Stock = {
    product: Product,
    warehouse: {
        name: string
    },
    quantity: number,
    status: string
}