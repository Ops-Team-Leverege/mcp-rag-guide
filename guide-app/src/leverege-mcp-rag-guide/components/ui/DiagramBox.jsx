import React from 'react';

export const DiagramBox = ({ children, title }) => (
  <div className="my-5">
    {title && <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">{title}</p>}
    <pre className="bg-slate-800 text-slate-200 p-5 rounded-xl text-sm overflow-x-auto font-mono leading-relaxed border border-slate-700">
      {children}
    </pre>
  </div>
);
