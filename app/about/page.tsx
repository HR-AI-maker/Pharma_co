import { Metadata } from 'next'
import Image from 'next/image'
import { Shield, Truck, Clock, Award, Users, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | Pharma.co',
  description: 'Learn about Pharma.co - Your trusted online pharmacy delivering quality medications across the UK.',
}

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'All our products are sourced from licensed suppliers and undergo strict quality checks.',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'We offer next-day delivery options and free shipping on orders over £50.',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Our customer support team is always available to help with your queries.',
    },
    {
      icon: Award,
      title: 'Licensed Pharmacy',
      description: 'We are a fully licensed UK pharmacy regulated by the MHRA.',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Our team includes qualified pharmacists ready to provide expert advice.',
    },
    {
      icon: Heart,
      title: 'Patient Care',
      description: 'Your health and wellbeing are at the heart of everything we do.',
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary-50 to-primary-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              About Pharma.co
            </h1>
            <p className="text-lg text-muted-foreground">
              We are a trusted online pharmacy dedicated to providing quality medications
              with fast, discreet delivery across the United Kingdom.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2020, Pharma.co was born from a simple idea: to make
                  healthcare more accessible. We believe everyone deserves convenient
                  access to quality medications without the hassle of traditional pharmacies.
                </p>
                <p>
                  Our team of qualified pharmacists and healthcare professionals work
                  tirelessly to ensure you receive the best service possible. We source
                  all our products from licensed UK suppliers and maintain strict quality
                  control standards.
                </p>
                <p>
                  With thousands of satisfied customers across the UK, we have built
                  a reputation for reliability, discretion, and excellent customer service.
                  Your health is our priority, and we are committed to supporting your
                  wellbeing journey.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=600&h=400&fit=crop"
                alt="Pharmacy team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything we do is guided by our commitment to providing the best
              possible healthcare experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-xl p-6 hover:shadow-card transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">10,000+</p>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-secondary mb-2">500+</p>
              <p className="text-muted-foreground">Products</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-success mb-2">99%</p>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">24/7</p>
              <p className="text-muted-foreground">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience Better Healthcare?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Pharma.co for their
            healthcare needs.
          </p>
          <a
            href="/shop"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </a>
        </div>
      </section>
    </div>
  )
}
