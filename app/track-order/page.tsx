'use client'

import { useState } from 'react'
import { Package, Search, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderNumber.trim()) {
      setError('Please enter an order number')
      return
    }
    // For demo, redirect to login with message
    window.location.href = '/login?callbackUrl=/account/orders'
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Track Your Order</h1>
          <p className="text-muted-foreground">
            Enter your order number to track your shipment status
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-border p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Order number (e.g., PH-ABC123-XYZ)"
                value={orderNumber}
                onChange={(e) => {
                  setOrderNumber(e.target.value)
                  setError('')
                }}
                className="pl-10"
                error={error}
              />
            </div>

            <Button type="submit" className="w-full gap-2" size="lg">
              Track Order
              <ArrowRight className="h-5 w-5" />
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <a href="/login?callbackUrl=/account/orders" className="text-primary hover:underline">
                Sign in
              </a>{' '}
              to view all your orders.
            </p>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Need help?{' '}
            <a href="/contact" className="text-primary hover:underline">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
