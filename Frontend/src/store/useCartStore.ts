import { create } from 'zustand';
import { persist } from 'zustand/middleware';
type Product = {
  id: string;
  name: string;
  price: number;
  qty?: number;
  [key: string]: any;
};

type CartState = {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product: Product) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id);

          const incomingQty = product.qty || 1;

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === product.id
                  ? { ...i, qty: (i.qty || 0) + incomingQty }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...product, qty: incomingQty }] };
        }),
      removeItem: (id: string) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      clearCart: () => set({ items: [] }),
    }),
    { name: 'cart-storage' }
  )
);
