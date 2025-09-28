'use client';

import { BookPage } from '../types';

interface PageSidebarProps {
  pages: BookPage[];
  selectedPageId: string | null;
  onSelectPage: (pageId: string) => void;
  onDeletePage: (pageId: string) => void;
}

export default function PageSidebar({ 
  pages, 
  selectedPageId, 
  onSelectPage, 
  onDeletePage 
}: PageSidebarProps) {
  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full overflow-y-auto flex-shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800">Pages</h3>
        <p className="text-sm text-gray-600 mt-1">
          {pages.length} page{pages.length !== 1 ? 's' : ''} created
        </p>
      </div>

      {/* Pages List */}
      <div className="p-4 space-y-3">
        {pages.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-sm">
              No pages yet
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Create your first page to get started
            </p>
          </div>
        ) : (
          pages.map((page, index) => (
            <div
              key={page.id}
              className={`relative border rounded-lg p-3 cursor-pointer transition-all duration-200 group ${
                selectedPageId === page.id
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
              onClick={() => onSelectPage(page.id)}
            >
              {/* Page Preview */}
              <div className="flex items-start gap-3">
                {/* Mini Page Preview */}
                <div className="flex-shrink-0">
                  <div 
                    className="bg-white border border-gray-300 relative"
                    style={{ width: '40px', height: '56px' }} // Mini A4 ratio
                  >
                    {/* Mini red margins */}
                    <div 
                      className="absolute border border-red-400"
                      style={{
                        top: '2px',
                        left: '2px',
                        right: '2px',
                        bottom: '2px',
                      }}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-xs text-gray-400">{index + 1}</span>
                      </div>
                    </div>
                  </div>
                </div>

              {/* Page Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-800 truncate">
                    Page {index + 1}
                  </h4>
                </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {page.content.images.length} image{page.content.images.length !== 1 ? 's' : ''}
                    {page.content.texts.length > 0 && (
                      <span>, {page.content.texts.length} text{page.content.texts.length !== 1 ? 's' : ''}</span>
                    )}
                  </p>
                  <div className="text-xs text-gray-400 mt-1">
                    Created: {page.createdAt instanceof Date ? page.createdAt.toLocaleDateString() : new Date(page.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Delete Button - Always visible in top-right */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeletePage(page.id);
                }}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-sm"
                title="Delete page"
              >
                ×
              </button>

              {/* Selection Indicator */}
              {selectedPageId === page.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r"></div>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
}
