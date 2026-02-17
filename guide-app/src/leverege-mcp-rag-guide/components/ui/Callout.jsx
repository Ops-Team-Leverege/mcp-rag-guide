import React from 'react';
import { Lightbulb, AlertTriangle, CheckCircle, Brain, Shield } from 'lucide-react';

export const Callout = ({ type = "info", title, children }) => {
  const styles = {
    info: "bg-sky-50 border-sky-200 text-sky-900",
    warning: "bg-amber-50 border-amber-200 text-amber-900",
    success: "bg-emerald-50 border-emerald-200 text-emerald-900",
    insight: "bg-violet-50 border-violet-200 text-violet-900",
    danger: "bg-rose-50 border-rose-200 text-rose-900"
  };
  const iconColors = {
    info: "text-sky-500",
    warning: "text-amber-500",
    success: "text-emerald-500",
    insight: "text-violet-500",
    danger: "text-rose-500"
  };
  const icons = {
    info: <Lightbulb className={`w-5 h-5 ${iconColors[type]}`} />,
    warning: <AlertTriangle className={`w-5 h-5 ${iconColors[type]}`} />,
    success: <CheckCircle className={`w-5 h-5 ${iconColors[type]}`} />,
    insight: <Brain className={`w-5 h-5 ${iconColors[type]}`} />,
    danger: <Shield className={`w-5 h-5 ${iconColors[type]}`} />
  };
  return (
    <div className={`px-5 py-4 rounded-xl border ${styles[type]} my-5`}>
      <div className="flex items-center gap-2.5 font-semibold mb-2">
        {icons[type]}
        {title}
      </div>
      <div className="leading-relaxed opacity-90">{children}</div>
    </div>
  );
};
