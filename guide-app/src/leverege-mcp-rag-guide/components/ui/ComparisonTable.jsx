import React from 'react';

export const ComparisonTable = ({ headers, rows }) => (
  <div className="overflow-x-auto my-6 rounded-xl border-2 border-gray-200 shadow-sm">
    <table className="w-full">
      <thead>
        <tr className="bg-gradient-to-r from-gray-100 to-gray-50">
          {headers.map((h, i) => (
            <th key={i} className="px-6 py-4 text-left font-bold text-gray-900 border-b-2 border-gray-200">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors`}>
            {row.map((cell, j) => (
              <td key={j} className="px-6 py-4 border-b border-gray-200 text-gray-700">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
