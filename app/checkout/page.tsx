'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { CreditCard, Truck, CheckCircle } from 'lucide-react'
import { useCartStore } from '@/stores/cart-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatPrice } from '@/lib/utils'

export default function CheckoutPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const { items, getTotal, clearCart } = useCartStore()
  const total = getTotal()
  const shipping = total >= 50 ? 0 : 4.99
  const orderTotal = total + shipping

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [orderNumber, setOrderNumber] = useState('')

  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    street: '',
    city: '',
    postcode: '',
    phone: '',
  })

  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe')

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h1>
        <Button asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('payment')
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!session) {
      router.push('/login?callbackUrl=/checkout')
      return
    }

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.product.id,
            variantId: item.variant.id,
            quantity: item.quantity,
          })),
          shippingAddress,
          paymentMethod,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to process order')
        return
      }

      setOrderNumber(data.order.orderNumber)
      clearCart()
      setStep('confirmation')
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Confirmation Step
  if (step === 'confirmation') {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground mb-4">
            Thank you for your order. Your order number is:
          </p>
          <p className="text-xl font-mono font-bold text-primary mb-8">
            {orderNumber}
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            You will receive an email confirmation shortly.
          </p>
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/account/orders">View Order</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-primary' : 'text-muted-foreground'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'shipping' ? 'bg-primary text-white' : 'bg-muted'}`}>
            1
          </div>
          <span className="hidden sm:inline font-medium">Shipping</span>
        </div>
        <div className="w-12 h-0.5 bg-border" />
        <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'payment' ? 'bg-primary text-white' : 'bg-muted'}`}>
            2
          </div>
          <span className="hidden sm:inline font-medium">Payment</span>
        </div>
      </div>

      {!session && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            Please{' '}
            <Link href="/login?callbackUrl=/checkout" className="text-primary font-medium hover:underline">
              sign in
            </Link>{' '}
            or{' '}
            <Link href="/register" className="text-primary font-medium hover:underline">
              create an account
            </Link>{' '}
            to complete your order.
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 mb-6 text-sm">
              {error}
            </div>
          )}

          {step === 'shipping' && (
            <form onSubmit={handleShippingSubmit} className="bg-white rounded-xl border border-border p-6">
              <div className="flex items-center gap-2 mb-6">
                <Truck className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Shipping Address</h2>
              </div>

              <div className="space-y-4">
                <Input
                  label="Full Name"
                  value={shippingAddress.name}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                  required
                />
                <Input
                  label="Street Address"
                  value={shippingAddress.street}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    required
                  />
                  <Input
                    label="Postcode"
                    value={shippingAddress.postcode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, postcode: e.target.value })}
                    required
                  />
                </div>
                <Input
                  label="Phone Number"
                  type="tel"
                  value={shippingAddress.phone}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full mt-6" size="lg">
                Continue to Payment
              </Button>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="bg-white rounded-xl border border-border p-6">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Payment Method</h2>
              </div>

              <div className="space-y-3 mb-6">
                <label className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-colors ${paymentMethod === 'stripe' ? 'border-primary bg-primary-50' : 'border-border'}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    checked={paymentMethod === 'stripe'}
                    onChange={() => setPaymentMethod('stripe')}
                    className="sr-only"
                  />
                  <CreditCard className="h-6 w-6 text-secondary" />
                  <div className="flex-1">
                    <p className="font-medium">Credit / Debit Card</p>
                    <p className="text-sm text-muted-foreground">Visa, Mastercard, Amex</p>
                  </div>
                </label>

                <label className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-colors ${paymentMethod === 'paypal' ? 'border-primary bg-primary-50' : 'border-border'}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                    className="sr-only"
                  />
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#003087">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.771.771 0 0 1 .76-.654h6.39c2.124 0 3.755.47 4.846 1.396.47.399.832.874 1.073 1.42.248.556.367 1.193.354 1.9-.015.804-.177 1.684-.481 2.622-.361 1.11-.886 2.067-1.563 2.851-.641.742-1.417 1.32-2.306 1.718-.86.386-1.817.58-2.844.58H8.906a.771.771 0 0 0-.76.654l-.687 4.477a.641.641 0 0 1-.633.653h-.75z" />
                  </svg>
                  <div className="flex-1">
                    <p className="font-medium">PayPal</p>
                    <p className="text-sm text-muted-foreground">Pay with PayPal account</p>
                  </div>
                </label>
              </div>

              <p className="text-xs text-muted-foreground mb-6">
                For demo purposes, no actual payment will be processed.
              </p>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep('shipping')}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button type="submit" className="flex-1" size="lg" loading={loading}>
                  Place Order
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-border p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Order Summary
            </h2>

            {/* Items */}
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={item.product.image || '/images/placeholder.jpg'}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.variant.name}</p>
                    <p className="text-sm font-medium text-primary">
                      {formatPrice(item.variant.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-border my-4" />

            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <hr className="border-border" />
              <div className="flex justify-between text-lg font-semibold text-foreground">
                <span>Total</span>
                <span>{formatPrice(orderTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
