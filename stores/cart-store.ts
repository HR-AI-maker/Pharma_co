import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartProduct {
  id: string
  name: string
  slug: string
  image: string
}

export interface CartVariant {
  id: string
  name: string
  price: number
}

export interface CartItem {
  id: string
  product: CartProduct
  variant: CartVariant
  quantity: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean

  // Actions
  addItem: (product: CartProduct, variant: CartVariant, quantity?: number) => void
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void

  // Computed
  getItemCount: () => number
  getTotal: () => number
  getItemByVariantId: (variantId: string) => CartItem | undefined
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, variant, quantity = 1) => {
        const items = get().items
        const existingItem = items.find((item) => item.variant.id === variant.id)

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.variant.id === variant.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          })
        } else {
          const newItem: CartItem = {
            id: `${product.id}-${variant.id}`,
            product,
            variant,
            quantity,
          }
          set({ items: [...items, newItem] })
        }

        // Open cart when adding item
        set({ isOpen: true })
      },

      removeItem: (variantId) => {
        set({
          items: get().items.filter((item) => item.variant.id !== variantId),
        })
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId)
          return
        }

        set({
          items: get().items.map((item) =>
            item.variant.id === variantId ? { ...item, quantity } : item
          ),
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.variant.price * item.quantity,
          0
        )
      },

      getItemByVariantId: (variantId) => {
        return get().items.find((item) => item.variant.id === variantId)
      },
    }),
    {
      name: 'pharma-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
)
