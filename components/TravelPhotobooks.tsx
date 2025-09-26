'use client'

import { useState, useEffect } from 'react'

export default function TravelPhotobooks() {
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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
              Travel photobooks that transport you back
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Every journey tells a story. Our travel photobooks capture the essence of your adventures, 
              preserving those precious moments that make travel so special. From bustling city streets 
              to serene beach sunsets, transform your photos into a beautiful keepsake that will last a lifetime.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img src="/images/ShieldCheck.jpg" alt="Check" className="w-5 h-5" />
                <span className="text-gray-700">Premium quality materials</span>
              </div>
              <div className="flex items-center space-x-3">
                <img src="/images/ShieldCheck.jpg" alt="Check" className="w-5 h-5" />
                <span className="text-gray-700">Professional printing</span>
              </div>
              <div className="flex items-center space-x-3">
                <img src="/images/ShieldCheck.jpg" alt="Check" className="w-5 h-5" />
                <span className="text-gray-700">Easy customization</span>
              </div>
            </div>

            <div className="mt-8">
              <button className="bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors">
                Start Your Travel Book
              </button>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img 
                src="/images/emotionalessence.jpg" 
                alt="Open travel photobook showing beach memories"
                className="w-full max-w-md rounded-lg shadow-xl"
              />
              {/* Floating elements to show the book is open */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded"></div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showLabels && (
        <div className="absolute bottom-6 left-6 text-xs font-bold text-black">TRAVEL PHOTOBOOKS</div>
      )}
    </section>
  )
}
