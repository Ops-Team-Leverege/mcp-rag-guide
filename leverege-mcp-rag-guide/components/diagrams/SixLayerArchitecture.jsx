import React from 'react';

export const SixLayerArchitecture = () => (
  <div className="my-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
    <div className="flex flex-col items-center gap-1">
      {[
        { num: 6, label: "MCP", desc: "Interface Layer — Exposes capabilities", color: "purple" },
        { num: 5, label: "RAG Core", desc: "Orchestration — Routes queries", color: "blue" },
        { num: "3-4", label: "Retriever + Composer", desc: "Find chunks + Build prompts", color: "green" },
        { num: 2, label: "Ingestion", desc: "ETL — Parse, chunk, embed", color: "amber" },
        { num: 1, label: "Database", desc: "Storage — Postgres + pgvector", color: "gray" },
      ].map((layer, i) => {
        const colors = {
          purple: "bg-purple-100 border-purple-300 text-purple-800",
          blue: "bg-blue-100 border-blue-300 text-blue-800",
          green: "bg-green-100 border-green-300 text-green-800",
          amber: "bg-amber-100 border-amber-300 text-amber-800",
          gray: "bg-gray-200 border-gray-400 text-gray-800",
        };
        return (
          <div key={i} className="flex flex-col items-center w-full max-w-md">
            {i > 0 && <div className="w-0.5 h-3 bg-gray-300" />}
            <div className={`w-full ${colors[layer.color]} border-2 rounded-lg px-4 py-3 flex items-center gap-3`}>
              <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center font-bold text-sm">
                {layer.num}
              </div>
              <div>
                <div className="font-semibold">{layer.label}</div>
                <div className="text-xs opacity-75">{layer.desc}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    <p className="text-center text-sm text-gray-500 mt-4">↑ Build from bottom up</p>
  </div>
);

export default SixLayerArchitecture;
