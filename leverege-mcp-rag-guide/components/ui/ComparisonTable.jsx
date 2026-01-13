import React from 'react';

export const ComparisonTable = ({ headers, rows }) => (
  <div className="overflow-x-auto my-4">
    <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
      <thead className="bg-gray-50">
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="px-4 py-3 text-left font-semibold text-gray-700 border-b">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
            {row.map((cell, j) => (
              <td key={j} className="px-4 py-3 border-b">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ComparisonTable;
