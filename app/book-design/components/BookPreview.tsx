'use client';

import { BookPage } from '../types';
import { A4_PIXEL_DIMENSIONS } from '../types';

interface BookPreviewProps {
  pages: BookPage[];
  isOpen: boolean;
  onClose: () => void;
}

export default function BookPreview({ pages, isOpen, onClose }: BookPreviewProps) {
  if (!isOpen) return null;

  const { width, height, margin } = A4_PIXEL_DIMENSIONS;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-7xl w-full max-h-full overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Book Preview</h2>
            <p className="text-sm text-gray-600 mt-1">
              {pages.length} page{pages.length !== 1 ? 's' : ''} • A4 Portrait
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
          >
            ×
          </button>
        </div>
        
        {/* Preview Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          {pages.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl text-gray-300 mb-4">📖</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Pages Yet</h3>
              <p className="text-gray-500">Create some pages to preview your book</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pages.map((page, index) => (
                <div key={page.id} className="flex justify-center">
                  {/* A4 Page Preview */}
                  <div 
                    className="bg-white border border-gray-300 shadow-lg relative"
                    style={{ 
                      width: `${width * 0.3}px`, 
                      height: `${height * 0.3}px`,
                      transform: 'scale(1)',
                      transformOrigin: 'center'
                    }}
                  >
                    {/* Red Margins */}
                    <div 
                      className="absolute border-2 border-red-500 pointer-events-none"
                      style={{
                        top: `${margin * 0.3}px`,
                        left: `${margin * 0.3}px`,
                        right: `${margin * 0.3}px`,
                        bottom: `${margin * 0.3}px`,
                      }}
                    >
                      {/* Content Area */}
                      <div className="w-full h-full p-2 flex flex-col justify-center items-center text-center">
                        {/* Page Number */}
                        <div className="absolute top-1 right-1 text-xs text-gray-500 font-medium">
                          {index + 1}
                        </div>
                        
                        {/* Content Preview */}
                        <div className="flex flex-col items-center">
                          {page.content.images.length > 0 && (
                            <div className="mb-2">
                              <div className="text-2xl text-gray-400 mb-1">🖼️</div>
                              <p className="text-xs text-gray-600">
                                {page.content.images.length} image{page.content.images.length !== 1 ? 's' : ''}
                              </p>
                            </div>
                          )}
                          
                          {page.content.texts.length > 0 && (
                            <div className="mb-2">
                              <div className="text-2xl text-gray-400 mb-1">📝</div>
                              <p className="text-xs text-gray-600">
                                {page.content.texts.length} text{page.content.texts.length !== 1 ? 's' : ''}
                              </p>
                            </div>
                          )}
                          
                          {page.content.images.length === 0 && page.content.texts.length === 0 && (
                            <div>
                              <div className="text-3xl text-gray-300 mb-1">📄</div>
                              <p className="text-xs text-gray-500">Empty Page</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Total Pages:</span> {pages.length}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                // Future: Export functionality
                alert('Export functionality coming soon!');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Export Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

