import { create } from 'zustand';

export interface CartItem {
  id: number;
  name: string;
  sellingPrice: number;
  quantity: number;
}

interface CartItemResponse {
  id: number;
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
  lineAmount: number;
}

interface CartState {
  loading: boolean;
  error?: string;
  items: CartItem[];
  fetchCarts: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

const fetchBase = async (endPoint: string, item: unknown, success: (data: CartItemResponse | CartItemResponse[]) => void, failure: (error: Error) => void) => {
  return fetch('http://localhost:3002/cart' + endPoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item)
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json()
    })
    .then((data) => {
      success(data)
    })
    .catch(error => {
      failure(error)
    })
}

export const useCartStore = create<CartState>((set) => ({
  loading: true,
  error: undefined,
  items: [],
  fetchCarts: () => {
    fetchBase(
      '/get-items',
      {},
      (data) => {
        const items = (data as CartItemResponse[]).map(i => ({
          id: i.productId,
          name: i.productName,
          sellingPrice: i.unitPrice,
          quantity: i.quantity,
        }))
        set({ items: items as CartItem[], loading: false })
      },
      (error) => {
        set({ error: error.message, loading: false })
      }
    )
  },
  addItem: (item) => {
    set({ loading: true })
    fetchBase(
      '/add-item',
      {
        productId: item.id,
        productName: item.name,
        unitPrice: item.sellingPrice,
        quantity: item.quantity
      },
      () => {
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? {
                    ...i,
                    quantity: i.quantity + item.quantity
                  }
                  : i
              ),
              loading: false
            };
          }
          return { items: [...state.items, item], loading: false };
        })
      },
      (error) => {
        set({ error: error.message, loading: false })
      });
  },
  removeItem: (id) => {
    set({ loading: true })
    fetchBase(
      '/remove-item',
      { productId: id },
      () => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id), loading: false }))
      },
      (error) => {
        set({ error: error.message, loading: false })
      }
    )
  },
  clearCart: () => {
    set({ loading: true })
    fetchBase(
      '/clear',
      {},
      () => set({ items: [], loading: false }),
      (error) => set({ error: error.message, loading: false }))
  },
}));
