'use client'

export default function About() {
  return (
    <div className="antialiased min-h-screen bg-brand-offwhite font-inter text-brand-charcoal">
      
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-10">
            <a href="/" className="text-2xl font-bold tracking-tighter cursor-pointer hover:opacity-80 transition-opacity">Studio Printique</a>
            <nav className="hidden md:flex gap-8 text-sm font-medium text-brand-charcoal">
              <a href="/shop-all" className="hover:text-brand-gray transition-colors cursor-pointer">Shop All</a>
              <span className="hover:text-brand-gray transition-colors cursor-pointer text-brand-charcoal border-b-2 border-brand-charcoal pb-1">About</span>
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

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <div>
              <h1 className="text-5xl font-bold tracking-tight mb-6">Crafting memories into timeless keepsakes</h1>
              <p className="text-xl text-brand-gray leading-relaxed mb-8">Since 2018, Studio Printique has been transforming precious moments into beautiful, high-quality photobooks that tell your unique story.</p>
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-check text-green-600"></i>
                  <span>Premium Materials</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-check text-green-600"></i>
                  <span>Expert Craftsmanship</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-check text-green-600"></i>
                  <span>Worldwide Shipping</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <img className="w-full h-full object-cover" src="/Images/about/hero-workshop.png" alt="elegant photobook workshop with artisan hands carefully binding premium quality photo albums, soft natural lighting, craftsmanship details" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-offwhite">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight mb-6">Our Story</h2>
              <p className="text-lg text-brand-gray leading-relaxed">From a small passion project to a global community of memory makers</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-bold mb-4">It started with a simple belief</h3>
                <p className="text-brand-gray mb-6">In 2018, our founders Emma and Michael noticed that despite taking thousands of digital photos, most people rarely printed or displayed their favorite memories. They believed that physical photobooks create a deeper, more meaningful connection to our experiences.</p>
                <p className="text-brand-gray mb-6">What began as a weekend project in their garage has grown into a trusted platform used by over 100,000 customers worldwide. We've maintained our commitment to quality, craftsmanship, and helping people preserve their most precious moments.</p>
                <div className="flex items-center gap-4">
                  <img className="w-12 h-12 rounded-full" src="/Images/HomePage/avatar-5.jpg" alt="Emma" />
                  <img className="w-12 h-12 rounded-full" src="/Images/HomePage/avatar-2.jpg" alt="Michael" />
                  <div className="text-sm">
                    <div className="font-semibold">Emma & Michael</div>
                    <div className="text-brand-gray">Co-Founders</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="h-[400px] rounded-xl overflow-hidden">
                  <img className="w-full h-full object-cover" src="/Images/about/founders-office.png" alt="founders of photobook company in modern office space, smiling entrepreneurs with photobook samples, professional portrait photography" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight mb-6">What We Stand For</h2>
              <p className="text-lg text-brand-gray">Our core values guide everything we do</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-brand-pale-blue rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fa-solid fa-gem text-2xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-4">Uncompromising Quality</h3>
                <p className="text-brand-gray leading-relaxed">We use only premium materials and the latest printing technology to ensure your photobooks exceed expectations and stand the test of time.</p>
              </div>

              <div className="text-center p-8">
                <div className="w-16 h-16 bg-brand-pale-pink rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fa-solid fa-palette text-2xl text-pink-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-4">Creative Freedom</h3>
                <p className="text-brand-gray leading-relaxed">Every story is unique. Our intuitive design tools and extensive template library give you complete creative control over your photobook.</p>
              </div>

              <div className="text-center p-8">
                <div className="w-16 h-16 bg-brand-pale-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fa-solid fa-heart text-2xl text-green-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-4">Personal Service</h3>
                <p className="text-brand-gray leading-relaxed">Behind every order is a real person with precious memories. We're here to help make your photobook creation experience delightful and stress-free.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-offwhite">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight mb-6">How We Create Magic</h2>
              <p className="text-lg text-brand-gray">From your photos to your doorstep - our meticulous process</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-brand-pale-blue rounded-full flex items-center justify-center mx-auto">
                    <i className="fa-solid fa-upload text-2xl text-blue-600"></i>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-charcoal text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                </div>
                <h3 className="text-lg font-bold mb-3">Upload & Design</h3>
                <p className="text-sm text-brand-gray">Upload your photos and use our intuitive editor to create your perfect layout</p>
              </div>

              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-brand-pale-pink rounded-full flex items-center justify-center mx-auto">
                    <i className="fa-solid fa-eye text-2xl text-pink-600"></i>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-charcoal text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                </div>
                <h3 className="text-lg font-bold mb-3">Quality Review</h3>
                <p className="text-sm text-brand-gray">Our experts review every photobook for image quality and layout perfection</p>
              </div>

              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-brand-pale-green rounded-full flex items-center justify-center mx-auto">
                    <i className="fa-solid fa-print text-2xl text-green-600"></i>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-charcoal text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                </div>
                <h3 className="text-lg font-bold mb-3">Premium Printing</h3>
                <p className="text-sm text-brand-gray">Printed on archival-quality paper using state-of-the-art printing technology</p>
              </div>

              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-brand-pale-yellow rounded-full flex items-center justify-center mx-auto">
                    <i className="fa-solid fa-box text-2xl text-yellow-600"></i>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-charcoal text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                </div>
                <h3 className="text-lg font-bold mb-3">Careful Packaging</h3>
                <p className="text-sm text-brand-gray">Hand-packed with care and shipped with tracking to ensure safe delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold tracking-tight mb-6">Caring for Our Planet</h2>
                <p className="text-lg text-brand-gray mb-8">We believe beautiful memories shouldn't come at the cost of our environment. That's why we've committed to sustainable practices throughout our entire process.</p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-pale-green rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-leaf text-green-600"></i>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">FSC-Certified Papers</h4>
                      <p className="text-brand-gray text-sm">All our papers come from responsibly managed forests certified by the Forest Stewardship Council.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-pale-blue rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-recycle text-blue-600"></i>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Eco-Friendly Packaging</h4>
                      <p className="text-brand-gray text-sm">Recyclable packaging materials and minimal waste in our shipping process.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-pale-pink rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-bolt text-pink-600"></i>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Clean Energy</h4>
                      <p className="text-brand-gray text-sm">Our printing facilities are powered by renewable energy sources.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="h-[500px] rounded-2xl overflow-hidden">
                  <img className="w-full h-full object-cover" src="/Images/about/sustainability-facility.png" alt="sustainable printing facility with solar panels and green technology, eco-friendly photobook production, environmental responsibility" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-offwhite">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight mb-6">Meet Our Team</h2>
              <p className="text-lg text-brand-gray">The passionate people behind Studio Printique</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="mb-6">
                  <img className="w-32 h-32 rounded-full mx-auto object-cover" src="/Images/HomePage/avatar-5.jpg" alt="Emma Thompson" />
                </div>
                <h3 className="text-lg font-bold mb-2">Emma Thompson</h3>
                <p className="text-brand-gray text-sm mb-3">Co-Founder & CEO</p>
                <p className="text-xs text-brand-gray mb-4">Former graphic designer with a passion for preserving memories through beautiful design.</p>
                <div className="flex justify-center gap-3 text-brand-gray">
                  <i className="fa-brands fa-linkedin hover:text-brand-charcoal cursor-pointer"></i>
                  <i className="fa-brands fa-twitter hover:text-brand-charcoal cursor-pointer"></i>
                </div>
              </div>

              <div className="text-center">
                <div className="mb-6">
                  <img className="w-32 h-32 rounded-full mx-auto object-cover" src="/Images/HomePage/avatar-2.jpg" alt="Michael Chen" />
                </div>
                <h3 className="text-lg font-bold mb-2">Michael Chen</h3>
                <p className="text-brand-gray text-sm mb-3">Co-Founder & CTO</p>
                <p className="text-xs text-brand-gray mb-4">Technology enthusiast focused on creating intuitive tools for creative expression.</p>
                <div className="flex justify-center gap-3 text-brand-gray">
                  <i className="fa-brands fa-linkedin hover:text-brand-charcoal cursor-pointer"></i>
                  <i className="fa-brands fa-github hover:text-brand-charcoal cursor-pointer"></i>
                </div>
              </div>

              <div className="text-center">
                <div className="mb-6">
                  <img className="w-32 h-32 rounded-full mx-auto object-cover" src="/Images/about/avatar-7.jpg" alt="Sarah Rodriguez" />
                </div>
                <h3 className="text-lg font-bold mb-2">Sarah Rodriguez</h3>
                <p className="text-brand-gray text-sm mb-3">Head of Design</p>
                <p className="text-xs text-brand-gray mb-4">Creative director ensuring every template and design element is pixel-perfect.</p>
                <div className="flex justify-center gap-3 text-brand-gray">
                  <i className="fa-brands fa-dribbble hover:text-brand-charcoal cursor-pointer"></i>
                  <i className="fa-brands fa-behance hover:text-brand-charcoal cursor-pointer"></i>
                </div>
              </div>

              <div className="text-center">
                <div className="mb-6">
                  <img className="w-32 h-32 rounded-full mx-auto object-cover" src="/Images/about/avatar-4.jpg" alt="David Kim" />
                </div>
                <h3 className="text-lg font-bold mb-2">David Kim</h3>
                <p className="text-brand-gray text-sm mb-3">Quality Manager</p>
                <p className="text-xs text-brand-gray mb-4">Ensuring every photobook meets our exacting standards before it ships.</p>
                <div className="flex justify-center gap-3 text-brand-gray">
                  <i className="fa-brands fa-linkedin hover:text-brand-charcoal cursor-pointer"></i>
                  <i className="fa-brands fa-twitter hover:text-brand-charcoal cursor-pointer"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight mb-6">Awards & Recognition</h2>
              <p className="text-lg text-brand-gray">Proud to be recognized by industry leaders</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-brand-pale-yellow rounded-xl">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-trophy text-2xl text-yellow-600"></i>
                </div>
                <h3 className="font-bold mb-2">Best Photo Service 2023</h3>
                <p className="text-sm text-brand-gray">Photography Magazine</p>
              </div>

              <div className="text-center p-8 bg-brand-pale-blue rounded-xl">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-star text-2xl text-blue-600"></i>
                </div>
                <h3 className="font-bold mb-2">Customer Choice Award</h3>
                <p className="text-sm text-brand-gray">Print Industry Awards 2023</p>
              </div>

              <div className="text-center p-8 bg-brand-pale-green rounded-xl">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-leaf text-2xl text-green-600"></i>
                </div>
                <h3 className="font-bold mb-2">Eco-Friendly Business</h3>
                <p className="text-sm text-brand-gray">Green Business Council 2022</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-charcoal text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold tracking-tight mb-6">Ready to Create Your Story?</h2>
            <p className="text-xl text-gray-300 mb-8">Join over 100,000 customers who trust Studio Printique with their precious memories.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/book-design" className="bg-brand-charcoal text-white px-8 py-4 rounded-lg font-semibold hover:bg-black transition-colors">Start Creating</a>
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
