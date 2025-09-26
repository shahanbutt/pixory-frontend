'use client'

import { useState, useEffect } from 'react'

export default function HowItWorks() {
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
        <div className="text-center">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
            See how it works
          </h2>
          
          {/* Video */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-4xl">
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.youtube.com/embed/XhclzJS_Jqo"
                  title="How It Works Video"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showLabels && (
        <div className="absolute bottom-6 left-6 text-xs font-bold text-black">HOW IT WORKS</div>
      )}
    </section>
  )
}
