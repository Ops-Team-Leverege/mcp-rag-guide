import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const ProgressiveSection = ({ number, title, subtitle, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-slate-200 rounded-xl my-5 overflow-hidden transition-all duration-200 hover:border-slate-300 hover:shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center gap-4 text-left hover:bg-slate-50/50 transition-colors"
      >
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-semibold">
          {number}
        </div>
        <div className="flex-grow min-w-0">
          <h3 className="font-semibold text-slate-900">{title}</h3>
          {subtitle && <p className="text-sm text-slate-500 mt-0.5 truncate">{subtitle}</p>}
        </div>
        <div className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-5 h-5 text-slate-400" />
        </div>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 border-t border-slate-100 pt-5 bg-slate-50/30">
          {children}
        </div>
      )}
    </div>
  );
};
