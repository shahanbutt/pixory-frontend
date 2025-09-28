'use client';

import { useState } from 'react';
import { BookPage, LayoutType } from '../types';
import PageSidebar from './PageSidebar';
import PageViewer from './PageViewer';
import BookPreview from './BookPreview';
import RightSidebar from './RightSidebar';

interface BookManagerProps {
  pages: BookPage[];
  onAddPage: () => void;
  onDeletePage: (pageId: string) => void;
  onSelectPage: (pageId: string) => void;
  selectedPageId: string | null;
  onApplyLayout: (pageId: string, layout: LayoutType) => void;
}

export default function BookManager({ 
  pages, 
  onAddPage, 
  onDeletePage, 
  onSelectPage,
  selectedPageId,
  onApplyLayout
}: BookManagerProps) {
  const [showPreview, setShowPreview] = useState(false);
  const selectedPage = pages.find(page => page.id === selectedPageId) || null;
  const selectedPageNumber = pages.findIndex(page => page.id === selectedPageId) + 1;

  const handleLayoutButtonClick = (buttonNumber: number) => {
    if (!selectedPageId) {
      alert('Please select a page first');
      return;
    }

    const layoutMap: { [key: number]: LayoutType } = {
      1: 'portrait',
      2: 'portrait-text',
      3: 'landscape-2text',
      4: '2landscape-text',
      5: '2portrait-5text',
      6: 'landscape-2portrait-text',
      7: '2portrait-landscape-text',
      8: '3portrait-text-1',
      9: '3portrait-text-2',
      10: '3portrait-text-3',
      11: '3portrait-text-4',
      12: '4portrait'
    };

    const layout = layoutMap[buttonNumber];
    if (layout) {
      onApplyLayout(selectedPageId, layout);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 w-full">
      {/* Left Sidebar - Page List */}
      <PageSidebar
        pages={pages}
        selectedPageId={selectedPageId}
        onSelectPage={onSelectPage}
        onDeletePage={onDeletePage}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Digital Book Editor
              </h2>
              <p className="text-sm text-gray-600">
                {pages.length} page{pages.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPreview(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                disabled={pages.length === 0}
              >
                <span className="text-lg">👁️</span>
                Preview Book
              </button>
              <button
                onClick={onAddPage}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <span className="text-lg">+</span>
                Add Page
              </button>
            </div>
          </div>
        </div>

        {/* Page Viewer */}
        <PageViewer
          selectedPage={selectedPage}
          pageNumber={selectedPageNumber}
        />
      </div>

      {/* Right Sidebar - Layout Options */}
      <RightSidebar
        onButtonClick={handleLayoutButtonClick}
        currentLayout={selectedPage?.layout}
      />

      {/* Book Preview Modal */}
      <BookPreview
        pages={pages}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </div>
  );
}
