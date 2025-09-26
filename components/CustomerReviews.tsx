'use client'

import { useState, useEffect } from 'react'

export default function CustomerReviews() {
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

  const reviews = [
    {
      name: "Emma L.",
      rating: 5,
      date: "3 days ago",
      text: "Absolutely stunning! The quality exceeded my expectations.",
      product: "PARIS",
      productImage: "/images/dubai-min.jpg"
    },
    {
      name: "James M.",
      rating: 5,
      date: "1 week ago", 
      text: "Perfect way to preserve our honeymoon memories. Highly recommend!",
      product: "GREECE",
      productImage: "/images/dubai-min.jpg"
    },
    {
      name: "Sophie K.",
      rating: 5,
      date: "2 weeks ago",
      text: "The customization options are amazing. Love the final result!",
      product: "ROME",
      productImage: "/images/dubai-min.jpg"
    },
    {
      name: "David R.",
      rating: 5,
      date: "2 weeks ago",
      text: "Fast delivery and excellent quality. Will definitely order again.",
      product: "TOKYO",
      productImage: "/images/dubai-min.jpg"
    },
    {
      name: "Lisa P.",
      rating: 5,
      date: "3 weeks ago",
      text: "Beautiful photobook that captures our family vacation perfectly.",
      product: "BALI",
      productImage: "/images/dubai-min.jpg"
    },
    {
      name: "Michael T.",
      rating: 5,
      date: "1 month ago",
      text: "Great service and the book looks professional. Very happy!",
      product: "SYDNEY",
      productImage: "/images/dubai-min.jpg"
    }
  ]

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            What our customers say
          </h2>
          <p className="text-lg text-gray-600">
            Real reviews from real customers who love their PrintiQue photobooks
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <img 
                    src={review.productImage} 
                    alt={review.product}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  
                  <h3 className="font-semibold text-black mb-1">{review.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{review.product}</p>
                  <p className="text-gray-700 text-sm leading-relaxed">"{review.text}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors">
            Read More Reviews
          </button>
        </div>
      </div>
      {showLabels && (
        <div className="absolute bottom-6 left-6 text-xs font-bold text-black">CUSTOMER REVIEWS</div>
      )}
    </section>
  )
}
