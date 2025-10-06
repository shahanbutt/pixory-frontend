'use client'

import { useState, useEffect, useRef } from 'react'

interface UploadedImage {
  id: string
  file: File
  url: string
  name: string
}

interface Page {
  id: number
  title: string
  layout: string
  images: string[]
  text: string
}

export default function BookDesign() {
  const [activeTab, setActiveTab] = useState<'upload' | 'layouts' | 'pages'>('upload')
  const [showPreview, setShowPreview] = useState(false)
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false)
  const [selectedLayout, setSelectedLayout] = useState('single-portrait')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(6)
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [pages, setPages] = useState<Page[]>([
    { id: 1, title: 'Cover Page', layout: 'Single Portrait Layout', images: [], text: '' },
    { id: 2, title: 'Paris Adventures', layout: 'Double Portrait Layout', images: [], text: '' },
    { id: 3, title: 'City Views', layout: 'Single Landscape Layout', images: [], text: '' },
    { id: 4, title: 'Food & Culture', layout: 'Grid 2x2 Layout', images: [], text: '' },
    { id: 5, title: 'Memories', layout: 'Triple Layout', images: [], text: '' },
    { id: 6, title: 'Back Cover', layout: 'Single Portrait Layout', images: [], text: '' }
  ])
  const [draggedImage, setDraggedImage] = useState<string | null>(null)
  const [canvasImage, setCanvasImage] = useState<string | null>(null)
  const [canvasText, setCanvasText] = useState<string>('')
  const [isEditingText, setIsEditingText] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasImageRef = useRef<HTMLDivElement>(null)
  const canvasTextRef = useRef<HTMLDivElement>(null)

  // File upload functionality
  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newImages: UploadedImage[] = Array.from(files).map((file, index) => ({
        id: `img-${Date.now()}-${index}`,
        file,
        url: URL.createObjectURL(file),
        name: file.name
      }))
      setUploadedImages(prev => [...prev, ...newImages])
    }
  }

  // Drag and drop functionality
  const handleDragStart = (imageUrl: string) => {
    setDraggedImage(imageUrl)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedImage) {
      setCanvasImage(draggedImage)
      setDraggedImage(null)
    }
  }

  // Save functionality
  const handleSaveBook = () => {
    const bookData = {
      pages,
      currentPage,
      selectedLayout,
      uploadedImages: uploadedImages.map(img => ({
        id: img.id,
        name: img.name,
        url: img.url
      })),
      timestamp: new Date().toISOString()
    }
    
    localStorage.setItem('bookDesign', JSON.stringify(bookData))
    setShowSaveConfirmation(true)
    setTimeout(() => setShowSaveConfirmation(false), 3000)
  }

  // Preview functionality
  const handlePreview = () => {
    setShowPreview(true)
  }

  const handleClosePreview = () => {
    setShowPreview(false)
  }

  // Text editing functionality
  const handleTextEdit = () => {
    setIsEditingText(true)
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCanvasText(e.target.value)
  }

  const handleTextSave = () => {
    setIsEditingText(false)
    // Update the current page with the text
    setPages(prev => prev.map(page => 
      page.id === currentPage 
        ? { ...page, text: canvasText }
        : page
    ))
  }

  // Image selection functionality
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Layout selection functionality
  const handleLayoutSelect = (layout: string) => {
    setSelectedLayout(layout)
    // Update current page layout
    setPages(prev => prev.map(page => 
      page.id === currentPage 
        ? { ...page, layout: layout.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) + ' Layout' }
        : page
    ))
  }

  // Page management functionality
  const handlePageSelect = (page: number) => {
    setCurrentPage(page)
    // Load page data
    const pageData = pages.find(p => p.id === page)
    if (pageData) {
      setCanvasImage(pageData.images[0] || null)
      setCanvasText(pageData.text)
    }
  }

  const handleAddPage = () => {
    const newPage: Page = {
      id: totalPages + 1,
      title: `Page ${totalPages + 1}`,
      layout: 'Single Portrait Layout',
      images: [],
      text: ''
    }
    setPages(prev => [...prev, newPage])
    setTotalPages(prev => prev + 1)
  }

  const handleDeletePage = (pageId: number) => {
    if (totalPages > 1) {
      setPages(prev => prev.filter(page => page.id !== pageId))
      setTotalPages(prev => prev - 1)
      if (currentPage === pageId) {
        setCurrentPage(1)
      }
    }
  }

  // Navigation functionality
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      handlePageSelect(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      handlePageSelect(currentPage - 1)
    }
  }

  // Auto-fill functionality
  const handleAutoFill = () => {
    if (uploadedImages.length > 0) {
      const imagesPerPage = Math.ceil(uploadedImages.length / totalPages)
      const updatedPages = pages.map((page, index) => ({
        ...page,
        images: uploadedImages
          .slice(index * imagesPerPage, (index + 1) * imagesPerPage)
          .map(img => img.url)
      }))
      setPages(updatedPages)
    }
  }

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('bookDesign')
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        if (data.pages) setPages(data.pages)
        if (data.currentPage) setCurrentPage(data.currentPage)
        if (data.selectedLayout) setSelectedLayout(data.selectedLayout)
        if (data.uploadedImages) setUploadedImages(data.uploadedImages)
      } catch (error) {
        console.error('Error loading saved data:', error)
      }
    }
  }, [])

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
            <div className="flex items-center gap-4">
              <button 
                onClick={handleSaveBook}
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                <i className="fa-solid fa-save mr-2"></i>Save Book
              </button>
              <button 
                onClick={handlePreview}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <i className="fa-solid fa-eye mr-2"></i>Preview
              </button>
              <a 
                href="/payment"
                className="bg-brand-charcoal text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black transition-colors"
              >
                <i className="fa-solid fa-shopping-cart mr-2"></i>Order Now - $24.99
              </a>
            </div>
            <span className="font-medium cursor-pointer">USD</span>
            <span className="text-base cursor-pointer"><i className="fa-solid fa-magnifying-glass"></i></span>
            <a href="/signup-login" className="text-base cursor-pointer"><i className="fa-regular fa-user"></i></a>
            <span className="text-base cursor-pointer"><i className="fa-solid fa-bag-shopping"></i></span>
          </div>
        </div>
      </header>

      <main>
        <section id="book-editor" className="min-h-screen bg-gray-50">
          <div className="flex h-screen">
            
            <aside id="editor-sidebar" className="w-80 bg-white border-r border-gray-200 flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold mb-2">Book Editor</h2>
                <p className="text-sm text-brand-gray">Create your custom travel book</p>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <div id="editor-tabs" className="border-b border-gray-200">
                  <div className="flex">
                    <button 
                      onClick={() => setActiveTab('upload')}
                      className={`flex-1 py-3 px-4 text-sm font-medium ${
                        activeTab === 'upload' 
                          ? 'border-b-2 border-brand-charcoal text-brand-charcoal' 
                          : 'text-brand-gray'
                      }`}
                    >
                      <i className="fa-solid fa-upload mr-2"></i>Upload
                    </button>
                    <button 
                      onClick={() => setActiveTab('layouts')}
                      className={`flex-1 py-3 px-4 text-sm font-medium ${
                        activeTab === 'layouts' 
                          ? 'border-b-2 border-brand-charcoal text-brand-charcoal' 
                          : 'text-brand-gray'
                      }`}
                    >
                      <i className="fa-solid fa-th-large mr-2"></i>Layouts
                    </button>
                    <button 
                      onClick={() => setActiveTab('pages')}
                      className={`flex-1 py-3 px-4 text-sm font-medium ${
                        activeTab === 'pages' 
                          ? 'border-b-2 border-brand-charcoal text-brand-charcoal' 
                          : 'text-brand-gray'
                      }`}
                    >
                      <i className="fa-solid fa-file-alt mr-2"></i>Pages
                    </button>
                  </div>
                </div>

                {activeTab === 'upload' && (
                  <div id="upload-tab" className="p-6">
                    <div 
                      id="image-upload-area" 
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6 hover:border-brand-charcoal transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={handleDragOver}
                      onDrop={(e) => {
                        e.preventDefault()
                        const files = e.dataTransfer.files
                        handleFileUpload(files)
                      }}
                    >
                      <i className="fa-solid fa-cloud-upload-alt text-4xl text-brand-gray mb-4"></i>
                      <h3 className="font-semibold mb-2">Upload Your Images</h3>
                      <p className="text-sm text-brand-gray mb-4">Drag & drop images here or click to browse</p>
                      <button className="bg-brand-charcoal text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black transition-colors">
                        Choose Files
                      </button>
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        multiple 
                        accept="image/*" 
                        className="hidden"
                        onChange={(e) => handleFileUpload(e.target.files)}
                      />
                    </div>
                    
                    <div id="uploaded-images" className="space-y-3">
                      <h4 className="font-semibold text-sm">Uploaded Images ({uploadedImages.length})</h4>
                      {uploadedImages.length > 0 ? (
                        <div className="grid grid-cols-3 gap-3">
                          {uploadedImages.map((image) => (
                            <div 
                              key={image.id} 
                              className="relative group cursor-move" 
                              draggable="true"
                              onDragStart={() => handleDragStart(image.url)}
                            >
                              <img 
                                src={image.url} 
                                className="w-full h-20 object-cover rounded-lg" 
                                alt={image.name}
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all flex items-center justify-center">
                                <i className="fa-solid fa-grip-vertical text-white opacity-0 group-hover:opacity-100"></i>
                              </div>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setUploadedImages(prev => prev.filter(img => img.id !== image.id))
                                }}
                                className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <i className="fa-solid fa-times"></i>
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-brand-gray">
                          <i className="fa-solid fa-images text-3xl mb-2"></i>
                          <p className="text-sm">No images uploaded yet</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <button 
                        onClick={handleAutoFill}
                        disabled={uploadedImages.length === 0}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        <i className="fa-solid fa-magic mr-2"></i>Auto-fill Pages
                      </button>
                      <p className="text-xs text-brand-gray text-center mt-2">Automatically populate pages with uploaded images</p>
                    </div>
                  </div>
                )}

                {activeTab === 'layouts' && (
                  <div id="layouts-tab" className="p-6">
                    <h4 className="font-semibold text-sm mb-4">Choose Layout Style</h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: 'single-portrait', name: 'Single Portrait', icon: 'w-8 h-12' },
                          { id: 'single-landscape', name: 'Single Landscape', icon: 'w-12 h-8' },
                          { id: 'double-portrait', name: 'Double Portrait', icon: 'w-6 h-8' },
                          { id: 'double-landscape', name: 'Double Landscape', icon: 'w-8 h-3' },
                          { id: 'triple', name: 'Triple', icon: 'w-4 h-6' },
                          { id: 'grid-2x2', name: 'Grid 2x2', icon: 'w-3 h-4' }
                        ].map((layout) => (
                          <div 
                            key={layout.id}
                            onClick={() => handleLayoutSelect(layout.id)}
                            className={`layout-option border-2 rounded-lg p-3 cursor-pointer hover:bg-gray-50 ${
                              selectedLayout === layout.id 
                                ? 'border-brand-charcoal' 
                                : 'border-gray-300'
                            }`}
                          >
                            <div className="bg-gray-200 h-16 rounded mb-2 flex items-center justify-center">
                              <div className={`${layout.icon} bg-gray-400 rounded`}></div>
                            </div>
                            <p className="text-xs text-center">{layout.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-semibold text-sm mb-3">Image Ratio</h4>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="radio" name="ratio" value="9:16" defaultChecked className="mr-3" />
                          <span className="text-sm">9:16 (Portrait)</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="ratio" value="16:9" className="mr-3" />
                          <span className="text-sm">16:9 (Landscape)</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'pages' && (
                  <div id="pages-tab" className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-sm">Pages ({totalPages})</h4>
                      <button 
                        onClick={handleAddPage}
                        className="bg-brand-charcoal text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-black transition-colors"
                      >
                        <i className="fa-solid fa-plus mr-1"></i>Add Page
                      </button>
                    </div>
                    
                    <div id="pages-list" className="space-y-3">
                      {pages.map((page) => (
                        <div 
                          key={page.id}
                          onClick={() => handlePageSelect(page.id)}
                          className={`page-item flex items-center p-3 bg-gray-50 rounded-lg border-2 cursor-pointer ${
                            currentPage === page.id 
                              ? 'border-blue-500' 
                              : 'border-gray-300'
                          }`}
                        >
                          <div className="w-12 h-16 bg-white border border-gray-300 rounded mr-3 flex items-center justify-center">
                            <span className="text-xs text-brand-gray">{page.id}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{page.title}</p>
                            <p className="text-xs text-brand-gray">{page.layout}</p>
                            {page.images.length > 0 && (
                              <p className="text-xs text-green-600">
                                <i className="fa-solid fa-image mr-1"></i>{page.images.length} image(s)
                              </p>
                            )}
                            {page.text && (
                              <p className="text-xs text-blue-600">
                                <i className="fa-solid fa-text-width mr-1"></i>Has text
                              </p>
                            )}
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeletePage(page.id)
                            }}
                            disabled={totalPages <= 1}
                            className="text-brand-gray hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <i className="fa-solid fa-trash text-sm"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>

            <div id="editor-main" className="flex-1 flex flex-col">
              <div id="editor-toolbar" className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h3 className="font-semibold">My Travel Book - Page {currentPage} of {totalPages}</h3>
                    <div className="flex items-center gap-2 text-sm text-brand-gray">
                      <i className="fa-solid fa-ruler"></i>
                      <span>A4 Portrait (210mm × 297mm)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
                      <i className="fa-solid fa-undo mr-1"></i>Undo
                    </button>
                    <button className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
                      <i className="fa-solid fa-redo mr-1"></i>Redo
                    </button>
                    <div className="border-l border-gray-300 pl-2 ml-2">
                      <select className="text-sm border border-gray-300 rounded px-2 py-1.5">
                        <option>100%</option>
                        <option>75%</option>
                        <option>50%</option>
                        <option>Fit to width</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div id="editor-canvas" className="flex-1 bg-gray-100 p-8 overflow-auto">
                <div className="max-w-2xl mx-auto">
                  <div id="page-canvas" className="bg-white shadow-lg mx-auto" style={{width: '595px', height: '842px', padding: '10px'}}>
                    <div 
                      className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg relative"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      
                      {/* Image Area */}
                      <div 
                        ref={canvasImageRef}
                        className="absolute top-4 left-4 right-4 h-80 border-2 border-dashed border-blue-400 bg-blue-50 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors"
                        onClick={handleImageClick}
                      >
                        {canvasImage ? (
                          <div className="relative w-full h-full">
                            <img 
                              src={canvasImage} 
                              alt="Canvas image" 
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                setCanvasImage(null)
                              }}
                              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                            >
                              <i className="fa-solid fa-times"></i>
                            </button>
                          </div>
                        ) : (
                          <>
                            <i className="fa-solid fa-image text-4xl text-blue-400 mb-3"></i>
                            <p className="text-blue-600 font-medium">Drop image here</p>
                            <p className="text-sm text-blue-500">or click to select</p>
                          </>
                        )}
                      </div>
                      
                      {/* Text Area */}
                      <div 
                        ref={canvasTextRef}
                        className="absolute bottom-4 left-4 right-4 h-32 border-2 border-dashed border-green-400 bg-green-50 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-green-100 transition-colors"
                        onClick={handleTextEdit}
                      >
                        {isEditingText ? (
                          <div className="w-full h-full p-4">
                            <textarea
                              value={canvasText}
                              onChange={handleTextChange}
                              className="w-full h-full resize-none border-none bg-transparent text-center text-brand-charcoal font-medium focus:outline-none"
                              placeholder="Enter your text here..."
                              autoFocus
                            />
                            <div className="flex gap-2 mt-2">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleTextSave()
                                }}
                                className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                              >
                                Save
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setIsEditingText(false)
                                }}
                                className="bg-gray-500 text-white px-3 py-1 rounded text-xs hover:bg-gray-600"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : canvasText ? (
                          <div className="w-full h-full flex items-center justify-center p-4">
                            <p className="text-center text-brand-charcoal font-medium">{canvasText}</p>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                setCanvasText('')
                                setPages(prev => prev.map(page => 
                                  page.id === currentPage 
                                    ? { ...page, text: '' }
                                    : page
                                ))
                              }}
                              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                            >
                              <i className="fa-solid fa-times"></i>
                            </button>
                          </div>
                        ) : (
                          <>
                            <i className="fa-solid fa-text-width text-2xl text-green-500 mb-2"></i>
                            <p className="text-green-600 font-medium">Add text here</p>
                            <p className="text-sm text-green-500">Click to edit</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center items-center gap-4 mt-6">
                    <button 
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <i className="fa-solid fa-chevron-left mr-2"></i>Previous
                    </button>
                    <div className="flex gap-2">
                      {Array.from({length: totalPages}, (_, i) => (
                        <div 
                          key={i + 1}
                          className={`w-8 h-2 rounded-full ${
                            i + 1 === currentPage ? 'bg-brand-charcoal' : 'bg-gray-300'
                          }`}
                        ></div>
                      ))}
                    </div>
                    <button 
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                      className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next<i className="fa-solid fa-chevron-right ml-2"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Preview Modal */}
      {showPreview && (
        <div id="preview-modal" className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold">Book Preview</h3>
              <button 
                onClick={handleClosePreview}
                className="text-brand-gray hover:text-brand-charcoal"
              >
                <i className="fa-solid fa-times text-2xl"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {pages.map((page) => (
                  <div key={page.id} className="bg-gray-100 rounded-lg p-4 text-center">
                    <div className="w-full h-32 bg-white border border-gray-300 rounded mb-2 flex items-center justify-center relative">
                      {page.images.length > 0 ? (
                        <img 
                          src={page.images[0]} 
                          alt={page.title}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <span className="text-sm text-brand-gray">{page.title}</span>
                      )}
                      {page.text && (
                        <div className="absolute bottom-1 left-1 right-1 bg-black bg-opacity-50 text-white text-xs p-1 rounded">
                          <i className="fa-solid fa-text-width mr-1"></i>Text
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-brand-gray">Page {page.id}</p>
                    <p className="text-xs text-brand-charcoal font-medium">{page.title}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-4">
                <a 
                  href="/payment"
                  className="bg-brand-charcoal text-white px-6 py-3 rounded-lg font-medium hover:bg-black transition-colors"
                >
                  Order Now - $24.99
                </a>
                <button 
                  onClick={handleClosePreview}
                  className="bg-gray-200 text-brand-charcoal px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Continue Editing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Confirmation */}
      {showSaveConfirmation && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-check-circle"></i>
            <span>Book saved successfully!</span>
          </div>
        </div>
      )}
    </div>
  )
}
