'use client';

import { BookPage } from '../types';
import { A4_PIXEL_DIMENSIONS } from '../types';

interface A4PageProps {
  page: BookPage;
  isSelected?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
  pageNumber: number;
}

export default function A4Page({ 
  page, 
  isSelected = false, 
  onClick, 
  onDelete,
  pageNumber 
}: A4PageProps) {
  const { width, height, margin } = A4_PIXEL_DIMENSIONS;

  return (
    <div 
      className={`relative cursor-pointer transition-all duration-200 ${
        isSelected ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
      }`}
      onClick={onClick}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {/* A4 Page Container */}
      <div 
        className="bg-white border border-gray-300 relative"
        style={{ width: `${width}px`, height: `${height}px` }}
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
          <div className="w-full h-full p-4 flex flex-col justify-center items-center">
            {/* Page Number */}
            <div className="absolute top-2 right-2 text-sm text-gray-500 font-medium">
              {pageNumber}
            </div>
            
            {/* Page Title */}
            {page.title && (
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                {page.title}
              </h3>
            )}
            
            {/* Content Preview */}
            <div className="text-center text-gray-500">
              {page.content.images.length > 0 && (
                <div className="mb-2">
                  <span className="text-sm">
                    {page.content.images.length} image{page.content.images.length !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
              {page.content.texts.length > 0 && (
                <div>
                  <span className="text-sm">
                    {page.content.texts.length} text{page.content.texts.length !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
              {page.content.images.length === 0 && page.content.texts.length === 0 && (
                <div className="text-gray-400">
                  <p className="text-sm">Empty page</p>
                  <p className="text-xs mt-1">Click to edit</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Delete Button */}
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
            title="Delete page"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

