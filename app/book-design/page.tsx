'use client';

import { useState, useEffect } from 'react';
import { BookPage, LayoutType } from './types';
import BookManager from './components/BookManager';

export default function BookDesign() {
  const [pages, setPages] = useState<BookPage[]>([]);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);

  // Load book from localStorage on component mount
  useEffect(() => {
    const savedBook = localStorage.getItem('digital-book');
    if (savedBook) {
      try {
        const parsedBook = JSON.parse(savedBook);
        // Convert createdAt strings back to Date objects
        const pagesWithDates = (parsedBook.pages || []).map((page: any) => ({
          ...page,
          createdAt: new Date(page.createdAt)
        }));
        setPages(pagesWithDates);
        setSelectedPageId(parsedBook.selectedPageId || null);
      } catch (error) {
        console.error('Error loading saved book:', error);
      }
    }
  }, []);

  // Save book to localStorage whenever pages change
  useEffect(() => {
    if (pages.length > 0) {
      const bookData = {
        pages,
        selectedPageId,
        lastSaved: new Date().toISOString()
      };
      localStorage.setItem('digital-book', JSON.stringify(bookData));
    }
  }, [pages, selectedPageId]);

  const addPage = () => {
    const newPage: BookPage = {
      id: `page-${Date.now()}`,
      title: `Page ${pages.length + 1}`,
      content: {
        images: [],
        texts: []
      },
      createdAt: new Date()
    };
    setPages([...pages, newPage]);
    setSelectedPageId(newPage.id);
  };

  const deletePage = (pageId: string) => {
    const updatedPages = pages.filter(page => page.id !== pageId);
    
    // Renumber all pages sequentially
    const renumberedPages = updatedPages.map((page, index) => ({
      ...page,
      title: `Page ${index + 1}`
    }));
    
    setPages(renumberedPages);
    if (selectedPageId === pageId) {
      setSelectedPageId(null);
    }
  };

  const selectPage = (pageId: string) => {
    setSelectedPageId(pageId);
  };

  const saveBook = () => {
    const bookData = {
      pages,
      selectedPageId,
      lastSaved: new Date().toISOString()
    };
    localStorage.setItem('digital-book', JSON.stringify(bookData));
    alert('Book saved successfully!');
  };

  const loadBook = () => {
    const savedBook = localStorage.getItem('digital-book');
    if (savedBook) {
      try {
        const parsedBook = JSON.parse(savedBook);
        // Convert createdAt strings back to Date objects
        const pagesWithDates = (parsedBook.pages || []).map((page: any) => ({
          ...page,
          createdAt: new Date(page.createdAt)
        }));
        setPages(pagesWithDates);
        setSelectedPageId(parsedBook.selectedPageId || null);
        alert('Book loaded successfully!');
      } catch (error) {
        console.error('Error loading saved book:', error);
        alert('Error loading book. Please try again.');
      }
    } else {
      alert('No saved book found.');
    }
  };

  const clearBook = () => {
    if (confirm('Are you sure you want to clear all pages? This action cannot be undone.')) {
      setPages([]);
      setSelectedPageId(null);
      localStorage.removeItem('digital-book');
      alert('Book cleared successfully!');
    }
  };

  const applyLayout = (pageId: string, layout: LayoutType) => {
    setPages(pages.map(page => {
      if (page.id === pageId) {
        const updatedPage = { ...page, layout };
        
        // Add sample content based on layout
        if (layout === 'portrait') {
          updatedPage.content = {
            images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face'], // Sample portrait image
            texts: []
          };
        } else if (layout === 'portrait-text') {
          updatedPage.content = {
            images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face'],
            texts: ['Sample text content']
          };
        }
        // Add more layout-specific content as needed
        
        return updatedPage;
      }
      return page;
    }));
  };

  return (
    <div className="h-screen overflow-hidden">
      <BookManager
        pages={pages}
        onAddPage={addPage}
        onDeletePage={deletePage}
        onSelectPage={selectPage}
        selectedPageId={selectedPageId}
        onApplyLayout={applyLayout}
      />
    </div>
  );
}
