import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const ProgressiveSection = ({ number, title, subtitle, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-2 border-gray-200 rounded-xl my-6 overflow-hidden hover:border-gray-300 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center gap-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
          {number}
        </div>
        <div className="flex-grow">
          <h3 className="font-bold text-lg text-gray-900">{title}</h3>
          {subtitle && <p className="text-base text-gray-600 mt-1">{subtitle}</p>}
        </div>
        <div className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </button>
      {isOpen && <div className="px-8 pb-8 border-t-2 border-gray-100 pt-6 bg-gray-50">{children}</div>}
    </div>
  );
};
