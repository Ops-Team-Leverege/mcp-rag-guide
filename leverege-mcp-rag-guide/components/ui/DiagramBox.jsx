import React from 'react';

export const DiagramBox = ({ children, title }) => (
  <div className="my-4">
    {title && <p className="text-sm font-medium text-gray-500 mb-2">{title}</p>}
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl text-xs overflow-x-auto font-mono leading-relaxed">
      {children}
    </pre>
  </div>
);

export default DiagramBox;
