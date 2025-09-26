'use client'

import { useState, useEffect } from 'react'

export default function DestinationStories() {
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

  const destinations = [
    {
      name: "SYDNEY",
      image: "/images/dubai-min.jpg",
      icon: "🏄",
      description: "Surf, sun, and unforgettable memories"
    },
    {
      name: "PARIS", 
      image: "/images/dubai-min.jpg",
      icon: "🗼",
      description: "Romance, culture, and timeless beauty"
    },
    {
      name: "BALI",
      image: "/images/dubai-min.jpg", 
      icon: "🌺",
      description: "Tropical paradise and spiritual journeys"
    }
  ]

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
              Every destination, a new story
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              From the bustling streets of Tokyo to the serene beaches of the Maldives, 
              every destination has its own unique story to tell. Create a collection of 
              photobooks that capture the essence of each place you've visited, building 
              a library of memories that will last forever.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌍</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">Global Collection</h3>
                  <p className="text-gray-600">Document your worldwide adventures</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">Story Library</h3>
                  <p className="text-gray-600">Build a collection of travel stories</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">Unique Designs</h3>
                  <p className="text-gray-600">Each destination gets its own special treatment</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button className="bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors">
                Explore Destinations
              </button>
            </div>
          </div>

          {/* Right Section - Destination Examples */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {destinations.map((destination, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow"
                  />
                  <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-full w-12 h-12 flex items-center justify-center">
                    <span className="text-2xl">{destination.icon}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white bg-opacity-90 rounded px-3 py-2">
                      <div className="font-bold text-black text-lg">{destination.name}</div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{destination.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showLabels && (
        <div className="absolute bottom-6 left-6 text-xs font-bold text-black">DESTINATION STORIES</div>
      )}
    </section>
  )
}
