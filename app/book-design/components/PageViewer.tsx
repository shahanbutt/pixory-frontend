'use client';

import { useEffect, useState, useRef } from 'react';
import { BookPage } from '../types';
import { A4_PIXEL_DIMENSIONS } from '../types';

interface PageViewerProps {
  selectedPage: BookPage | null;
  pageNumber: number;
  onUpdatePage?: (pageId: string, content: { images: string[]; texts: string[] }) => void;
}

export default function PageViewer({ selectedPage, pageNumber, onUpdatePage }: PageViewerProps) {
  const { width, height, margin } = A4_PIXEL_DIMENSIONS;
  const [scale, setScale] = useState(1);
  const [testInput, setTestInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const calculateScale = () => {
      // Available space: viewport minus sidebar (320px) and padding
      const availableWidth = window.innerWidth - 400; // 320px sidebar + 80px padding
      const availableHeight = window.innerHeight - 150; // header + padding
      
      // Calculate scale to fit both width and height
      const scaleX = availableWidth / width;
      const scaleY = availableHeight / height;
      
      // Use the smaller scale to ensure it fits in both dimensions
      const newScale = Math.min(scaleX, scaleY, 1); // Don't scale up beyond 100%
      setScale(Math.max(newScale, 0.3)); // Minimum scale of 30%
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, [width, height]);

  // Initialize testInput with existing text from the page
  useEffect(() => {
    if (selectedPage?.content?.texts?.[0]) {
      setTestInput(selectedPage.content.texts[0]);
    } else {
      setTestInput('');
    }
  }, [selectedPage]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedPage && onUpdatePage) {
      // Check file size (limit to 10MB to prevent localStorage quota issues)
      if (file.size > 10 * 1024 * 1024) {
        alert('Image too large. Please choose an image smaller than 10MB.');
        // Reset the input so the same file can be selected again
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        
        // Compress the image before storing
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Resize to max 800px width while maintaining aspect ratio
          const maxWidth = 800;
          const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
          canvas.width = img.width * ratio;
          canvas.height = img.height * ratio;
          
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const compressedImageUrl = canvas.toDataURL('image/jpeg', 0.7);
            
            onUpdatePage(selectedPage.id, {
              images: [compressedImageUrl],
              texts: selectedPage.content.texts
            });
          } else {
            // Fallback to original if compression fails
            onUpdatePage(selectedPage.id, {
              images: [imageUrl],
              texts: selectedPage.content.texts
            });
          }
          
          // Reset the input value so the same file can be selected again
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        };
        img.src = imageUrl;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleDeleteImage = () => {
    if (selectedPage && onUpdatePage) {
      onUpdatePage(selectedPage.id, {
        images: [],
        texts: selectedPage.content.texts
      });
    }
  };




  if (!selectedPage) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl text-gray-300 mb-4">📖</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Page Selected</h3>
          <p className="text-gray-500">
            Select a page from the sidebar to view and edit it
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 p-4">
      <div className="relative max-w-full max-h-full">
        {/* A4 Page Container - Auto-scaled to fit screen */}
        <div 
          className="bg-white border border-gray-300 shadow-lg relative mx-auto"
          style={{ 
            width: `${width}px`, 
            height: `${height}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'center'
          }}
        >
          {/* Red Margins */}
          <div 
            className="absolute border-2 border-red-500 pointer-events-none"
            style={{
              top: `${margin}px`,
              left: `${margin}px`,
              right: `${margin}px`,
              bottom: `${margin}px`,
            }}
          >
            {/* Content Area */}
            <div className="w-full h-full flex flex-col">
              

              {/* Content Preview */}
              <div className="flex-1 flex flex-col justify-center items-center text-center">

                {selectedPage.layout === 'portrait' ? (
                  selectedPage.content.images.length > 0 ? (
                    <div className="relative overflow-hidden mx-auto border-2 border-transparent" style={{ 
                      pointerEvents: 'auto',
                      width: '567px',
                      height: '1008px',
                      maxWidth: '100%',
                      maxHeight: '100%'
                    }}>
                      <img 
                        src={selectedPage.content.images[0]} 
                        alt="Portrait" 
                        className="w-full h-full object-cover"
                        style={{ 
                          pointerEvents: 'none',
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                      />
                      <div className="absolute top-2 right-2 flex gap-2 z-20">
                        <button
                          onClick={handleUploadClick}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors cursor-pointer"
                          style={{ pointerEvents: 'auto', zIndex: 20 }}
                        >
                          Change
                        </button>
                        <button
                          onClick={handleDeleteImage}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors cursor-pointer"
                          style={{ pointerEvents: 'auto', zIndex: 20 }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ) : (
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors mx-auto" style={{
                          width: '567px',
                          height: '1008px',
                          maxWidth: '100%',
                          maxHeight: '100%'
                        }}>
                      <h3 className="text-lg font-medium text-gray-600 mb-4">Upload Portrait Image</h3>
                      <button 
                        onClick={handleUploadClick}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium relative z-10 cursor-pointer"
                        style={{ pointerEvents: 'auto' }}
                      >
                        Upload Image
                      </button>
                    </div>
                  )
                ) : selectedPage.layout === 'portrait-text' ? (
                  <div className="flex flex-col items-center mx-auto">
                    {/* Image Container - Keep original size */}
                    {selectedPage.content.images.length > 0 ? (
                      <div className="relative overflow-hidden border-2 border-transparent mb-4" style={{ 
                        pointerEvents: 'auto',
                        width: '540px',
                        height: '960px',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        transform: 'translateY(4px)'
                      }}>
                        <img 
                          src={selectedPage.content.images[0]} 
                          alt="Portrait" 
                          className="w-full h-full object-cover"
                          style={{ 
                            pointerEvents: 'none',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block'
                          }}
                        />
                        <div className="absolute top-2 right-2 flex gap-2 z-20">
                          <button
                            onClick={handleUploadClick}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors cursor-pointer"
                            style={{ pointerEvents: 'auto', zIndex: 20 }}
                          >
                            Change
                          </button>
                          <button
                            onClick={handleDeleteImage}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors cursor-pointer"
                            style={{ pointerEvents: 'auto', zIndex: 20 }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors mb-4" style={{
                        width: '540px',
                        height: '960px',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        transform: 'translateY(4px)'
                      }}>
                        <h3 className="text-lg font-medium text-gray-600 mb-4">Upload Portrait Image</h3>
                        <button 
                          onClick={handleUploadClick}
                          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium relative z-10 cursor-pointer"
                          style={{ pointerEvents: 'auto' }}
                        >
                          Upload Image
                        </button>
                      </div>
                    )}

                    {/* Input Field - 688x53 dimensions, max 2 lines */}
                    <div style={{ 
                      width: '688px', 
                      height: '53px',
                      maxWidth: '100%',
                      marginTop: '-7px',
                      border: '2px solid #d1d5db',
                      backgroundColor: 'white',
                      borderRadius: '6px',
                      position: 'relative',
                      zIndex: 1000,
                      pointerEvents: 'auto'
                    }}>
                      <textarea
                        value={testInput}
                        onChange={(e) => {
                          let newValue = e.target.value;
                          
                          // Limit to 168 characters first
                          if (newValue.length > 168) {
                            newValue = newValue.substring(0, 168);
                          }
                          
                          // Limit to 2 lines by counting line breaks
                          const lineCount = (newValue.match(/\n/g) || []).length + 1;
                          
                          if (lineCount <= 2) {
                            setTestInput(newValue);
                            
                            // Update the page content
                            if (selectedPage && onUpdatePage) {
                              onUpdatePage(selectedPage.id, {
                                images: selectedPage.content.images,
                                texts: [newValue]
                              });
                            }
                          }
                        }}
                        placeholder="Enter text here"
                        className="w-full h-full border-none outline-none bg-transparent baloo2-font text-gray-700 text-base text-center focus:outline-none resize-none"
                        style={{ 
                          fontFamily: 'Baloo2, sans-serif',
                          pointerEvents: 'auto',
                          zIndex: 1001,
                          lineHeight: '1.2'
                        }}
                        autoComplete="off"
                        rows={2}
                        maxLength={168}
                      />
                    </div>
                  </div>
                ) : selectedPage.content.images.length > 0 ? (
                  <div className="mb-3">
                    <div className="text-3xl text-gray-400 mb-1">🖼️</div>
                    <p className="text-xs text-gray-600">
                      {selectedPage.content.images.length} image{selectedPage.content.images.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                ) : null}
                
                {selectedPage.content.texts.length > 0 && selectedPage.layout !== 'portrait-text' && (
                  <div className="mb-3">
                    <div className="text-3xl text-gray-400 mb-1">📝</div>
                    <p className="text-xs text-gray-600">
                      {selectedPage.content.texts.length} text{selectedPage.content.texts.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                )}
                
              </div>
              
            </div>
          </div>
        </div>
        
        {/* Hidden file input - always available */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
}
