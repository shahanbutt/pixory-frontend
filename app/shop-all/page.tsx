import Navigation from '@/components/Navigation'
import ProductHero from '@/components/ProductHero'
import HowItWorks from '@/components/HowItWorks'
import TravelPhotobooks from '@/components/TravelPhotobooks'
import DestinationStories from '@/components/DestinationStories'
import TrustpilotRating from '@/components/TrustpilotRating'
import CustomerReviews from '@/components/CustomerReviews'
import Footer from '@/components/Footer'

export default function ShopAll() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <ProductHero />
      <HowItWorks />
      <TravelPhotobooks />
      <DestinationStories />
      <TrustpilotRating />
      <CustomerReviews />
      <Footer />
    </main>
  )
}
