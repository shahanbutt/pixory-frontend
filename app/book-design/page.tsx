'use client'

import { useState, useEffect } from 'react'

export default function BookDesign() {
  const [activeTab, setActiveTab] = useState<'upload' | 'layouts' | 'pages'>('upload')
  const [showPreview, setShowPreview] = useState(false)
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false)
  const [selectedLayout, setSelectedLayout] = useState('single-portrait')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages] = useState(6)

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      console.log('Files uploaded:', Array.from(files))
    }
  }

  const handleSaveBook = () => {
    setShowSaveConfirmation(true)
    setTimeout(() => setShowSaveConfirmation(false), 3000)
  }

  const handlePreview = () => {
    setShowPreview(true)
  }

  const handleClosePreview = () => {
    setShowPreview(false)
  }

  const handleTextEdit = () => {
    const text = prompt('Enter your text:')
    if (text) {
      // Handle text editing logic here
      console.log('Text entered:', text)
    }
  }

  const handleImageClick = () => {
    // Handle image selection logic here
    console.log('Image placeholder clicked - would open image selector')
  }

  const handleLayoutSelect = (layout: string) => {
    setSelectedLayout(layout)
  }

  const handlePageSelect = (page: number) => {
    setCurrentPage(page)
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
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
                      onClick={() => document.getElementById('file-input')?.click()}
                    >
                      <i className="fa-solid fa-cloud-upload-alt text-4xl text-brand-gray mb-4"></i>
                      <h3 className="font-semibold mb-2">Upload Your Images</h3>
                      <p className="text-sm text-brand-gray mb-4">Drag & drop images here or click to browse</p>
                      <button className="bg-brand-charcoal text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black transition-colors">
                        Choose Files
                      </button>
                      <input 
                        type="file" 
                        id="file-input" 
                        multiple 
                        accept="image/*" 
                        className="hidden"
                        onChange={(e) => handleFileUpload(e.target.files)}
                      />
                    </div>
                    
                    <div id="uploaded-images" className="space-y-3">
                      <h4 className="font-semibold text-sm">Uploaded Images (8)</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <div key={num} className="relative group cursor-move" draggable="true">
                            <img 
                              src={`/Images/book-design/travel-${num}.svg`} 
                              className="w-full h-20 object-cover rounded-lg" 
                              alt={`Travel photo ${num}`}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all flex items-center justify-center">
                              <i className="fa-solid fa-grip-vertical text-white opacity-0 group-hover:opacity-100"></i>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
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
                      <button className="bg-brand-charcoal text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-black transition-colors">
                        <i className="fa-solid fa-plus mr-1"></i>Add Page
                      </button>
                    </div>
                    
                    <div id="pages-list" className="space-y-3">
                      {[
                        { id: 1, title: 'Cover Page', layout: 'Single Portrait Layout' },
                        { id: 2, title: 'Paris Adventures', layout: 'Double Portrait Layout' },
                        { id: 3, title: 'City Views', layout: 'Single Landscape Layout' },
                        { id: 4, title: 'Food & Culture', layout: 'Grid 2x2 Layout' },
                        { id: 5, title: 'Memories', layout: 'Triple Layout' },
                        { id: 6, title: 'Back Cover', layout: 'Single Portrait Layout' }
                      ].map((page) => (
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
                          </div>
                          <button className="text-brand-gray hover:text-red-600 transition-colors">
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
                    <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg relative">
                      
                      <div 
                        id="image-placeholder-1" 
                        className="absolute top-4 left-4 right-4 h-80 border-2 border-dashed border-blue-400 bg-blue-50 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors"
                        onClick={handleImageClick}
                      >
                        <i className="fa-solid fa-image text-4xl text-blue-400 mb-3"></i>
                        <p className="text-blue-600 font-medium">Drop image here</p>
                        <p className="text-sm text-blue-500">or click to select</p>
                      </div>
                      
                      <div 
                        id="text-area-1" 
                        className="absolute bottom-4 left-4 right-4 h-32 border-2 border-dashed border-green-400 bg-green-50 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-green-100 transition-colors"
                        onClick={handleTextEdit}
                      >
                        <i className="fa-solid fa-text-width text-2xl text-green-500 mb-2"></i>
                        <p className="text-green-600 font-medium">Add text here</p>
                        <p className="text-sm text-green-500">Click to edit</p>
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
                {[
                  { title: 'Cover', page: 1 },
                  { title: 'Paris Adventures', page: 2 },
                  { title: 'City Views', page: 3 },
                  { title: 'Food & Culture', page: 4 },
                  { title: 'Memories', page: 5 },
                  { title: 'Back Cover', page: 6 }
                ].map((page) => (
                  <div key={page.page} className="bg-gray-100 rounded-lg p-4 text-center">
                    <div className="w-full h-32 bg-white border border-gray-300 rounded mb-2 flex items-center justify-center">
                      <span className="text-sm text-brand-gray">{page.title}</span>
                    </div>
                    <p className="text-xs text-brand-gray">Page {page.page}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-4">
                <button className="bg-brand-charcoal text-white px-6 py-3 rounded-lg font-medium hover:bg-black transition-colors">
                  Order Now - $24.99
                </button>
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
