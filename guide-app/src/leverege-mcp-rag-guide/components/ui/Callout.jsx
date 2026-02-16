import React from 'react';
import { Lightbulb, AlertTriangle, CheckCircle, Brain, Shield } from 'lucide-react';

export const Callout = ({ type = "info", title, children }) => {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    success: "bg-emerald-50 border-emerald-200 text-emerald-800",
    insight: "bg-purple-50 border-purple-200 text-purple-800",
    danger: "bg-red-50 border-red-200 text-red-800"
  };
  
  const icons = {
    info: <Lightbulb className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    success: <CheckCircle className="w-5 h-5" />,
    insight: <Brain className="w-5 h-5" />,
    danger: <Shield className="w-5 h-5" />
  };
  
  return (
    <div className={`p-4 rounded-xl border-l-4 ${styles[type]} my-4`}>
      <div className="flex items-center gap-2 font-semibold mb-2">
        {icons[type]}
        {title}
      </div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
};

export default Callout;
