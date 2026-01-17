import { Hero } from '@/components/home/hero'
import { MedicineSlider } from '@/components/home/medicine-slider'
import { Categories } from '@/components/home/categories'
import { FeaturedProducts } from '@/components/home/featured-products'
import { Testimonials } from '@/components/home/testimonials'
import { CtaBanner } from '@/components/home/cta-banner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <MedicineSlider />
      <Categories />
      <FeaturedProducts />
      <Testimonials />
      <CtaBanner />
    </>
  )
}
