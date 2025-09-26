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
      name: "Christine",
      title: "Absolutely stunning!",
      text: "Just got my Pixory photobook and it's absolutely stunning! It looks so stylish on my coffee table and really complements my decor. I've been showing it off to everyone and have already recommended it to my friends—it's a must-have for anyone who loves beautiful keepsakes!",
      image: "/images/shop-all/product-hero/review1.jpg",
      product: "MONTREAL 2023"
    },
    {
      name: "Ella S",
      title: "The perfect way to relive my travels",
      text: "I'm obsessed with my photobooks from Pixory! They're the perfect way to relive my travels and I already can't wait to make another after my next trip. The quality is stunning and I love how I could fully customise the design to fit my aesthetic. It's the perfect addition to my coffee table!",
      image: "/images/shop-all/product-hero/review2.jpg",
      product: "BALI 2024"
    },
    {
      name: "Sienna",
      title: "The process was super easy",
      text: "So excited to share my Pixory photobook from my last vacation! 🌴🌊 It turned out even better than I imagined. The process was super easy and the book is absolutely gorgeous. Highly recommend for any travel lover!",
      image: "/images/shop-all/product-hero/review3.jpg",
      product: "BAHAMAS 2024"
    }
  ]

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Header with stars and rating */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center space-x-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-6 h-6 fill-black" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-gray-600 ml-2">Rated 4.4/5 based on +1475 reviews</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
            loved by thousands of pixory fans!
          </h2>
        </div>

        {/* Three Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              {/* Customer Image */}
              <div className="mb-4">
                <img 
                  src={testimonial.image} 
                  alt={`${testimonial.name} with photobook`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              
              {/* Stars */}
              <div className="flex text-black mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-black mb-3">
                {testimonial.title}
              </h3>

              {/* Review Text */}
              <p className="text-gray-700 mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Reviewer Name with Checkmark */}
              <div className="flex items-center">
                <span className="font-semibold text-black">{testimonial.name}</span>
                <svg className="w-4 h-4 text-black ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
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
