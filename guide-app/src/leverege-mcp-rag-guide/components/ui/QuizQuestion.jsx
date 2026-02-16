import React, { useState } from 'react';
import { Card } from './Card';

export const QuizQuestion = ({ question, options, correctIndex, explanation }) => {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  return (
    <Card className="p-4 my-4">
      <p className="font-medium mb-3">{question}</p>
      <div className="space-y-2">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => { setSelected(i); setShowResult(true); }}
            className={`w-full text-left p-3 rounded-lg border transition-colors ${showResult
              ? i === correctIndex
                ? 'bg-green-100 border-green-300'
                : i === selected
                  ? 'bg-red-100 border-red-300'
                  : 'border-gray-200'
              : selected === i
                ? 'border-blue-300 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
              }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {showResult && (
        <div className={`mt-3 p-3 rounded-lg ${selected === correctIndex ? 'bg-green-50' : 'bg-amber-50'}`}>
          <p className="text-sm">{explanation}</p>
        </div>
      )}
    </Card>
  );
};
