import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { ProductGrid } from '@/components/product/product-grid'
import { ChevronRight } from 'lucide-react'

interface Props {
  params: { slug: string }
}

async function getCategory(slug: string) {
  const category = await prisma.category.findUnique({
    where: { slug },
  })
  return category
}

async function getProducts(categoryId: string) {
  const products = await prisma.product.findMany({
    where: {
      categoryId,
      inStock: true,
    },
    include: {
      variants: true,
    },
    orderBy: { createdAt: 'desc' },
  })
  return products
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategory(params.slug)

  if (!category) {
    return {
      title: 'Category Not Found | Pharma.co',
    }
  }

  return {
    title: `${category.name} | Pharma.co`,
    description: category.description || `Browse our ${category.name} products`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const category = await getCategory(params.slug)

  if (!category) {
    notFound()
  }

  const products = await getProducts(category.id)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/shop" className="hover:text-primary transition-colors">
          Shop
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">{category.name}</span>
      </nav>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">{category.name}</h1>
        {category.description && (
          <p className="text-muted-foreground max-w-2xl">
            {category.description}
          </p>
        )}
      </div>

      {/* Products Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {products.length} products
        </p>
      </div>

      {/* Products Grid */}
      <ProductGrid products={products} />
    </div>
  )
}
