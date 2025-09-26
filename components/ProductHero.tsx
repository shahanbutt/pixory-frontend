'use client'

import { useState, useEffect } from 'react'

export default function ProductHero() {
  const [showLabels, setShowLabels] = useState(true)
  const [productImages, setProductImages] = useState<string[]>([])
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

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

  // Load product images from the product-hero folder
  useEffect(() => {
    const loadProductImages = async () => {
      try {
        // Try to load images dynamically by checking if they exist
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp']
        const images: string[] = []
        
        // Check for images with common naming patterns
        for (let i = 1; i <= 20; i++) { // Check up to 20 images
          for (const ext of imageExtensions) {
            const imagePath = `/images/shop-all/product-hero/product-${i}${ext}`
            try {
              // Create a test image element to check if the image exists
              const img = new Image()
              await new Promise((resolve, reject) => {
                img.onload = () => resolve(true)
                img.onerror = () => reject(false)
                img.src = imagePath
              })
              images.push(imagePath)
              break // Found an image with this number, move to next number
            } catch {
              // Image doesn't exist, continue to next extension
            }
          }
        }
        
        // If no numbered images found, try alternative naming patterns
        if (images.length === 0) {
          const alternativeNames = ['main', 'hero', 'product', 'book', 'cover']
          for (const name of alternativeNames) {
            for (const ext of imageExtensions) {
              const imagePath = `/images/shop-all/product-hero/${name}${ext}`
              try {
                const img = new Image()
                await new Promise((resolve, reject) => {
                  img.onload = () => resolve(true)
                  img.onerror = () => reject(false)
                  img.src = imagePath
                })
                images.push(imagePath)
                break
              } catch {
                // Image doesn't exist, continue
              }
            }
          }
        }
        
        if (images.length > 0) {
          setProductImages(images)
        } else {
          // Fallback to a default image if no images found
          console.warn('No product images found in /images/shop-all/product-hero/')
          setProductImages(['/images/shop-all/product-hero/default.jpg'])
        }
      } catch (error) {
        console.error('Error loading product images:', error)
        // Fallback to a single image
        setProductImages(['/images/shop-all/product-hero/product-1.jpg'])
      }
    }

    loadProductImages()
  }, [])

  const pageOptions = [
    { pages: 24, price: '199 AED' },
    { pages: 34, price: '299 AED' },
    { pages: 44, price: '399 AED' },
    { pages: 54, price: '499 AED' }
  ]

  const [selectedPageOption, setSelectedPageOption] = useState(0)

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-gray-100 relative">
      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Product Images */}
          <div className="space-y-6">
            {/* Main Product Image */}
            <div className="relative">
              {productImages.length > 0 && (
                <img 
                  src={productImages[selectedImageIndex]} 
                  alt={`Custom Travel Book - View ${selectedImageIndex + 1}`}
                  className="w-full max-w-md mx-auto h-96 object-cover rounded-lg shadow-lg"
                />
              )}
              {/* Navigation arrows */}
              {productImages.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="flex justify-center space-x-2">
                {productImages.map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`Product view ${index + 1}`}
                    className={`w-16 h-16 object-cover rounded cursor-pointer hover:opacity-75 transition-opacity ${
                      selectedImageIndex === index ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Section - Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Custom Travel Book
              </h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">(1,234 reviews)</span>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-black mb-6">
                {pageOptions[selectedPageOption].price}
              </div>
            </div>


            {/* Action Buttons */}
            <div className="space-y-4">
              <button className="w-full bg-gray-100 text-black py-4 px-8 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors">
                Start Your Design
              </button>
            </div>

            {/* Page Options */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {pageOptions.map((option, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg text-center cursor-pointer transition-colors ${
                    selectedPageOption === index 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-50 hover:bg-blue-100'
                  }`}
                  onClick={() => setSelectedPageOption(index)}
                >
                  <div className={`text-2xl font-bold ${
                    selectedPageOption === index ? 'text-white' : 'text-blue-600'
                  }`}>
                    {option.pages}
                  </div>
                  <div className={`text-sm ${
                    selectedPageOption === index ? 'text-blue-100' : 'text-gray-600'
                  }`}>
                    pages
                  </div>
                  <div className={`text-lg font-semibold ${
                    selectedPageOption === index ? 'text-white' : 'text-black'
                  }`}>
                    {option.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showLabels && (
        <div className="absolute bottom-6 left-6 text-xs font-bold text-black">PRODUCT HERO</div>
      )}
    </section>
  )
}
