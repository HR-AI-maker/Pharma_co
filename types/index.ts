// User Types
export interface User {
  id: string
  email: string
  name: string | null
  phone: string | null
  image: string | null
  createdAt: Date
}

// Address Types
export interface Address {
  id: string
  userId: string
  name: string
  street: string
  city: string
  postcode: string
  country: string
  phone: string
  isDefault: boolean
}

// Category Types
export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image: string | null
  productCount: number
}

// Product Types
export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string | null
  categoryId: string
  category?: Category
  images: string[]
  basePrice: number
  inStock: boolean
  featured: boolean
  variants?: ProductVariant[]
  createdAt: Date
}

export interface ProductVariant {
  id: string
  productId: string
  name: string
  strength: string | null
  quantity: number
  price: number
  compareAtPrice: number | null
  stock: number
  sku: string | null
}

// Cart Types
export interface CartItem {
  id: string
  productId: string
  product: Product
  variantId: string
  variant: ProductVariant
  quantity: number
  price: number
}

export interface Cart {
  id: string
  userId: string | null
  sessionId: string | null
  items: CartItem[]
  total: number
  itemCount: number
}

// Order Types
export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  productName: string
  productImage: string | null
  variantId: string
  variantName: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  orderNumber: string
  userId: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  status: OrderStatus
  shippingAddress: Address
  paymentMethod: string
  paymentIntentId: string | null
  createdAt: Date
  updatedAt: Date
}

// Testimonial Types
export interface Testimonial {
  id: string
  name: string
  rating: number
  comment: string
  approved: boolean
  createdAt: Date
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Filter Types
export interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  search?: string
  sort?: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest'
}
