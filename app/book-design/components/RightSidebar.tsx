'use client';

interface RightSidebarProps {
  onButtonClick?: (buttonNumber: number) => void;
  currentLayout?: string;
}

export default function RightSidebar({ onButtonClick, currentLayout }: RightSidebarProps) {
  const layoutMap: { [key: string]: number } = {
    'portrait': 1,
    'portrait-text': 2,
    'landscape-2text': 3,
    '2landscape-text': 4,
    '2portrait-5text': 5,
    'landscape-2portrait-text': 6,
    '2portrait-landscape-text': 7,
    '3portrait-text-1': 8,
    '3portrait-text-2': 9,
    '3portrait-text-3': 10,
    '3portrait-text-4': 11,
    '4portrait': 12
  };

  const buttons = [
    { id: 1, label: 'Portrait', color: 'bg-white border-2 border-black text-black hover:bg-gray-100' },
    { id: 2, label: 'Portrait + Text', color: 'bg-white border-2 border-black text-black hover:bg-gray-100' },
    { id: 3, label: 'Landscape + 2 Text', color: 'bg-white border-2 border-black text-black hover:bg-gray-100' },
    { id: 4, label: '2 Landscape + Text', color: 'bg-white border-2 border-black text-black hover:bg-gray-100' },
    { id: 5, label: '2 Portrait + 5 Text', color: 'bg-white border-2 border-black text-black hover:bg-gray-100' },
    { id: 6, label: 'Landscape + 2 Portrait + Text', color: 'bg-white border-2 border-black text-black hover:bg-gray-100' },
    { id: 7, label: '2 Portrait + Landscape + Text', color: 'bg-white border-2 border-black text-black hover:bg-gray-100' },
    { id: 8, label: '3 Portrait + Text (1)', color: 'bg-white border-2 border-black text-black hover:bg-gray-100' },
    { id: 9, label: '3 Portrait + Text (2)', color: 'bg-white border-2 border-black text-black hover:bg-gray-100' },
    { id: 10, label: '3 Portrait + Text (3)', color: 'bg-white border-2 border-black text-black hover:bg-gray-100' },
    { id: 11, label: '3 Portrait + Text (4)', color: 'bg-white border-2 border-black text-black hover:bg-gray-100' },
    { id: 12, label: '4 Portrait', color: 'bg-white border-2 border-black text-black hover:bg-gray-100' },
  ];

  const getButtonStyle = (buttonId: number) => {
    const isActive = currentLayout && layoutMap[currentLayout] === buttonId;
    const baseColor = buttons.find(b => b.id === buttonId)?.color || '';
    
    if (isActive) {
      return `${baseColor} ring-4 ring-black ring-opacity-50 shadow-lg transform scale-105`;
    }
    return baseColor;
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 h-full overflow-y-auto flex-shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800">Layout Options</h3>
        <p className="text-sm text-gray-600 mt-1">
          Choose from 12 layout options
        </p>
      </div>

      {/* Buttons Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 justify-items-center">
          {buttons.map((button) => (
            <button
              key={button.id}
              onClick={() => onButtonClick?.(button.id)}
              className={`${getButtonStyle(button.id)} rounded-lg transition-all duration-200 flex items-center justify-center text-sm font-medium shadow-sm hover:shadow-md`}
              style={{ width: '100px', height: '150px' }}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500 text-center">
          Select a layout to apply to your page
        </div>
      </div>
    </div>
  );
}
