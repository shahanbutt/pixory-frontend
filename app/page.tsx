import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import SecondaryHero from '@/components/SecondaryHero'
import Advantages from '@/components/Advantages'
import Process from '@/components/Process'
import Quality from '@/components/Quality'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <SecondaryHero />
      <Advantages />
      <Process />
      <Quality />
      <FAQ />
      <Footer />
    </div>
  )
}
