import { ProductCard } from './product-card'

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

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No products found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
