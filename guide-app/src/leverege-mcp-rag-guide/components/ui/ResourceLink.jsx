import React from 'react';
import { ExternalLink } from 'lucide-react';

export const ResourceLink = ({ title, url, description }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors my-2">
    <div className="flex items-center gap-2">
      <ExternalLink className="w-4 h-4 text-blue-600" />
      <span className="font-medium text-blue-600">{title}</span>
    </div>
    {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
  </a>
);
