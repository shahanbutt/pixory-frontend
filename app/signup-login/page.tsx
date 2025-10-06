'use client'

import { useState } from 'react'

export default function SignUpLogin() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')
  const [showPassword, setShowPassword] = useState<{[key: string]: boolean}>({})
  
  // Form data states
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  // Validation states
  const [loginErrors, setLoginErrors] = useState<{[key: string]: string}>({})
  const [signupErrors, setSignupErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const togglePassword = (field: string) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Password validation
  const validatePassword = (password: string): {isValid: boolean, errors: string[]} => {
    const errors: string[] = []
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long')
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter')
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter')
    }
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number')
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }

  // Confirm password validation
  const validateConfirmPassword = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword
  }

  // Handle login form submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const errors: {[key: string]: string} = {}
    
    // Validate email
    if (!loginData.email) {
      errors.email = 'Email is required'
    } else if (!validateEmail(loginData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    
    // Validate password
    if (!loginData.password) {
      errors.password = 'Password is required'
    } else if (loginData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long'
    }
    
    setLoginErrors(errors)
    
    if (Object.keys(errors).length === 0) {
      // Handle login logic here
      console.log('Login data:', loginData)
      // You can add your authentication logic here
    }
    
    setIsSubmitting(false)
  }

  // Handle signup form submission
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const errors: {[key: string]: string} = {}
    
    // Validate first name
    if (!signupData.firstName.trim()) {
      errors.firstName = 'First name is required'
    }
    
    // Validate last name
    if (!signupData.lastName.trim()) {
      errors.lastName = 'Last name is required'
    }
    
    // Validate email
    if (!signupData.email) {
      errors.email = 'Email is required'
    } else if (!validateEmail(signupData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    
    // Validate password
    if (!signupData.password) {
      errors.password = 'Password is required'
    } else {
      const passwordValidation = validatePassword(signupData.password)
      if (!passwordValidation.isValid) {
        errors.password = passwordValidation.errors[0] // Show first error
      }
    }
    
    // Validate confirm password
    if (!signupData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password'
    } else if (!validateConfirmPassword(signupData.password, signupData.confirmPassword)) {
      errors.confirmPassword = 'Passwords do not match'
    }
    
    setSignupErrors(errors)
    
    if (Object.keys(errors).length === 0) {
      // Handle signup logic here
      console.log('Signup data:', signupData)
      // You can add your registration logic here
    }
    
    setIsSubmitting(false)
  }

  // Handle input changes
  const handleLoginChange = (field: string, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (loginErrors[field]) {
      setLoginErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSignupChange = (field: string, value: string) => {
    setSignupData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (signupErrors[field]) {
      setSignupErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="bg-cream min-h-screen">
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <i className="fa-solid fa-book text-charcoal text-2xl"></i>
              <span className="text-2xl font-bold text-charcoal">Studio Printique</span>
            </a>
          </div>
        </div>
      </header>

      <main className="flex min-h-screen">
        <section className="w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal/40 via-charcoal/20 to-transparent z-10"></div>
          <img className="w-full h-full object-cover" src="/Images/signup-login/hero-background.png" alt="elegant photobooks and photo albums arranged artistically on wooden table, soft natural lighting, minimalist aesthetic, premium quality" />
          
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-16 text-white">
            <h1 className="text-5xl font-bold mb-6 leading-tight">Create Beautiful Memories</h1>
            <p className="text-xl mb-8 text-white/90 leading-relaxed">Transform your precious moments into stunning premium photobooks with our professional-grade printing and elegant designs.</p>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">50K+</div>
                  <div className="text-sm text-white/80">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">500+</div>
                  <div className="text-sm text-white/80">Templates</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">4.9</div>
                  <div className="text-sm text-white/80">Rating</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <img src="/Images/signup-login/avatar-1.jpg" alt="Customer" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <div className="font-semibold">Sarah Mitchell</div>
                  <div className="flex text-yellow-400 text-sm">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                </div>
              </div>
              <p className="text-white/90 italic">"The quality exceeded my expectations. My wedding photobook is absolutely stunning and the printing is museum-quality."</p>
            </div>
          </div>
        </section>

        <section className="w-1/2 bg-white flex items-center justify-center px-16 py-12">
          <div className="w-full max-w-md">
            <div className="flex bg-gray-100 rounded-2xl p-2 mb-8">
              <button 
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-3 px-6 rounded-xl text-center font-medium transition-all duration-300 ${
                  activeTab === 'login' 
                    ? 'bg-white text-charcoal shadow-sm' 
                    : 'text-warm-gray hover:text-charcoal'
                }`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-3 px-6 rounded-xl text-center font-medium transition-all duration-300 ${
                  activeTab === 'signup' 
                    ? 'bg-white text-charcoal shadow-sm' 
                    : 'text-warm-gray hover:text-charcoal'
                }`}
              >
                Create Account
              </button>
            </div>

            {activeTab === 'login' && (
              <div>
                <h2 className="text-3xl font-bold text-charcoal mb-2">Welcome back</h2>
                <p className="text-warm-gray mb-8">Sign in to continue creating beautiful memories</p>

                <form onSubmit={handleLoginSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={loginData.email}
                      onChange={(e) => handleLoginChange('email', e.target.value)}
                      className={`w-full px-4 py-4 rounded-xl border transition-all duration-200 text-charcoal placeholder-warm-gray ${
                        loginErrors.email 
                          ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                          : 'border-gray-200 focus:border-sage focus:ring-2 focus:ring-sage/20'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {loginErrors.email && (
                      <p className="mt-2 text-sm text-red-500 flex items-center">
                        <i className="fa-solid fa-exclamation-circle mr-2"></i>
                        {loginErrors.email}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Password</label>
                    <div className="relative">
                      <input 
                        type={showPassword.login ? "text" : "password"} 
                        value={loginData.password}
                        onChange={(e) => handleLoginChange('password', e.target.value)}
                        className={`w-full px-4 py-4 rounded-xl border transition-all duration-200 text-charcoal placeholder-warm-gray pr-12 ${
                          loginErrors.password 
                            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                            : 'border-gray-200 focus:border-sage focus:ring-2 focus:ring-sage/20'
                        }`}
                        placeholder="Enter your password"
                      />
                      <button 
                        type="button" 
                        onClick={() => togglePassword('login')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-warm-gray hover:text-charcoal"
                      >
                        <i className={`fa-regular ${showPassword.login ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                    {loginErrors.password && (
                      <p className="mt-2 text-sm text-red-500 flex items-center">
                        <i className="fa-solid fa-exclamation-circle mr-2"></i>
                        {loginErrors.password}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-sage focus:ring-sage/20 mr-2" />
                      <span className="text-sm text-warm-gray">Remember me</span>
                    </label>
                    <span className="text-sm text-sage hover:text-charcoal transition-colors cursor-pointer">Forgot password?</span>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl font-medium transition-colors ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-charcoal hover:bg-charcoal/90'
                    } text-white`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                        Signing In...
                      </span>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </form>

                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-warm-gray">Or continue with</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                      <i className="fa-brands fa-google text-red-500 mr-2"></i>
                      <span className="text-charcoal font-medium">Google</span>
                    </button>
                    <button className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                      <i className="fa-brands fa-facebook text-blue-600 mr-2"></i>
                      <span className="text-charcoal font-medium">Facebook</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'signup' && (
              <div>
                <h2 className="text-3xl font-bold text-charcoal mb-2">Create your account</h2>
                <p className="text-warm-gray mb-8">Join thousands of happy customers creating beautiful photobooks</p>

                <form onSubmit={handleSignupSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">First Name</label>
                      <input 
                        type="text" 
                        value={signupData.firstName}
                        onChange={(e) => handleSignupChange('firstName', e.target.value)}
                        className={`w-full px-4 py-4 rounded-xl border transition-all duration-200 text-charcoal placeholder-warm-gray ${
                          signupErrors.firstName 
                            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                            : 'border-gray-200 focus:border-sage focus:ring-2 focus:ring-sage/20'
                        }`}
                        placeholder="First name"
                      />
                      {signupErrors.firstName && (
                        <p className="mt-2 text-sm text-red-500 flex items-center">
                          <i className="fa-solid fa-exclamation-circle mr-2"></i>
                          {signupErrors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Last Name</label>
                      <input 
                        type="text" 
                        value={signupData.lastName}
                        onChange={(e) => handleSignupChange('lastName', e.target.value)}
                        className={`w-full px-4 py-4 rounded-xl border transition-all duration-200 text-charcoal placeholder-warm-gray ${
                          signupErrors.lastName 
                            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                            : 'border-gray-200 focus:border-sage focus:ring-2 focus:ring-sage/20'
                        }`}
                        placeholder="Last name"
                      />
                      {signupErrors.lastName && (
                        <p className="mt-2 text-sm text-red-500 flex items-center">
                          <i className="fa-solid fa-exclamation-circle mr-2"></i>
                          {signupErrors.lastName}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={signupData.email}
                      onChange={(e) => handleSignupChange('email', e.target.value)}
                      className={`w-full px-4 py-4 rounded-xl border transition-all duration-200 text-charcoal placeholder-warm-gray ${
                        signupErrors.email 
                          ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                          : 'border-gray-200 focus:border-sage focus:ring-2 focus:ring-sage/20'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {signupErrors.email && (
                      <p className="mt-2 text-sm text-red-500 flex items-center">
                        <i className="fa-solid fa-exclamation-circle mr-2"></i>
                        {signupErrors.email}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Password</label>
                    <div className="relative">
                      <input 
                        type={showPassword.signup ? "text" : "password"} 
                        value={signupData.password}
                        onChange={(e) => handleSignupChange('password', e.target.value)}
                        className={`w-full px-4 py-4 rounded-xl border transition-all duration-200 text-charcoal placeholder-warm-gray pr-12 ${
                          signupErrors.password 
                            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                            : 'border-gray-200 focus:border-sage focus:ring-2 focus:ring-sage/20'
                        }`}
                        placeholder="Create a password"
                      />
                      <button 
                        type="button" 
                        onClick={() => togglePassword('signup')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-warm-gray hover:text-charcoal"
                      >
                        <i className={`fa-regular ${showPassword.signup ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                    {signupErrors.password ? (
                      <p className="mt-2 text-sm text-red-500 flex items-center">
                        <i className="fa-solid fa-exclamation-circle mr-2"></i>
                        {signupErrors.password}
                      </p>
                    ) : (
                      <div className="mt-2 text-xs text-warm-gray">
                        Password must be at least 8 characters with uppercase, lowercase, and number
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Confirm Password</label>
                    <div className="relative">
                      <input 
                        type={showPassword.confirm ? "text" : "password"} 
                        value={signupData.confirmPassword}
                        onChange={(e) => handleSignupChange('confirmPassword', e.target.value)}
                        className={`w-full px-4 py-4 rounded-xl border transition-all duration-200 text-charcoal placeholder-warm-gray pr-12 ${
                          signupErrors.confirmPassword 
                            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                            : 'border-gray-200 focus:border-sage focus:ring-2 focus:ring-sage/20'
                        }`}
                        placeholder="Confirm your password"
                      />
                      <button 
                        type="button" 
                        onClick={() => togglePassword('confirm')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-warm-gray hover:text-charcoal"
                      >
                        <i className={`fa-regular ${showPassword.confirm ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                    {signupErrors.confirmPassword && (
                      <p className="mt-2 text-sm text-red-500 flex items-center">
                        <i className="fa-solid fa-exclamation-circle mr-2"></i>
                        {signupErrors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <div className="flex items-start">
                    <input type="checkbox" className="rounded border-gray-300 text-sage focus:ring-sage/20 mr-3 mt-1" />
                    <span className="text-sm text-warm-gray">I agree to the <span className="text-sage hover:text-charcoal cursor-pointer">Terms of Service</span> and <span className="text-sage hover:text-charcoal cursor-pointer">Privacy Policy</span></span>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl font-medium transition-colors ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-charcoal hover:bg-charcoal/90'
                    } text-white`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                        Creating Account...
                      </span>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </form>

                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-warm-gray">Or sign up with</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                      <i className="fa-brands fa-google text-red-500 mr-2"></i>
                      <span className="text-charcoal font-medium">Google</span>
                    </button>
                    <button className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                      <i className="fa-brands fa-facebook text-blue-600 mr-2"></i>
                      <span className="text-charcoal font-medium">Facebook</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-4">Trusted by Thousands</h2>
            <p className="text-xl text-warm-gray">See what our customers say about their Studio Printique experience</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex text-yellow-400 mb-4">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p className="text-warm-gray mb-6 italic">"The quality is absolutely incredible. My family photobook turned out better than I could have imagined. The colors are vibrant and the paper feels premium."</p>
              <div className="flex items-center">
                <img src="/Images/signup-login/avatar-2.jpg" alt="Customer" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <div className="font-semibold text-charcoal">Michael Chen</div>
                  <div className="text-sm text-warm-gray">Wedding Photography</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex text-yellow-400 mb-4">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p className="text-warm-gray mb-6 italic">"Easy to use interface and beautiful templates. I created my travel photobook in minutes and it arrived perfectly packaged. Will definitely use again!"</p>
              <div className="flex items-center">
                <img src="/Images/signup-login/avatar-5.jpg" alt="Customer" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <div className="font-semibold text-charcoal">Emma Rodriguez</div>
                  <div className="text-sm text-warm-gray">Travel Enthusiast</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex text-yellow-400 mb-4">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p className="text-warm-gray mb-6 italic">"Professional quality at an affordable price. The customer service team was incredibly helpful throughout the process. Highly recommended!"</p>
              <div className="flex items-center">
                <img src="/Images/signup-login/avatar-3.jpg" alt="Customer" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <div className="font-semibold text-charcoal">David Thompson</div>
                  <div className="text-sm text-warm-gray">Family Memories</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-4">Why Choose Studio Printique</h2>
            <p className="text-xl text-warm-gray">Premium quality meets exceptional service</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-sage/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="fa-solid fa-medal text-sage text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-4">Premium Quality</h3>
              <p className="text-warm-gray">Museum-quality printing on premium paper with fade-resistant inks that last generations.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-sage/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="fa-solid fa-palette text-sage text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-4">Beautiful Templates</h3>
              <p className="text-warm-gray">Over 500 professionally designed templates to match any style or occasion.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-sage/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="fa-solid fa-shipping-fast text-sage text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-4">Fast Delivery</h3>
              <p className="text-warm-gray">Quick turnaround with secure packaging and tracking for peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">Your Security & Privacy Matter</h2>
            <p className="text-warm-gray">We protect your personal information and memories with industry-leading security</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-shield-halved text-sage text-3xl"></i>
              </div>
              <div className="font-semibold text-charcoal mb-2">SSL Encrypted</div>
              <div className="text-sm text-warm-gray">256-bit encryption</div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-lock text-sage text-3xl"></i>
              </div>
              <div className="font-semibold text-charcoal mb-2">GDPR Compliant</div>
              <div className="text-sm text-warm-gray">Privacy protected</div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-credit-card text-sage text-3xl"></i>
              </div>
              <div className="font-semibold text-charcoal mb-2">Secure Payments</div>
              <div className="text-sm text-warm-gray">PCI DSS certified</div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-server text-sage text-3xl"></i>
              </div>
              <div className="font-semibold text-charcoal mb-2">Secure Storage</div>
              <div className="text-sm text-warm-gray">Cloud protected</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-charcoal text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <i className="fa-solid fa-book text-2xl"></i>
                <span className="text-2xl font-bold">Studio Printique</span>
              </div>
              <p className="text-white/70 mb-6">Creating beautiful memories through premium photobooks and exceptional service since 2020.</p>
              <div className="flex space-x-4">
                <span className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <i className="fa-brands fa-facebook"></i>
                </span>
                <span className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <i className="fa-brands fa-instagram"></i>
                </span>
                <span className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <i className="fa-brands fa-twitter"></i>
                </span>
                <span className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <i className="fa-brands fa-pinterest"></i>
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-6">Products</h3>
              <ul className="space-y-3 text-white/70">
                <li><span className="hover:text-white transition-colors cursor-pointer">Photo Books</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Wedding Albums</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Travel Books</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Baby Books</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Yearbooks</span></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-6">Support</h3>
              <ul className="space-y-3 text-white/70">
                <li><span className="hover:text-white transition-colors cursor-pointer">Help Center</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Contact Us</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Order Status</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Shipping Info</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Returns</span></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-6">Legal</h3>
              <ul className="space-y-3 text-white/70">
                <li><span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Cookie Policy</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">GDPR</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Accessibility</span></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm">© 2024 Studio Printique. All rights reserved.</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='24' viewBox='0 0 40 24'%3E%3Crect fill='%23ffffff' width='40' height='24' rx='4'/%3E%3Ctext x='20' y='16' text-anchor='middle' fill='%23000' font-size='10' font-family='Arial'%3ESSL%3C/text%3E%3C/svg%3E" alt="SSL Certificate" className="h-6" />
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='24' viewBox='0 0 40 24'%3E%3Crect fill='%23ffffff' width='40' height='24' rx='4'/%3E%3Ctext x='20' y='16' text-anchor='middle' fill='%23000' font-size='8' font-family='Arial'%3EGDPR%3C/text%3E%3C/svg%3E" alt="GDPR Compliant" className="h-6" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
