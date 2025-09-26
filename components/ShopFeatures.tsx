'use client'

import { useState, useEffect } from 'react'

export default function ShopFeatures() {
  const [showLabels, setShowLabels] = useState(true)

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

  const features = [
    {
      icon: '/images/autocreate.jpg',
      title: 'Auto-Create',
      description: 'Let our AI create the perfect layout for your photos automatically'
    },
    {
      icon: '/images/customize.jpg', 
      title: 'Customize',
      description: 'Fine-tune every detail with our intuitive design tools'
    },
    {
      icon: '/images/meticulous-craftsmanship.jpg',
      title: 'Premium Quality',
      description: 'Professional printing and binding for lasting memories'
    },
    {
      icon: '/images/Truck.jpg',
      title: 'Fast Delivery',
      description: 'Quick turnaround times to get your photobooks fast'
    }
  ]

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
            Why Choose PrintiQue?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the difference with our premium photobook creation process
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                  <img 
                    src={feature.icon} 
                    alt={feature.title}
                    className="w-12 h-12 object-contain"
                  />
                </div>
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      {showLabels && (
        <div className="absolute bottom-6 left-6 text-xs font-bold text-black">SHOP FEATURES</div>
      )}
    </section>
  )
}
