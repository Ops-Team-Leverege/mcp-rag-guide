import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const ProgressiveSection = ({ number, title, subtitle, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-white hover:border-gray-300 transition-colors shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-7 flex items-center gap-5 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
          {number}
        </div>
        <div className="flex-grow min-w-0">
          <h3 className="font-bold text-gray-900 text-2xl leading-tight mb-1">{title}</h3>
          {subtitle && <p className="text-lg text-gray-600 mt-2">{subtitle}</p>}
        </div>
        <div className={`transform transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </button>
      {isOpen && (
        <div className="px-8 py-8 border-t-2 border-gray-200 bg-gray-50">
          <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
