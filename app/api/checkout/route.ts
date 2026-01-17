import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { generateOrderNumber } from '@/lib/utils'

const checkoutSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      variantId: z.string(),
      quantity: z.number().min(1),
    })
  ),
  shippingAddress: z.object({
    name: z.string().min(2),
    street: z.string().min(5),
    city: z.string().min(2),
    postcode: z.string().min(3),
    country: z.string().default('United Kingdom'),
    phone: z.string().min(10),
  }),
  paymentMethod: z.enum(['stripe', 'paypal']),
})

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Please sign in to complete your order' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { items, shippingAddress, paymentMethod } = checkoutSchema.parse(body)

    // Validate items and calculate totals
    let subtotal = 0
    const orderItems = []

    for (const item of items) {
      const variant = await prisma.productVariant.findUnique({
        where: { id: item.variantId },
        include: { product: true },
      })

      if (!variant) {
        return NextResponse.json(
          { error: `Product variant not found: ${item.variantId}` },
          { status: 400 }
        )
      }

      if (variant.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${variant.product.name}` },
          { status: 400 }
        )
      }

      const itemTotal = variant.price * item.quantity
      subtotal += itemTotal

      orderItems.push({
        productId: variant.productId,
        variantId: variant.id,
        productName: variant.product.name,
        productImage: JSON.parse(variant.product.images)[0] || null,
        variantName: variant.name,
        quantity: item.quantity,
        price: variant.price,
      })
    }

    const shipping = subtotal >= 50 ? 0 : 4.99
    const total = subtotal + shipping

    // Create or find address
    let address = await prisma.address.findFirst({
      where: {
        userId: session.user.id,
        street: shippingAddress.street,
        postcode: shippingAddress.postcode,
      },
    })

    if (!address) {
      address = await prisma.address.create({
        data: {
          userId: session.user.id,
          ...shippingAddress,
        },
      })
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: session.user.id,
        addressId: address.id,
        subtotal,
        shipping,
        total,
        paymentMethod,
        status: 'pending',
        items: {
          create: orderItems,
        },
      },
      include: {
        items: true,
        shippingAddress: true,
      },
    })

    // Update stock
    for (const item of items) {
      await prisma.productVariant.update({
        where: { id: item.variantId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      })
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        total: order.total,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to process checkout' },
      { status: 500 }
    )
  }
}
