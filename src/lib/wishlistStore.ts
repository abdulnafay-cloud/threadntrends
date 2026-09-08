import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  items: number[];
  toggleItem: (id: number) => void;
  isInWishlist: (id: number) => boolean;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (id) => {
        const current = get().items;
        set({
          items: current.includes(id)
            ? current.filter((itemId) => itemId !== id)
            : [...current, id],
        });
      },
      isInWishlist: (id) => get().items.includes(id),
    }),
    { name: "thread-n-trends-wishlist" }
  )
);
