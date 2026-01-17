import { Suspense } from 'react'
import { Metadata } from 'next'
import prisma from '@/lib/prisma'
import { ProductGrid } from '@/components/product/product-grid'
import { ProductGridSkeleton } from '@/components/ui/skeleton'
import { ShopFilters } from './filters'

export const metadata: Metadata = {
  title: 'Shop All Products | Pharma.co',
  description: 'Browse our complete range of medications and health products.',
}

interface SearchParams {
  category?: string
  minPrice?: string
  maxPrice?: string
  sort?: string
  search?: string
}

async function getProducts(searchParams: SearchParams) {
  const { category, minPrice, maxPrice, sort, search } = searchParams

  const where: any = {
    inStock: true,
  }

  if (category) {
    where.category = { slug: category }
  }

  if (search) {
    where.OR = [
      { name: { contains: search } },
      { description: { contains: search } },
    ]
  }

  if (minPrice || maxPrice) {
    where.basePrice = {}
    if (minPrice) where.basePrice.gte = parseFloat(minPrice)
    if (maxPrice) where.basePrice.lte = parseFloat(maxPrice)
  }

  let orderBy: any = { createdAt: 'desc' }
  if (sort === 'price-asc') orderBy = { basePrice: 'asc' }
  if (sort === 'price-desc') orderBy = { basePrice: 'desc' }
  if (sort === 'name-asc') orderBy = { name: 'asc' }
  if (sort === 'name-desc') orderBy = { name: 'desc' }

  const products = await prisma.product.findMany({
    where,
    include: {
      variants: true,
      category: true,
    },
    orderBy,
  })

  return products
}

async function getCategories() {
  return prisma.category.findMany({
    orderBy: { sortOrder: 'asc' },
  })
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const [products, categories] = await Promise.all([
    getProducts(searchParams),
    getCategories(),
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">All Products</h1>
        <p className="text-muted-foreground">
          Browse our complete range of medications and health products
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <ShopFilters categories={categories} />
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing {products.length} products
            </p>
          </div>

          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid products={products} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
