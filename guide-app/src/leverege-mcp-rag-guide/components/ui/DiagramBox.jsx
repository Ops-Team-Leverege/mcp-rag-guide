import React from 'react';

export const DiagramBox = ({ children, title }) => (
  <div className="my-5">
    {title && <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{title}</p>}
    <pre className="bg-slate-900 text-slate-100 p-5 rounded-lg text-sm overflow-x-auto font-mono leading-relaxed border border-slate-700 shadow-lg">
      {children}
    </pre>
  </div>
);
