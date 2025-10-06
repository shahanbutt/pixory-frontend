'use client'

import { useState, useEffect } from 'react'

interface Order {
  id: string
  customer: {
    name: string
    email: string
    avatar: string
  }
  bookTitle: string
  pages: number
  status: 'pending' | 'printed' | 'dispatched'
  date: string
}

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(true)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [emailTemplate, setEmailTemplate] = useState('status-update')
  const [emailSubject, setEmailSubject] = useState('')
  const [emailMessage, setEmailMessage] = useState('')

  // Sample orders data
  const [orders] = useState<Order[]>([
    {
      id: 'SP-2024-001',
      customer: {
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        avatar: '/Images/HomePage/avatar-1.jpg'
      },
      bookTitle: 'Paris Adventure 2024',
      pages: 24,
      status: 'pending',
      date: '2024-01-15'
    },
    {
      id: 'SP-2024-002',
      customer: {
        name: 'Mike Chen',
        email: 'mike.chen@email.com',
        avatar: '/Images/HomePage/avatar-2.jpg'
      },
      bookTitle: 'Tokyo Memories',
      pages: 36,
      status: 'printed',
      date: '2024-01-14'
    },
    {
      id: 'SP-2024-003',
      customer: {
        name: 'Emma Wilson',
        email: 'emma.w@email.com',
        avatar: '/Images/HomePage/avatar-3.jpg'
      },
      bookTitle: 'Italian Getaway',
      pages: 48,
      status: 'dispatched',
      date: '2024-01-13'
    },
    {
      id: 'SP-2024-004',
      customer: {
        name: 'David Rodriguez',
        email: 'david.r@email.com',
        avatar: '/Images/HomePage/avatar-4.jpg'
      },
      bookTitle: 'Caribbean Dreams',
      pages: 32,
      status: 'pending',
      date: '2024-01-12'
    },
    {
      id: 'SP-2024-005',
      customer: {
        name: 'Lisa Thompson',
        email: 'lisa.t@email.com',
        avatar: '/Images/HomePage/avatar-5.jpg'
      },
      bookTitle: 'London Explorer',
      pages: 28,
      status: 'printed',
      date: '2024-01-11'
    }
  ])

  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders)

  // Stats calculation
  const stats = {
    pending: orders.filter(order => order.status === 'pending').length,
    printed: orders.filter(order => order.status === 'printed').length,
    dispatched: orders.filter(order => order.status === 'dispatched').length,
    total: orders.length
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const email = (document.getElementById('admin-email') as HTMLInputElement)?.value
    const password = (document.getElementById('admin-password') as HTMLInputElement)?.value
    
    if (email && password) {
      setIsLoggedIn(true)
      setShowLoginModal(false)
      showNotificationMessage('Login successful! Welcome to the admin dashboard.')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setShowLoginModal(true)
    setShowNotification(false)
  }

  const handleStatusChange = (orderId: string, newStatus: 'pending' | 'printed' | 'dispatched') => {
    showNotificationMessage(`Order ${orderId} status updated to ${newStatus}. Email notification sent to customer.`)
  }

  const handlePreview = (order: Order) => {
    setSelectedOrder(order)
    setShowPreviewModal(true)
  }

  const handleDownload = (orderId: string) => {
    showNotificationMessage(`Print-ready files for order ${orderId} downloaded successfully.`)
  }

  const handleEmail = (order: Order) => {
    setSelectedOrder(order)
    setEmailSubject(`Update on Your Studio Printique Order #${order.id}`)
    setEmailMessage(`Hi ${order.customer.name},

We wanted to update you on your Studio Printique order #${order.id}.

Your beautiful "${order.bookTitle}" photo book is now being printed! Our team is carefully crafting your ${order.pages}-page book with the highest quality materials.

Current Status: Being Printed
Expected Dispatch: 2-3 business days

You can view your order anytime by visiting: [Order Link]

Thank you for choosing Studio Printique to preserve your precious memories.

Best regards,
The Studio Printique Team`)
    setShowEmailModal(true)
  }

  const handleEmailSend = (e: React.FormEvent) => {
    e.preventDefault()
    setShowEmailModal(false)
    showNotificationMessage('Status update email sent successfully to customer.')
  }

  const handleRefresh = () => {
    showNotificationMessage('Dashboard data refreshed successfully.')
  }

  const handleExport = () => {
    showNotificationMessage('Order data exported to CSV file.')
  }

  const showNotificationMessage = (message: string) => {
    setNotificationMessage(message)
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 4000)
  }

  const getStatusClasses = (status: string) => {
    const classes = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'printed': 'bg-blue-100 text-blue-800',
      'dispatched': 'bg-green-100 text-green-800'
    }
    return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
  }

  const getStatusText = (status: string) => {
    const texts = {
      'pending': 'Pending',
      'printed': 'Being Printed',
      'dispatched': 'Dispatched'
    }
    return texts[status as keyof typeof texts] || status
  }

  if (!isLoggedIn) {
    return (
      <div className="antialiased bg-gray-50 font-inter text-brand-charcoal min-h-screen">
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-md w-full mx-4">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold tracking-tighter mb-2">Studio Printique</h1>
                <h2 className="text-xl font-semibold mb-2">Admin Login</h2>
                <p className="text-brand-gray text-sm">Access the admin dashboard</p>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="admin-email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent" 
                    placeholder="admin@studioprintique.com" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      id="admin-password" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent pr-12" 
                      placeholder="••••••••" 
                      required 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray hover:text-brand-charcoal"
                    >
                      <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-brand-charcoal text-white py-3 rounded-lg font-semibold hover:bg-black transition-colors"
                >
                  Sign In to Dashboard
                </button>
                
                <div className="text-center">
                  <span className="text-sm text-brand-gray hover:text-brand-charcoal cursor-pointer">Forgot your password?</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="antialiased bg-gray-50 font-inter text-brand-charcoal min-h-screen">
      <header id="header" className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold tracking-tighter">Studio Printique</h1>
            <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <img src="/Images/HomePage/avatar-1.jpg" className="w-8 h-8 rounded-full" alt="Admin" />
              <span className="font-medium">Admin User</span>
            </div>
            <button 
              onClick={handleLogout}
              className="text-brand-gray hover:text-brand-charcoal"
            >
              <i className="fa-solid fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        
        <aside id="admin-sidebar" className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-6">
            <ul className="space-y-2">
              <li>
                <span className="flex items-center gap-3 px-4 py-3 bg-brand-charcoal text-white rounded-lg font-medium cursor-pointer">
                  <i className="fa-solid fa-tachometer-alt"></i>
                  Dashboard
                </span>
              </li>
              <li>
                <span className="flex items-center gap-3 px-4 py-3 text-brand-gray hover:bg-gray-100 rounded-lg cursor-pointer">
                  <i className="fa-solid fa-book"></i>
                  Book Requests
                </span>
              </li>
              <li>
                <span className="flex items-center gap-3 px-4 py-3 text-brand-gray hover:bg-gray-100 rounded-lg cursor-pointer">
                  <i className="fa-solid fa-users"></i>
                  Users
                </span>
              </li>
              <li>
                <span className="flex items-center gap-3 px-4 py-3 text-brand-gray hover:bg-gray-100 rounded-lg cursor-pointer">
                  <i className="fa-solid fa-envelope"></i>
                  Email Templates
                </span>
              </li>
              <li>
                <span className="flex items-center gap-3 px-4 py-3 text-brand-gray hover:bg-gray-100 rounded-lg cursor-pointer">
                  <i className="fa-solid fa-chart-bar"></i>
                  Analytics
                </span>
              </li>
              <li>
                <span className="flex items-center gap-3 px-4 py-3 text-brand-gray hover:bg-gray-100 rounded-lg cursor-pointer">
                  <i className="fa-solid fa-cog"></i>
                  Settings
                </span>
              </li>
            </ul>
          </nav>
        </aside>

        <main id="admin-main" className="flex-1 p-8">
          
          <section id="dashboard-header" className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Book Requests Dashboard</h2>
                <p className="text-brand-gray">Manage and track all customer book orders</p>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleRefresh}
                  className="bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
                >
                  <i className="fa-solid fa-refresh mr-2"></i>Refresh
                </button>
                <button 
                  onClick={handleExport}
                  className="bg-brand-charcoal text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black"
                >
                  <i className="fa-solid fa-download mr-2"></i>Export Data
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div id="stats-pending" className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-brand-gray text-sm">Pending Orders</p>
                    <p className="text-2xl font-bold">{stats.pending}</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <i className="fa-solid fa-clock text-yellow-600"></i>
                  </div>
                </div>
              </div>
              
              <div id="stats-printed" className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-brand-gray text-sm">Being Printed</p>
                    <p className="text-2xl font-bold">{stats.printed}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <i className="fa-solid fa-print text-blue-600"></i>
                  </div>
                </div>
              </div>
              
              <div id="stats-dispatched" className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-brand-gray text-sm">Dispatched</p>
                    <p className="text-2xl font-bold">{stats.dispatched}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <i className="fa-solid fa-truck text-green-600"></i>
                  </div>
                </div>
              </div>
              
              <div id="stats-total" className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-brand-gray text-sm">Total Orders</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <i className="fa-solid fa-chart-line text-purple-600"></i>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="filters-section" className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h3 className="font-semibold mb-4">Search & Filter Orders</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Search Orders</label>
                <div className="relative">
                  <input 
                    type="text" 
                    id="search-input" 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent" 
                    placeholder="Search by name, title..."
                  />
                  <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray"></i>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Status Filter</label>
                <select 
                  id="status-filter" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent"
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="printed">Being Printed</option>
                  <option value="dispatched">Dispatched</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Date From</label>
                <input 
                  type="date" 
                  id="date-from" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Date To</label>
                <input 
                  type="date" 
                  id="date-to" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <button className="text-brand-gray hover:text-brand-charcoal text-sm">
                <i className="fa-solid fa-times mr-1"></i>Clear Filters
              </button>
              <button className="bg-brand-charcoal text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black">
                Apply Filters
              </button>
            </div>
          </section>

          <section id="orders-table-section" className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Book Orders ({filteredOrders.length} results)</h3>
                <div className="flex items-center gap-2 text-sm text-brand-gray">
                  <span>Show:</span>
                  <select className="border border-gray-300 rounded px-2 py-1">
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                  </select>
                  <span>per page</span>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-brand-gray uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-brand-gray uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-brand-gray uppercase tracking-wider">Book Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-brand-gray uppercase tracking-wider">Pages</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-brand-gray uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-brand-gray uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-brand-gray uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">#{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img src={order.customer.avatar} className="w-8 h-8 rounded-full mr-3" alt={order.customer.name} />
                          <div>
                            <div className="text-sm font-medium">{order.customer.name}</div>
                            <div className="text-sm text-brand-gray">{order.customer.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{order.bookTitle}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{order.pages}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select 
                          className={`status-select ${getStatusClasses(order.status)} text-xs font-semibold px-3 py-1 rounded-full border-0`}
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value as any)}
                        >
                          <option value="pending">Pending</option>
                          <option value="printed">Being Printed</option>
                          <option value="dispatched">Dispatched</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-gray">{order.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handlePreview(order)}
                            className="preview-btn text-blue-600 hover:text-blue-800"
                          >
                            <i className="fa-solid fa-eye"></i>
                          </button>
                          <button 
                            onClick={() => handleDownload(order.id)}
                            className="download-btn text-green-600 hover:text-green-800"
                          >
                            <i className="fa-solid fa-download"></i>
                          </button>
                          <button 
                            onClick={() => handleEmail(order)}
                            className="email-btn text-purple-600 hover:text-purple-800"
                          >
                            <i className="fa-solid fa-envelope"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
              <div className="text-sm text-brand-gray">
                Showing 1 to {filteredOrders.length} of {filteredOrders.length} results
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Previous</button>
                <button className="px-3 py-1 bg-brand-charcoal text-white rounded text-sm">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">3</button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Next</button>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Preview Modal */}
      {showPreviewModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold">Book Preview - {selectedOrder.bookTitle}</h3>
              <button 
                onClick={() => setShowPreviewModal(false)}
                className="text-brand-gray hover:text-brand-charcoal"
              >
                <i className="fa-solid fa-times text-2xl"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="w-full h-32 bg-white border border-gray-300 rounded mb-2 flex items-center justify-center">
                    <img src="/Images/book-design/travel-1.svg" className="w-full h-full object-cover rounded" alt="Cover page" />
                  </div>
                  <p className="text-xs text-brand-gray">Cover Page</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="w-full h-32 bg-white border border-gray-300 rounded mb-2 flex items-center justify-center">
                    <img src="/Images/book-design/travel-2.svg" className="w-full h-full object-cover rounded" alt="Page 2" />
                  </div>
                  <p className="text-xs text-brand-gray">Page 2</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="w-full h-32 bg-white border border-gray-300 rounded mb-2 flex items-center justify-center">
                    <img src="/Images/book-design/travel-3.svg" className="w-full h-full object-cover rounded" alt="Page 3" />
                  </div>
                  <p className="text-xs text-brand-gray">Page 3</p>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700">
                  <i className="fa-solid fa-download mr-2"></i>Download PDF
                </button>
                <button 
                  onClick={() => setShowPreviewModal(false)}
                  className="bg-gray-200 text-brand-charcoal px-6 py-3 rounded-lg font-medium hover:bg-gray-300"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold">Send Status Update Email</h3>
              <button 
                onClick={() => setShowEmailModal(false)}
                className="text-brand-gray hover:text-brand-charcoal"
              >
                <i className="fa-solid fa-times text-xl"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <img src={selectedOrder.customer.avatar} className="w-10 h-10 rounded-full" alt={selectedOrder.customer.name} />
                    <div>
                      <p className="font-medium">{selectedOrder.customer.name}</p>
                      <p className="text-sm text-brand-gray">{selectedOrder.customer.email}</p>
                    </div>
                  </div>
                  <p className="text-sm"><strong>Order:</strong> #{selectedOrder.id} - {selectedOrder.bookTitle}</p>
                </div>
              </div>
              
              <form onSubmit={handleEmailSend} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email Template</label>
                  <select 
                    value={emailTemplate}
                    onChange={(e) => setEmailTemplate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent"
                  >
                    <option value="status-update">Status Update Notification</option>
                    <option value="printed">Order Being Printed</option>
                    <option value="dispatched">Order Dispatched</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input 
                    type="text" 
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea 
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    rows={8} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-charcoal focus:border-transparent"
                  />
                </div>
                
                <div className="flex justify-end gap-4">
                  <button 
                    type="button" 
                    onClick={() => setShowEmailModal(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="bg-brand-charcoal text-white px-6 py-2 rounded-lg hover:bg-black"
                  >
                    <i className="fa-solid fa-envelope mr-2"></i>Send Email
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-check-circle"></i>
            <span>{notificationMessage}</span>
          </div>
        </div>
      )}
    </div>
  )
}
