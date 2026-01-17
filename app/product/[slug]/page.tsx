'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, Minus, Plus, ShoppingCart, Truck, Shield, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { VariantSelector } from '@/components/product/variant-selector'
import { useCartStore } from '@/stores/cart-store'
import { formatPrice, parseImages } from '@/lib/utils'

interface Variant {
  id: string
  name: string
  strength: string | null
  quantity: number
  price: number
  compareAtPrice: number | null
  stock: number
}

interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string | null
  images: string
  basePrice: number
  inStock: boolean
  featured: boolean
  category: {
    id: string
    name: string
    slug: string
  }
  variants: Variant[]
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { addItem } = useCartStore()

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${params.slug}`)
        if (!res.ok) {
          setProduct(null)
          return
        }
        const data = await res.json()
        setProduct(data)
        if (data.variants.length > 0) {
          setSelectedVariant(data.variants[0])
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [params.slug])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-1/4 mb-8" />
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="h-[500px] bg-muted rounded-xl" />
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/4" />
              <div className="h-24 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    notFound()
  }

  const images = parseImages(product.images)
  const mainImage = images[currentImageIndex] || '/images/placeholder.jpg'

  const handleAddToCart = () => {
    if (!selectedVariant || !product.inStock) return

    addItem(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        image: images[0] || '/images/placeholder.jpg',
      },
      {
        id: selectedVariant.id,
        name: selectedVariant.name,
        price: selectedVariant.price,
      },
      quantity
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/shop" className="hover:text-primary transition-colors">
          Shop
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          href={`/category/${product.category.slug}`}
          className="hover:text-primary transition-colors"
        >
          {product.category.name}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          {/* Main Image */}
          <div className="relative aspect-square rounded-xl overflow-hidden bg-muted mb-4">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {product.featured && (
              <Badge variant="primary" className="absolute top-4 left-4">
                Featured
              </Badge>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="error" className="text-lg px-4 py-2">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                    currentImageIndex === index
                      ? 'border-primary'
                      : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {product.name}
          </h1>

          <Link
            href={`/category/${product.category.slug}`}
            className="text-primary hover:underline text-sm mb-4 inline-block"
          >
            {product.category.name}
          </Link>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-primary">
              {formatPrice(selectedVariant?.price || product.basePrice)}
            </span>
            {selectedVariant?.compareAtPrice && (
              <span className="text-xl text-muted-foreground line-through">
                {formatPrice(selectedVariant.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Short Description */}
          {product.shortDescription && (
            <p className="text-muted-foreground mb-6">
              {product.shortDescription}
            </p>
          )}

          {/* Variant Selector */}
          {product.variants.length > 0 && (
            <div className="mb-6">
              <VariantSelector
                variants={product.variants}
                selectedVariantId={selectedVariant?.id || null}
                onSelect={setSelectedVariant}
              />
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              Quantity
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"
                disabled={quantity <= 1}
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <Button
            size="lg"
            className="w-full gap-2 mb-6"
            onClick={handleAddToCart}
            disabled={!product.inStock || !selectedVariant}
          >
            <ShoppingCart className="h-5 w-5" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-border">
            <div className="text-center">
              <Truck className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Free Delivery</p>
              <p className="text-xs font-medium">Over £50</p>
            </div>
            <div className="text-center">
              <Shield className="h-6 w-6 text-secondary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Secure</p>
              <p className="text-xs font-medium">Payment</p>
            </div>
            <div className="text-center">
              <Clock className="h-6 w-6 text-success mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Fast</p>
              <p className="text-xs font-medium">Dispatch</p>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">
              Description
            </h2>
            <div className="prose prose-sm text-muted-foreground">
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
