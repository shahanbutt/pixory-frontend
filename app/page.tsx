import Hero from '@/components/Hero'
import Navigation from '@/components/Navigation'
import Advantages from '@/components/Advantages'
import Process from '@/components/Process'
import Quality from '@/components/Quality'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Advantages />
      <Process />
      <Quality />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  )
}
