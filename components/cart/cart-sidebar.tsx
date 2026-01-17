'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Dialog, Transition } from '@headlessui/react'
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCartStore } from '@/stores/cart-store'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'

export function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotal } = useCartStore()
  const total = getTotal()

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                      <Dialog.Title className="text-lg font-semibold text-foreground">
                        Your Cart ({items.length} items)
                      </Dialog.Title>
                      <button
                        onClick={closeCart}
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-6">
                      {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium text-foreground mb-2">
                            Your cart is empty
                          </h3>
                          <p className="text-muted-foreground mb-6">
                            Looks like you haven&apos;t added any items yet.
                          </p>
                          <Button onClick={closeCart} asChild>
                            <Link href="/shop">Start Shopping</Link>
                          </Button>
                        </div>
                      ) : (
                        <ul className="space-y-4">
                          {items.map((item) => (
                            <li
                              key={item.id}
                              className="flex gap-4 p-4 bg-muted rounded-lg"
                            >
                              {/* Product Image */}
                              <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-white">
                                <Image
                                  src={item.product.image || '/images/placeholder.jpg'}
                                  alt={item.product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>

                              {/* Product Details */}
                              <div className="flex-1 min-w-0">
                                <Link
                                  href={`/product/${item.product.slug}`}
                                  className="text-sm font-medium text-foreground hover:text-primary line-clamp-2"
                                  onClick={closeCart}
                                >
                                  {item.product.name}
                                </Link>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {item.variant.name}
                                </p>
                                <p className="text-sm font-semibold text-primary mt-1">
                                  {formatPrice(item.variant.price)}
                                </p>

                                {/* Quantity Controls */}
                                <div className="flex items-center justify-between mt-2">
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() =>
                                        updateQuantity(item.variant.id, item.quantity - 1)
                                      }
                                      className="p-1 rounded-md hover:bg-white transition-colors"
                                      disabled={item.quantity <= 1}
                                    >
                                      <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="text-sm font-medium w-8 text-center">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() =>
                                        updateQuantity(item.variant.id, item.quantity + 1)
                                      }
                                      className="p-1 rounded-md hover:bg-white transition-colors"
                                    >
                                      <Plus className="h-4 w-4" />
                                    </button>
                                  </div>
                                  <button
                                    onClick={() => removeItem(item.variant.id)}
                                    className="p-1 text-error hover:bg-red-50 rounded-md transition-colors"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                      <div className="border-t border-border px-6 py-4 space-y-4">
                        {/* Subtotal */}
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span className="text-lg font-semibold text-foreground">
                            {formatPrice(total)}
                          </span>
                        </div>

                        <p className="text-xs text-muted-foreground">
                          Shipping and taxes calculated at checkout
                        </p>

                        {/* Actions */}
                        <div className="space-y-2">
                          <Button className="w-full" size="lg" asChild>
                            <Link href="/checkout" onClick={closeCart}>
                              Proceed to Checkout
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full"
                            asChild
                          >
                            <Link href="/cart" onClick={closeCart}>
                              View Cart
                            </Link>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
