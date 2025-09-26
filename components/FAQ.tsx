'use client'

import { useState, useEffect } from 'react'

interface FAQItem {
  question: string
  answer: string
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])
  const [faqData, setFaqData] = useState<FAQItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showLabels, setShowLabels] = useState(true)

  useEffect(() => {
    const fetchFAQData = async () => {
      try {
        const response = await fetch('/data/faq.json')
        const data = await response.json()
        setFaqData(data)
      } catch (error) {
        console.error('Error fetching FAQ data:', error)
        // Fallback data in case of error
        setFaqData([
          {
            question: "How Do I Order?",
            answer: "Please contact our support team for assistance with ordering."
          }
        ])
      } finally {
        setLoading(false)
      }
    }

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

    fetchFAQData()
    fetchSettings()
  }, [])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    )
  }

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 relative bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Section - FAQ Content */}
          <div className="order-2 md:order-1">
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 text-center md:text-left">faq</h2>
            
            {/* Description */}
            <p className="text-base md:text-lg text-black mb-8 md:mb-12 leading-relaxed text-center md:text-left">
              Find answers to commonly asked questions about PrintiQue photobooks and the creation process.
            </p>

            {/* FAQ Items */}
            <div className="space-y-0">
              {loading ? (
                <div className="text-center py-8">
                  <div className="text-gray-600">Loading FAQ...</div>
                </div>
              ) : (
                faqData.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 py-3 md:py-4">
                    <button 
                      className="w-full flex items-center justify-between text-left hover:bg-gray-50 p-2 rounded transition-colors"
                      onClick={() => toggleItem(index)}
                    >
                      <h3 className="text-base md:text-lg font-medium text-black pr-4 leading-tight">{faq.question}</h3>
                      <span className="text-xl md:text-2xl text-black flex-shrink-0">
                        {openItems.includes(index) ? '−' : '+'}
                      </span>
                    </button>
                    
                    {openItems.includes(index) && (
                      <div className="mt-3 md:mt-4 pl-2">
                        <p className="text-black leading-relaxed whitespace-pre-line text-sm md:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Section - FAQ Image */}
          <div className="flex justify-center md:justify-end order-1 md:order-2">
            <img 
              src="/images/faq.jpg" 
              alt="130+ Customisable Designs"
              className="w-full max-w-md md:max-w-lg h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
      {showLabels && (
        <div className="absolute bottom-6 left-6 text-xs font-bold text-black">FAQ</div>
      )}
    </section>
  )
}