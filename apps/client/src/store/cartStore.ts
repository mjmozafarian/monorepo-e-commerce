import { CartStoreType } from "@repo/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCartStore = create<CartStoreType>()(
    persist(
        (set) => ({
            cart: [],
            hasHydrated: false,
            addToCart: (product) =>
                set((state) => {
                    const existingIndex = state.cart.findIndex(
                        (item) =>
                            item.id === product.id &&
                            item.selectedSize === product.selectedSize &&
                            item.selectedColor === product.selectedColor
                    );
                    if (existingIndex !== -1) {
                        // If the item with the same size and color exists, increase its quantity
                        const updatedCart = [...state.cart];
                        updatedCart[existingIndex].quantity +=
                            product.quantity || 1;
                        return { cart: updatedCart };
                    }
                    // If not, add the new item to the cart
                    return { cart: [...state.cart, product] };
                }),
            removeFromCart: (product) =>
                set((state) => ({
                    cart: state.cart.filter(
                        (item) =>
                            !(
                                item.id === product.id &&
                                item.selectedSize === product.selectedSize &&
                                item.selectedColor === product.selectedColor
                            )
                    ),
                })),
            clearCart: () => set({ cart: [] }),
        }),
        {
            name: "cart-storage", // name of the item in the storage
            storage: createJSONStorage(() => localStorage), // use localStorage
            onRehydrateStorage: () => (state) => {
                if (state) state.hasHydrated = true;
            },
        }
    )
);

export default useCartStore;
