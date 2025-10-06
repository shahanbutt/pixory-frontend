'use client'

import { useState } from 'react'

export default function ShopAll() {
  const [openFaq, setOpenFaq] = useState<number | null>(null) // All FAQs closed by default
  const [selectedTemplate, setSelectedTemplate] = useState({
    name: 'Paris 1',
    img: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/thumbnails/paris-1.png'
  })
  const [isTemplateOpen, setIsTemplateOpen] = useState(false)
  
  // Image gallery state
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const galleryImages = [
    { src: '/Images/shop-all/main-product.png', alt: 'A bright pink photobook with' },
    { src: '/Images/shop-all/thumbnail-1.png', alt: 'Close-up of a bright pink photobook cover with' },
    { src: '/Images/shop-all/thumbnail-2.png', alt: 'Woman happily holding a custom photobook, smiling at the camera, soft natural light' },
    { src: '/Images/shop-all/thumbnail-3.png', alt: 'Flat lay of photobook creation tools, laptop, photos, and a finished book, on a clean desk' },
    { src: '/Images/shop-all/thumbnail-4.png', alt: 'Open photobook showing a collage of vibrant travel photos from a European vacation' },
    { src: '/Images/shop-all/thumbnail-5.png', alt: 'Stack of colorful custom photobooks with different city names, minimalist design' }
  ]

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const selectImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  const templates = [
    { name: 'Paris 1', img: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/thumbnails/paris-1.png' },
    { name: 'Summer 1', img: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/thumbnails/summer-1.png', isNew: true },
    { name: 'Summer 2', img: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/thumbnails/summer-2.png', isNew: true },
    { name: 'Algarve', img: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/thumbnails/algarve.png', isNew: true },
    { name: 'Amalfi', img: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/thumbnails/amalfi.png', isNew: true },
    { name: 'Cannes', img: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/thumbnails/cannes.png' },
    { name: 'Caribbean', img: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/thumbnails/caribbean.png' }
  ]

  return (
    <div className="antialiased bg-white font-inter text-brand-charcoal">
      
      <section className="w-full bg-brand-charcoal text-white text-xs py-2">
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

      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-10">
            <a href="/" className="text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">Studio Printique</a>
            <nav className="hidden md:flex gap-8 text-sm font-medium text-brand-charcoal">
              <a href="/shop-all" className="text-brand-charcoal font-bold transition-colors cursor-pointer">Shop All</a>
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
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Image Gallery */}
              <div className="w-full">
                <div className="relative">
                  <div className="absolute top-4 left-4 bg-brand-charcoal text-white text-xs font-bold px-3 py-1.5 rounded-md z-10">Flash October Sale 50% OFF</div>
                  <div className="relative flex items-center justify-center">
                    <img 
                      className="w-full h-auto max-w-lg mx-auto rounded-lg" 
                      src={galleryImages[currentImageIndex].src} 
                      alt={galleryImages[currentImageIndex].alt} 
                    />
                    <button 
                      onClick={prevImage}
                      className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                  <div className="flex justify-center gap-3 mt-4">
                    {galleryImages.map((image, index) => (
                      <div 
                        key={index}
                        onClick={() => selectImage(index)}
                        className={`w-20 h-20 rounded-md p-1 cursor-pointer transition-colors ${
                          currentImageIndex === index 
                            ? 'border-2 border-brand-charcoal' 
                            : 'border border-gray-200 hover:border-brand-charcoal'
                        }`}
                      >
                        <img 
                          className="w-full h-full object-cover rounded-sm" 
                          src={image.src} 
                          alt={image.alt} 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="w-full">
                <h2 className="font-space-grotesk text-4xl font-bold tracking-tighter mb-3">custom travel book</h2>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex text-yellow-500 gap-0.5">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <span className="text-sm text-brand-gray">(72 Reviews) 4.99 / 5.00</span>
                </div>
                <div className="flex items-baseline gap-3 mb-5">
                  <p className="text-xl font-bold">24 Pages for AED 123.71</p>
                  <p className="text-brand-gray line-through">AED 247.43</p>
                  <span className="bg-brand-charcoal text-white text-xs font-bold px-2 py-1 rounded-md">50% OFF</span>
                </div>
                <div className="border-t border-b border-gray-200 py-5">
                  <p className="text-brand-gray text-sm leading-relaxed">
                    Choose your template or start from scratch, and design your custom travel book in under 10 minutes! All templates are fully customisable in the editor.
                  </p>
                </div>
                
                <div className="mt-6">
                  <p className="text-sm font-semibold mb-2">Choose your cover template or start from scratch</p>
                  <div className="border border-gray-300 rounded-lg">
                    <button 
                      onClick={() => setIsTemplateOpen(!isTemplateOpen)}
                      className="w-full flex items-center justify-between p-3 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <img src={selectedTemplate.img} className="w-8 h-10 object-cover rounded-sm" alt={selectedTemplate.name} />
                        <span className="font-medium">{selectedTemplate.name}</span>
                      </div>
                      <i className={`fa-solid fa-chevron-up transition-transform ${isTemplateOpen ? 'rotate-180' : ''}`}></i>
                    </button>
                    {isTemplateOpen && (
                      <div className="border-t border-gray-300 p-2 max-h-64 overflow-y-auto">
                        <ul className="space-y-1">
                          {templates.map((template, index) => (
                            <li 
                              key={index}
                              onClick={() => {
                                setSelectedTemplate(template)
                                setIsTemplateOpen(false)
                              }}
                              className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                            >
                              <div className="flex items-center gap-3">
                                <img src={template.img} className="w-8 h-10 object-cover rounded-sm" alt={template.name} />
                                <span className="text-sm">{template.name}</span>
                              </div>
                              {template.isNew && (
                                <span className="bg-pink-100 text-pink-800 text-xs font-semibold px-2 py-0.5 rounded-full">new</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-8">
                  <a href="/book-design" className="w-full bg-brand-charcoal text-white py-3.5 rounded-lg font-semibold hover:bg-black transition-colors text-center block">Start My Design</a>
                  <p className="text-xs text-brand-gray text-center mt-3">Free shipping on all orders</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-24 bg-brand-offwhite">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-space-grotesk text-5xl font-bold tracking-tighter mb-4">questions</h2>
              <p className="text-brand-gray">Find answers to commonly asked questions about our custom travel books and the creation process.</p>
            </div>
            <div className="max-w-3xl mx-auto mt-12 space-y-4">
              <div className="border-b border-gray-300 pb-4">
                <button 
                  onClick={() => toggleFaq(1)}
                  className="w-full flex justify-between items-center text-left font-semibold text-lg"
                >
                  <span>How Thick Will My Book Be?</span>
                  <i className={`fa-solid fa-plus transition-transform ${openFaq === 1 ? 'rotate-45' : ''}`}></i>
                </button>
                {openFaq === 1 && (
                  <div className="mt-3 text-brand-gray">
                    Our books start at 24 pages and can go up to 200 pages. The thickness will vary depending on the number of pages you choose. Each book has a professionally bound spine that looks great on any bookshelf.
                  </div>
                )}
              </div>
              <div className="border-b border-gray-300 pb-4">
                <button 
                  onClick={() => toggleFaq(2)}
                  className="w-full flex justify-between items-center text-left font-semibold text-lg"
                >
                  <span>What Is The Quality Of The Paper?</span>
                  <i className={`fa-solid fa-plus transition-transform ${openFaq === 2 ? 'rotate-45' : ''}`}></i>
                </button>
                {openFaq === 2 && (
                  <div className="mt-3 text-brand-gray">
                    We use premium, archival-quality paper with a semi-gloss finish to ensure your photos look vibrant and last a lifetime. The paper is thick and durable, perfect for a keepsake you'll flip through for years.
                  </div>
                )}
              </div>
              <div className="border-b border-gray-300 pb-4">
                <button 
                  onClick={() => toggleFaq(3)}
                  className="w-full flex justify-between items-center text-left font-semibold text-lg"
                >
                  <span>Can I Add My Own Text And Clipart?</span>
                  <i className={`fa-solid fa-plus transition-transform ${openFaq === 3 ? 'rotate-45' : ''}`}></i>
                </button>
                {openFaq === 3 && (
                  <div className="mt-3 text-brand-gray">
                    Absolutely! Our online editor is packed with features that allow you to add custom text, captions, and choose from a library of stickers and clipart to personalize every page of your travel book.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 text-center">
            <div className="flex justify-center items-center gap-2 text-yellow-500">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star-half-stroke"></i>
            </div>
            <p className="text-sm text-brand-gray mt-2 mb-3">Rated 4.9/5 based on 1475 reviews</p>
            <h3 className="text-4xl font-bold tracking-tight mb-12">Loved by thousands of Studio Printique fans!</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-brand-offwhite p-8 rounded-lg text-left">
                <img className="w-full h-auto rounded-lg mb-6" src="/Images/shop-all/testimonial-1.png" alt="A smiling woman holding a custom photobook with a Paris theme, sitting in a stylish living room, natural light, candid shot" />
                <div className="flex text-yellow-500 gap-1 mb-2">
                  <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                </div>
                <h4 className="font-bold mb-2">Absolutely stunning!</h4>
                <p className="text-brand-gray text-sm mb-4">"Just got my Studio Printique photobook and it's absolutely stunning! It looks so stylish on my coffee table and was the perfect way to relive my travels. I would recommend it to everyone!"</p>
                <p className="text-sm font-semibold">Christine</p>
              </div>
              <div className="bg-brand-offwhite p-8 rounded-lg text-left">
                <img className="w-full h-auto rounded-lg mb-6" src="/Images/shop-all/testimonial-2.png" alt="A happy woman showing off her travel photobook with a tropical beach theme, outdoors on a sunny day, joyful expression" />
                <div className="flex text-yellow-500 gap-1 mb-2">
                  <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                </div>
                <h4 className="font-bold mb-2">The perfect way to relive my travels</h4>
                <p className="text-brand-gray text-sm mb-4">"I'm obsessed with my photobooks from Studio Printique! They're the perfect way to relive my travels and I already can't wait to make another one for my next trip. The quality is amazing."</p>
                <p className="text-sm font-semibold">Ella S</p>
              </div>
              <div className="bg-brand-offwhite p-8 rounded-lg text-left">
                <img className="w-full h-auto rounded-lg mb-6" src="/Images/shop-all/testimonial-3.png" alt="A cheerful woman holding up her photobook with a vibrant city theme, in a cozy cafe, looking proud of her creation" />
                <div className="flex text-yellow-500 gap-1 mb-2">
                  <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                </div>
                <h4 className="font-bold mb-2">The process was super easy</h4>
                <p className="text-brand-gray text-sm mb-4">"So excited to share my Studio Printique photobook from my last vacation! The process was super easy and I love how much I could customize it. It turned out even better than I imagined."</p>
                <p className="text-sm font-semibold">Sienna</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-brand-offwhite">
        <div className="container mx-auto px-6 pt-16 pb-8">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left border-b border-gray-200 pb-12">
            <div className="flex flex-col items-center md:items-start">
              <i className="fa-solid fa-truck-fast text-2xl mb-3"></i>
              <h5 className="font-bold mb-1">Fast Shipping</h5>
              <p className="text-brand-gray text-sm max-w-xs">Get your photobooks delivered quickly and efficiently. We ensure prompt delivery so you can enjoy your memories without delay.</p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <i className="fa-solid fa-shield-halved text-2xl mb-3"></i>
              <h5 className="font-bold mb-1">100% Satisfaction Guarantee</h5>
              <p className="text-brand-gray text-sm max-w-xs">We stand by the quality of our photobooks. If you're not completely satisfied, we'll make it right with our satisfaction guarantee.</p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <i className="fa-regular fa-star text-2xl mb-3"></i>
              <h5 className="font-bold mb-1">100,000+ Happy Customers</h5>
              <p className="text-brand-gray text-sm max-w-xs">Join our community of happy customers who have preserved their adventures with Studio Printique. Your memories are in good hands.</p>
            </div>
          </div>
          <div className="pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold tracking-tighter mb-4">Studio Printique</h2>
                <div className="flex items-center gap-4 text-sm">
                  <span>Contact:</span>
                  <span className="text-brand-gray hover:text-brand-charcoal cursor-pointer">support@studioprintique.com</span>
                </div>
                <div className="flex items-center gap-4 mt-4 text-lg">
                  <span className="text-brand-gray hover:text-brand-charcoal cursor-pointer"><i className="fa-brands fa-facebook-f"></i></span>
                  <span className="text-brand-gray hover:text-brand-charcoal cursor-pointer"><i className="fa-brands fa-instagram"></i></span>
                  <span className="text-brand-gray hover:text-brand-charcoal cursor-pointer"><i className="fa-brands fa-tiktok"></i></span>
                  <span className="text-brand-gray hover:text-brand-charcoal cursor-pointer"><i className="fa-brands fa-pinterest"></i></span>
                </div>
              </div>
              <div className="text-center md:text-right">
                <img src="/Images/payment-methods.svg" alt="Payment methods" className="h-6 mx-auto md:mx-0 md:ml-auto mb-4"/>
                <p className="text-xs text-brand-gray mb-4">&copy; 2024 Studio Printique. All rights reserved.</p>
                <div className="flex gap-4 justify-center md:justify-end text-xs text-brand-gray">
                  <span className="hover:text-brand-charcoal cursor-pointer">Order status</span>
                  <span className="hover:text-brand-charcoal cursor-pointer">Terms and Conditions</span>
                  <span className="hover:text-brand-charcoal cursor-pointer">Privacy policy</span>
                  <span className="hover:text-brand-charcoal cursor-pointer">About us</span>
                  <span className="hover:text-brand-charcoal cursor-pointer">Contact us</span>
                  <span className="hover:text-brand-charcoal cursor-pointer">Refund policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
