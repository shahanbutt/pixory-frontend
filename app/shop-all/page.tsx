import Navigation from '@/components/Navigation'
import SecondaryHero from '@/components/SecondaryHero'
import ProductShowcase from '@/components/ProductShowcase'
import ShopFeatures from '@/components/ShopFeatures'
import Process from '@/components/Process'
import Quality from '@/components/Quality'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'

export default function ShopAll() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <SecondaryHero />
      <ProductShowcase />
      <ShopFeatures />
      <Process />
      <Quality />
      <Testimonials />
      <Footer />
    </main>
  )
}
