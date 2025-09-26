'use client'

import { useState, useEffect } from 'react'

interface Product {
  id: string
  name: string
  description: string
  image: string
  price: string
  features: string[]
}

export default function ProductShowcase() {
  const [showLabels, setShowLabels] = useState(true)
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Travel Memories',
      description: 'Capture your adventures with our premium travel photobook collection',
      image: '/images/dubai-min.jpg',
      price: 'From $29.99',
      features: ['Premium Quality', 'Custom Layouts', 'Fast Delivery']
    },
    {
      id: '2', 
      name: 'Wedding Collection',
      description: 'Preserve your special day with our elegant wedding photobooks',
      image: '/images/Beautiful quality.jpg',
      price: 'From $39.99',
      features: ['Luxury Materials', 'Professional Design', 'Lifetime Guarantee']
    },
    {
      id: '3',
      name: 'Family Moments',
      description: 'Create lasting memories with our family photobook series',
      image: '/images/emotionalessence.jpg',
      price: 'From $24.99',
      features: ['Durable Binding', 'High Resolution', 'Easy Customization']
    }
  ])

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/data/settings.json')
        const settings = await response.json()
        setShowLabels(settings.showSectionLabels)
      } catch (error) {
        console.error('Error fetching settings:', error)
        setShowLabels(true)
      }
    }

    fetchSettings()
  }, [])

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
            Choose Your Perfect Photobook
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our range of premium photobooks designed to preserve your most precious memories
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-w-16 aspect-h-12">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-black mb-3">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="mb-6">
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <img 
                          src="/images/ShieldCheck.jpg" 
                          alt="Check" 
                          className="w-4 h-4 mr-2 object-contain"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-black">{product.price}</span>
                  <button className="bg-black text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors">
                    Start Design
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showLabels && (
        <div className="absolute bottom-6 left-6 text-xs font-bold text-black">PRODUCT SHOWCASE</div>
      )}
    </section>
  )
}
