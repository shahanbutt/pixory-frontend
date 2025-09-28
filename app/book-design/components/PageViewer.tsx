'use client';

import { useEffect, useState } from 'react';
import { BookPage } from '../types';
import { A4_PIXEL_DIMENSIONS } from '../types';

interface PageViewerProps {
  selectedPage: BookPage | null;
  pageNumber: number;
}

export default function PageViewer({ selectedPage, pageNumber }: PageViewerProps) {
  const { width, height, margin } = A4_PIXEL_DIMENSIONS;
  const [scale, setScale] = useState(1);

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
            <div className="w-full h-full p-4 flex flex-col">
              

              {/* Content Preview */}
              <div className="flex-1 flex flex-col justify-center items-center text-center">
                {selectedPage.layout === 'portrait' && selectedPage.content.images.length > 0 ? (
                  <div className="w-full h-full">
                    <img 
                      src={selectedPage.content.images[0]} 
                      alt="Portrait" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : selectedPage.content.images.length > 0 ? (
                  <div className="mb-3">
                    <div className="text-3xl text-gray-400 mb-1">🖼️</div>
                    <p className="text-xs text-gray-600">
                      {selectedPage.content.images.length} image{selectedPage.content.images.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                ) : null}
                
                {selectedPage.content.texts.length > 0 && (
                  <div className="mb-3">
                    <div className="text-3xl text-gray-400 mb-1">📝</div>
                    <p className="text-xs text-gray-600">
                      {selectedPage.content.texts.length} text{selectedPage.content.texts.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                )}
                
                {selectedPage.content.images.length === 0 && selectedPage.content.texts.length === 0 && (
                  <div>
                    <div className="text-4xl text-gray-300 mb-2">📄</div>
                    <h3 className="text-sm font-medium text-gray-600 mb-1">
                      {selectedPage.layout ? 'Layout Applied' : 'Empty Page'}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {selectedPage.layout ? 'Ready for content' : 'Select a layout to get started'}
                    </p>
                  </div>
                )}
              </div>
              
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
