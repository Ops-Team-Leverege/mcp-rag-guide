import React from 'react';
import { ChevronDown } from 'lucide-react';

const RouterPatternDiagram = () => {
  return (
    <div className="my-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
      <h4 className="text-center font-bold text-gray-800 mb-4">The Router Pattern: Decide First, Then Execute</h4>

      <div className="flex flex-col items-center gap-3">
        {/* User Question */}
        <div className="w-full max-w-md bg-green-100 border-2 border-green-300 rounded-lg p-4 text-center animate-fade-in">
          <div className="font-semibold text-green-800">User Question</div>
          <div className="text-sm text-green-700 mt-1">"What did Acme say about pricing?"</div>
        </div>

        <ChevronDown className="w-6 h-6 text-gray-400 animate-bounce" />

        {/* Step A: Intent Classification */}
        <div className="w-full max-w-md bg-blue-100 border-2 border-blue-300 rounded-lg p-4 animate-slide-in-left">
          <div className="font-bold text-blue-800 mb-2">Step A: Intent Classification</div>
          <div className="text-sm text-blue-700">
            <div className="flex items-center justify-between mb-1">
              <span>Rules-based (keywords)</span>
              <span className="text-xs bg-blue-200 px-2 py-0.5 rounded">Fast, Free</span>
            </div>
            <div className="flex items-center justify-between">
              <span>OR Small LLM (GPT-4o-mini)</span>
              <span className="text-xs bg-blue-200 px-2 py-0.5 rounded">Flexible</span>
            </div>
          </div>
          <div className="mt-2 text-xs font-mono bg-blue-50 p-2 rounded">
            → Intent: SINGLE_MEETING
          </div>
        </div>

        <ChevronDown className="w-6 h-6 text-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }} />

        {/* Step B: Scope Resolution */}
        <div className="w-full max-w-md bg-purple-100 border-2 border-purple-300 rounded-lg p-4 animate-slide-in-right">
          <div className="font-bold text-purple-800 mb-2">Step B: Scope Resolution</div>
          <div className="text-sm text-purple-700">
            What data does this query need?
          </div>
          <div className="mt-2 text-xs font-mono bg-purple-50 p-2 rounded">
            → Scope: company="Acme", topic="pricing"
          </div>
        </div>

        <ChevronDown className="w-6 h-6 text-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }} />

        {/* Step C: Contract Selection */}
        <div className="w-full max-w-md bg-amber-100 border-2 border-amber-300 rounded-lg p-4 animate-slide-in-left">
          <div className="font-bold text-amber-800 mb-2">Step C: Contract Selection</div>
          <div className="text-sm text-amber-700">
            How to respond (output shape, authority, format)
          </div>
          <div className="mt-2 text-xs font-mono bg-amber-50 p-2 rounded">
            → Contract: EXTRACTIVE_FACT + citations
          </div>
        </div>

        <ChevronDown className="w-6 h-6 text-gray-400 animate-bounce" style={{ animationDelay: '0.6s' }} />

        {/* Processing Pipeline */}
        <div className="w-full max-w-md bg-green-100 border-2 border-green-300 rounded-lg p-4 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="font-semibold text-green-800">Processing Pipeline Executes</div>
          <div className="text-sm text-green-700 mt-1">
            Retrieves data → Builds prompt → Generates response
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-600">
        <p className="font-medium">Key Principle: The router decides WHAT to do. The pipeline does it.</p>
      </div>
    </div>
  );
};

export default RouterPatternDiagram;
