import React from 'react';
import { Brain, Server, Database, ChevronRight, ChevronDown } from 'lucide-react';

const DiagramNode = ({ children, color = "blue", icon: Icon, subtitle }) => {
  const colors = {
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    purple: "bg-purple-50 border-purple-200 text-purple-800",
    green: "bg-green-50 border-green-200 text-green-800",
    amber: "bg-amber-50 border-amber-200 text-amber-800",
  };
  
  return (
    <div className={`px-4 py-3 rounded-lg border-2 ${colors[color]} text-center`}>
      <div className="flex items-center justify-center gap-2">
        {Icon && <Icon className="w-4 h-4" />}
        <span className="font-semibold text-sm">{children}</span>
      </div>
      {subtitle && <p className="text-xs opacity-75 mt-1">{subtitle}</p>}
    </div>
  );
};

export const MCPArchitectureDiagram = () => (
  <div className="my-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 overflow-x-auto">
    {/* Desktop: Horizontal flow */}
    <div className="hidden md:flex items-center justify-center gap-3 min-w-max">
      <DiagramNode color="blue" icon={Brain} subtitle="Claude, Cursor, etc.">AI Host</DiagramNode>
      <ChevronRight className="w-6 h-6 text-gray-400" />
      <DiagramNode color="purple" subtitle="Connects host to server">MCP Client</DiagramNode>
      <ChevronRight className="w-6 h-6 text-gray-400" />
      <DiagramNode color="green" icon={Server} subtitle="Your tools & logic">MCP Server</DiagramNode>
      <ChevronRight className="w-6 h-6 text-gray-400" />
      <DiagramNode color="amber" icon={Database} subtitle="Databases, APIs, Services">External Systems</DiagramNode>
    </div>
    
    {/* Mobile: Vertical flow */}
    <div className="md:hidden flex flex-col items-center gap-2">
      <DiagramNode color="blue" icon={Brain} subtitle="Claude, Cursor, etc.">AI Host</DiagramNode>
      <ChevronDown className="w-5 h-5 text-gray-400" />
      <DiagramNode color="purple" subtitle="Connects host to server">MCP Client</DiagramNode>
      <ChevronDown className="w-5 h-5 text-gray-400" />
      <DiagramNode color="green" icon={Server} subtitle="Your tools & logic">MCP Server</DiagramNode>
      <ChevronDown className="w-5 h-5 text-gray-400" />
      <DiagramNode color="amber" icon={Database} subtitle="Databases, APIs, Services">External Systems</DiagramNode>
    </div>
  </div>
);

export default MCPArchitectureDiagram;
