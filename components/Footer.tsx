'use client'

import { useState, useEffect } from 'react'

export default function Footer() {
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
    <footer className="bg-gray-100 py-12 md:py-16 px-4 md:px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Three Column Features Section */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Fast Shipping */}
          <div className="text-center">
            <div className="flex justify-center mb-4 md:mb-6">
              <img 
                src="/images/home-page/Truck.jpg" 
                alt="Fast Shipping"
                className="w-12 h-12 md:w-16 md:h-16 object-contain"
              />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-black mb-3 md:mb-4">Fast Shipping</h3>
            <p className="text-black leading-relaxed text-sm md:text-base">
              Get your photobooks delivered quickly and efficiently. We ensure prompt delivery so you can enjoy your memories without delay.
            </p>
          </div>

          {/* 100% Satisfaction Guarantee */}
          <div className="text-center">
            <div className="flex justify-center mb-4 md:mb-6">
              <img 
                src="/images/home-page/ShieldCheck.jpg" 
                alt="100% Satisfaction Guarantee"
                className="w-12 h-12 md:w-16 md:h-16 object-contain"
              />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-black mb-3 md:mb-4">100% Satisfaction Guarantee</h3>
            <p className="text-black leading-relaxed text-sm md:text-base">
              We stand by the quality of our photobooks. If you're not completely satisfied, we'll make it right with our satisfaction guarantee.
            </p>
          </div>

          {/* 100,000+ Happy Customers */}
          <div className="text-center sm:col-span-2 md:col-span-1">
            <div className="flex justify-center mb-4 md:mb-6">
              <img 
                src="/images/home-page/Star.jpg" 
                alt="100,000+ Happy Customers"
                className="w-12 h-12 md:w-16 md:h-16 object-contain"
              />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-black mb-3 md:mb-4">100,000+ Happy Customers</h3>
            <p className="text-black leading-relaxed text-sm md:text-base">
              Join our community of satisfied customers who have preserved their adventures with PrintiQue. Your memories are in good hands.
            </p>
          </div>
        </div>

        {/* Contact and Social Media Section */}
        <div className="border-t border-gray-300 pt-6 md:pt-8 mb-6 md:mb-8">
          <div className="text-center">
            {/* Contact Section */}
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-black mb-3 md:mb-4">Contact Us</h3>
              <p className="text-black mb-2 text-sm md:text-base">Get in touch with our support team</p>
              <a 
                href="mailto:support@printique.com" 
                className="text-black hover:text-gray-600 transition-colors font-medium text-sm md:text-base"
              >
                support@printique.com
              </a>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center space-x-3 md:space-x-4">
              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden hover:opacity-80 transition-opacity"
              >
                <img 
                  src="/images/home-page/facebook.jpg" 
                  alt="Facebook" 
                  className="w-full h-full object-cover"
                />
              </a>

              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden hover:opacity-80 transition-opacity"
              >
                <img 
                  src="/images/home-page/instagram.jpg" 
                  alt="Instagram" 
                  className="w-full h-full object-cover"
                />
              </a>

              {/* WhatsApp */}
              <a 
                href="https://wa.me/971585852977" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden hover:opacity-80 transition-opacity"
              >
                <img 
                  src="/images/home-page/whatsapp.jpg" 
                  alt="WhatsApp" 
                  className="w-full h-full object-cover"
                />
              </a>

              {/* LinkedIn */}
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden hover:opacity-80 transition-opacity"
              >
                <img 
                  src="/images/home-page/linkedin.jpg" 
                  alt="LinkedIn" 
                  className="w-full h-full object-cover"
                />
              </a>

              {/* YouTube */}
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden hover:opacity-80 transition-opacity"
              >
                <img 
                  src="/images/home-page/youtube.jpg" 
                  alt="YouTube" 
                  className="w-full h-full object-cover"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Links and Copyright */}
        <div className="border-t border-gray-300 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-black mb-4 md:mb-0 text-sm md:text-base text-center md:text-left">
              © 2024 PrintiQue. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-4 md:gap-6 text-black text-sm md:text-base justify-center md:justify-end">
              <a href="#" className="hover:text-gray-600 transition-colors">Order Help</a>
              <a href="#" className="hover:text-gray-600 transition-colors">Terms and Conditions</a>
              <a href="#" className="hover:text-gray-600 transition-colors">Privacy policy</a>
              <a href="#" className="hover:text-gray-600 transition-colors">About us</a>
              <a href="#" className="hover:text-gray-600 transition-colors">Contact us</a>
              <a href="#" className="hover:text-gray-600 transition-colors">Refund policy</a>
            </div>
          </div>
        </div>
      </div>
      {showLabels && (
        <div className="absolute bottom-6 left-6 text-xs font-bold text-black">FOOTER</div>
      )}
    </footer>
  )
}