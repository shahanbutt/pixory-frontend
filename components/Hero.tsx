'use client'

import { useState, useEffect } from 'react'

export default function Hero() {
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
    <section 
      className="py-12 md:py-20 px-4 md:px-6 relative bg-no-repeat bg-center flex items-center"
      style={{
        backgroundImage: "url('/images/hero-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        height: "60vh",
        minHeight: "500px"
      }}
    >
      <div className="max-w-4xl mx-auto text-center w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight px-4">
          Preserve Your Adventures in Beautiful Photobooks
        </h1>
        
        <p className="text-lg md:text-xl text-white mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
          PrintiQue allows you to create lasting keepsakes of your cherished moments. Transform your experiences into unforgettable stories.
        </p>

        <div className="flex justify-center mb-8 md:mb-16">
          <a href="/shop-all" className="bg-black text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:bg-gray-800 transition-colors">
            Start My Design
          </a>
        </div>

        <div className="mt-8 md:mt-16">
          <h2 className="text-lg md:text-2xl font-bold text-white mb-4">#1 Rated in Photo Books</h2>
        </div>
      </div>
      {showLabels && (
        <div className="absolute bottom-6 left-6 text-xs font-bold text-black">HERO</div>
      )}
    </section>
  )
}
