import React from 'react';
import { ChevronDown } from 'lucide-react';

export const SQLRagFlowDiagram = () => (
  <div className="my-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
    <p className="text-sm text-slate-500 mb-4 text-center font-medium">
      "What did TPI's customer say about cameras?"
    </p>
    <div className="flex flex-col items-center gap-1">
      <div className="w-full max-w-sm bg-blue-100 border border-blue-300 rounded-lg p-3">
        <div className="font-semibold text-blue-800 text-sm">1. SQL Filter (fast, precise)</div>
        <div className="text-xs text-blue-700 mt-1 font-mono">WHERE company='TPI' AND role='customer'</div>
        <div className="text-xs text-blue-600 mt-1">→ Narrows 13k chunks to ~200</div>
      </div>
      <ChevronDown className="w-5 h-5 text-slate-400" />
      <div className="w-full max-w-sm bg-purple-100 border border-purple-300 rounded-lg p-3">
        <div className="font-semibold text-purple-800 text-sm">2. Vector Search (semantic)</div>
        <div className="text-xs text-purple-700 mt-1 font-mono">ORDER BY embedding similarity</div>
        <div className="text-xs text-purple-600 mt-1">→ Finds 10 most relevant about "cameras"</div>
      </div>
      <ChevronDown className="w-5 h-5 text-slate-400" />
      <div className="w-full max-w-sm bg-green-100 border border-green-300 rounded-lg p-3 text-center">
        <div className="font-semibold text-green-800 text-sm">Return chunks with citations</div>
      </div>
    </div>
  </div>
);

export default SQLRagFlowDiagram;
