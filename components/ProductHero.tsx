'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ProductHero() {
  const [showLabels, setShowLabels] = useState(true)
  const [productImages, setProductImages] = useState<string[]>([])
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedPageOption, setSelectedPageOption] = useState(0)
  const [selectedDropdownOption, setSelectedDropdownOption] = useState(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [dropdownOptions, setDropdownOptions] = useState([
    { label: 'Loading...', value: 'loading', image: '' }
  ])

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

  // Load product images from the selected product's folder
  useEffect(() => {
    const loadProductImages = async () => {
      if (dropdownOptions.length === 0 || selectedDropdownOption >= dropdownOptions.length) {
        return
      }

      try {
        const selectedProduct = dropdownOptions[selectedDropdownOption]
        const productFolder = selectedProduct.value.toLowerCase().replace(/\s+/g, '-')
        
        // Predefined image paths for each product to avoid slow loading checks
        const productImageMap: { [key: string]: string[] } = {
          'summer-1': [
            `/images/shop-all/product-hero/summer-1/product-1.jpg`,
            `/images/shop-all/product-hero/summer-1/product-2.jpg`,
            `/images/shop-all/product-hero/summer-1/product-3.jpg`,
            `/images/shop-all/product-hero/summer-1/product-4.jpg`,
            `/images/shop-all/product-hero/summer-1/product-5.jpg`
          ],
          'amalfi': [
            `/images/shop-all/product-hero/amalfi/product-1.jpg`,
            `/images/shop-all/product-hero/amalfi/product-2.jpg`,
            `/images/shop-all/product-hero/amalfi/product-3.jpg`,
            `/images/shop-all/product-hero/amalfi/product-4.jpg`,
            `/images/shop-all/product-hero/amalfi/product-5.jpg`
          ],
          'algarve': [
            `/images/shop-all/product-hero/algarve/product-1.jpg`,
            `/images/shop-all/product-hero/algarve/product-2.jpg`,
            `/images/shop-all/product-hero/algarve/product-3.jpg`,
            `/images/shop-all/product-hero/algarve/product-4.jpg`,
            `/images/shop-all/product-hero/algarve/product-5.jpg`
          ],
          'summer-2': [
            `/images/shop-all/product-hero/summer-2/product-1.jpg`,
            `/images/shop-all/product-hero/summer-2/product-2.jpg`,
            `/images/shop-all/product-hero/summer-2/product-3.jpg`,
            `/images/shop-all/product-hero/summer-2/product-4.jpg`,
            `/images/shop-all/product-hero/summer-2/product-5.jpg`
          ],
          'paris': [
            `/images/shop-all/product-hero/paris/product-1.jpg`,
            `/images/shop-all/product-hero/paris/product-2.jpg`,
            `/images/shop-all/product-hero/paris/product-3.jpg`,
            `/images/shop-all/product-hero/paris/product-4.jpg`,
            `/images/shop-all/product-hero/paris/product-5.jpg`
          ]
        }
        
        const images = productImageMap[productFolder] || []
        
        if (images.length > 0) {
          setProductImages(images)
          setSelectedImageIndex(0) // Reset to first image when product changes
        } else {
          // Fallback to the main product image
          console.warn(`No images found for product: ${selectedProduct.label}`)
          setProductImages([selectedProduct.image])
          setSelectedImageIndex(0)
        }
      } catch (error) {
        console.error('Error loading product images:', error)
        // Fallback to the main product image
        setProductImages([dropdownOptions[selectedDropdownOption]?.image || '/images/shop-all/product-hero/default.jpg'])
        setSelectedImageIndex(0)
      }
    }

    loadProductImages()
  }, [selectedDropdownOption, dropdownOptions])

  // Load dropdown options from file
  useEffect(() => {
    const loadDropdownOptions = async () => {
      try {
        const response = await fetch('/data/dropdown-options.json')
        const data = await response.json()
        setDropdownOptions(data.coverTemplates)
      } catch (error) {
        console.error('Error loading dropdown options:', error)
        // Fallback to default options
        setDropdownOptions([
          { label: 'Standard Template', value: 'standard', image: '/images/shop-all/product-hero/default.jpg' },
          { label: 'Start from Scratch', value: 'scratch', image: '/images/shop-all/product-hero/default.jpg' }
        ])
      }
    }

    loadDropdownOptions()
  }, [])

  const pageOptions = [
    { pages: 24, price: '199 AED' },
    { pages: 34, price: '299 AED' },
    { pages: 44, price: '399 AED' },
    { pages: 54, price: '499 AED' }
  ]

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


            {/* Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose your cover template or start from scratch
              </label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full bg-white border border-gray-300 rounded-lg py-4 px-8 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-center relative"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <img 
                    src={dropdownOptions[selectedDropdownOption].image} 
                    alt={dropdownOptions[selectedDropdownOption].label}
                    className="w-8 h-8 object-cover rounded mr-3"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  <span className="block truncate text-lg font-bold">
                    {dropdownOptions[selectedDropdownOption].label}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                
                {isDropdownOpen && (
                  <div className={`absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base border border-black focus:outline-none ${
                    dropdownOptions.length > 10 ? 'max-h-[480px] overflow-auto' : ''
                  }`}>
                    {dropdownOptions.map((option, index) => (
                      <div key={index}>
                        <button
                          className={`w-full py-4 px-8 text-lg hover:bg-gray-100 flex items-center relative ${
                            selectedDropdownOption === index ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
                          }`}
                          onClick={() => {
                            setSelectedDropdownOption(index)
                            setIsDropdownOpen(false)
                          }}
                        >
                          <img 
                            src={option.image} 
                            alt={option.label}
                            className="w-8 h-8 object-cover rounded flex-shrink-0"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                          <span className="font-bold ml-3 truncate">
                            {option.label}
                          </span>
                        </button>
                        {index < dropdownOptions.length - 1 && (
                          <div className="w-full h-px bg-black"></div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link href={`/design?pages=${pageOptions[selectedPageOption].pages}&price=${pageOptions[selectedPageOption].price}`} className="block">
                <button className="w-full bg-black text-white py-4 px-8 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors">
                  Start Your Design
                </button>
              </Link>
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
