import React from 'react';
import { Brain, ChevronDown } from 'lucide-react';

export const AgenticFlowDiagram = () => (
  <div className="my-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
    <p className="text-sm text-gray-600 mb-4 text-center font-medium">
      "Compare TPI and Les Schwab on cameras, then draft follow-up"
    </p>
    <div className="flex flex-col items-center gap-1">
      <div className="w-full max-w-md bg-amber-100 border-2 border-amber-300 rounded-lg p-3 text-center">
        <div className="font-semibold text-amber-800 text-sm flex items-center justify-center gap-2">
          <Brain className="w-4 h-4" /> Router (LLM decides plan)
        </div>
      </div>
      <ChevronDown className="w-5 h-5 text-gray-400" />
      <div className="flex gap-3 flex-wrap justify-center">
        <div className="bg-blue-100 border-2 border-blue-300 rounded-lg px-4 py-2">
          <div className="font-semibold text-blue-800 text-xs">Search TPI</div>
        </div>
        <div className="bg-blue-100 border-2 border-blue-300 rounded-lg px-4 py-2">
          <div className="font-semibold text-blue-800 text-xs">Search LS</div>
        </div>
        <div className="bg-purple-100 border-2 border-purple-300 rounded-lg px-4 py-2">
          <div className="font-semibold text-purple-800 text-xs">Draft Email</div>
        </div>
      </div>
      <ChevronDown className="w-5 h-5 text-gray-400" />
      <div className="w-full max-w-md bg-green-100 border-2 border-green-300 rounded-lg p-3 text-center">
        <div className="font-semibold text-green-800 text-sm">Synthesizer (combines results)</div>
      </div>
    </div>
  </div>
);

export default AgenticFlowDiagram;
