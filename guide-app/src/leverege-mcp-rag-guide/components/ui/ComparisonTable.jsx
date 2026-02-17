import React from 'react';

export const ComparisonTable = ({ headers, rows }) => (
  <div className="overflow-x-auto my-5 rounded-xl border border-slate-200">
    <table className="w-full">
      <thead>
        <tr className="bg-slate-50">
          {headers.map((h, i) => (
            <th key={i} className="px-5 py-3 text-left font-semibold text-slate-700 border-b border-slate-200">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="hover:bg-indigo-50/30 transition-colors">
            {row.map((cell, j) => (
              <td key={j} className="px-5 py-3 border-b border-slate-100 text-slate-600">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
