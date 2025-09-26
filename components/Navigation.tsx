'use client'

import { useState, useEffect } from 'react'

export default function Navigation() {
  const [showLabels, setShowLabels] = useState(true)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/data/settings.json')
        const settings = await response.json()
        setShowLabels(settings.showSectionLabels)
      } catch (error) {
        console.error('Error fetching settings:', error)
        setShowLabels(true) // Default to showing labels
      }
    }

    fetchSettings()
  }, [])
  return (
    <nav className="px-6 py-4 border-b border-gray-200 relative">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">
          {/* Left side - Navigation links */}
          <div className="flex items-center space-x-8">
            <a href="/" className="text-gray-600 hover:text-black transition-colors">Home</a>
            <a href="/shop-all" className="text-gray-600 hover:text-black transition-colors">Shop All</a>
            <a href="#about" className="text-gray-600 hover:text-black transition-colors">About</a>
            <a href="#faq" className="text-gray-600 hover:text-black transition-colors">FAQ</a>
          </div>

          {/* Center - Logo */}
          <div className="flex items-center justify-center flex-1">
            <span className="text-2xl font-bold text-black">PrintiQue</span>
          </div>

          {/* Right side - Account and Cart */}
          <div className="flex items-center space-x-4">
            <button className="hover:opacity-80 transition-opacity">
              <img 
                src="/images/user.jpg" 
                alt="My Account" 
                className="w-6 h-6 object-cover"
              />
            </button>
            <button className="hover:opacity-80 transition-opacity">
              <img 
                src="/images/shopping-cart.jpg" 
                alt="Shopping Cart" 
                className="w-6 h-6 object-cover"
              />
            </button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex md:hidden items-center justify-between">
          {/* Mobile Menu Button */}
          <button 
            className="text-gray-600 hover:text-black transition-colors p-2"
            onClick={() => alert('Mobile menu clicked!')}
            type="button"
            aria-label="Open mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Center - Logo */}
          <span className="text-lg font-bold text-black">PrintiQue</span>

          {/* Right side - Account and Cart */}
          <div className="flex items-center space-x-2">
            <button className="hover:opacity-80 transition-opacity p-1">
              <img 
                src="/images/user.jpg" 
                alt="My Account" 
                className="w-5 h-5 object-cover"
              />
            </button>
            <button className="hover:opacity-80 transition-opacity p-1">
              <img 
                src="/images/shopping-cart.jpg" 
                alt="Shopping Cart" 
                className="w-5 h-5 object-cover"
              />
            </button>
          </div>
        </div>
      </div>
      {showLabels && (
        <div className="absolute bottom-2 left-6 text-xs font-bold text-black">NAVIGATION</div>
      )}
    </nav>
  )
}
