'use client'

import { useState, useEffect } from 'react'

export default function TrustpilotRating() {
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

  const testimonials = [
    {
      name: "Maria T.",
      rating: 5,
      text: "Absolutely love my photobook! The quality is amazing and the design process was so easy.",
      product: "PARIS 2023"
    },
    {
      name: "Sarah H.", 
      rating: 5,
      text: "Perfect way to preserve our family vacation memories. Highly recommend!",
      product: "BALI"
    }
  ]

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-4 bg-green-50 px-8 py-4 rounded-full mb-8">
            <div className="flex text-green-500">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-green-700 font-semibold text-lg">Rated 'Excellent' on Trustpilot</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
            Loved by thousands of PrintiQue fans!
          </h2>
        </div>

        {/* Customer Photos */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            { name: "MONTREAL", icon: "☀️", image: "/images/dubai-min.jpg" },
            { name: "BAHAMAS", icon: "⭐", image: "/images/dubai-min.jpg" },
            { name: "BALI", icon: "🌸", image: "/images/dubai-min.jpg" }
          ].map((customer, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-4">
                <img 
                  src={customer.image} 
                  alt={`Customer with ${customer.name} photobook`}
                  className="w-full h-64 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow"
                />
                <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="text-2xl">{customer.icon}</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white bg-opacity-90 rounded px-3 py-2">
                    <div className="font-bold text-black">{customer.name}</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center text-yellow-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-600 italic">"Amazing quality and fast delivery!"</p>
            </div>
          ))}
        </div>

        {/* Featured Testimonials */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="font-semibold text-black">{testimonial.name}</span>
              </div>
              <p className="text-gray-700 mb-3">"{testimonial.text}"</p>
              <div className="text-sm text-gray-500">
                <span className="font-medium">{testimonial.product}</span> • 2 days ago
              </div>
            </div>
          ))}
        </div>
      </div>
      {showLabels && (
        <div className="absolute bottom-6 left-6 text-xs font-bold text-black">TRUSTPILOT RATING</div>
      )}
    </section>
  )
}
