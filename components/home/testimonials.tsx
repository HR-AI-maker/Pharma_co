import { Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    rating: 5,
    comment: 'Excellent service! My order arrived quickly and was very discreet. Will definitely order again.',
  },
  {
    id: 2,
    name: 'James P.',
    rating: 5,
    comment: 'Very professional pharmacy. Great prices and the customer service team was really helpful.',
  },
  {
    id: 3,
    name: 'Emma L.',
    rating: 5,
    comment: 'Fast delivery and genuine products. The packaging was very discreet which I appreciated.',
  },
  {
    id: 4,
    name: 'Michael R.',
    rating: 4,
    comment: 'Good selection of products at competitive prices. Delivery was quick and hassle-free.',
  },
]

export function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our customers have to say about us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-muted rounded-xl p-6 hover:shadow-card transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-foreground mb-4 line-clamp-4">
                &ldquo;{testimonial.comment}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">Verified Customer</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="font-medium">4.8/5 Average Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">10,000+</span>
            <span>Happy Customers</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-secondary">99%</span>
            <span>Satisfaction Rate</span>
          </div>
        </div>
      </div>
    </section>
  )
}
