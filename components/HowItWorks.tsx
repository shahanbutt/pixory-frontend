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

  const steps = [
    {
      number: 1,
      title: "Choose your template",
      description: "Select from our beautiful collection of photobook templates",
      image: "/images/templage.jpg",
      example: "BALI"
    },
    {
      number: 2,
      title: "Add your photos",
      description: "Upload your favorite memories and let our AI arrange them perfectly",
      image: "/images/emotionalessence.jpg",
      example: "Travel Photos"
    },
    {
      number: 3,
      title: "Customize your photos",
      description: "Fine-tune layouts, add text, and make it uniquely yours",
      image: "/images/customize.jpg",
      example: "GREECE & IBIZA"
    }
  ]

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Video */}
          <div>
            <div className="relative bg-gray-200 rounded-lg overflow-hidden aspect-video">
              {/* Video placeholder - in real app, this would be a video element */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 5v10l8-5-8-5z"/>
                    </svg>
                  </div>
                  <p className="text-lg font-semibold">Watch How It Works</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-black mb-2">
                It's easy as 1,2,3 to create your photobook
              </h3>
              <p className="text-gray-600">
                Watch our quick tutorial to see how simple it is to create your perfect photobook
              </p>
            </div>
          </div>

          {/* Right Section - Steps */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                See how it works
              </h2>
              <p className="text-lg text-gray-600">
                Creating your perfect photobook is easier than you think
              </p>
            </div>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.number}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-black mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 mb-3">
                          {step.description}
                        </p>
                      </div>
                      
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <img 
                            src={step.image} 
                            alt={step.title}
                            className="w-20 h-20 object-cover rounded-lg shadow-md"
                          />
                          {step.example && (
                            <div className="absolute -bottom-2 -right-2 bg-white px-2 py-1 rounded shadow-md text-xs font-semibold text-black">
                              {step.example}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
