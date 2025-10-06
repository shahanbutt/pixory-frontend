'use client'

import { useState, useEffect } from 'react'

export default function Payment() {
  const [billingSame, setBillingSame] = useState(true)
  const [rushDelivery, setRushDelivery] = useState(false)
  const [giftWrap, setGiftWrap] = useState(false)
  const [newsletter, setNewsletter] = useState(true)
  const [baseTotal, setBaseTotal] = useState(32.38)
  const [total, setTotal] = useState(32.38)
  const [promoApplied, setPromoApplied] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  
  // Form validation states
  const [contactErrors, setContactErrors] = useState<{[key: string]: string}>({})
  const [shippingErrors, setShippingErrors] = useState<{[key: string]: string}>({})
  const [billingErrors, setBillingErrors] = useState<{[key: string]: string}>({})
  
  // Location states
  const [selectedCountry, setSelectedCountry] = useState('US')
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [pinLocation, setPinLocation] = useState('')
  const [cities, setCities] = useState<string[]>([])
  const [states, setStates] = useState<string[]>([])

  // Country and location data
  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'IT', name: 'Italy' },
    { code: 'ES', name: 'Spain' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'BE', name: 'Belgium' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'AT', name: 'Austria' },
    { code: 'SE', name: 'Sweden' },
    { code: 'NO', name: 'Norway' },
    { code: 'DK', name: 'Denmark' },
    { code: 'FI', name: 'Finland' },
    { code: 'IE', name: 'Ireland' },
    { code: 'PT', name: 'Portugal' },
    { code: 'GR', name: 'Greece' },
    { code: 'PL', name: 'Poland' },
    { code: 'CZ', name: 'Czech Republic' },
    { code: 'HU', name: 'Hungary' },
    { code: 'RO', name: 'Romania' },
    { code: 'BG', name: 'Bulgaria' },
    { code: 'HR', name: 'Croatia' },
    { code: 'SI', name: 'Slovenia' },
    { code: 'SK', name: 'Slovakia' },
    { code: 'LT', name: 'Lithuania' },
    { code: 'LV', name: 'Latvia' },
    { code: 'EE', name: 'Estonia' },
    { code: 'JP', name: 'Japan' },
    { code: 'KR', name: 'South Korea' },
    { code: 'CN', name: 'China' },
    { code: 'IN', name: 'India' },
    { code: 'SG', name: 'Singapore' },
    { code: 'MY', name: 'Malaysia' },
    { code: 'TH', name: 'Thailand' },
    { code: 'ID', name: 'Indonesia' },
    { code: 'PH', name: 'Philippines' },
    { code: 'VN', name: 'Vietnam' },
    { code: 'NZ', name: 'New Zealand' },
    { code: 'ZA', name: 'South Africa' },
    { code: 'EG', name: 'Egypt' },
    { code: 'NG', name: 'Nigeria' },
    { code: 'KE', name: 'Kenya' },
    { code: 'MA', name: 'Morocco' },
    { code: 'TN', name: 'Tunisia' },
    { code: 'BR', name: 'Brazil' },
    { code: 'AR', name: 'Argentina' },
    { code: 'CL', name: 'Chile' },
    { code: 'CO', name: 'Colombia' },
    { code: 'PE', name: 'Peru' },
    { code: 'MX', name: 'Mexico' },
    { code: 'RU', name: 'Russia' },
    { code: 'TR', name: 'Turkey' },
    { code: 'SA', name: 'Saudi Arabia' },
    { code: 'AE', name: 'United Arab Emirates' },
    { code: 'IL', name: 'Israel' },
    { code: 'JO', name: 'Jordan' },
    { code: 'LB', name: 'Lebanon' },
    { code: 'KW', name: 'Kuwait' },
    { code: 'QA', name: 'Qatar' },
    { code: 'BH', name: 'Bahrain' },
    { code: 'OM', name: 'Oman' }
  ]

  // US States
  const usStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming'
  ]

  // Canadian Provinces
  const caProvinces = [
    'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador',
    'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island',
    'Quebec', 'Saskatchewan', 'Yukon'
  ]

  // Sample cities for major countries
  const cityData: {[key: string]: string[]} = {
    'US': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Washington'],
    'CA': ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener', 'London', 'Victoria', 'Halifax', 'Oshawa', 'Windsor'],
    'GB': ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool', 'Leeds', 'Sheffield', 'Edinburgh', 'Bristol', 'Cardiff', 'Belfast', 'Leicester', 'Wakefield', 'Coventry', 'Nottingham'],
    'AU': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Newcastle', 'Canberra', 'Wollongong', 'Hobart', 'Geelong', 'Townsville', 'Cairns', 'Darwin', 'Toowoomba'],
    'DE': ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig', 'Bremen', 'Dresden', 'Hannover', 'Nuremberg', 'Duisburg'],
    'FR': ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Le Havre', 'Saint-Étienne', 'Toulon'],
    'IT': ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Florence', 'Bari', 'Catania', 'Venice', 'Verona', 'Messina', 'Padua', 'Trieste'],
    'ES': ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao', 'Alicante', 'Córdoba', 'Valladolid', 'Vigo', 'Gijón']
  }

  // Update total when options change
  useEffect(() => {
    let newTotal = baseTotal
    if (rushDelivery) newTotal += 9.99
    if (giftWrap) newTotal += 4.99
    setTotal(newTotal)
  }, [baseTotal, rushDelivery, giftWrap])

  // Update states and cities when country changes
  useEffect(() => {
    if (selectedCountry === 'US') {
      setStates(usStates)
    } else if (selectedCountry === 'CA') {
      setStates(caProvinces)
    } else {
      setStates([])
    }
    setSelectedState('')
    setSelectedCity('')
    setCities([])
  }, [selectedCountry])

  // Update cities when state changes
  useEffect(() => {
    if (selectedState && cityData[selectedCountry]) {
      setCities(cityData[selectedCountry])
    } else {
      setCities([])
    }
    setSelectedCity('')
  }, [selectedState, selectedCountry])

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
  }

  const validateContactInfo = () => {
    const errors: {[key: string]: string} = {}
    const firstName = (document.getElementById('first-name') as HTMLInputElement)?.value.trim()
    const lastName = (document.getElementById('last-name') as HTMLInputElement)?.value.trim()
    const email = (document.getElementById('email') as HTMLInputElement)?.value.trim()
    const phone = (document.getElementById('phone') as HTMLInputElement)?.value.trim()

    if (!firstName) {
      errors.firstName = 'First name is required'
    } else if (firstName.length < 2) {
      errors.firstName = 'First name must be at least 2 characters'
    }

    if (!lastName) {
      errors.lastName = 'Last name is required'
    } else if (lastName.length < 2) {
      errors.lastName = 'Last name must be at least 2 characters'
    }

    if (!email) {
      errors.email = 'Email is required'
    } else if (!validateEmail(email)) {
      errors.email = 'Please enter a valid email address'
    }

    if (!phone) {
      errors.phone = 'Phone number is required'
    } else if (!validatePhone(phone)) {
      errors.phone = 'Please enter a valid phone number'
    }

    setContactErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateShippingInfo = () => {
    const errors: {[key: string]: string} = {}
    const streetAddress = (document.getElementById('street-address') as HTMLInputElement)?.value.trim()
    const city = selectedCity || (document.getElementById('city') as HTMLInputElement)?.value.trim()
    const state = selectedState || (document.getElementById('state') as HTMLSelectElement)?.value
    const zipCode = (document.getElementById('zip-code') as HTMLInputElement)?.value.trim()
    const country = selectedCountry

    if (!streetAddress) {
      errors.streetAddress = 'Street address is required'
    }

    if (!city) {
      errors.city = 'City is required'
    }

    if (!state) {
      errors.state = 'State/Province is required'
    }

    if (!zipCode) {
      errors.zipCode = 'ZIP/Postal code is required'
    } else if (country === 'US' && !/^\d{5}(-\d{4})?$/.test(zipCode)) {
      errors.zipCode = 'Please enter a valid US ZIP code'
    }

    if (!country) {
      errors.country = 'Country is required'
    }

    setShippingErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handlePromoApply = () => {
    const promoCode = (document.getElementById('promo-input') as HTMLInputElement)?.value.trim().toLowerCase()
    
    if (promoCode === 'welcome10') {
      alert('Promo code applied! 10% discount added.')
      setBaseTotal(32.38 * 0.9)
      setPromoApplied(true)
    } else if (promoCode) {
      alert('Invalid promo code. Please try again.')
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value
    e.target.value = formattedValue
  }

  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4)
    }
    e.target.value = value
  }

  const handleCardCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const isContactValid = validateContactInfo()
    const isShippingValid = validateShippingInfo()
    
    if (isContactValid && isShippingValid) {
      setIsProcessing(true)
      
      setTimeout(() => {
        alert('Order placed successfully! You will receive a confirmation email shortly.')
        // Redirect to confirmation page
        window.location.href = '/confirmation'
      }, 2000)
    } else {
      alert('Please fix the errors in the form before submitting.')
    }
  }

  return (
    <div className="antialiased">
      <section id="top-bar" className="w-full bg-brand-charcoal text-white text-xs py-2">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <i className="fa-solid fa-truck-fast"></i>
              <span>Fast Shipping</span>
            </div>
            <div className="flex items-center gap-1.5">
              <i className="fa-solid fa-star"></i>
              <span>Over 10,000+ 5-Star Reviews</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <i className="fa-solid fa-shield-halved"></i>
            <span>30-Day Money Back Guarantee</span>
          </div>
        </div>
      </section>

      <header id="header" className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-10">
            <a href="/" className="text-2xl font-bold tracking-tighter cursor-pointer hover:opacity-80 transition-opacity">Studio Printique</a>
            <nav className="hidden md:flex gap-8 text-sm font-medium text-brand-charcoal">
              <a href="/shop-all" className="hover:text-brand-gray transition-colors cursor-pointer">Shop All</a>
              <a href="/about" className="hover:text-brand-gray transition-colors cursor-pointer">About</a>
              <a href="/faq" className="hover:text-brand-gray transition-colors cursor-pointer">FAQ</a>
            </nav>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <span className="font-medium cursor-pointer">USD</span>
            <span className="text-base cursor-pointer"><i className="fa-solid fa-magnifying-glass"></i></span>
            <a href="/signup-login" className="text-base cursor-pointer"><i className="fa-regular fa-user"></i></a>
            <span className="text-base cursor-pointer"><i className="fa-solid fa-bag-shopping"></i></span>
          </div>
        </div>
      </header>

      <main>
        <section id="checkout-page" className="bg-gray-50 py-8">
          <div className="container mx-auto px-6 max-w-6xl">
            
            <div id="checkout-header" className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <button 
                  onClick={() => window.history.back()}
                  className="text-brand-gray hover:text-brand-charcoal transition-colors"
                >
                  <i className="fa-solid fa-arrow-left text-lg"></i>
                </button>
                <h1 className="text-3xl font-bold">Checkout</h1>
              </div>
              
              <div id="progress-bar" className="flex items-center justify-center mb-8">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <span className="ml-2 text-sm font-medium text-green-600">Book Created</span>
                  </div>
                  <div className="w-16 h-0.5 bg-green-600 mx-4"></div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-brand-charcoal text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
                    <span className="ml-2 text-sm font-medium text-brand-charcoal">Payment</span>
                  </div>
                  <div className="w-16 h-0.5 bg-gray-300 mx-4"></div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">3</div>
                    <span className="ml-2 text-sm text-gray-500">Confirmation</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              
              <div id="checkout-form" className="lg:col-span-2">
                <form id="payment-form" className="space-y-8" onSubmit={handleFormSubmit}>
                  
                  <div id="contact-information" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold mb-6 flex items-center">
                      <i className="fa-solid fa-user mr-3 text-brand-gray"></i>
                      Contact Information
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-brand-charcoal mb-2">First Name *</label>
                        <input 
                          type="text" 
                          id="first-name" 
                          required 
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent transition-all ${
                            contactErrors.firstName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="John"
                          onChange={() => {
                            if (contactErrors.firstName) {
                              setContactErrors(prev => ({ ...prev, firstName: '' }))
                            }
                          }}
                        />
                        {contactErrors.firstName && (
                          <p className="mt-1 text-sm text-red-500 flex items-center">
                            <i className="fa-solid fa-exclamation-circle mr-1"></i>
                            {contactErrors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-charcoal mb-2">Last Name *</label>
                        <input 
                          type="text" 
                          id="last-name" 
                          required 
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent transition-all ${
                            contactErrors.lastName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Doe"
                          onChange={() => {
                            if (contactErrors.lastName) {
                              setContactErrors(prev => ({ ...prev, lastName: '' }))
                            }
                          }}
                        />
                        {contactErrors.lastName && (
                          <p className="mt-1 text-sm text-red-500 flex items-center">
                            <i className="fa-solid fa-exclamation-circle mr-1"></i>
                            {contactErrors.lastName}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-brand-charcoal mb-2">Email Address *</label>
                      <input 
                        type="email" 
                        id="email" 
                        required 
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent transition-all ${
                          contactErrors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="john.doe@example.com"
                        onChange={() => {
                          if (contactErrors.email) {
                            setContactErrors(prev => ({ ...prev, email: '' }))
                          }
                        }}
                      />
                      {contactErrors.email && (
                        <p className="mt-1 text-sm text-red-500 flex items-center">
                          <i className="fa-solid fa-exclamation-circle mr-1"></i>
                          {contactErrors.email}
                        </p>
                      )}
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-brand-charcoal mb-2">Phone Number *</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        required 
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent transition-all ${
                          contactErrors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+1 (555) 123-4567"
                        onChange={() => {
                          if (contactErrors.phone) {
                            setContactErrors(prev => ({ ...prev, phone: '' }))
                          }
                        }}
                      />
                      {contactErrors.phone && (
                        <p className="mt-1 text-sm text-red-500 flex items-center">
                          <i className="fa-solid fa-exclamation-circle mr-1"></i>
                          {contactErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div id="shipping-address" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold mb-6 flex items-center">
                      <i className="fa-solid fa-map-marker-alt mr-3 text-brand-gray"></i>
                      Shipping Address
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-brand-charcoal mb-2">Street Address *</label>
                        <input 
                          type="text" 
                          id="street-address" 
                          required 
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent transition-all ${
                            shippingErrors.streetAddress ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="123 Main Street"
                          onChange={() => {
                            if (shippingErrors.streetAddress) {
                              setShippingErrors(prev => ({ ...prev, streetAddress: '' }))
                            }
                          }}
                        />
                        {shippingErrors.streetAddress && (
                          <p className="mt-1 text-sm text-red-500 flex items-center">
                            <i className="fa-solid fa-exclamation-circle mr-1"></i>
                            {shippingErrors.streetAddress}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-brand-charcoal mb-2">Apartment, Suite, etc. (Optional)</label>
                        <input type="text" id="apartment" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent transition-all" placeholder="Apt 4B" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-brand-charcoal mb-2">Pin Location (Optional)</label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={pinLocation}
                            onChange={(e) => setPinLocation(e.target.value)}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent transition-all" 
                            placeholder="Enter your pin location or landmark"
                          />
                          <button 
                            type="button"
                            onClick={() => {
                              if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition((position) => {
                                  setPinLocation(`${position.coords.latitude}, ${position.coords.longitude}`)
                                })
                              } else {
                                alert('Geolocation is not supported by this browser.')
                              }
                            }}
                            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <i className="fa-solid fa-location-dot"></i>
                          </button>
                        </div>
                        <p className="text-xs text-brand-gray mt-1">Click the location button to get your current coordinates</p>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-brand-charcoal mb-2">City *</label>
                          {cities.length > 0 ? (
                            <select 
                              value={selectedCity}
                              onChange={(e) => setSelectedCity(e.target.value)}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent transition-all ${
                                shippingErrors.city ? 'border-red-500' : 'border-gray-300'
                              }`}
                            >
                              <option value="">Select City</option>
                              {cities.map((city) => (
                                <option key={city} value={city}>{city}</option>
                              ))}
                            </select>
                          ) : (
                            <input 
                              type="text" 
                              id="city" 
                              required 
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent transition-all ${
                                shippingErrors.city ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="Enter city name"
                              onChange={() => {
                                if (shippingErrors.city) {
                                  setShippingErrors(prev => ({ ...prev, city: '' }))
                                }
                              }}
                            />
                          )}
                          {shippingErrors.city && (
                            <p className="mt-1 text-sm text-red-500 flex items-center">
                              <i className="fa-solid fa-exclamation-circle mr-1"></i>
                              {shippingErrors.city}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-brand-charcoal mb-2">State/Province *</label>
                          {states.length > 0 ? (
                            <select 
                              value={selectedState}
                              onChange={(e) => setSelectedState(e.target.value)}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent transition-all ${
                                shippingErrors.state ? 'border-red-500' : 'border-gray-300'
                              }`}
                            >
                              <option value="">Select {selectedCountry === 'CA' ? 'Province' : 'State'}</option>
                              {states.map((state) => (
                                <option key={state} value={state}>{state}</option>
                              ))}
                            </select>
                          ) : (
                            <input 
                              type="text" 
                              id="state" 
                              required 
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent transition-all ${
                                shippingErrors.state ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="Enter state/province"
                              onChange={() => {
                                if (shippingErrors.state) {
                                  setShippingErrors(prev => ({ ...prev, state: '' }))
                                }
                              }}
                            />
                          )}
                          {shippingErrors.state && (
                            <p className="mt-1 text-sm text-red-500 flex items-center">
                              <i className="fa-solid fa-exclamation-circle mr-1"></i>
                              {shippingErrors.state}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-brand-charcoal mb-2">ZIP/Postal Code *</label>
                          <input 
                            type="text" 
                            id="zip-code" 
                            required 
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent transition-all ${
                              shippingErrors.zipCode ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="10001"
                            onChange={() => {
                              if (shippingErrors.zipCode) {
                                setShippingErrors(prev => ({ ...prev, zipCode: '' }))
                              }
                            }}
                          />
                          {shippingErrors.zipCode && (
                            <p className="mt-1 text-sm text-red-500 flex items-center">
                              <i className="fa-solid fa-exclamation-circle mr-1"></i>
                              {shippingErrors.zipCode}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-brand-charcoal mb-2">Country *</label>
                        <select 
                          id="country" 
                          required 
                          value={selectedCountry}
                          onChange={(e) => setSelectedCountry(e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent transition-all ${
                            shippingErrors.country ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select Country</option>
                          {countries.map((country) => (
                            <option key={country.code} value={country.code}>{country.name}</option>
                          ))}
                        </select>
                        {shippingErrors.country && (
                          <p className="mt-1 text-sm text-red-500 flex items-center">
                            <i className="fa-solid fa-exclamation-circle mr-1"></i>
                            {shippingErrors.country}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="billing-same" 
                          checked={billingSame}
                          onChange={(e) => setBillingSame(e.target.checked)}
                          className="mr-3 w-4 h-4 text-brand-charcoal border-gray-300 rounded focus:ring-brand-charcoal"
                        />
                        <span className="text-sm text-brand-charcoal">Billing address is the same as shipping address</span>
                      </label>
                    </div>
                  </div>

                  {!billingSame && (
                    <div id="billing-address" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <h2 className="text-xl font-bold mb-6 flex items-center">
                        <i className="fa-solid fa-credit-card mr-3 text-brand-gray"></i>
                        Billing Address
                      </h2>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-brand-charcoal mb-2">Street Address *</label>
                          <input type="text" id="billing-street" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent transition-all" placeholder="123 Main Street" />
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-brand-charcoal mb-2">City *</label>
                            <input type="text" id="billing-city" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent transition-all" placeholder="New York" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-brand-charcoal mb-2">State *</label>
                            <select id="billing-state" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent transition-all">
                              <option value="">Select State</option>
                              <option value="NY">New York</option>
                              <option value="CA">California</option>
                              <option value="TX">Texas</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-brand-charcoal mb-2">ZIP Code *</label>
                            <input type="text" id="billing-zip" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent transition-all" placeholder="10001" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div id="payment-method" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold mb-6 flex items-center">
                      <i className="fa-solid fa-lock mr-3 text-brand-gray"></i>
                      Payment Method
                    </h2>
                    
                    <div className="space-y-4 mb-6">
                      <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input 
                          type="radio" 
                          name="payment-method" 
                          value="card" 
                          checked={paymentMethod === 'card'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-4"
                        />
                        <div className="flex items-center">
                          <i className="fa-solid fa-credit-card text-lg mr-3 text-brand-gray"></i>
                          <span className="font-medium">Credit/Debit Card</span>
                        </div>
                        <div className="ml-auto flex gap-2">
                          <i className="fa-brands fa-cc-visa text-2xl text-blue-600"></i>
                          <i className="fa-brands fa-cc-mastercard text-2xl text-red-500"></i>
                          <i className="fa-brands fa-cc-amex text-2xl text-blue-500"></i>
                        </div>
                      </label>
                      
                      <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input 
                          type="radio" 
                          name="payment-method" 
                          value="paypal" 
                          checked={paymentMethod === 'paypal'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-4"
                        />
                        <div className="flex items-center">
                          <i className="fa-brands fa-paypal text-lg mr-3 text-blue-600"></i>
                          <span className="font-medium">PayPal</span>
                        </div>
                      </label>
                      
                      <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input 
                          type="radio" 
                          name="payment-method" 
                          value="apple-pay" 
                          checked={paymentMethod === 'apple-pay'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-4"
                        />
                        <div className="flex items-center">
                          <i className="fa-brands fa-apple-pay text-lg mr-3 text-black"></i>
                          <span className="font-medium">Apple Pay</span>
                        </div>
                      </label>
                    </div>

                    {paymentMethod === 'card' && (
                      <div id="card-details" className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-brand-charcoal mb-2">Card Number *</label>
                          <input 
                            type="text" 
                            id="card-number" 
                            required 
                            onChange={handleCardNumberChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent transition-all" 
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-brand-charcoal mb-2">Cardholder Name *</label>
                          <input 
                            type="text" 
                            id="card-name" 
                            required 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent transition-all" 
                            placeholder="John Doe"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-brand-charcoal mb-2">Expiry Date *</label>
                            <input 
                              type="text" 
                              id="card-expiry" 
                              required 
                              onChange={handleCardExpiryChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent transition-all" 
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-brand-charcoal mb-2">CVV *</label>
                            <input 
                              type="text" 
                              id="card-cvv" 
                              required 
                              onChange={handleCardCvvChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent transition-all" 
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div id="additional-options" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold mb-6 flex items-center">
                      <i className="fa-solid fa-cog mr-3 text-brand-gray"></i>
                      Additional Options
                    </h2>
                    
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="rush-delivery" 
                          checked={rushDelivery}
                          onChange={(e) => setRushDelivery(e.target.checked)}
                          className="mr-3 w-4 h-4 text-brand-charcoal border-gray-300 rounded focus:ring-brand-charcoal"
                        />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-brand-charcoal">Rush Delivery (3-5 business days)</span>
                          <p className="text-xs text-brand-gray mt-1">Get your book faster for an additional $9.99</p>
                        </div>
                        <span className="text-sm font-medium text-brand-charcoal">+$9.99</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="gift-wrap" 
                          checked={giftWrap}
                          onChange={(e) => setGiftWrap(e.target.checked)}
                          className="mr-3 w-4 h-4 text-brand-charcoal border-gray-300 rounded focus:ring-brand-charcoal"
                        />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-brand-charcoal">Gift Wrapping</span>
                          <p className="text-xs text-brand-gray mt-1">Beautiful gift wrap with ribbon</p>
                        </div>
                        <span className="text-sm font-medium text-brand-charcoal">+$4.99</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="newsletter" 
                          checked={newsletter}
                          onChange={(e) => setNewsletter(e.target.checked)}
                          className="mr-3 w-4 h-4 text-brand-charcoal border-gray-300 rounded focus:ring-brand-charcoal"
                        />
                        <span className="text-sm text-brand-charcoal">Subscribe to our newsletter for exclusive offers and updates</span>
                      </label>
                    </div>
                  </div>
                </form>
              </div>

              <div id="order-summary" className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                  
                  <div id="book-preview" className="mb-6 pb-6 border-b border-gray-200">
                    <div className="flex gap-4">
                      <div className="w-16 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                        <i className="fa-solid fa-book text-brand-gray"></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-brand-charcoal">My Travel Book</h3>
                        <p className="text-sm text-brand-gray">A4 Portrait • 6 Pages</p>
                        <p className="text-sm text-brand-gray">Premium Matte Paper</p>
                      </div>
                    </div>
                  </div>
                  
                  <div id="pricing-breakdown" className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-sm text-brand-charcoal">Digital Book</span>
                      <span className="text-sm font-medium">$24.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-brand-charcoal">Standard Shipping</span>
                      <span className="text-sm font-medium">$4.99</span>
                    </div>
                    {rushDelivery && (
                      <div className="flex justify-between">
                        <span className="text-sm text-brand-charcoal">Rush Delivery</span>
                        <span className="text-sm font-medium">$9.99</span>
                      </div>
                    )}
                    {giftWrap && (
                      <div className="flex justify-between">
                        <span className="text-sm text-brand-charcoal">Gift Wrapping</span>
                        <span className="text-sm font-medium">$4.99</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-sm text-brand-charcoal">Tax</span>
                      <span className="text-sm font-medium">$2.40</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between">
                        <span className="font-bold text-brand-charcoal">Total</span>
                        <span className="font-bold text-brand-charcoal text-lg">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div id="promo-code" className="mb-6">
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        id="promo-input" 
                        disabled={promoApplied}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-charcoal focus:border-transparent disabled:bg-gray-100" 
                        placeholder="Promo code"
                      />
                      <button 
                        type="button"
                        onClick={handlePromoApply}
                        disabled={promoApplied}
                        className="px-4 py-2 bg-gray-100 text-brand-charcoal rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {promoApplied ? 'Applied' : 'Apply'}
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    form="payment-form" 
                    disabled={isProcessing}
                    className="w-full bg-brand-charcoal text-white py-4 rounded-lg font-semibold text-lg hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-lock mr-2"></i>
                        Place Order - ${total.toFixed(2)}
                      </>
                    )}
                  </button>
                  
                  <div className="mt-4 text-center">
                    <p className="text-xs text-brand-gray">Secure checkout powered by SSL encryption</p>
                    <div className="flex justify-center items-center gap-2 mt-2">
                      <i className="fa-solid fa-shield-alt text-green-600"></i>
                      <span className="text-xs text-brand-gray">Your payment information is safe and secure</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer" className="bg-brand-charcoal text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Studio Printique</h3>
              <p className="text-sm text-gray-300 mb-4">Create beautiful, personalized photo books that capture your most precious memories.</p>
              <div className="flex gap-4">
                <i className="fa-brands fa-facebook text-gray-300 hover:text-white cursor-pointer transition-colors"></i>
                <i className="fa-brands fa-instagram text-gray-300 hover:text-white cursor-pointer transition-colors"></i>
                <i className="fa-brands fa-twitter text-gray-300 hover:text-white cursor-pointer transition-colors"></i>
                <i className="fa-brands fa-pinterest text-gray-300 hover:text-white cursor-pointer transition-colors"></i>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Photo Books</span></li>
                <li><span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Travel Books</span></li>
                <li><span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Wedding Albums</span></li>
                <li><span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Baby Books</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Help Center</span></li>
                <li><span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Contact Us</span></li>
                <li><span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Shipping Info</span></li>
                <li><span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Returns</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="text-gray-300 hover:text-white transition-colors cursor-pointer">About Us</span></li>
                <li><span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Privacy Policy</span></li>
                <li><span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Terms of Service</span></li>
                <li><span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Careers</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-sm text-gray-300">&copy; 2024 Studio Printique. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
