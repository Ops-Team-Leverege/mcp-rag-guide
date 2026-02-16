import React from 'react';

export const DiagramBox = ({ children, title }) => (
  <div className="my-6">
    {title && <p className="text-base font-semibold text-gray-700 mb-3">{title}</p>}
    <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl text-sm overflow-x-auto font-mono leading-relaxed shadow-lg">
      {children}
    </pre>
  </div>
);
