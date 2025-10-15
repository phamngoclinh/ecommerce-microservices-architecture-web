import { create } from 'zustand';

export interface CartItem {
  id: number;
  name: string;
  price: number;
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
  clearCart: (success?: () => void, fail?: () => void) => void;
  changeQuantity: (itemId: number, quantity: number) => void;
  checkout: (success: () => void, fail: () => void) => void;
}

const fetchBase = async (endPoint: string, item: unknown, success: (data: CartItemResponse | CartItemResponse[]) => void, failure: (error: Error) => void) => {
  return fetch('http://localhost:3002' + endPoint, {
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

export const useCartStore = create<CartState>((set, get) => ({
  loading: true,
  error: undefined,
  items: [],
  fetchCarts: () => {
    fetchBase(
      '/cart/get-items',
      {},
      (data) => {
        const items = (data as CartItemResponse[]).map(i => ({
          id: i.productId,
          name: i.productName,
          price: i.unitPrice,
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
      '/cart/add-item',
      {
        productId: item.id,
        productName: item.name,
        unitPrice: item.price,
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
      '/cart/remove-item',
      { productId: id },
      () => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id), loading: false }))
      },
      (error) => {
        set({ error: error.message, loading: false })
      }
    )
  },
  clearCart: (success?: () => void, fail?: () => void) => {
    set({ loading: true })
    fetchBase(
      '/cart/clear',
      {},
      () => {
        success?.();
        set({ items: [], loading: false })
      },
      (error) => {
        fail?.();
        set({ error: error.message, loading: false })
      })
  },
  changeQuantity: (id: number, quantity: number) => {
    set({ loading: true })
    fetchBase(
      '/cart/update-item',
      { productId: id, quantity },
      () => {
        set((state) => ({
          items: state.items.map(item => {
            if (item.id === id) item.quantity = quantity;
            return item;
          })
        }))
      },
      (error) => {
        set({ error: error.message, loading: false })
      }
    )
  },
  checkout: (success: () => void, fail: () => void) => {
    set({ loading: true })
    fetchBase(
      '/order/create-order',
      {
        orderItems: get().items.map(item => ({
          productId: item.id,
          productName: item.name,
          unitPrice: item.price,
          quantity: item.quantity
        })),
        paymentMethod: 'credit_card'
      },
      success,
      fail
    )
  },
}));
