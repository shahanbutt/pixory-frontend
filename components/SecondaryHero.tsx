'use client'

import { useState, useEffect } from 'react'

export default function SecondaryHero() {
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
    <section className="py-12 md:py-20 px-4 md:px-6 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Section - Text Content */}
          <div className="text-center md:text-left order-2 md:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-black mb-6 md:mb-8 leading-tight">
              Preserve Your<br />
              Adventures in<br />
              Stunning<br />
              Photobooks
            </h2>
            
            <p className="text-base md:text-xl text-gray-600 mb-8 md:mb-12 leading-relaxed max-w-2xl mx-auto md:mx-0">
              PrintiQue's travel books capture the emotional essence of your journeys, transforming them into beautiful keepsakes that will last a lifetime. Each book is meticulously crafted to reflect the unique aesthetic and sentimental value of your experiences.
            </p>

            <div className="flex justify-center md:justify-start">
              <a href="/shop-all" className="bg-black text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:bg-gray-800 transition-colors">
                Start My Design
              </a>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="flex justify-center md:justify-end order-1 md:order-2">
            <img 
              src="/images/home-page/secondary-hero.jpg" 
              alt="Beautiful photobook showcasing travel memories"
              className="rounded-lg shadow-lg max-w-full h-auto w-full max-w-md md:max-w-lg"
            />
          </div>
        </div>
      </div>
      {showLabels && (
        <div className="absolute bottom-6 left-6 text-xs font-bold text-black">SECONDARY HERO</div>
      )}
    </section>
  )
}
