'use client'

import { useState, useEffect } from 'react'

export default function Process() {
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
        {/* Top Section - Title and Description */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start mb-12 md:mb-20">
          {/* Left - Main Heading */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-black mb-6 md:mb-8 leading-tight">
              it's easy as 1, 2, 3 to create your photobook
            </h2>
          </div>
          
          {/* Right - Description */}
          <div className="text-center md:text-left">
            <p className="text-base md:text-lg text-black leading-relaxed">
              With PrintiQue, you can easily transform your holiday photos into a stunning photobook that captures the essence of your journey. Simply upload your images, customize the layout, and add captions to create a unique keepsake that will transport you back to those special moments.
            </p>
          </div>
        </div>

        {/* Bottom Section - Three Steps */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {/* Step 1 - Choose Your Template */}
          <div className="text-center">
            <div className="mb-6 md:mb-8">
              <img 
                src="/images/templage.jpg" 
                alt="Choose Your Template"
                className="w-full max-w-sm mx-auto h-auto object-cover rounded-lg"
              />
            </div>
            
            <h3 className="text-lg md:text-xl font-bold text-black mb-3 md:mb-4">1. CHOOSE YOUR TEMPLATE</h3>
            <p className="text-black leading-relaxed text-sm md:text-base">
              You can fully customize every template in our easy to use editor online! No app needed!
            </p>
          </div>

          {/* Step 2 - Upload Your Photos */}
          <div className="text-center">
            <div className="mb-6 md:mb-8">
              <img 
                src="/images/autocreate.jpg" 
                alt="Upload Your Photos"
                className="w-full max-w-sm mx-auto h-auto object-cover rounded-lg"
              />
            </div>
            
            <h3 className="text-lg md:text-xl font-bold text-black mb-3 md:mb-4">2. UPLOAD YOUR PHOTOS</h3>
            <p className="text-black leading-relaxed text-sm md:text-base">
              We'll instantly organize your photos into a cohesive, well-designed story. You can also use Auto Create for faster uploads!
            </p>
          </div>

          {/* Step 3 - Customize Your Book */}
          <div className="text-center sm:col-span-2 md:col-span-1">
            <div className="mb-6 md:mb-8">
              <img 
                src="/images/customize.jpg" 
                alt="Customize Your Book"
                className="w-full max-w-sm mx-auto h-auto object-cover rounded-lg"
              />
            </div>
            
            <h3 className="text-lg md:text-xl font-bold text-black mb-3 md:mb-4">3. CUSTOMIZE YOUR BOOK</h3>
            <p className="text-black leading-relaxed text-sm md:text-base">
              Easily change fonts, backgrounds, colors, shapes, stickers, and more to make it truly yours and memorable!
            </p>
          </div>
        </div>
      </div>
      {showLabels && (
        <div className="absolute bottom-6 left-6 text-xs font-bold text-black">PROCESS</div>
      )}
    </section>
  )
}