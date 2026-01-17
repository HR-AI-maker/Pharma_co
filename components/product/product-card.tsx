'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/stores/cart-store'
import { formatPrice, parseImages } from '@/lib/utils'

interface ProductVariant {
  id: string
  name: string
  price: number
  compareAtPrice: number | null
  stock: number
}

interface Product {
  id: string
  name: string
  slug: string
  shortDescription: string | null
  images: string
  basePrice: number
  inStock: boolean
  featured: boolean
  variants: ProductVariant[]
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const { addItem } = useCartStore()
  const images = parseImages(product.images)
  const mainImage = images[0] || '/images/placeholder.jpg'

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!selectedVariant || !product.inStock) return

    addItem(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        image: mainImage,
      },
      {
        id: selectedVariant.id,
        name: selectedVariant.name,
        price: selectedVariant.price,
      }
    )
  }

  const discount = selectedVariant?.compareAtPrice
    ? Math.round((1 - selectedVariant.price / selectedVariant.compareAtPrice) * 100)
    : 0

  return (
    <div className="group bg-white rounded-xl border border-border hover:shadow-card-hover transition-all duration-300 overflow-hidden">
      {/* Image */}
      <Link href={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden bg-muted">
        <Image
          src={mainImage}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {!product.inStock && (
            <Badge variant="error">Out of Stock</Badge>
          )}
          {product.featured && product.inStock && (
            <Badge variant="primary">Featured</Badge>
          )}
          {discount > 0 && product.inStock && (
            <Badge variant="success">-{discount}%</Badge>
          )}
        </div>

        {/* Quick View */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button variant="secondary" size="sm" className="gap-2">
            <Eye className="h-4 w-4" />
            Quick View
          </Button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 mb-1">
            {product.name}
          </h3>
        </Link>

        {product.shortDescription && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {product.shortDescription}
          </p>
        )}

        {/* Variant Selection */}
        {product.variants.length > 1 && (
          <div className="mb-3">
            <select
              value={selectedVariant?.id || ''}
              onChange={(e) => {
                const variant = product.variants.find((v) => v.id === e.target.value)
                if (variant) setSelectedVariant(variant)
              }}
              className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-muted focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {product.variants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.name} - {formatPrice(variant.price)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-primary">
            {formatPrice(selectedVariant?.price || product.basePrice)}
          </span>
          {selectedVariant?.compareAtPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(selectedVariant.compareAtPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <Button
          className="w-full gap-2"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingCart className="h-4 w-4" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </div>
  )
}
