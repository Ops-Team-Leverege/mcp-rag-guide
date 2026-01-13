import React, { useState } from 'react';
import { CheckCircle, HelpCircle } from 'lucide-react';

export const QuizQuestion = ({ question, options, correctIndex, explanation }) => {
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSelect = (index) => {
    setSelected(index);
    setShowAnswer(true);
  };

  return (
    <div className="my-6 p-5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
      <div className="flex items-center gap-2 mb-3">
        <HelpCircle className="w-5 h-5 text-indigo-600" />
        <span className="font-semibold text-indigo-800">Check Your Understanding</span>
      </div>
      <p className="font-medium text-gray-800 mb-4">{question}</p>
      <div className="space-y-2">
        {options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
              showAnswer
                ? i === correctIndex
                  ? 'bg-green-100 border-green-400 text-green-800'
                  : i === selected
                    ? 'bg-red-100 border-red-400 text-red-800'
                    : 'bg-white border-gray-200 text-gray-600'
                : 'bg-white border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
            }`}
          >
            <span className="flex items-center gap-2">
              {showAnswer && i === correctIndex && <CheckCircle className="w-4 h-4" />}
              {option}
            </span>
          </button>
        ))}
      </div>
      {showAnswer && (
        <div className="mt-4 p-3 bg-white rounded-lg border border-indigo-200">
          <p className="text-sm text-gray-700">{explanation}</p>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
