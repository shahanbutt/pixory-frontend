export type LayoutType = 
  | 'portrait'
  | 'portrait-text'
  | 'landscape-2text'
  | '2landscape-text'
  | '2portrait-5text'
  | 'landscape-2portrait-text'
  | '2portrait-landscape-text'
  | '3portrait-text-1'
  | '3portrait-text-2'
  | '3portrait-text-3'
  | '3portrait-text-4'
  | '4portrait';

export interface BookPage {
  id: string;
  title?: string;
  layout?: LayoutType;
  content: {
    images: string[];
    texts: string[];
  };
  createdAt: Date;
}

export interface BookState {
  pages: BookPage[];
  currentPageId: string | null;
}

export const A4_DIMENSIONS = {
  width: 210, // mm
  height: 297, // mm
  margin: 12.5, // mm
} as const;

export const A4_PIXEL_DIMENSIONS = {
  width: 794, // pixels (210mm at 96 DPI)
  height: 1123, // pixels (297mm at 96 DPI)
  margin: 47, // pixels (12.5mm at 96 DPI)
} as const;
