import React from 'react';

export const DataQualityPyramid = () => (
  <div className="my-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
    <div className="flex flex-col items-center gap-1">
      {[
        { label: "AI Output", desc: "Only as good as what's below", color: "bg-red-100 border-red-300 text-red-800", width: "w-40" },
        { label: "Retrieval", desc: "Can only find what's indexed", color: "bg-orange-100 border-orange-300 text-orange-800", width: "w-48" },
        { label: "Embeddings", desc: "Can only represent what's chunked", color: "bg-amber-100 border-amber-300 text-amber-800", width: "w-56" },
        { label: "Chunking", desc: "Can only chunk what's structured", color: "bg-yellow-100 border-yellow-300 text-yellow-800", width: "w-64" },
        { label: "Clean Data", desc: "FOUNDATION", color: "bg-green-100 border-green-400 text-green-800 font-semibold", width: "w-72" },
      ].map((layer, i) => (
        <div key={i} className="flex flex-col items-center">
          {i > 0 && <div className="w-0.5 h-3 bg-slate-300" />}
          <div className={`${layer.width} ${layer.color} border rounded-lg px-4 py-2 text-center`}>
            <div className="font-semibold text-sm">{layer.label}</div>
            <div className="text-xs opacity-75">{layer.desc}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default DataQualityPyramid;
