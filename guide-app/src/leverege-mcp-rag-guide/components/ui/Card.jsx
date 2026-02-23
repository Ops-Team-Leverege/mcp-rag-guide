import React from 'react';

export const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 ${className}`}>
    {children}
  </div>
);
