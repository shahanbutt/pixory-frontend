'use client'

import { useState, useEffect } from 'react'

export default function Quality() {
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
          {/* Left Section - Stacked Photobooks Image */}
          <div className="flex justify-center md:justify-start order-1 md:order-1">
            <img 
              src="/images/home-page/Beautiful quality.jpg" 
              alt="Beautiful Quality Photobooks"
              className="w-full max-w-md md:max-w-lg h-auto object-cover rounded-lg"
            />
          </div>

          {/* Right Section - Text Content */}
          <div className="text-center md:text-left order-2 md:order-2">
            {/* High Quality Prints Tag */}
            <div className="mb-6 md:mb-8">
              <div className="inline-flex items-center bg-black text-white px-4 py-2 rounded-full">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                High Quality Prints
              </div>
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-black mb-6 md:mb-8 leading-tight">
              beautiful quality<br />
              for beautiful moments
            </h2>
            
            {/* Description */}
            <p className="text-base md:text-lg text-black leading-relaxed max-w-2xl mx-auto md:mx-0">
              Preserve your cherished moments in a beautifully crafted photobook that captures the essence of your adventures.
            </p>
          </div>
        </div>
      </div>
      {showLabels && (
        <div className="absolute bottom-6 left-6 text-xs font-bold text-black">QUALITY</div>
      )}
    </section>
  )
}