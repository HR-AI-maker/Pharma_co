import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Percent, Truck, Shield } from 'lucide-react'

export function CtaBanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-primary-600">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="text-white text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Get 10% Off Your First Order
            </h2>
            <p className="text-white/90 text-lg mb-6 max-w-md mx-auto lg:mx-0">
              Sign up for our newsletter and receive an exclusive discount code for your first purchase.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 gap-2"
                asChild
              >
                <Link href="/register">
                  Create Account
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
                <Percent className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Best Prices</h3>
              <p className="text-sm text-white/80">
                Competitive pricing on all products
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Free Delivery</h3>
              <p className="text-sm text-white/80">
                On orders over £50
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Secure</h3>
              <p className="text-sm text-white/80">
                100% secure checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
