'use client'

import { useState, useEffect } from 'react'

export default function Advantages() {
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
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 relative bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Section - Photobook Image */}
          <div className="flex justify-center md:justify-start order-1 md:order-1">
            <img 
              src="/images/secondary-hero.jpg" 
              alt="Beautiful photobook showcasing travel memories"
              className="rounded-lg shadow-lg max-w-full h-auto w-full max-w-md md:max-w-lg"
            />
          </div>

          {/* Right Section - Advantages */}
          <div className="order-2 md:order-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-8 md:mb-16 text-center">Discover the PrintiQue Advantage</h2>
            
            <div className="bg-white rounded-lg p-6 md:p-12 shadow-lg">
              <div className="space-y-8 md:space-y-12">
                {/* Advantage 1 */}
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                      <img 
                        src="/images/emotionalessence.jpg" 
                        alt="Emotional Essence and Keepsakes"
                        className="w-12 h-12 md:w-16 md:h-16 object-cover rounded"
                      />
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg md:text-2xl font-bold text-black mb-3">Emotional Essence and Keepsakes</h3>
                    <p className="text-black leading-relaxed text-sm md:text-base">
                      Transform your cherished memories into lasting, beautiful photobooks.
                    </p>
                  </div>
                </div>

                {/* Advantage 2 */}
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                      <img 
                        src="/images/meticulous-craftsmanship.jpg" 
                        alt="Meticulous Craftsmanship"
                        className="w-12 h-12 md:w-16 md:h-16 object-cover rounded"
                      />
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg md:text-2xl font-bold text-black mb-3">Meticulous Craftsmanship</h3>
                    <p className="text-black leading-relaxed text-sm md:text-base">
                      Each book is meticulously designed to reflect the unique value of your experiences.
                    </p>
                  </div>
                </div>

                {/* Advantage 3 */}
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                      <img 
                        src="/images/highly-rate.jpg" 
                        alt="Highly Rated and Trusted"
                        className="w-12 h-12 md:w-16 md:h-16 object-cover rounded"
                      />
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg md:text-2xl font-bold text-black mb-3">Highly Rated and Trusted</h3>
                    <p className="text-black leading-relaxed text-sm md:text-base">
                      Rated #1 in photo books with over 10,000 happy customers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showLabels && (
        <div className="absolute bottom-6 left-6 text-xs font-bold text-black">ADVANTAGES</div>
      )}
    </section>
  )
}