'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Design() {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [selectedTheme, setSelectedTheme] = useState('')
  const [selectedPages, setSelectedPages] = useState('')
  const [showLabels, setShowLabels] = useState(true)
  const [minImages, setMinImages] = useState(24)
  const [selectedPageCount, setSelectedPageCount] = useState(24)
  const [selectedPrice, setSelectedPrice] = useState('199 AED')
  const [uploadError, setUploadError] = useState('')
  const [pageCountError, setPageCountError] = useState('')
  
  const searchParams = useSearchParams()

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

  // Read URL parameters and set minimum images based on page count
  useEffect(() => {
    const pages = searchParams.get('pages')
    const price = searchParams.get('price')
    
    if (pages) {
      const pageCount = parseInt(pages)
      setSelectedPageCount(pageCount)
      setMinImages(pageCount) // Minimum images = page count
      setSelectedPages(pages)
    }
    
    if (price) {
      setSelectedPrice(price)
    }
  }, [searchParams])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const currentCount = uploadedImages.length
    const newTotal = currentCount + files.length
    
    // Clear any previous error
    setUploadError('')
    
    // Check if adding these files would exceed the minimum requirement
    if (currentCount >= minImages) {
      setUploadError(`You have already uploaded ${currentCount} images, which meets the minimum requirement of ${minImages} images. Please delete some images first if you want to upload different ones.`)
      event.target.value = ''
      return
    }
    
    // Check if adding these files would exceed the minimum requirement
    if (newTotal > minImages) {
      const allowedFiles = files.slice(0, minImages - currentCount)
      setUploadedImages(prev => [...prev, ...allowedFiles])
      setUploadError(`You tried to upload ${files.length} images, but you can only add ${allowedFiles.length} more images to reach the minimum requirement of ${minImages} images. Please delete some images first if you want to upload different ones.`)
      event.target.value = ''
      return
    }
    
    setUploadedImages(prev => [...prev, ...files])
    // Clear the input to allow uploading the same file again
    event.target.value = ''
  }

  const removeImage = (index: number) => {
    console.log('Removing image at index:', index)
    setUploadedImages(prev => {
      const newImages = prev.filter((_, i) => i !== index)
      console.log('New images array length:', newImages.length)
      return newImages
    })
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Design Page Content */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-8">
              Design Your Travel Book
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Create your perfect travel photobook in 3 easy steps
            </p>
            
            {/* Progress Steps */}
            <div className="flex justify-center items-center space-x-4 mb-12">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    currentStep >= step 
                      ? 'bg-black text-white' 
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-8 h-1 mx-2 ${
                      currentStep > step ? 'bg-black' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1 - Upload Images */}
          {currentStep === 1 && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-black mb-8 text-center">Step 1: Upload Your Images</h2>
              
              {/* Page Count Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-black mb-2">Select Page Count</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={selectedPageCount}
                  onChange={(e) => {
                    const newPageCount = parseInt(e.target.value)
                    
                    // Clear any previous error
                    setPageCountError('')
                    
                    // Check if user has enough images for the new page count
                    if (uploadedImages.length > 0 && uploadedImages.length < newPageCount) {
                      setPageCountError(`You have uploaded ${uploadedImages.length} images, but selected ${newPageCount} pages. You need at least ${newPageCount} images for ${newPageCount} pages. Please upload more images or reduce the page count.`)
                      return // Don't update the page count
                    }
                    
                    setSelectedPageCount(newPageCount)
                    setMinImages(newPageCount)
                    // Update price based on page count
                    const priceMap: { [key: number]: string } = {
                      24: '199 AED',
                      34: '299 AED',
                      44: '399 AED',
                      54: '499 AED'
                    }
                    setSelectedPrice(priceMap[newPageCount] || '199 AED')
                  }}
                >
                  <option value="24">24 pages - 199 AED</option>
                  <option value="34">34 pages - 299 AED</option>
                  <option value="44">44 pages - 399 AED</option>
                  <option value="54">54 pages - 499 AED</option>
                </select>
              </div>

              {/* Upload Area */}
              <div className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 ${
                uploadedImages.length >= minImages 
                  ? 'border-green-300 bg-green-50' 
                  : 'border-gray-300'
              }`}>
                <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  uploadedImages.length >= minImages 
                    ? 'bg-green-100' 
                    : 'bg-gray-100'
                }`}>
                  {uploadedImages.length >= minImages ? (
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  )}
                </div>
                
                {uploadedImages.length >= minImages ? (
                  <>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">Upload Complete!</h3>
                    <p className="text-green-600 mb-4">
                      You have uploaded {uploadedImages.length} images. This meets the minimum requirement for your {selectedPageCount}-page photobook.
                    </p>
                    <div className="text-sm text-green-700 font-medium">
                      ✓ Ready to proceed to the next step
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-black mb-2">Upload Your Photos</h3>
                    <p className="text-gray-600 mb-4">
                      Upload at least {minImages} images for your {selectedPageCount}-page photobook. Pages will be blank if you don't upload enough images.
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors cursor-pointer inline-block"
                    >
                      Choose Images
                    </label>
                  </>
                )}
              </div>

              {/* Upload Error Message */}
              {uploadError && (
                <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded mb-6">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Upload Error:</span>
                    <span className="ml-2">{uploadError}</span>
                  </div>
                </div>
              )}

              {/* Page Count Error Message */}
              {pageCountError && (
                <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded mb-6">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Page Count Error:</span>
                    <span className="ml-2">{pageCountError}</span>
                  </div>
                </div>
              )}

              {/* Image Count Warning */}
              {uploadedImages.length > 0 && uploadedImages.length < minImages && (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-6">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Warning:</span>
                    <span className="ml-2">You have uploaded {uploadedImages.length} images. Please upload at least {minImages} images to avoid blank pages.</span>
                  </div>
                </div>
              )}

              {/* Page Count Change Warning */}
              {uploadedImages.length > 0 && uploadedImages.length >= 24 && uploadedImages.length < minImages && (
                <div className="bg-orange-100 border border-orange-400 text-orange-800 px-4 py-3 rounded mb-6">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Page Count Changed:</span>
                    <span className="ml-2">You selected {selectedPageCount} pages but only have {uploadedImages.length} images. Upload {minImages - uploadedImages.length} more images or reduce page count.</span>
                  </div>
                </div>
              )}

              {/* Uploaded Images Preview */}
              {uploadedImages.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-black">
                      Uploaded Images
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-gray-600">
                        {uploadedImages.length} / {minImages} minimum
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        uploadedImages.length >= minImages ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Uploaded ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                        
                        {/* Image number badge */}
                        <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs font-semibold px-2 py-1 rounded-full">
                          {index + 1}
                        </div>
                        
                        {/* Remove button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            removeImage(index)
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors duration-200 shadow-md z-10"
                          title="Remove image"
                          type="button"
                        >
                          ×
                        </button>
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-200 rounded-lg"></div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{Math.round((uploadedImages.length / minImages) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          uploadedImages.length >= minImages ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${Math.min((uploadedImages.length / minImages) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between">
                <div></div>
                <button
                  onClick={nextStep}
                  disabled={uploadedImages.length < minImages}
                  className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                    uploadedImages.length >= minImages
                      ? 'bg-black text-white hover:bg-gray-800'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Next: Select Theme
                </button>
              </div>
            </div>
          )}

          {/* Step 2 - Select Theme */}
          {currentStep === 2 && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-black mb-8 text-center">Step 2: Select Book Theme</h2>
              
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Theme Selection</h3>
                <p className="text-gray-600 mb-6">
                  Choose your book theme and page count. The book will be automatically created based on your uploaded images.
                </p>
                <div className="max-w-md mx-auto">
                  <label className="block text-sm font-semibold text-black mb-2">Select Theme</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg">
                    <option value="">Choose a theme...</option>
                    <option value="summer-1">Summer 1</option>
                    <option value="amalfi">Amalfi</option>
                    <option value="algarve">Algarve</option>
                    <option value="summer-2">Summer 2</option>
                    <option value="paris">Paris</option>
                  </select>
                </div>
                
                {/* Current Selection Display */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-800">Your Selection</div>
                    <div className="text-2xl font-bold text-blue-900">{selectedPageCount} pages</div>
                    <div className="text-lg text-blue-700">{selectedPrice}</div>
                    <div className="text-sm text-blue-600 mt-1">
                      {uploadedImages.length} images uploaded
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Back: Upload Images
                </button>
                <button
                  onClick={nextStep}
                  className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Next: Save & Checkout
                </button>
              </div>
            </div>
          )}

          {/* Step 3 - Save & Checkout */}
          {currentStep === 3 && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-black mb-8 text-center">Step 3: Save & Checkout</h2>
              
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Checkout</h3>
                <p className="text-gray-600 mb-6">
                  This section will be implemented in the future.
                </p>
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Back: Select Theme
                </button>
                <button
                  disabled
                  className="px-8 py-3 bg-gray-300 text-gray-500 rounded-lg font-semibold cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Section Label */}
        {showLabels && (
          <div className="absolute bottom-6 left-6 text-xs font-bold text-black">DESIGN</div>
        )}
      </section>
      
      <Footer />
    </main>
  )
}
