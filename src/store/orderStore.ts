import { create } from 'zustand';

export interface OrderItem {
  id: number;
}

interface OrderState {
  loading: boolean;
  error?: string;
  items: OrderItem[];
  confirm: (id: number, success: () => void, fail: () => void) => void;
  ship: (id: number, success: () => void, fail: () => void) => void;
  complete: (id: number, success: () => void, fail: () => void) => void;
}

const fetchBase = async (endPoint: string, item: unknown, success: (data: unknown) => void, failure: (error: Error) => void) => {
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

export const useOrderStore = create<OrderState>((set, get) => ({
  loading: true,
  error: undefined,
  items: [],
  confirm: (id: number, success: () => void, fail: () => void) => {
    set({ loading: true })
    fetchBase(
      '/order/confirm-order',
      {
        id
      },
      () => {
        set({ loading: false })
        success()
      },
      () => {
        set({ loading: false })
        fail()
      },
    )
  },
  ship: (id: number, success: () => void, fail: () => void) => {
    set({ loading: true })
    fetchBase(
      '/order/ship-order',
      {
        id
      },
      () => {
        set({ loading: false })
        success()
      },
      () => {
        set({ loading: false })
        fail()
      },

    )
  },
  complete: (id: number, success: () => void, fail: () => void) => {
    set({ loading: true })
    fetchBase(
      '/order/complete-order',
      {
        id
      },
      () => {
        set({ loading: false })
        success()
      },
      () => {
        set({ loading: false })
        fail()
      },
    )
  },
}));
