import React from 'react';
import { Lightbulb, AlertTriangle, CheckCircle, Brain, Shield } from 'lucide-react';

export const Callout = ({ type = "info", title, children }) => {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-900",
    warning: "bg-amber-50 border-amber-200 text-amber-900",
    success: "bg-emerald-50 border-emerald-200 text-emerald-900",
    insight: "bg-violet-50 border-violet-200 text-violet-900",
    danger: "bg-rose-50 border-rose-200 text-rose-900"
  };
  const iconColors = {
    info: "text-blue-600",
    warning: "text-amber-600",
    success: "text-emerald-600",
    insight: "text-violet-600",
    danger: "text-rose-600"
  };
  const icons = {
    info: <Lightbulb className={`w-5 h-5 ${iconColors[type]}`} />,
    warning: <AlertTriangle className={`w-5 h-5 ${iconColors[type]}`} />,
    success: <CheckCircle className={`w-5 h-5 ${iconColors[type]}`} />,
    insight: <Brain className={`w-5 h-5 ${iconColors[type]}`} />,
    danger: <Shield className={`w-5 h-5 ${iconColors[type]}`} />
  };
  return (
    <div className={`px-5 py-4 rounded-lg border-l-4 ${styles[type]} my-6 shadow-sm`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {icons[type]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold mb-1.5 text-base">
            {title}
          </div>
          <div className="leading-relaxed text-sm opacity-90">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
