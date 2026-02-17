import React from 'react';
import { ExternalLink } from 'lucide-react';

export const ResourceLink = ({ title, url, description }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" className="block p-4 border border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/50 transition-all my-2 group">
    <div className="flex items-center gap-2">
      <ExternalLink className="w-4 h-4 text-indigo-500 group-hover:text-indigo-600" />
      <span className="font-medium text-indigo-600 group-hover:text-indigo-700">{title}</span>
    </div>
    {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
  </a>
);
