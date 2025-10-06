'use client'

import { useState } from 'react'

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null) // All FAQs closed by default
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
  }

  return (
    <div className="antialiased min-h-screen bg-brand-offwhite font-inter text-brand-charcoal">
      
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-10">
            <a href="/" className="text-2xl font-bold tracking-tighter cursor-pointer hover:opacity-80 transition-opacity">Studio Printique</a>
            <nav className="hidden md:flex gap-8 text-sm font-medium text-brand-charcoal">
              <a href="/shop-all" className="hover:text-brand-gray transition-colors cursor-pointer">Shop All</a>
              <a href="/about" className="hover:text-brand-gray transition-colors cursor-pointer">About</a>
              <span className="hover:text-brand-gray transition-colors cursor-pointer text-brand-charcoal border-b-2 border-brand-charcoal pb-1">FAQ</span>
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

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold tracking-tight mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-brand-gray leading-relaxed mb-8">Find answers to common questions about creating, ordering, and receiving your photobooks.</p>
            <div className="relative max-w-2xl mx-auto">
              <input type="text" placeholder="Search for answers..." className="w-full px-6 py-4 pr-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-charcoal focus:border-transparent text-lg" />
              <i className="fa-solid fa-magnifying-glass absolute right-4 top-1/2 transform -translate-y-1/2 text-brand-gray"></i>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-brand-offwhite">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-5 gap-4">
              <button 
                onClick={() => handleCategoryChange('all')}
                className={`px-6 py-3 rounded-lg font-medium text-sm transition-colors ${
                  activeCategory === 'all' 
                    ? 'bg-brand-charcoal text-white' 
                    : 'bg-white text-brand-charcoal hover:bg-gray-50'
                }`}
              >
                All Questions
              </button>
              <button 
                onClick={() => handleCategoryChange('ordering')}
                className={`px-6 py-3 rounded-lg font-medium text-sm transition-colors ${
                  activeCategory === 'ordering' 
                    ? 'bg-brand-charcoal text-white' 
                    : 'bg-white text-brand-charcoal hover:bg-gray-50'
                }`}
              >
                Ordering
              </button>
              <button 
                onClick={() => handleCategoryChange('design')}
                className={`px-6 py-3 rounded-lg font-medium text-sm transition-colors ${
                  activeCategory === 'design' 
                    ? 'bg-brand-charcoal text-white' 
                    : 'bg-white text-brand-charcoal hover:bg-gray-50'
                }`}
              >
                Design
              </button>
              <button 
                onClick={() => handleCategoryChange('shipping')}
                className={`px-6 py-3 rounded-lg font-medium text-sm transition-colors ${
                  activeCategory === 'shipping' 
                    ? 'bg-brand-charcoal text-white' 
                    : 'bg-white text-brand-charcoal hover:bg-gray-50'
                }`}
              >
                Shipping
              </button>
              <button 
                onClick={() => handleCategoryChange('quality')}
                className={`px-6 py-3 rounded-lg font-medium text-sm transition-colors ${
                  activeCategory === 'quality' 
                    ? 'bg-brand-charcoal text-white' 
                    : 'bg-white text-brand-charcoal hover:bg-gray-50'
                }`}
              >
                Quality
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-pale-blue rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-shopping-cart text-blue-600"></i>
                </div>
                Ordering & Payment
              </h2>
              
              <div className="space-y-4">
                <div className="bg-brand-offwhite rounded-lg">
                  <button 
                    onClick={() => toggleFaq(0)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-lg">How do I place an order?</span>
                    <i className={`fa-solid fa-chevron-down text-brand-gray transform transition-transform ${openFaq === 0 ? 'rotate-180' : ''}`}></i>
                  </button>
                  {openFaq === 0 && (
                    <div className="px-6 pb-5 text-brand-gray leading-relaxed">
                      <p>Placing an order is simple! Upload your photos, choose a template or create your own design, preview your photobook, and proceed to checkout. Our step-by-step process guides you through each stage, and you can save your progress at any time.</p>
                    </div>
                  )}
                </div>

                <div className="bg-brand-offwhite rounded-lg">
                  <button 
                    onClick={() => toggleFaq(1)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-lg">What payment methods do you accept?</span>
                    <i className={`fa-solid fa-chevron-down text-brand-gray transform transition-transform ${openFaq === 1 ? 'rotate-180' : ''}`}></i>
                  </button>
                  {openFaq === 1 && (
                    <div className="px-6 pb-5 text-brand-gray leading-relaxed">
                      <p>We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. All payments are processed securely through encrypted connections.</p>
                    </div>
                  )}
                </div>

                <div className="bg-brand-offwhite rounded-lg">
                  <button 
                    onClick={() => toggleFaq(2)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-lg">Can I edit my order after placing it?</span>
                    <i className={`fa-solid fa-chevron-down text-brand-gray transform transition-transform ${openFaq === 2 ? 'rotate-180' : ''}`}></i>
                  </button>
                  {openFaq === 2 && (
                    <div className="px-6 pb-5 text-brand-gray leading-relaxed">
                      <p>You can edit your order within 2 hours of placing it, as long as it hasn't entered production. After this window, please contact our customer service team, and we'll do our best to accommodate changes, though additional fees may apply.</p>
                    </div>
                  )}
                </div>

                <div className="bg-brand-offwhite rounded-lg">
                  <button 
                    onClick={() => toggleFaq(3)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-lg">Do you offer bulk discounts?</span>
                    <i className={`fa-solid fa-chevron-down text-brand-gray transform transition-transform ${openFaq === 3 ? 'rotate-180' : ''}`}></i>
                  </button>
                  {openFaq === 3 && (
                    <div className="px-6 pb-5 text-brand-gray leading-relaxed">
                      <p>Yes! We offer discounts for orders of 5+ photobooks. The more you order, the more you save. Contact our sales team for custom pricing on large orders (20+ books) or corporate accounts.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-pale-pink rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-palette text-pink-600"></i>
                </div>
                Design & Customization
              </h2>
              
              <div className="space-y-4">
                <div className="bg-brand-offwhite rounded-lg">
                  <button 
                    onClick={() => toggleFaq(4)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-lg">What photo formats do you accept?</span>
                    <i className={`fa-solid fa-chevron-down text-brand-gray transform transition-transform ${openFaq === 4 ? 'rotate-180' : ''}`}></i>
                  </button>
                  {openFaq === 4 && (
                    <div className="px-6 pb-5 text-brand-gray leading-relaxed">
                      <p>We accept JPEG, PNG, TIFF, and HEIC formats. For best print quality, we recommend high-resolution images (300 DPI or higher). Our system will alert you if any photos are below optimal resolution.</p>
                    </div>
                  )}
                </div>

                <div className="bg-brand-offwhite rounded-lg">
                  <button 
                    onClick={() => toggleFaq(5)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-lg">How many photos can I include in a photobook?</span>
                    <i className={`fa-solid fa-chevron-down text-brand-gray transform transition-transform ${openFaq === 5 ? 'rotate-180' : ''}`}></i>
                  </button>
                  {openFaq === 5 && (
                    <div className="px-6 pb-5 text-brand-gray leading-relaxed">
                      <p>Our photobooks range from 20 to 120 pages, and you can include 1-6 photos per page depending on your layout choice. This means you can include anywhere from 20 to 720 photos in a single book!</p>
                    </div>
                  )}
                </div>

                <div className="bg-brand-offwhite rounded-lg">
                  <button 
                    onClick={() => toggleFaq(6)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-lg">Can I add text and captions?</span>
                    <i className={`fa-solid fa-chevron-down text-brand-gray transform transition-transform ${openFaq === 6 ? 'rotate-180' : ''}`}></i>
                  </button>
                  {openFaq === 6 && (
                    <div className="px-6 pb-5 text-brand-gray leading-relaxed">
                      <p>Absolutely! You can add custom text, captions, dates, and quotes throughout your photobook. Choose from various fonts, sizes, and colors to match your style. Text can be placed anywhere on the page.</p>
                    </div>
                  )}
                </div>

                <div className="bg-brand-offwhite rounded-lg">
                  <button 
                    onClick={() => toggleFaq(7)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-lg">Do you offer design assistance?</span>
                    <i className={`fa-solid fa-chevron-down text-brand-gray transform transition-transform ${openFaq === 7 ? 'rotate-180' : ''}`}></i>
                  </button>
                  {openFaq === 7 && (
                    <div className="px-6 pb-5 text-brand-gray leading-relaxed">
                      <p>Yes! Our design team offers complimentary consultation for complex projects. We also provide design templates, auto-layout features, and step-by-step tutorials to help you create the perfect photobook.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-pale-green rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-truck text-green-600"></i>
                </div>
                Shipping & Delivery
              </h2>
              
              <div className="space-y-4">
                <div className="bg-brand-offwhite rounded-lg">
                  <button 
                    onClick={() => toggleFaq(8)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-lg">How long does production and shipping take?</span>
                    <i className={`fa-solid fa-chevron-down text-brand-gray transform transition-transform ${openFaq === 8 ? 'rotate-180' : ''}`}></i>
                  </button>
                  {openFaq === 8 && (
                    <div className="px-6 pb-5 text-brand-gray leading-relaxed">
                      <p>Production takes 3-5 business days. Standard shipping adds 5-7 business days, while express shipping takes 2-3 business days. Rush production (1-2 days) is available for an additional fee.</p>
                    </div>
                  )}
                </div>

                <div className="bg-brand-offwhite rounded-lg">
                  <button 
                    onClick={() => toggleFaq(9)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-lg">Do you ship internationally?</span>
                    <i className={`fa-solid fa-chevron-down text-brand-gray transform transition-transform ${openFaq === 9 ? 'rotate-180' : ''}`}></i>
                  </button>
                  {openFaq === 9 && (
                    <div className="px-6 pb-5 text-brand-gray leading-relaxed">
                      <p>Yes! We ship to over 50 countries worldwide. International shipping times vary by destination (7-21 business days). Customs duties and taxes may apply and are the responsibility of the recipient.</p>
                    </div>
                  )}
                </div>

                <div className="bg-brand-offwhite rounded-lg">
                  <button 
                    onClick={() => toggleFaq(10)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-lg">Can I track my order?</span>
                    <i className={`fa-solid fa-chevron-down text-brand-gray transform transition-transform ${openFaq === 10 ? 'rotate-180' : ''}`}></i>
                  </button>
                  {openFaq === 10 && (
                    <div className="px-6 pb-5 text-brand-gray leading-relaxed">
                      <p>Absolutely! You'll receive email notifications at each stage: order confirmation, production start, production complete, and shipping with tracking number. You can also check your order status anytime in your account dashboard.</p>
                    </div>
                  )}
                </div>

                <div className="bg-brand-offwhite rounded-lg">
                  <button 
                    onClick={() => toggleFaq(11)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-lg">What if my package is damaged or lost?</span>
                    <i className={`fa-solid fa-chevron-down text-brand-gray transform transition-transform ${openFaq === 11 ? 'rotate-180' : ''}`}></i>
                  </button>
                  {openFaq === 11 && (
                    <div className="px-6 pb-5 text-brand-gray leading-relaxed">
                      <p>We take full responsibility for shipping issues. If your package arrives damaged or goes missing, contact us immediately. We'll investigate with the carrier and either expedite a replacement or provide a full refund.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-pale-yellow rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-gem text-yellow-600"></i>
                </div>
                Quality & Materials
              </h2>
              
              <div className="space-y-4">
                <div className="bg-brand-offwhite rounded-lg">
                  <button 
                    onClick={() => toggleFaq(12)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-lg">What paper and binding options do you offer?</span>
                    <i className={`fa-solid fa-chevron-down text-brand-gray transform transition-transform ${openFaq === 12 ? 'rotate-180' : ''}`}></i>
                  </button>
                  {openFaq === 12 && (
                    <div className="px-6 pb-5 text-brand-gray leading-relaxed">
                      <p>We offer premium matte and lustre photo papers, both archival quality. Binding options include lay-flat (panoramic spreads), standard perfect binding, and hardcover with dust jacket. All materials are FSC-certified and fade-resistant.</p>
                    </div>
                  )}
                </div>

                <div className="bg-brand-offwhite rounded-lg">
                  <button 
                    onClick={() => toggleFaq(13)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-lg">How long will my photobook last?</span>
                    <i className={`fa-solid fa-chevron-down text-brand-gray transform transition-transform ${openFaq === 13 ? 'rotate-180' : ''}`}></i>
                  </button>
                  {openFaq === 13 && (
                    <div className="px-6 pb-5 text-brand-gray leading-relaxed">
                      <p>Our photobooks are designed to last generations. We use archival-quality inks and papers that resist fading for 100+ years when stored properly. The binding is reinforced to withstand regular handling and viewing.</p>
                    </div>
                  )}
                </div>

                <div className="bg-brand-offwhite rounded-lg">
                  <button 
                    onClick={() => toggleFaq(14)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-lg">What if I'm not satisfied with the quality?</span>
                    <i className={`fa-solid fa-chevron-down text-brand-gray transform transition-transform ${openFaq === 14 ? 'rotate-180' : ''}`}></i>
                  </button>
                  {openFaq === 14 && (
                    <div className="px-6 pb-5 text-brand-gray leading-relaxed">
                      <p>We offer a 100% satisfaction guarantee. If you're not completely happy with your photobook's quality, contact us within 30 days. We'll work with you to resolve any issues, including reprinting or providing a full refund.</p>
                    </div>
                  )}
                </div>

                <div className="bg-brand-offwhite rounded-lg">
                  <button 
                    onClick={() => toggleFaq(15)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-lg">Do you offer proof prints before final production?</span>
                    <i className={`fa-solid fa-chevron-down text-brand-gray transform transition-transform ${openFaq === 15 ? 'rotate-180' : ''}`}></i>
                  </button>
                  {openFaq === 15 && (
                    <div className="px-6 pb-5 text-brand-gray leading-relaxed">
                      <p>Yes! For orders over $200, we offer complimentary proof prints of 2-3 sample pages. For smaller orders, proof prints are available for $15. This lets you see exactly how your photos will look before we print the full book.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-offwhite">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-lg text-brand-gray">Our support team is here to help you create the perfect photobook</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-white rounded-xl">
                <div className="w-16 h-16 bg-brand-pale-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-comments text-2xl text-blue-600"></i>
                </div>
                <h3 className="font-bold mb-2">Live Chat</h3>
                <p className="text-sm text-brand-gray mb-4">Chat with our team Monday-Friday, 9AM-6PM EST</p>
                <button className="bg-brand-charcoal text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">Start Chat</button>
              </div>

              <div className="text-center p-8 bg-white rounded-xl">
                <div className="w-16 h-16 bg-brand-pale-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-envelope text-2xl text-green-600"></i>
                </div>
                <h3 className="font-bold mb-2">Email Support</h3>
                <p className="text-sm text-brand-gray mb-4">Get detailed help via email, typically within 2 hours</p>
                <button className="bg-brand-charcoal text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">Send Email</button>
              </div>

              <div className="text-center p-8 bg-white rounded-xl">
                <div className="w-16 h-16 bg-brand-pale-pink rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-phone text-2xl text-pink-600"></i>
                </div>
                <h3 className="font-bold mb-2">Phone Support</h3>
                <p className="text-sm text-brand-gray mb-4">Call us at 1-800-PRINTIQ for immediate assistance</p>
                <button className="bg-brand-charcoal text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">Call Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Helpful Resources</h2>
              <p className="text-lg text-brand-gray">Everything you need to create amazing photobooks</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-brand-offwhite p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-brand-pale-blue rounded-lg flex items-center justify-center mb-4">
                  <i className="fa-solid fa-book text-blue-600"></i>
                </div>
                <h3 className="font-bold mb-2">Design Guide</h3>
                <p className="text-sm text-brand-gray mb-4">Tips and tricks for creating stunning layouts</p>
                <span className="text-sm font-medium text-brand-charcoal hover:underline cursor-pointer">Read More →</span>
              </div>

              <div className="bg-brand-offwhite p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-brand-pale-green rounded-lg flex items-center justify-center mb-4">
                  <i className="fa-solid fa-camera text-green-600"></i>
                </div>
                <h3 className="font-bold mb-2">Photo Tips</h3>
                <p className="text-sm text-brand-gray mb-4">How to prepare your photos for best print quality</p>
                <span className="text-sm font-medium text-brand-charcoal hover:underline cursor-pointer">Learn More →</span>
              </div>

              <div className="bg-brand-offwhite p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-brand-pale-pink rounded-lg flex items-center justify-center mb-4">
                  <i className="fa-solid fa-play-circle text-pink-600"></i>
                </div>
                <h3 className="font-bold mb-2">Video Tutorials</h3>
                <p className="text-sm text-brand-gray mb-4">Step-by-step video guides for our design tool</p>
                <span className="text-sm font-medium text-brand-charcoal hover:underline cursor-pointer">Watch Now →</span>
              </div>

              <div className="bg-brand-offwhite p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-brand-pale-yellow rounded-lg flex items-center justify-center mb-4">
                  <i className="fa-solid fa-lightbulb text-yellow-600"></i>
                </div>
                <h3 className="font-bold mb-2">Inspiration</h3>
                <p className="text-sm text-brand-gray mb-4">Browse customer photobooks for creative ideas</p>
                <span className="text-sm font-medium text-brand-charcoal hover:underline cursor-pointer">Explore →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-charcoal text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold tracking-tight mb-6">Ready to Create Your Photobook?</h2>
            <p className="text-xl text-gray-300 mb-8">Join over 100,000 customers who trust Studio Printique with their precious memories.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-brand-charcoal px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Creating
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-brand-charcoal transition-colors">
                View Templates
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-brand-charcoal text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold tracking-tighter mb-4">Studio Printique</h2>
              <p className="text-gray-300 mb-6 max-w-md">Transform your memories into beautiful photobooks. Premium quality printing with fast, reliable service worldwide.</p>
              <div className="flex items-center gap-4 text-lg">
                <span className="text-gray-300 hover:text-white cursor-pointer transition-colors"><i className="fa-brands fa-facebook-f"></i></span>
                <span className="text-gray-300 hover:text-white cursor-pointer transition-colors"><i className="fa-brands fa-instagram"></i></span>
                <span className="text-gray-300 hover:text-white cursor-pointer transition-colors"><i className="fa-brands fa-tiktok"></i></span>
                <span className="text-gray-300 hover:text-white cursor-pointer transition-colors"><i className="fa-brands fa-pinterest"></i></span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><span className="hover:text-white transition-colors cursor-pointer">Shop All Products</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Templates</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">How It Works</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Pricing</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Reviews</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><span className="hover:text-white transition-colors cursor-pointer">Help Center</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Contact Us</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Order Status</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Shipping Info</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Returns</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <img src="/Images/payment-methods.svg" alt="Payment methods" className="h-6"/>
              </div>
              <div className="flex flex-wrap gap-6 text-xs text-gray-400">
                <span className="hover:text-gray-300 transition-colors cursor-pointer">Privacy Policy</span>
                <span className="hover:text-gray-300 transition-colors cursor-pointer">Terms of Service</span>
                <span className="hover:text-gray-300 transition-colors cursor-pointer">Refund Policy</span>
                <span>&copy; 2024 Studio Printique. All rights reserved.</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
