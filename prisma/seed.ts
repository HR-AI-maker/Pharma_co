import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'anxiety-depression' },
      update: {},
      create: {
        name: 'Anxiety & Depression',
        slug: 'anxiety-depression',
        description: 'Effective treatments for anxiety and depression disorders. Our range includes medications to help manage symptoms and improve quality of life.',
        image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=300&fit=crop',
        sortOrder: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'sleeping-pills' },
      update: {},
      create: {
        name: 'Sleeping Pills',
        slug: 'sleeping-pills',
        description: 'Improve your sleep quality with our range of sleeping aids. Safe and effective solutions for insomnia and sleep disorders.',
        image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=300&fit=crop',
        sortOrder: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'pain-relief' },
      update: {},
      create: {
        name: 'Pain Relief',
        slug: 'pain-relief',
        description: 'Effective pain management solutions for various conditions. From mild to moderate pain relief options.',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
        sortOrder: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'mens-health' },
      update: {},
      create: {
        name: "Men's Health",
        slug: 'mens-health',
        description: 'Discreet treatments for mens health concerns. Effective solutions delivered in plain packaging.',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop',
        sortOrder: 4,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'weight-loss' },
      update: {},
      create: {
        name: 'Weight Loss',
        slug: 'weight-loss',
        description: 'Support your weight loss journey with our range of effective weight management medications.',
        image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=300&fit=crop',
        sortOrder: 5,
      },
    }),
  ])

  console.log(`Created ${categories.length} categories`)

  // Create products with variants
  const products = [
    // Anxiety & Depression
    {
      name: 'Serenix 10mg',
      slug: 'serenix-10mg',
      description: 'Serenix is a medication used to treat anxiety disorders and panic attacks. It works by enhancing the activity of certain neurotransmitters in the brain to promote calmness and relaxation. This medication should be taken as directed by a healthcare professional.',
      shortDescription: 'Fast-acting anxiety relief medication',
      categorySlug: 'anxiety-depression',
      images: JSON.stringify(['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=600&fit=crop']),
      basePrice: 29.99,
      featured: true,
      variants: [
        { name: '10mg x 28 tablets', strength: '10mg', quantity: 28, price: 29.99, compareAtPrice: 39.99, stock: 50 },
        { name: '10mg x 56 tablets', strength: '10mg', quantity: 56, price: 54.99, compareAtPrice: 69.99, stock: 30 },
        { name: '10mg x 84 tablets', strength: '10mg', quantity: 84, price: 79.99, compareAtPrice: 99.99, stock: 20 },
      ],
    },
    {
      name: 'Calmora 5mg',
      slug: 'calmora-5mg',
      description: 'Calmora is prescribed for the treatment of generalized anxiety disorder and short-term relief of anxiety symptoms. It provides gentle but effective relief from tension and worry.',
      shortDescription: 'Gentle relief for everyday anxiety',
      categorySlug: 'anxiety-depression',
      images: JSON.stringify(['https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=600&fit=crop']),
      basePrice: 24.99,
      featured: false,
      variants: [
        { name: '5mg x 28 tablets', strength: '5mg', quantity: 28, price: 24.99, compareAtPrice: null, stock: 40 },
        { name: '5mg x 56 tablets', strength: '5mg', quantity: 56, price: 44.99, compareAtPrice: null, stock: 25 },
      ],
    },
    {
      name: 'Moodlift 20mg',
      slug: 'moodlift-20mg',
      description: 'Moodlift is an antidepressant medication used to treat major depressive disorder and anxiety. It helps restore the balance of serotonin in the brain to improve mood and feelings of well-being.',
      shortDescription: 'Effective treatment for depression',
      categorySlug: 'anxiety-depression',
      images: JSON.stringify(['https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=600&fit=crop']),
      basePrice: 34.99,
      featured: true,
      variants: [
        { name: '20mg x 28 tablets', strength: '20mg', quantity: 28, price: 34.99, compareAtPrice: 44.99, stock: 35 },
        { name: '20mg x 56 tablets', strength: '20mg', quantity: 56, price: 64.99, compareAtPrice: 79.99, stock: 20 },
      ],
    },
    // Sleeping Pills
    {
      name: 'Dreamwell 7.5mg',
      slug: 'dreamwell-7-5mg',
      description: 'Dreamwell is a sleeping pill prescribed for the short-term treatment of insomnia. It helps you fall asleep faster and stay asleep longer, ensuring a restful nights sleep.',
      shortDescription: 'Fast-acting sleep aid for insomnia',
      categorySlug: 'sleeping-pills',
      images: JSON.stringify(['https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&h=600&fit=crop']),
      basePrice: 27.99,
      featured: true,
      variants: [
        { name: '7.5mg x 14 tablets', strength: '7.5mg', quantity: 14, price: 27.99, compareAtPrice: 34.99, stock: 45 },
        { name: '7.5mg x 28 tablets', strength: '7.5mg', quantity: 28, price: 49.99, compareAtPrice: 59.99, stock: 30 },
      ],
    },
    {
      name: 'Restora 10mg',
      slug: 'restora-10mg',
      description: 'Restora is used for the management of insomnia characterized by difficulties with sleep initiation. It promotes natural sleep patterns and helps maintain sleep through the night.',
      shortDescription: 'Natural sleep pattern restoration',
      categorySlug: 'sleeping-pills',
      images: JSON.stringify(['https://images.unsplash.com/photo-1515894203077-9cd36032142f?w=600&h=600&fit=crop']),
      basePrice: 32.99,
      featured: false,
      variants: [
        { name: '10mg x 14 tablets', strength: '10mg', quantity: 14, price: 32.99, compareAtPrice: null, stock: 40 },
        { name: '10mg x 28 tablets', strength: '10mg', quantity: 28, price: 59.99, compareAtPrice: null, stock: 25 },
      ],
    },
    // Pain Relief
    {
      name: 'Painex 30/500',
      slug: 'painex-30-500',
      description: 'Painex is a compound painkiller containing codeine and paracetamol. It is used for the relief of moderate to severe pain when other painkillers have not been effective.',
      shortDescription: 'Powerful compound painkiller',
      categorySlug: 'pain-relief',
      images: JSON.stringify(['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=600&fit=crop']),
      basePrice: 19.99,
      featured: true,
      variants: [
        { name: '30/500 x 28 tablets', strength: '30/500mg', quantity: 28, price: 19.99, compareAtPrice: 24.99, stock: 60 },
        { name: '30/500 x 56 tablets', strength: '30/500mg', quantity: 56, price: 34.99, compareAtPrice: 44.99, stock: 40 },
        { name: '30/500 x 100 tablets', strength: '30/500mg', quantity: 100, price: 59.99, compareAtPrice: 74.99, stock: 25 },
      ],
    },
    {
      name: 'Tramix 50mg',
      slug: 'tramix-50mg',
      description: 'Tramix is used to treat moderate to moderately severe pain. It works by changing how your brain senses pain, providing effective relief for various painful conditions.',
      shortDescription: 'Effective moderate pain relief',
      categorySlug: 'pain-relief',
      images: JSON.stringify(['https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&h=600&fit=crop']),
      basePrice: 24.99,
      featured: false,
      variants: [
        { name: '50mg x 30 capsules', strength: '50mg', quantity: 30, price: 24.99, compareAtPrice: null, stock: 50 },
        { name: '50mg x 60 capsules', strength: '50mg', quantity: 60, price: 44.99, compareAtPrice: null, stock: 35 },
      ],
    },
    // Men's Health
    {
      name: 'Vigormax 100mg',
      slug: 'vigormax-100mg',
      description: 'Vigormax is used to treat erectile dysfunction in men. It works by increasing blood flow to the penis to help achieve and maintain an erection during sexual stimulation.',
      shortDescription: 'Leading ED treatment',
      categorySlug: 'mens-health',
      images: JSON.stringify(['https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=600&fit=crop']),
      basePrice: 14.99,
      featured: true,
      variants: [
        { name: '100mg x 4 tablets', strength: '100mg', quantity: 4, price: 14.99, compareAtPrice: 19.99, stock: 80 },
        { name: '100mg x 8 tablets', strength: '100mg', quantity: 8, price: 24.99, compareAtPrice: 34.99, stock: 60 },
        { name: '100mg x 16 tablets', strength: '100mg', quantity: 16, price: 44.99, compareAtPrice: 59.99, stock: 40 },
        { name: '100mg x 32 tablets', strength: '100mg', quantity: 32, price: 79.99, compareAtPrice: 99.99, stock: 25 },
      ],
    },
    {
      name: 'Endura 20mg',
      slug: 'endura-20mg',
      description: 'Endura provides long-lasting treatment for erectile dysfunction. With effects lasting up to 36 hours, it offers more spontaneity compared to other ED treatments.',
      shortDescription: 'Long-lasting ED treatment - up to 36 hours',
      categorySlug: 'mens-health',
      images: JSON.stringify(['https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?w=600&h=600&fit=crop']),
      basePrice: 19.99,
      featured: true,
      variants: [
        { name: '20mg x 4 tablets', strength: '20mg', quantity: 4, price: 19.99, compareAtPrice: 24.99, stock: 70 },
        { name: '20mg x 8 tablets', strength: '20mg', quantity: 8, price: 34.99, compareAtPrice: 44.99, stock: 50 },
        { name: '20mg x 16 tablets', strength: '20mg', quantity: 16, price: 59.99, compareAtPrice: 79.99, stock: 30 },
      ],
    },
    // Weight Loss
    {
      name: 'Slimora 120mg',
      slug: 'slimora-120mg',
      description: 'Slimora is a weight loss medication that works by preventing your body from absorbing some of the fat from the food you eat. It should be used alongside a reduced-calorie diet.',
      shortDescription: 'Clinically proven weight loss aid',
      categorySlug: 'weight-loss',
      images: JSON.stringify(['https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=600&fit=crop']),
      basePrice: 39.99,
      featured: true,
      variants: [
        { name: '120mg x 42 capsules', strength: '120mg', quantity: 42, price: 39.99, compareAtPrice: 49.99, stock: 35 },
        { name: '120mg x 84 capsules', strength: '120mg', quantity: 84, price: 69.99, compareAtPrice: 89.99, stock: 25 },
      ],
    },
    {
      name: 'Leanex 60mg',
      slug: 'leanex-60mg',
      description: 'Leanex is an over-the-counter weight loss aid suitable for adults with a BMI of 28 or more. It helps reduce the absorption of dietary fat to support your weight loss goals.',
      shortDescription: 'OTC weight management support',
      categorySlug: 'weight-loss',
      images: JSON.stringify(['https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=600&h=600&fit=crop']),
      basePrice: 29.99,
      featured: false,
      variants: [
        { name: '60mg x 42 capsules', strength: '60mg', quantity: 42, price: 29.99, compareAtPrice: null, stock: 45 },
        { name: '60mg x 84 capsules', strength: '60mg', quantity: 84, price: 54.99, compareAtPrice: null, stock: 30 },
      ],
    },
  ]

  // Create products
  for (const productData of products) {
    const { variants, categorySlug, ...product } = productData
    const category = categories.find((c) => c.slug === categorySlug)

    if (!category) continue

    const createdProduct = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        images: product.images,
      },
      create: {
        ...product,
        categoryId: category.id,
      },
    })

    // Create variants
    for (const variant of variants) {
      await prisma.productVariant.upsert({
        where: {
          id: `${createdProduct.id}-${variant.name.replace(/\s+/g, '-').toLowerCase()}`,
        },
        update: {},
        create: {
          id: `${createdProduct.id}-${variant.name.replace(/\s+/g, '-').toLowerCase()}`,
          productId: createdProduct.id,
          ...variant,
        },
      })
    }

    // Update category product count
    await prisma.category.update({
      where: { id: category.id },
      data: {
        productCount: {
          increment: 1,
        },
      },
    })

    console.log(`Created product: ${product.name}`)
  }

  // Create testimonials
  const testimonials = [
    {
      name: 'Sarah M.',
      rating: 5,
      comment: 'Excellent service! My order arrived quickly and was very discreet. Will definitely order again.',
      approved: true,
    },
    {
      name: 'James P.',
      rating: 5,
      comment: 'Very professional pharmacy. Great prices and the customer service team was really helpful.',
      approved: true,
    },
    {
      name: 'Emma L.',
      rating: 5,
      comment: 'Fast delivery and genuine products. The packaging was very discreet which I appreciated.',
      approved: true,
    },
    {
      name: 'Michael R.',
      rating: 4,
      comment: 'Good selection of products at competitive prices. Delivery was quick and hassle-free.',
      approved: true,
    },
  ]

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial,
    })
  }

  console.log(`Created ${testimonials.length} testimonials`)

  // Create a demo user
  const demoPassword = await hash('demo123', 12)
  await prisma.user.upsert({
    where: { email: 'demo@pharma.co' },
    update: {},
    create: {
      email: 'demo@pharma.co',
      name: 'Demo User',
      password: demoPassword,
    },
  })

  console.log('Created demo user: demo@pharma.co / demo123')

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
