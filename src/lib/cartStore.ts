import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./products";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  stock: number;
};

interface CartState {
  items: CartItem[];
  discountCode: string;
  discountPercent: number;
  addItem: (product: Product, quantity: number, size: string, color: string) => void;
  removeItem: (id: number, size: string, color: string) => void;
  updateQuantity: (id: number, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  applyDiscount: (code: string) => boolean;
  clearDiscount: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      discountCode: "",
      discountPercent: 0,
      addItem: (product, quantity, size, color) =>
        set((state) => {
          const existing = state.items.find(
            (item) =>
              item.id === product.id &&
              item.selectedSize === size &&
              item.selectedColor === color
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id &&
                item.selectedSize === size &&
                item.selectedColor === color
                  ? {
                      ...item,
                      quantity: Math.min(item.stock, item.quantity + quantity),
                    }
                  : item
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity,
                selectedSize: size,
                selectedColor: color,
                stock: product.stock,
              },
            ],
          };
        }),
      removeItem: (id, size, color) =>
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.id === id &&
                item.selectedSize === size &&
                item.selectedColor === color
              )
          ),
        })),
      updateQuantity: (id, size, color, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id &&
            item.selectedSize === size &&
            item.selectedColor === color
              ? { ...item, quantity: Math.min(item.stock, Math.max(1, quantity)) }
              : item
          ),
        })),
      clearCart: () => set({ items: [], discountCode: "", discountPercent: 0 }),
      applyDiscount: (code) => {
        const normalized = code.trim().toUpperCase();
        if (normalized !== "WELCOME10") return false;
        set({ discountCode: normalized, discountPercent: 10 });
        return true;
      },
      clearDiscount: () => set({ discountCode: "", discountPercent: 0 }),
    }),
    {
      name: "thread-n-trends-cart",
      partialize: (state) => ({ items: state.items, discountCode: state.discountCode, discountPercent: state.discountPercent }),
    }
  )
);
