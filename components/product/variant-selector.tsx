'use client'

import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/utils'

interface Variant {
  id: string
  name: string
  strength: string | null
  quantity: number
  price: number
  compareAtPrice: number | null
  stock: number
}

interface VariantSelectorProps {
  variants: Variant[]
  selectedVariantId: string | null
  onSelect: (variant: Variant) => void
}

export function VariantSelector({ variants, selectedVariantId, onSelect }: VariantSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-foreground">
        Select Option
      </label>
      <div className="grid gap-2">
        {variants.map((variant) => {
          const isSelected = variant.id === selectedVariantId
          const isOutOfStock = variant.stock <= 0
          const discount = variant.compareAtPrice
            ? Math.round((1 - variant.price / variant.compareAtPrice) * 100)
            : 0

          return (
            <button
              key={variant.id}
              onClick={() => !isOutOfStock && onSelect(variant)}
              disabled={isOutOfStock}
              className={cn(
                'flex items-center justify-between p-4 rounded-lg border-2 transition-all',
                isSelected
                  ? 'border-primary bg-primary-50'
                  : 'border-border hover:border-primary-300',
                isOutOfStock && 'opacity-50 cursor-not-allowed'
              )}
            >
              <div className="text-left">
                <p className={cn(
                  'font-medium',
                  isSelected ? 'text-primary' : 'text-foreground'
                )}>
                  {variant.name}
                </p>
                {variant.strength && (
                  <p className="text-sm text-muted-foreground">
                    Strength: {variant.strength}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  Quantity: {variant.quantity} tablets
                </p>
              </div>
              <div className="text-right">
                <p className={cn(
                  'font-bold',
                  isSelected ? 'text-primary' : 'text-foreground'
                )}>
                  {formatPrice(variant.price)}
                </p>
                {variant.compareAtPrice && (
                  <p className="text-sm text-muted-foreground line-through">
                    {formatPrice(variant.compareAtPrice)}
                  </p>
                )}
                {discount > 0 && (
                  <p className="text-xs text-success font-medium">
                    Save {discount}%
                  </p>
                )}
                {isOutOfStock && (
                  <p className="text-xs text-error font-medium">
                    Out of Stock
                  </p>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
