import React from 'react';
import { Lightbulb, AlertTriangle, CheckCircle, Brain, Shield } from 'lucide-react';

export const Callout = ({ type = "info", title, children }) => {
  const styles = {
    info: "bg-blue-50 border-blue-200",
    warning: "bg-amber-50 border-amber-200",
    success: "bg-emerald-50 border-emerald-200",
    insight: "bg-violet-50 border-violet-200",
    danger: "bg-rose-50 border-rose-200"
  };
  const iconColors = {
    info: "text-blue-600",
    warning: "text-amber-600",
    success: "text-emerald-600",
    insight: "text-violet-600",
    danger: "text-rose-600"
  };
  const icons = {
    info: <Lightbulb className={`w-6 h-6 ${iconColors[type]}`} />,
    warning: <AlertTriangle className={`w-6 h-6 ${iconColors[type]}`} />,
    success: <CheckCircle className={`w-6 h-6 ${iconColors[type]}`} />,
    insight: <Brain className={`w-6 h-6 ${iconColors[type]}`} />,
    danger: <Shield className={`w-6 h-6 ${iconColors[type]}`} />
  };
  return (
    <div className={`px-8 py-7 rounded-xl border-2 ${styles[type]}`}>
      <div className="flex items-start gap-5">
        <div className="flex-shrink-0 mt-1">
          {icons[type]}
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <div className="font-bold mb-3 text-xl text-gray-900 leading-snug">
              {title}
            </div>
          )}
          <div className="text-lg leading-relaxed text-gray-700 space-y-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
