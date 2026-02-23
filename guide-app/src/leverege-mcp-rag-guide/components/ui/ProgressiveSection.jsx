import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const ProgressiveSection = ({ number, title, subtitle, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-slate-200 rounded-lg my-6 overflow-hidden transition-all duration-200 hover:border-slate-300 hover:shadow-md bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center gap-4 text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
          {number}
        </div>
        <div className="flex-grow min-w-0">
          <h3 className="font-semibold text-slate-900 text-base leading-tight">{title}</h3>
          {subtitle && <p className="text-sm text-slate-500 mt-1 line-clamp-1">{subtitle}</p>}
        </div>
        <div className={`transform transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-5 h-5 text-slate-400" />
        </div>
      </button>
      {isOpen && (
        <div className="px-6 pb-5 border-t border-slate-100 pt-4 bg-slate-50/50">
          <div className="prose prose-slate max-w-none">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
