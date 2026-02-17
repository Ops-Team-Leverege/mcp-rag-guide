import React, { useState } from 'react';
import { Card } from './Card';

export const QuizQuestion = ({ question, options, correctIndex, explanation }) => {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  return (
    <Card className="p-5 my-5">
      <p className="font-medium text-slate-800 mb-3">{question}</p>
      <div className="space-y-2">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => { setSelected(i); setShowResult(true); }}
            className={`w-full text-left p-3 rounded-lg border transition-all ${showResult
              ? i === correctIndex
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : i === selected
                  ? 'bg-rose-50 border-rose-300 text-rose-800'
                  : 'border-slate-200 text-slate-500'
              : selected === i
                ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                : 'border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {showResult && (
        <div className={`mt-3 p-3 rounded-lg ${selected === correctIndex ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>
          {explanation}
        </div>
      )}
    </Card>
  );
};
