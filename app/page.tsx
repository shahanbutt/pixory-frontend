'use client'

import { useState } from 'react'

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="antialiased">
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
        <section className="relative w-full h-[650px] flex items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" src="/Images/HomePage/hero-background.png" alt="A beautifully arranged flat lay of pastel colored custom photobooks on a neutral background, soft natural lighting, elegant style" />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          <div className="relative z-10 bg-white/80 backdrop-blur-sm p-10 rounded-lg shadow-xl max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-4 shadow">
              <div className="flex -space-x-2">
                <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="/Images/HomePage/avatar-1.jpg" alt="User 1" />
                <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="/Images/HomePage/avatar-2.jpg" alt="User 2" />
                <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="/Images/HomePage/avatar-5.jpg" alt="User 3" />
              </div>
              <span className="text-xs font-semibold text-brand-charcoal">10,000+ Happy Customers</span>
            </div>
            <h2 className="text-4xl font-bold text-brand-charcoal tracking-tight mb-3">Preserve your adventures in beautiful photobooks</h2>
            <p className="text-brand-gray mb-6">Studio Printique allows you to create lasting keepsakes of your cherished moments. Transform your experiences into unforgettable stories.</p>
                      <div className="flex justify-center gap-4">
                          <a href="/book-design" className="bg-brand-charcoal text-white px-6 py-3 rounded-md font-semibold text-sm hover:bg-black transition-colors">Start My Design</a>
                          <button className="bg-transparent border border-gray-400 text-brand-charcoal px-6 py-3 rounded-md font-semibold text-sm hover:bg-gray-100 transition-colors">Read the reviews</button>
                      </div>
          </div>
          <div className="absolute bottom-8 text-center w-full">
            <p className="text-sm font-semibold tracking-wider text-brand-charcoal bg-white/80 backdrop-blur-sm py-1 px-4 rounded-full inline-block">#1 rated in photo books</p>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="max-w-md">
              <h3 className="text-4xl font-bold tracking-tight mb-4">Preserve your adventures in stunning photobooks</h3>
              <p className="text-brand-gray mb-8">Studio Printique's travel books capture the emotional essence of your journeys, transforming them into beautiful keepsakes that will last a lifetime. Each book is meticulously crafted to reflect the unique aesthetic and sentimental value of your experiences.</p>
                          <div className="flex gap-4">
                              <a href="/book-design" className="bg-brand-charcoal text-white px-6 py-3 rounded-md font-semibold text-sm hover:bg-black transition-colors">Start My Design</a>
                              <button className="bg-transparent border border-gray-400 text-brand-charcoal px-6 py-3 rounded-md font-semibold text-sm hover:bg-gray-100 transition-colors">Read the reviews</button>
                          </div>
            </div>
            <div>
              <img className="w-full h-auto rounded-lg shadow-xl" src="/Images/HomePage/feature-1-photobook.png" alt="A beautifully designed photobook with" />
            </div>
          </div>
        </section>

        <section className="py-24 bg-brand-offwhite">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <img className="w-full h-auto rounded-lg shadow-xl" src="/Images/HomePage/feature-2-collage.png" alt="An open photobook showcasing a collage of travel photos from a beach vacation, clean and elegant layout, professional photography" />
            </div>
            <div className="max-w-md">
              <h3 className="text-2xl font-bold tracking-tight mb-8">Discover the Studio Printique Advantage</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-xl pt-1"><i className="fa-regular fa-heart"></i></div>
                  <div>
                    <h4 className="font-semibold">Emotional Essence and Keepsakes</h4>
                    <p className="text-brand-gray text-sm">Transform your cherished memories into lasting, beautiful photobooks.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-xl pt-1"><i className="fa-regular fa-bookmark"></i></div>
                  <div>
                    <h4 className="font-semibold">Meticulous Craftsmanship</h4>
                    <p className="text-brand-gray text-sm">Each book is meticulously designed to reflect the unique value of your experiences.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-xl pt-1"><i className="fa-regular fa-star"></i></div>
                  <div>
                    <h4 className="font-semibold">Highly Rated and Trusted</h4>
                    <p className="text-brand-gray text-sm">Rated #1 in photo books with over 10,000 happy customers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-start mb-12">
               <h3 className="text-4xl font-bold tracking-tight max-w-sm">It's easy as 1, 2, 3 to create your photobook</h3>
               <p className="text-brand-gray max-w-md pt-2">With Studio Printique, you can easily transform your holiday photos into a stunning photobook that captures the essence of your journey. Simply upload your images, customize the layout, and add captions to create a unique keepsake.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10 text-center">
              <div>
                <img className="w-full h-auto rounded-lg mb-4" src="/Images/HomePage/step-1-templates.png" alt="A hand selecting a travel-themed photobook template on a screen, showing templates for BALI and other destinations, clean UI design" />
                <h4 className="font-bold text-lg">1. CHOOSE YOUR TEMPLATE</h4>
                <p className="text-brand-gray text-sm mt-2">You can fully customize every template in our easy to use editor online! No app needed!</p>
              </div>
              <div>
                 <img className="w-full h-auto rounded-lg mb-4" src="/Images/HomePage/step-2-upload.png" alt="A collection of vacation photos being arranged into a photobook layout, with an" />
                <h4 className="font-bold text-lg">2. UPLOAD YOUR PHOTOS</h4>
                <p className="text-brand-gray text-sm mt-2">We'll instantly organize your photos into a cohesive, well-designed story. You can also use Auto Create for faster uploads!</p>
              </div>
              <div>
                 <img className="w-full h-auto rounded-lg mb-4" src="/Images/HomePage/step-3-customize.png" alt="A preview of a customized photobook page with different fonts, colors, and stickers for PARIS, GREECE, and DUBAI, interactive design elements" />
                <h4 className="font-bold text-lg">3. CUSTOMIZE YOUR BOOK</h4>
                <p className="text-brand-gray text-sm mt-2">Easily change fonts, backgrounds, colors, shapes, stickers, and more to make it truly yours and memorable!</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-24 bg-brand-offwhite">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <img className="w-full h-auto rounded-lg shadow-xl" src="/Images/HomePage/quality-showcase.png" alt="A stack of five beautifully crafted pastel-colored photobooks with city names like PARIS, MIAMI, DUBAI, GREECE, modern and minimalist style" />
            </div>
            <div className="max-w-md">
              <span className="inline-block border border-gray-400 rounded-full px-3 py-1 text-xs font-semibold mb-3"><i className="fa-solid fa-gem mr-2"></i>High-Quality Prints</span>
              <h3 className="text-4xl font-bold tracking-tight mb-4">Beautiful quality for beautiful moments</h3>
              <p className="text-brand-gray">Preserve your cherished moments in a beautifully crafted photobook that captures the essence of your adventures.</p>
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
                <img className="w-full h-auto rounded-lg mb-6" src="/Images/HomePage/testimonial-christine.png" alt="A smiling woman holding a custom photobook with" />
                <div className="flex text-yellow-500 gap-1 mb-2">
                  <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                </div>
                <h4 className="font-bold mb-2">Absolutely stunning!</h4>
                <p className="text-brand-gray text-sm mb-4">"Just got my Studio Printique photobook and it's absolutely stunning! It looks so stylish on my coffee table and was the perfect way to relive my travels. I would recommend it to everyone!"</p>
                <p className="text-sm font-semibold">Christine</p>
              </div>
              <div className="bg-brand-offwhite p-8 rounded-lg text-left">
                <img className="w-full h-auto rounded-lg mb-6" src="/Images/HomePage/testimonial-ella.png" alt="A happy woman showing off her travel photobook with" />
                <div className="flex text-yellow-500 gap-1 mb-2">
                  <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                </div>
                <h4 className="font-bold mb-2">The perfect way to relive my travels</h4>
                <p className="text-brand-gray text-sm mb-4">"I'm obsessed with my photobooks from Studio Printique! They're the perfect way to relive my travels and I already can't wait to make another one for my next trip. The quality is amazing."</p>
                <p className="text-sm font-semibold">Ella S</p>
              </div>
              <div className="bg-brand-offwhite p-8 rounded-lg text-left">
                <img className="w-full h-auto rounded-lg mb-6" src="/Images/HomePage/testimonial-sienna.png" alt="A cheerful woman holding up her photobook with" />
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
        
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h3 className="text-4xl font-bold tracking-tight mb-2">FAQ</h3>
              <p className="text-brand-gray mb-8">Find answers to commonly asked questions about Studio Printique photobooks and the creation process.</p>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <button 
                    onClick={() => toggleFaq(1)} 
                    className="w-full flex justify-between items-center text-left font-semibold"
                  >
                    <span>How Do I Order?</span>
                    <i className={`fa-solid fa-plus transition-transform ${openFaq === 1 ? 'rotate-45' : ''}`}></i>
                  </button>
                  {openFaq === 1 && (
                    <div className="mt-2 text-brand-gray text-sm">
                      You can start your design by clicking "Start My Design". Our online editor will guide you through choosing a template, uploading photos, and customizing your book. Once you're happy, proceed to checkout.
                    </div>
                  )}
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <button 
                    onClick={() => toggleFaq(2)} 
                    className="w-full flex justify-between items-center text-left font-semibold"
                  >
                    <span>How Long Will My Order Take To Arrive?</span>
                    <i className={`fa-solid fa-plus transition-transform ${openFaq === 2 ? 'rotate-45' : ''}`}></i>
                  </button>
                  {openFaq === 2 && (
                    <div className="mt-2 text-brand-gray text-sm">
                      Production takes 3-5 business days. Shipping times vary based on your location and selected shipping method. You will receive a tracking number once your order has shipped.
                    </div>
                  )}
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <button 
                    onClick={() => toggleFaq(3)} 
                    className="w-full flex justify-between items-center text-left font-semibold"
                  >
                    <span>Do You Ship Internationally?</span>
                    <i className={`fa-solid fa-plus transition-transform ${openFaq === 3 ? 'rotate-45' : ''}`}></i>
                  </button>
                  {openFaq === 3 && (
                    <div className="mt-2 text-brand-gray text-sm">
                      Yes, we ship to most countries worldwide. International shipping costs and times will be calculated at checkout.
                    </div>
                  )}
                </div>
                 <div className="border-b border-gray-200 pb-4">
                  <button 
                    onClick={() => toggleFaq(4)} 
                    className="w-full flex justify-between items-center text-left font-semibold"
                  >
                    <span>How Much Can I Customize My Design?</span>
                    <i className={`fa-solid fa-plus transition-transform ${openFaq === 4 ? 'rotate-45' : ''}`}></i>
                  </button>
                  {openFaq === 4 && (
                    <div className="mt-2 text-brand-gray text-sm">
                      Our editor offers full customization. You can change layouts, backgrounds, fonts, and add stickers or text to make your photobook uniquely yours.
                    </div>
                  )}
                </div>
                 <div className="border-b border-gray-200 pb-4">
                  <button 
                    onClick={() => toggleFaq(5)} 
                    className="w-full flex justify-between items-center text-left font-semibold"
                  >
                    <span>What Are The Dimensions Of Your Books?</span>
                    <i className={`fa-solid fa-plus transition-transform ${openFaq === 5 ? 'rotate-45' : ''}`}></i>
                  </button>
                  {openFaq === 5 && (
                    <div className="mt-2 text-brand-gray text-sm">
                      Our standard photobooks are 8.5 x 8.5 inches. We also offer larger formats and different orientations. Please check the product page for specific details.
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="relative">
               <img className="w-full h-auto rounded-lg" src="/Images/HomePage/faq-designs-grid.png" alt="A colorful grid collage of 20 different travel-themed photobook covers, including London, Ibiza, Japan, Bali, New York, and Sydney, vibrant and artistic style" />
               <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
                   <div className="text-center text-white">
                       <h4 className="text-2xl font-bold">130+ Customisable Designs</h4>
                   </div>
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
                       <img src="https://storage.googleapis.com/uxpilot-images-and-files/2024-06-03/1717441838495-visa-mastercard.png" alt="Payment methods" className="h-6 mx-auto md:mx-0 md:ml-auto mb-4"/>
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