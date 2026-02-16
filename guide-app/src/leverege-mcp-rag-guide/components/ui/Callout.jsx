import React from 'react';
import { Lightbulb, AlertTriangle, CheckCircle, Brain, Shield } from 'lucide-react';

export const Callout = ({ type = "info", title, children }) => {
  const styles = {
    info: "bg-blue-100 border-blue-300 text-blue-900",
    warning: "bg-amber-100 border-amber-300 text-amber-900",
    success: "bg-emerald-100 border-emerald-300 text-emerald-900",
    insight: "bg-purple-100 border-purple-300 text-purple-900",
    danger: "bg-red-100 border-red-300 text-red-900"
  };
  const icons = {
    info: <Lightbulb className="w-6 h-6" />,
    warning: <AlertTriangle className="w-6 h-6" />,
    success: <CheckCircle className="w-6 h-6" />,
    insight: <Brain className="w-6 h-6" />,
    danger: <Shield className="w-6 h-6" />
  };
  return (
    <div className={`p-6 rounded-xl border-2 border-l-4 ${styles[type]} my-6`}>
      <div className="flex items-center gap-3 font-bold text-lg mb-3">
        {icons[type]}
        {title}
      </div>
      <div className="text-base leading-relaxed">{children}</div>
    </div>
  );
};
