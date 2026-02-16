import React from 'react';

export const ComplexitySpectrum = () => (
  <div className="my-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 overflow-x-auto">
    <div className="flex items-end justify-between gap-2 min-w-max md:min-w-0">
      {[
        { label: "SQL Only", examples: "Lookups, Counts, Lists", speed: "Fastest", cost: "Cheapest", color: "green", height: "h-20" },
        { label: "SQL + RAG", examples: "Search + Filter", speed: "Fast", cost: "Cheap", color: "blue", height: "h-28" },
        { label: "RAG + LLM", examples: "Analysis, Synthesis", speed: "Medium", cost: "Medium", color: "purple", height: "h-36" },
        { label: "Agentic AI", examples: "Multi-step, Tools", speed: "Slowest", cost: "Most $$$", color: "amber", height: "h-44" },
      ].map((item, i) => {
        const colors = {
          green: "bg-green-500",
          blue: "bg-blue-500",
          purple: "bg-purple-500",
          amber: "bg-amber-500",
        };
        return (
          <div key={i} className="flex flex-col items-center flex-1 min-w-24">
            <div className={`w-full ${item.height} ${colors[item.color]} rounded-t-lg flex items-end justify-center pb-2`}>
              <span className="text-white font-bold text-xs text-center px-1">{item.label}</span>
            </div>
            <div className="w-full bg-white border border-gray-200 rounded-b-lg p-2 text-center">
              <div className="text-xs text-gray-600">{item.examples}</div>
              <div className="text-xs text-gray-400 mt-1">{item.speed} • {item.cost}</div>
            </div>
          </div>
        );
      })}
    </div>
    <div className="flex justify-between mt-3 text-xs text-gray-500">
      <span>← Simpler</span>
      <span>More Complex →</span>
    </div>
  </div>
);

export default ComplexitySpectrum;
