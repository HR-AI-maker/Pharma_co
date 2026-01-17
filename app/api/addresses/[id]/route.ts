import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

const addressSchema = z.object({
  name: z.string().min(2),
  street: z.string().min(5),
  city: z.string().min(2),
  postcode: z.string().min(3),
  country: z.string().default('United Kingdom'),
  phone: z.string().min(10),
  isDefault: z.boolean().optional(),
})

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Please sign in to update this address' },
        { status: 401 }
      )
    }

    // Verify ownership
    const existingAddress = await prisma.address.findFirst({
      where: { id: params.id, userId: session.user.id },
    })

    if (!existingAddress) {
      return NextResponse.json(
        { error: 'Address not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const data = addressSchema.parse(body)

    // If this is the default address, unset other defaults
    if (data.isDefault) {
      await prisma.address.updateMany({
        where: { userId: session.user.id, NOT: { id: params.id } },
        data: { isDefault: false },
      })
    }

    const address = await prisma.address.update({
      where: { id: params.id },
      data,
    })

    return NextResponse.json(address)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Error updating address:', error)
    return NextResponse.json(
      { error: 'Failed to update address' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Please sign in to delete this address' },
        { status: 401 }
      )
    }

    // Verify ownership
    const existingAddress = await prisma.address.findFirst({
      where: { id: params.id, userId: session.user.id },
    })

    if (!existingAddress) {
      return NextResponse.json(
        { error: 'Address not found' },
        { status: 404 }
      )
    }

    await prisma.address.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Address deleted' })
  } catch (error) {
    console.error('Error deleting address:', error)
    return NextResponse.json(
      { error: 'Failed to delete address' },
      { status: 500 }
    )
  }
}
